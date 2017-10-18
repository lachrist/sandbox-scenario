
const Minimist = require("minimist");
const Main = require("./main.js");

const options1 = Minimist(process.argv.slice(2));
const options2 = {
  basedir: options1.basedir || process.cwd(),
  editor: {minLines:options1["min-lines"]||7, maxLines:options1["max-lines"]||14}
};

Main({
  path: options1["spawn-path"],
  type: options1["spawn-type"],
  options: options2
}, options1["parent-path"].map((path, index) => ({
  path: path,
  type: options1["parent-type"][Math.min(index, options1["parent-type"].length-1)],
  options: options2
})) ,options1["child-path"].map((path, index) => ({
  path: path,
  type: options1["child-type"][Math.min(index, options1["child-type"].length-1)],
  options: options2
})), (error, script) => {
  if (error)
    throw error;
  process.stdout.write(script);
});
