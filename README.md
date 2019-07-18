# HTTP libraries performance test

Test environment:\
Intel 9700K @ 4.6 GHz\
16GB RAM\
MacOS 10.13.6\
NodeJS 10.15.1

Test results:
```bash
$ node index.js
http.request GET request x 32,434 ops/sec ±9.24% (85 runs sampled)
http.request POST request x 31,885 ops/sec ±0.68% (84 runs sampled)
node-fetch GET request x 15,133 ops/sec ±1.79% (88 runs sampled)
node-fetch POST request x 13,161 ops/sec ±1.60% (84 runs sampled)
node-fetch Stream GET request x 13,400 ops/sec ±0.94% (85 runs sampled)
phin GET request x 23,002 ops/sec ±0.58% (83 runs sampled)
phin POST request x 22,993 ops/sec ±1.82% (87 runs sampled)
phin Stream GET request x 24,694 ops/sec ±0.57% (87 runs sampled)
axios GET request x 10,933 ops/sec ±2.13% (79 runs sampled)
axios POST request x 9,565 ops/sec ±1.54% (79 runs sampled)
axios Stream GET request x 14,299 ops/sec ±1.32% (79 runs sampled)
bent GET request x 20,731 ops/sec ±1.32% (85 runs sampled)
bent POST request x 20,132 ops/sec ±1.87% (83 runs sampled)
bent Stream GET request x 24,051 ops/sec ±0.78% (82 runs sampled)
@hapi/wreck GET request x 16,603 ops/sec ±0.85% (84 runs sampled)
@hapi/wreck POST request x 14,405 ops/sec ±1.09% (84 runs sampled)
superagent Stream GET request x 20,426 ops/sec ±2.90% (88 runs sampled)
superagent Stream POST request x 14,347 ops/sec ±3.27% (78 runs sampled)
Needle GET request x 11,829 ops/sec ±1.85% (83 runs sampled)
Needle POST request x 10,991 ops/sec ±1.32% (81 runs sampled)
Needle Stream GET request x 13,517 ops/sec ±1.18% (81 runs sampled)
Miniget GET request x 16,798 ops/sec ±1.48% (81 runs sampled)
Simple-get GET request x 22,098 ops/sec ±1.31% (83 runs sampled)
Simple-get POST request x 18,796 ops/sec ±1.14% (82 runs sampled)
Simple-get Stream GET request x 22,975 ops/sec ±0.75% (83 runs sampled)
urllib GET request x 15,808 ops/sec ±0.79% (83 runs sampled)
urllib POST request x 14,641 ops/sec ±0.90% (79 runs sampled)
Request GET request x 10,905 ops/sec ±1.96% (81 runs sampled)
Request POST request x 30,125 ops/sec ±4.91% (52 runs sampled)
Request Forever GET request x 8,341 ops/sec ±1.49% (79 runs sampled)
Request Forever POST request x 28,943 ops/sec ±4.18% (49 runs sampled)
Fastest is http.request POST request
```

Some libraries do some magic when parsing response stream (`axios` and `request`), so that's why they are so slow. If you don't need features like redirect handling and response decompression (or you have time\knowledge to write your own implementation) then I recommend you to stick with plain `http.request`.
