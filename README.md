# HTTP libraries performance test

Test environment:
Intel 9700K @ 4.6 GHz
16GB RAM
MacOS 10.13.6
NodeJS 10.15.1

Test results:
```bash
$ node index.js
http.request POST request x 33,747 ops/sec ±2.64% (85 runs sampled)
http.request GET request x 33,602 ops/sec ±0.74% (86 runs sampled)
fetch GET request x 14,774 ops/sec ±3.70% (77 runs sampled)
fetch POST request x 13,820 ops/sec ±1.77% (83 runs sampled)
requestify GET request x 13,342 ops/sec ±2.77% (84 runs sampled)
requestify POST request x 11,794 ops/sec ±1.91% (76 runs sampled)
got GET request x 4,314 ops/sec ±3.29% (75 runs sampled)
got POST request x 4,600 ops/sec ±1.15% (84 runs sampled)
axios GET request x 10,294 ops/sec ±1.82% (81 runs sampled)
axios POST request x 9,755 ops/sec ±1.23% (82 runs sampled)
superagent GET request x 18,999 ops/sec ±0.72% (87 runs sampled)
superagent POST request x 18,394 ops/sec ±2.86% (81 runs sampled)
Request GET request x 12,126 ops/sec ±3.00% (82 runs sampled)
Request POST request x 10,040 ops/sec ±1.98% (81 runs sampled)
Request Forever GET request x 10,142 ops/sec ±1.05% (82 runs sampled)
Request Forever POST request x 9,676 ops/sec ±0.75% (85 runs sampled)
Needle GET request x 11,486 ops/sec ±2.12% (79 runs sampled)
Needle POST request x 11,701 ops/sec ±1.33% (82 runs sampled)
Miniget GET request x 16,608 ops/sec ±1.32% (78 runs sampled)
Simple-get GET request x 21,275 ops/sec ±0.78% (85 runs sampled)
Simple-get POST request x 24,972 ops/sec ±1.58% (82 runs sampled)
Wreck GET request x 15,999 ops/sec ±1.21% (82 runs sampled)
Wreck POST request x 14,615 ops/sec ±1.25% (83 runs sampled)
Fastest is http.request GET request
```

Some libraries do some magic when parsing response stream (`axios` and `request`), so that's why they are so slow. If you don't need features like redirect handling and response decompression (or you have time\knowledge to write your own implementation) then I recommend you to stick with plain `http.request`.
