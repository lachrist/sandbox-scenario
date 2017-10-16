
const Minimist = require("minimist");
const Main = require("./main.js");

const options = Minimist(process.argv.slice(2));
const soptions = {
  basedir: options.basedir || process.cwd(),
  editor: {
    minLines: 10,
    maxLines: 20
  }
};
Main({
  path: options["spawn-path"],
  type: options["spawn-type"],
  options: soptions
}, options["parent-path"].map((path, index) => ({
  path: path,
  type: options["parent-type"][Math.min(index, options["parent-type"].length-1)],
  options: soptions
})) ,options["child-path"].map((path, index) => ({
  path: path,
  type: options["child-type"][Math.min(index, options["child-type"].length-1)],
  options: soptions
})), (error, script) => {
  if (error)
    throw error;
  process.stdout.write(script);
});
