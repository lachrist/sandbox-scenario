
var SandboxEditor = require("sandbox-editor");
var SandboxSpawner = require("sandbox-spawner");
var ToggleWidget = require("toggle-widget");

const make = (maker, range, parentid) => (sandbox) => {
  sandbox.editor = sandbox.editor || {};
  sandbox.editor.minLines = sandbox.editor.minLines || range[0];
  sandbox.editor.maxLines = sandbox.editor.maxLines || range[1];
  const div1 = document.createElement("div");
  const h2 = document.createElement("h2");
  const div2 = document.createElement("div");
  div1.appendChild(h2);
  div1.appendChild(div2);
  h2.textContent = sandbox.path+(sandbox.type!=="raw"?" ["+sandbox.type+"]":"");
  document.getElementById(parentid).appendChild(div1);
  return maker(div2, sandbox);
};

const title = (name) => {
  let div = document.getElementById("hendak-"+name);
  if (!div) {
    div = document.createElement("div");
    div.id = "hendak-"+name.toLowerCase();
    document.body.appendChild(div);
  }
  const h1 = document.createElement("h1");
  h1.textContent = name;
  div.appendChild(h1);
}

window.addEventListener("load", () => {
  ["Spawn", "Children"].forEach(title);
  const editor = make(SandboxEditor, [0, Infinity], "hendak-spawn")(SPAWN_SANDBOX);
  const div = document.createElement("span");
  div.style.verticalAlign = "bottom";
  div.style.display = "inline-block";
  div.style.marginLeft = "20px";
  document.getElementById("hendak-spawn").firstChild.appendChild(div);
  const toggle = ToggleWidget(div, {colors: ["green", "red", "white"]});
  const editors = PARENT_SANDBOXES.map(make(SandboxEditor, [0, Infinity], "hendak-spawn"));
  const spawners = CHILD_SANDBOXES.map(make(SandboxSpawner, [7, Infinity], "hendak-children"));
  div.addEventListener("toggle", (event) => {
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
