
var SandboxEditor = require("sandbox-editor");
var SandboxSpawner = require("sandbox-spawner");
var ToggleWidget = require("toggle-widget");

const make = (maker, container, sandbox) => {
  container.style.padding = "10px";
  sandbox.editor = sandbox.editor || {};
  sandbox.editor.minLines = sandbox.editor.minLines || sandbox.content.split("\n").length;
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  div1.style.fontFamily = "monospace";
  div1.style.fontSize = "20px";
  div1.style.marginBottom = "10px";
  container.appendChild(div1);
  container.appendChild(div2);
  div1.textContent = sandbox.path+(sandbox.type === "browserify" ? " [commonjs]" : "");
  return maker(div2, sandbox);
};

window.addEventListener("load", () => {
  const div1 = document.createElement("div1");
  const div2 = document.createElement("div2");
  div1.style.border = "1px solid black";
  div1.style.borderRadius = "25px";
  div1.style.marginRight = "5px";
  div1.style.marginBottom = "5px";
  div1.style.flexGrow = 1;
  div2.style.flexGrow = 1;
  ((() => {
    const div = document.createElement("div3");
    div.style.flexDirection = "row";
    div.style.display = "flex";
    div.appendChild(div1);
    div.appendChild(div2);
    document.body.appendChild(div);
  }) ());
  const span = document.createElement("span");
  span.style.verticalAlign = "bottom";
  span.style.display = "inline-block";
  span.style.verticalAlign = "middle";
  span.style.marginLeft = "20px";
  const editor = ((() => {
    const div = document.createElement("div");
    div1.appendChild(div);
    const editor = make(SandboxEditor, div, SPAWN_SANDBOX);
    div.firstChild.appendChild(span);
    div.firstChild.style.verticalAlign = "middle";
    return editor;
  }) ());
  const toggle = ToggleWidget(span, {colors: ["green", "red", "white"]});
  const editors = PARENT_SANDBOXES.map((sandbox) => {
    const div = document.createElement("div");
    div.style.borderTop = "1px solid black";
    div1.appendChild(div);
    return make(SandboxEditor, div, sandbox);
  });
  const spawners = CHILD_SANDBOXES.map((sandbox) => {
    const div = document.createElement("div");
    div.style.border = "1px solid black";
    div.style.marginBottom = "5px";
    div.style.borderRadius = "25px";
    div2.appendChild(div);
    return make(SandboxSpawner, div, sandbox);
  });
  span.addEventListener("toggle", (event) => {
    if (event.toggled) {
      try {
        var spawn = global.eval(editor.getScript()).apply(null, editors.map((editor) => editor.getScript()));
      } catch (error) {
        toggle();
        alert("Error while evaluating spawn: "+error.message);
        throw error;
      }
    } else {
      var spawn = null;
    }
    editor.setReadOnly(event.toggled);
    editors.forEach((editor) => { editor.setReadOnly(event.toggled) });
    spawners.forEach((spawner) => { spawner(spawn) });
  });
});
