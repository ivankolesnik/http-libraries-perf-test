# HTTP libraries performance test

Test environment:\
Intel 9700K @ 4.6 GHz\
16GB RAM\
MacOS 10.13.6\
NodeJS 10.15.1

Test results:
```bash
$ node index.js
http.request GET request x 40,016 ops/sec ±0.70% (84 runs sampled)
http.request POST request x 37,154 ops/sec ±0.77% (80 runs sampled)
node-fetch GET request x 14,812 ops/sec ±3.06% (83 runs sampled)
node-fetch POST request x 12,964 ops/sec ±1.75% (81 runs sampled)
node-fetch Stream GET request x 14,192 ops/sec ±1.10% (80 runs sampled)
phin GET request x 26,033 ops/sec ±0.79% (83 runs sampled)
phin POST request x 26,063 ops/sec ±1.71% (86 runs sampled)
phin Stream GET request x 28,128 ops/sec ±0.85% (83 runs sampled)
axios GET request x 11,646 ops/sec ±2.27% (79 runs sampled)
axios POST request x 10,030 ops/sec ±1.72% (81 runs sampled)
axios Stream GET request x 15,282 ops/sec ±1.31% (81 runs sampled)
bent GET request x 24,025 ops/sec ±1.04% (80 runs sampled)
bent POST request x 23,084 ops/sec ±1.79% (83 runs sampled)
bent Stream GET request x 28,139 ops/sec ±0.82% (84 runs sampled)
@hapi/wreck GET request x 18,537 ops/sec ±1.41% (79 runs sampled)
@hapi/wreck POST request x 15,698 ops/sec ±1.63% (83 runs sampled)
superagent Stream GET request x 22,377 ops/sec ±3.36% (83 runs sampled)
superagent Stream POST request x 16,162 ops/sec ±2.79% (77 runs sampled)
Needle GET request x 12,710 ops/sec ±3.46% (77 runs sampled)
Needle POST request x 11,761 ops/sec ±1.51% (80 runs sampled)
Needle Stream GET request x 14,741 ops/sec ±1.33% (81 runs sampled)
Miniget GET request x 18,784 ops/sec ±1.53% (84 runs sampled)
Simple-get GET request x 25,503 ops/sec ±1.06% (83 runs sampled)
Simple-get POST request x 20,973 ops/sec ±1.75% (80 runs sampled)
Simple-get Stream GET request x 26,366 ops/sec ±0.77% (84 runs sampled)
urllib GET request x 17,265 ops/sec ±2.23% (81 runs sampled)
urllib POST request x 16,035 ops/sec ±1.06% (83 runs sampled)
Postman-request GET request x 9,673 ops/sec ±1.84% (81 runs sampled)
Postman-request POST request x 22,368 ops/sec ±3.40% (42 runs sampled)
Postman-request Forever GET request x 8,297 ops/sec ±2.27% (77 runs sampled)
Postman-request Forever POST request x 23,790 ops/sec ±3.07% (46 runs sampled)
Request GET request x 11,976 ops/sec ±1.51% (83 runs sampled)
Request POST request x 23,781 ops/sec ±2.82% (45 runs sampled)
Request Forever GET request x 9,963 ops/sec ±2.72% (76 runs sampled)
Request Forever POST request x 22,954 ops/sec ±2.41% (46 runs sampled)
Fastest is http.request GET request
```

Some libraries do some magic when parsing response stream (`axios` and `request`), so that's why they are so slow. If you don't need features like redirect handling and response decompression (or you have time\knowledge to write your own implementation) then I recommend you to stick with plain `http.request`.
