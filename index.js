var axios = require('axios');
var bent = require('bent');
var fetch = require('node-fetch');
var http = require('http');
var miniget = require('miniget');
var needle = require('needle');
var phin = require('phin');
var request = require('request');
var simpleget = require('simple-get');
var superagent = require('superagent');
var urllib = require('urllib');
var wreck = require('@hapi/wreck');

var nock = require('nock');
var HOST = '127.0.0.1';
var PATH = '/test'
var URL = `http://${HOST}${PATH}`;
var BASE_URL = `http://${HOST}`
var EMPTY_POST = Buffer.from('');
var EMPTY_RESPONSE = Buffer.from('ok');

axios.defaults.baseURL = BASE_URL;
// Bent library preparations
var bentGetBuffer = bent(BASE_URL, 'buffer', 200);
var bentGetStream = bent(BASE_URL, 200);
var bentPostBuffer = bent(BASE_URL, 'POST', 'buffer', 200);

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

nock(`http://${HOST}`).persist()
    // .log(console.log)
    .post(PATH).reply(200, EMPTY_RESPONSE)
    .get(PATH).reply(200, EMPTY_RESPONSE);

suite.add('http.request GET request', {
    defer: true,
    fn: (defer) => {
        var req = http.request({ path: PATH, host: HOST }, (res) => {
            res.resume().once('end', () => defer.resolve());
        });
        req.end();
    }
});

suite.add('http.request POST request', {
    defer: true,
    fn: (defer) => {
        var req = http.request({ host: HOST, path: PATH, method: 'POST' }, (res) => {
            res.resume().once('end', () => defer.resolve());
        });
        req.write(EMPTY_POST);
        req.end();
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
        fetch(URL, { method: 'POST', body: EMPTY_POST }).then(() => defer.resolve());
    }
});

suite.add('node-fetch Stream GET request', {
    defer: true,
    fn: (defer) => {
        fetch(URL).then((res) => {
            res.body.resume().once('end', () => defer.resolve());
        });
    }
});

suite.add('phin GET request', {
    defer: true,
    fn: (defer) => {
        phin(URL).then(() => defer.resolve())
    }
});

suite.add('phin POST request', {
    defer: true,
    fn: (defer) => {
        phin({ url: URL, method: 'POST', body: EMPTY_POST }).then(() => defer.resolve());
    }
});

suite.add('phin Stream GET request', {
    defer: true,
    fn: (defer) => {
        phin({ url: URL, stream: true }).then((res) => {
            res.stream.resume().once('end', () => defer.resolve());
        });
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
        axios.post(PATH, EMPTY_POST).then(() => defer.resolve());
    }
});

suite.add('axios Stream GET request', {
    defer: true,
    fn: (defer) => {
        axios.get(PATH, { responseType: 'stream' })
            .then((res) => {
                res.data.resume().once('end', () => defer.resolve());
            });
    }
});

suite.add('bent GET request', {
    defer: true,
    fn: (defer) => {
        bentGetBuffer(PATH).then(() => defer.resolve());
    }
});

suite.add('bent POST request', {
    defer: true,
    fn: (defer) => {
        bentPostBuffer(PATH, EMPTY_POST).then(() => defer.resolve());
    }
});

suite.add('bent Stream GET request', {
    defer: true,
    fn: (defer) => {
        bentGetStream(PATH)
            .then((res) => {
                res.resume().once('end', () => defer.resolve());
            });
    }
});

suite.add('@hapi/wreck GET request', {
    defer: true,
    fn: (defer) => {
        wreck.get(URL).then(() => defer.resolve());
    }
});

suite.add('@hapi/wreck POST request', {
    defer: true,
    fn: (defer) => {
        wreck.post(URL, { payload: EMPTY_POST }).then(() => defer.resolve());
    }
});

suite.add('superagent Stream GET request', {
    defer: true,
    fn: (defer) => {
        superagent.get(URL).end(() => { defer.resolve(); });
    }
});

suite.add('superagent Stream POST request', {
    defer: true,
    fn: (defer) => {
        superagent.post(URL).send(EMPTY_POST).end(() => defer.resolve());
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
        needle.post(URL, EMPTY_POST, () => defer.resolve())
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
        simpleget.concat({ url: URL, method: 'POST', body: EMPTY_POST }, () => defer.resolve())
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

suite.add('urllib GET request', {
    defer: true,
    fn: (defer) => {
        urllib.request(URL, () => defer.resolve());
    }
});

suite.add('urllib POST request', {
    defer: true,
    fn: (defer) => {
        urllib.request(URL, { method: 'POST', content: EMPTY_POST }, () => defer.resolve());
    }
});

suite.add('Request GET request', {
    defer: true,
    fn: (defer) => {
        request.get({ url: URL, encoding: null }, () => defer.resolve());
    }
});

suite.add('Request POST request', {
    defer: true,
    fn: (defer) => {
        request.post({ url: URL, body: EMPTY_POST }, () => defer.resolve());
    }
});

suite.add('Request Forever GET request', {
    defer: true,
    fn: (defer) => {
        request.get({ url: URL, encoding: null, forever: true }, () => defer.resolve());
    }
});

suite.add('Request Forever POST request', {
    defer: true,
    fn: (defer) => {
        request.post({ url: URL, body: EMPTY_POST, forever: true }, () => defer.resolve());
    }
});

suite.on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
});

suite.on('cycle', function (event) {
    console.log(String(event.target));
});

suite.run({ async: true });
