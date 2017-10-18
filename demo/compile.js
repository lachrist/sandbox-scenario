const Fs = require("fs");
require("../main.js")({
  path: "spawn.js",
  type: "raw"
}, [{
  path: "parent1.js",
  type: "raw"
}, {
  path: "parent2.js",
  type: "browserify",
  options: {nobuffer:true,noprocess:true}
}], [{
  path: "child1.js",
  type: "raw",
  options: {editor:{minLines:7,maxLines:7}}
}, {
  path: "child2.js",
  type: "browserify",
  options: {nobuffer:true,noprocess:true,editor:{minLines:7,maxLines:7}}
}], (error, script) => {
  if (error)
    throw error;
  Fs.writeFileSync("bundle.js", script, {encoding:"utf8"});
});