const Fs = require("fs");
const editor = {minLines:7,maxLines:14};
require("../main.js")({
  path: "spawn.js",
  type: "browserify",
  options: {editor:editor}
}, [{
  path: "parent1.js",
  type: "raw",
  options: {editor:editor}
}, {
  path: "parent2.js",
  type: "browserify",
  options: {nobuffer:true,noprocess:true,editor:editor}
}], [{
  path: "child1.js",
  type: "raw",
  options: {editor:editor}
}, {
  path: "child2.js",
  type: "browserify",
  options: {nobuffer:true,noprocess:true,editor:editor}
}], (error, script) => {
  if (error)
    throw error;
  Fs.writeFileSync("bundle.js", script, {encoding:"utf8"});
});