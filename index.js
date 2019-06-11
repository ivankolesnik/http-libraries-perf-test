var http = require('http');
var axios = require('axios');
var superagent = require('superagent');
var request = require('request');
var got = require('got');
var requestify = require('requestify');
var fetch = require('node-fetch');
var needle = require('needle');
var miniget = require('miniget');
var simpleget = require('simple-get');
var wreck = require('wreck');
var urllib = require('urllib');
var hyperquest = require('hyperquest');

var nock = require('nock');
var HOST = '127.0.0.1';
var PATH = '/test'
var URL = `http://${HOST}${PATH}`;

axios.defaults.baseURL = `http://${HOST}`;

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

nock(`http://${HOST}`).persist()
    // .log(console.log)
    .post(PATH).reply(200, Buffer.from('ok'))
    .get(PATH).reply(200, Buffer.from('ok'));

suite.add('http.request GET request', {
    defer: true,
    fn: (defer) => {
        http.request({ path: PATH, host: HOST }, (res) => {
            res.resume().once('end', () => defer.resolve());
        }).end();
    }
});

suite.add('http.request POST request', {
    defer: true,
    fn: (defer) => {
        var req = http.request({ host: HOST, path: PATH, method: 'POST' }, (res) => {
            res.resume().once('end', () => defer.resolve());
        });
        req.write();
        req.end();
    }
});

suite.add('urllib GET request', {
    defer: true,
    fn: (defer) => {
        urllib.request(URL, () => defer.resolve());
    }
});

suite.add('urllib POST request', {
    defer: true,
    fn: (defer) => {
        urllib.request(URL, { method: 'POST' }, () => defer.resolve());
    }
});

suite.add('node-fetch GET request', {
    defer: true,
    fn: (defer) => {
        fetch(URL).then(() => defer.resolve())
    }
});

suite.add('node-fetch POST request', {
    defer: true,
    fn: (defer) => {
        fetch(URL, { method: 'POST' }).then(() => defer.resolve());
    }
});

suite.add('got GET request', {
    defer: true,
    fn: (defer) => {
        got.get(URL).then(() => defer.resolve());
    }
});

suite.add('got POST request', {
    defer: true,
    fn: (defer) => {
        got.post(URL).then(() => defer.resolve());
    }
});

suite.add('got Stream GET request', {
    defer: true,
    fn: (defer) => {
        var str = got.stream.get(URL)
        str.resume()
        str.once('end', () => defer.resolve());
    }
});

suite.add('superagent GET request', {
    defer: true,
    fn: (defer) => {
        superagent.get(URL).end(() => { defer.resolve(); });
    }
});

suite.add('superagent POST request', {
    defer: true,
    fn: (defer) => {
        superagent.post(URL).send().end(() => defer.resolve());
    }
});

suite.add('axios GET request', {
    defer: true,
    fn: (defer) => {
        axios.get(PATH).then(() => defer.resolve())
    }
});

suite.add('axios POST request', {
    defer: true,
    fn: (defer) => {
        axios.post(PATH).then(() => defer.resolve());
    }
});

suite.add('Request GET request', {
    defer: true,
    fn: (defer) => {
        request.get({ url: URL }, () => defer.resolve());
    }
});

suite.add('Request POST request', {
    defer: true,
    fn: (defer) => {
        request.post({ url: URL }, () => defer.resolve());
    }
});

suite.add('Request Forever GET request', {
    defer: true,
    fn: (defer) => {
        request.get({ url: URL, forever: true }, () => defer.resolve());
    }
});

suite.add('Request Forever POST request', {
    defer: true,
    fn: (defer) => {
        request.post({ url: URL, forever: true }, () => defer.resolve());
    }
});

suite.add('Needle GET request', {
    defer: true,
    fn: (defer) => {
        needle.get(URL, () => defer.resolve())
    }
});

suite.add('Needle POST request', {
    defer: true,
    fn: (defer) => {
        needle.post(URL, '', () => defer.resolve())
    }
});

suite.add('Needle Stream GET request', {
    defer: true,
    fn: (defer) => {
        var stream = needle.get(URL)
        stream.on('readable', function() { while (this.read()) {} });
        stream.on('done', () => defer.resolve());
    }
});

suite.add('Miniget GET request', {
    defer: true,
    fn: (defer) => {
        miniget(URL, () => defer.resolve())
    }
});

suite.add('Simple-get GET request', {
    defer: true,
    fn: (defer) => {
        simpleget.concat(URL, () => defer.resolve())
        // simpleget(URL, () => defer.resolve()) // streaming
    }
});

suite.add('Simple-get POST request', {
    defer: true,
    fn: (defer) => {
        simpleget.concat({ url: URL, method: 'POST', body: '' }, () => defer.resolve())
    }
});

suite.add('Simple-get Stream GET request', {
    defer: true,
    fn: (defer) => {
        simpleget(URL, (err, res) => { 
            res.resume().once('end', () => defer.resolve());
        });
    }
});

suite.add('Wreck GET request', {
    defer: true,
    fn: (defer) => {
        wreck.get(URL).then(() => defer.resolve());
    }
});

suite.add('Wreck POST request', {
    defer: true,
    fn: (defer) => {
        wreck.post(URL, { payload: '' }).then(() => defer.resolve());
    }
});

suite.add('[OLD] hyperquest GET request', {
    defer: true,
    fn: (defer) => {
        hyperquest.get(URL, {}, (err, res) => {
            res.resume().once('end', () => defer.resolve());
        })
    }
});

suite.add('[OLD] hyperquest POST request', {
    defer: true,
    fn: (defer) => {
        var hyp = hyperquest.post(URL, {}, (err, res) => {
            res.resume().once('end', () => defer.resolve());
        });
        hyp.end('');
    }
});

suite.add('[OLD] requestify GET request', {
    defer: true,
    fn: (defer) => {
        requestify.get(URL).then(() => defer.resolve());
    }
});

suite.add('[OLD] requestify POST request', {
    defer: true,
    fn: (defer) => {
        requestify.post(URL).then(() => defer.resolve());
    }
});

suite.on('complete', function (defer) {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.on('cycle', function (event) {
    console.log(String(event.target));
});

suite.run({ async: true });
