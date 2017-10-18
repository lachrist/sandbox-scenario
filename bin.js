
const Minimist = require("minimist");
const Main = require("./main.js");

const toarray = (x) => Array.isArray(x) ? x : [x]
const options1 = Minimist(process.argv.slice(2));
const options2 = {
  basedir: options1.basedir || process.cwd(),
  editor: {minLines:options1["min-lines"]||7, maxLines:options1["max-lines"]||14}
};

Main({
  path: options1["spawn-path"],
  type: options1["spawn-type"],
  options: options2
}, toarray(options1["parent-path"]).map((path, index) => ({
  path: path,
  type: toarray(options1["parent-type"])[index],
  options: options2
})), toarray(options1["child-path"]).map((path, index) => ({
  path: path,
  type: toarray(options1["child-type"])[index],
  options: options2
})), (error, script) => {
  if (error)
    throw error;
  process.stdout.write(script);
});
