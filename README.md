# HTTP libraries performance test

Test environment:\
Intel 9700K @ 4.6 GHz\
16GB RAM\
MacOS 10.13.6\
NodeJS 10.15.1

Test results:
```bash
$ node index.js
http.request GET request x 31,718 ops/sec ±10.20% (89 runs sampled)
http.request POST request x 31,755 ops/sec ±0.62% (84 runs sampled)
node-fetch GET request x 14,683 ops/sec ±2.69% (84 runs sampled)
node-fetch POST request x 13,010 ops/sec ±1.42% (84 runs sampled)
node-fetch Stream GET request x 13,009 ops/sec ±0.88% (85 runs sampled)
axios GET request x 11,071 ops/sec ±1.44% (85 runs sampled)
axios POST request x 9,406 ops/sec ±1.86% (77 runs sampled)
axios Stream GET request x 14,242 ops/sec ±1.21% (83 runs sampled)
bent GET request x 20,673 ops/sec ±3.49% (87 runs sampled)
bent POST request x 19,832 ops/sec ±1.75% (87 runs sampled)
bent Stream GET request x 23,622 ops/sec ±0.61% (86 runs sampled)
@hapi/wreck GET request x 15,941 ops/sec ±3.82% (79 runs sampled)
@hapi/wreck POST request x 13,671 ops/sec ±1.37% (83 runs sampled)
superagent Stream GET request x 19,440 ops/sec ±3.29% (85 runs sampled)
superagent Stream POST request x 14,305 ops/sec ±3.17% (82 runs sampled)
Needle GET request x 11,480 ops/sec ±3.18% (77 runs sampled)
Needle POST request x 10,873 ops/sec ±1.34% (79 runs sampled)
Needle Stream GET request x 13,378 ops/sec ±1.16% (84 runs sampled)
Miniget GET request x 16,305 ops/sec ±1.84% (80 runs sampled)
Simple-get GET request x 21,853 ops/sec ±1.10% (82 runs sampled)
Simple-get POST request x 18,820 ops/sec ±1.01% (83 runs sampled)
Simple-get Stream GET request x 22,628 ops/sec ±0.67% (88 runs sampled)
urllib GET request x 15,418 ops/sec ±1.91% (85 runs sampled)
urllib POST request x 14,504 ops/sec ±1.01% (83 runs sampled)
Request GET request x 10,912 ops/sec ±2.10% (78 runs sampled)
Request POST request x 28,588 ops/sec ±5.38% (50 runs sampled)
Request Forever GET request x 8,421 ops/sec ±1.51% (79 runs sampled)
Request Forever POST request x 26,358 ops/sec ±2.83% (47 runs sampled)
Fastest is http.request POST request
```

Some libraries do some magic when parsing response stream (`axios` and `request`), so that's why they are so slow. If you don't need features like redirect handling and response decompression (or you have time\knowledge to write your own implementation) then I recommend you to stick with plain `http.request`.
