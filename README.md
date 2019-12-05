# HTTP libraries performance test

Test environment:\
Intel 9700K @ 4.6 GHz\
32GB RAM\
MacOS 10.14.6\
NodeJS 12.13.1

[Old NodeJS 10 test results are here](README_v10.md)

Test results:
```bash
$ node index.js
http.request GET request x 50,687 ops/sec ±2.16% (80 runs sampled)
http.request POST request x 46,376 ops/sec ±4.27% (81 runs sampled)
node-fetch GET request x 22,029 ops/sec ±6.58% (80 runs sampled)
node-fetch POST request x 20,792 ops/sec ±6.56% (79 runs sampled)
node-fetch Stream GET request x 18,768 ops/sec ±8.70% (81 runs sampled)
phin GET request x 28,670 ops/sec ±3.70% (83 runs sampled)
phin POST request x 29,449 ops/sec ±0.70% (83 runs sampled)
phin Stream GET request x 29,512 ops/sec ±7.27% (81 runs sampled)
axios GET request x 13,466 ops/sec ±9.12% (78 runs sampled)
axios POST request x 12,730 ops/sec ±10.58% (74 runs sampled)
axios Stream GET request x 16,849 ops/sec ±10.54% (79 runs sampled)
bent GET request x 19,608 ops/sec ±11.17% (77 runs sampled)
bent POST request x 18,547 ops/sec ±13.41% (79 runs sampled)
bent Stream GET request x 22,125 ops/sec ±8.28% (84 runs sampled)
@hapi/wreck GET request x 19,390 ops/sec ±16.78% (86 runs sampled)
@hapi/wreck POST request x 18,026 ops/sec ±9.50% (83 runs sampled)
superagent Stream GET request x 19,630 ops/sec ±14.40% (77 runs sampled)
superagent Stream POST request x 15,098 ops/sec ±15.39% (73 runs sampled)
Needle GET request x 13,408 ops/sec ±16.30% (72 runs sampled)
Needle POST request x 13,527 ops/sec ±13.47% (74 runs sampled)
Needle Stream GET request x 15,614 ops/sec ±16.11% (75 runs sampled)
Miniget GET request x 18,197 ops/sec ±16.97% (75 runs sampled)
Simple-get GET request x 27,785 ops/sec ±10.36% (78 runs sampled)
Simple-get POST request x 24,680 ops/sec ±13.49% (77 runs sampled)
Simple-get Stream GET request x 31,679 ops/sec ±0.70% (84 runs sampled)
urllib GET request x 17,603 ops/sec ±21.52% (81 runs sampled)
urllib POST request x 17,737 ops/sec ±15.40% (77 runs sampled)
Postman-request GET request x 9,315 ops/sec ±20.94% (73 runs sampled)
Postman-request POST request x 20,204 ops/sec ±21.91% (41 runs sampled)
Postman-request Forever GET request x 8,316 ops/sec ±19.72% (70 runs sampled)
Postman-request Forever POST request x 18,752 ops/sec ±26.61% (42 runs sampled)
Request GET request x 8,599 ops/sec ±30.38% (55 runs sampled)
Request POST request x 14,549 ops/sec ±33.03% (36 runs sampled)
Request Forever GET request x 8,466 ops/sec ±24.44% (63 runs sampled)
Request Forever POST request x 21,477 ops/sec ±8.21% (40 runs sampled)
Fastest is http.request GET request
```

Some libraries do some magic when parsing response stream (`axios` and `request`), so that's why they are so slow. If you don't need features like redirect handling and response decompression (or you have time\knowledge to write your own implementation) then I recommend you to stick with plain `http.request`.
