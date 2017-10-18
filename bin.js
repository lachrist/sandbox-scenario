
const Minimist = require("minimist");
const Main = require("./main.js");

const toarray = (x) => Array.isArray(x) ? x : [x]
const options = Minimist(process.argv.slice(2));
const basedir = options.basedir || process.cwd();

Main({
  path: options["spawn-path"],
  type: options["spawn-type"],
  options: {basedir:basedir}
}, toarray(options["parent-path"]).map((path, index) => ({
  path: path,
  type: toarray(options["parent-type"])[index],
  options: {basedir:basedir}
})), toarray(options["child-path"]).map((path, index) => ({
  path: path,
  type: toarray(options["child-type"])[index],
  options: {basedir:basedir}
})), (error, script) => {
  if (error)
    throw error;
  process.stdout.write(script);
});
