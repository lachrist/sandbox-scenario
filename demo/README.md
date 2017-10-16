
```
node compile.js
```

or with the unecessary `buffer` and `process` browserify shims:

```
node ../bin.js --basedir ./ > bundle.js \
  --spawn-path  spawn.js   --spawn-type  browserify \
  --parent-path parent1.js --parent-type raw \
  --parent-path parent2.js --parent-type browserify \
  --child-path  child1.js  --child-type  raw \
  --child-path  child2.js  --child-type  browserify
```