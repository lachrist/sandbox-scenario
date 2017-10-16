
const Path = require("path");
const Browserify = require("browserify");
const Sandbox = require("sandbox-editor/sandbox");

const box = (context, callback) => {
  if (!Sandbox[context.type])
    return callback(new Error("Unkown type: "+context.type));
  Sandbox[context.type](context.path, context.options, callback)
};

const boxall = (contexts, callback) => {
  if (!contexts.length)
    return callback(null, []);
  let counter = contexts.length;
  const sandboxes = Array(counter);
  contexts.forEach((context, index) => {
    box(context, (error, sandbox) => {
      if (error) {
        callback(error);
        callback = (() => {});
      } else {
        sandboxes[index] = sandbox;
        if (!--counter) {
          callback(null, sandboxes);
        }
      };
    });
  });
};

module.exports = (spawn, parents, children, callback) => {
  box(spawn, (error, sandbox) => {
    if (error)
      return callback(error);
    boxall(parents, (error, sandboxes1) => {
      if (error)
        return callback(error);
      boxall(children, (error, sandboxes2) => {
        if (error)
          return callback(error);
        Browserify(Path.join(__dirname, "browser.js")).bundle((error, buffer) => {
          if (error)
            return callback(error);
          callback(null, [
            "((() => {",
            "  const SPAWN_SANDBOX = "+JSON.stringify(sandbox, null, 2)+";",
            "  const PARENT_SANDBOXES = "+JSON.stringify(sandboxes1, null, 2)+";",
            "  const CHILD_SANDBOXES = "+JSON.stringify(sandboxes2, null, 2)+";",
            "  "+buffer.toString("utf8"),
            "}) ());"
          ].join("\n"));
        });
      });
    });
  });
};
