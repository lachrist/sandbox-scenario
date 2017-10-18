```sh
node ../bin.js --basedir ./ --min-lines 7 --max-lines 14 > bundle.js \
  --spawn-type  raw        --spawn-path  spawn.js                    \
  --parent-type raw        --parent-path parent1.js                  \
  --parent-type browserify --parent-path parent2.js                  \
  --child-type  raw        --child-path  child1.js                   \
  --child-type  browserify --child-path  child2.js
```