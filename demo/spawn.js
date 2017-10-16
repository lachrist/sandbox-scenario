const AutoStream = require("./auto-stream.js");
const Events = require("events");
function kill (signal) { this.emit("exit", null, signal) }
module.exports = (parent1, parent2) => {
  window.eval(parent1);
  return (path, script, argv) => {
    const child = new Events();
    child.kill = kill;
    child.stdin = AutoStream();
    child.stdout = AutoStream();
    child.stderr = AutoStream();
    const main = Function("process", parent2+";\n"+script);
    setTimeout(main, 0, {
      argv: ["node", path].concat(argv),
      stdin: child.stin,
      stdout: child.stdout,
      stderr: child.stderr
    });
    return child;
  };
};