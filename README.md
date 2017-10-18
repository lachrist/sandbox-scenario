# sandbox-scenario

Demonstrate inter-process communication libraries on the browser.
Usage [here](/demo), live demo [here](https://cdn.rawgit.com/lachrist/sandbox-scenario/9940fb2a/demo/index.html).
Command line interface:

## `Context :: object`

* `type :: string`
* `path :: string`
* `options :: sandbox-editor.Options`

## `require("sandbox-scenario")(spawn, parents, children, callback)`

* `spawn :: sandbox-scenario.Context`
* `parents :: [sandbox-scenario.Context]`
* `children :: [sandbox-scenario.Context]`
* `callback(error, script)`
  * `error :: Error`
  * `script :: sring`

## `spawn = Spawn(parent1, parent2, ...)`

* `parent1 :: string`
* `parent2 :: string`
* `child = spawn(path, script, argv)`
  * `path :: string`
  * `script :: string`
  * `argv :: [string]`
  * `child :: sandbox-spawn.Child | Worker`
