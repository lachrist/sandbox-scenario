# sandbox-scenario

Demonstrate inter-process communication libraries on the browser.
Usage [here](/demo), live demo [here](https://cdn.rawgit.com/lachrist/sandbox-scenario/992dbad7/demo/index.html).

```
node ../bin.js --basedir ./ > bundle.js \
  --spawn-path  spawn.js   --spawn-type  <type> \
  --parent-path parent1.js --parent-type <type> \
  --parent-path parent2.js --parent-type <type> \
  --child-path  child1.js  --child-type  <type> \
  --child-path  child2.js  --child-type  <type>
```

## `Context :: object`

* `type :: string`
* `path :: string`
* `options :: object`
  * `basedir :: string`
  * `editor :: ace.c9.editor.Options`
  * `noprocess :: boolean`
  * `nobuffer :: boolean`

## `require("sandbox-scenario")(spawn, parents, children, callback)`

* `spawn :: sandbox-scenario.Context`
* `parents :: [sandbox-scenario.Context]`
* `children :: [sandbox-scenario.Context]`
* `callback(error, script)`
  * `error :: Error`
  * `script :: sring`
