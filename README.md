# HTTP libraries performance test

Test environment:\
Intel 9700K @ 4.6 GHz\
16GB RAM\
MacOS 10.13.6\
NodeJS 10.15.1

Test results:
```bash
$ node index.js
http.request GET request x 33,977 ops/sec ±0.79% (85 runs sampled)
http.request POST request x 33,858 ops/sec ±0.68% (82 runs sampled)
urllib GET request x 16,352 ops/sec ±1.47% (80 runs sampled)
urllib POST request x 16,716 ops/sec ±0.80% (85 runs sampled)
node-fetch GET request x 14,989 ops/sec ±2.62% (79 runs sampled)
node-fetch POST request x 13,433 ops/sec ±2.51% (81 runs sampled)
got GET request x 4,348 ops/sec ±3.24% (77 runs sampled)
got POST request x 4,632 ops/sec ±1.22% (81 runs sampled)
got Stream GET request x 5,537 ops/sec ±1.30% (82 runs sampled)
superagent GET request x 18,909 ops/sec ±1.95% (86 runs sampled)
superagent POST request x 18,993 ops/sec ±1.30% (86 runs sampled)
Request GET request x 10,887 ops/sec ±2.37% (79 runs sampled)
Request POST request x 10,514 ops/sec ±0.79% (83 runs sampled)
Request Forever GET request x 10,348 ops/sec ±1.24% (83 runs sampled)
Request Forever POST request x 9,901 ops/sec ±0.75% (85 runs sampled)
Needle GET request x 11,650 ops/sec ±1.90% (83 runs sampled)
Needle POST request x 11,877 ops/sec ±1.12% (83 runs sampled)
Needle Stream GET request x 13,291 ops/sec ±1.09% (84 runs sampled)
Miniget GET request x 17,077 ops/sec ±1.31% (80 runs sampled)
Simple-get GET request x 22,261 ops/sec ±1.02% (87 runs sampled)
Simple-get POST request x 21,537 ops/sec ±0.86% (82 runs sampled)
Simple-get Stream GET request x 23,213 ops/sec ±0.82% (86 runs sampled)
Wreck GET request x 16,126 ops/sec ±2.12% (82 runs sampled)
Wreck POST request x 14,713 ops/sec ±0.86% (84 runs sampled)
[OLD] hyperquest GET request x 19,944 ops/sec ±2.72% (82 runs sampled)
[OLD] hyperquest POST request x 11,469 ops/sec ±8.29% (71 runs sampled)
[OLD] axios GET request x 10,680 ops/sec ±2.20% (84 runs sampled)
[OLD] axios POST request x 10,082 ops/sec ±1.48% (77 runs sampled)
[OLD] requestify GET request x 12,486 ops/sec ±2.32% (79 runs sampled)
[OLD] requestify POST request x 11,056 ops/sec ±1.69% (78 runs sampled)
Fastest is http.request GET request
```

Some libraries do some magic when parsing response stream (`axios` and `request`), so that's why they are so slow. If you don't need features like redirect handling and response decompression (or you have time\knowledge to write your own implementation) then I recommend you to stick with plain `http.request`.
