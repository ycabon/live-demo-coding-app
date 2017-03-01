define([
  "require",
  
  "ts/editor",
  "ts/transpile",

  "text!./iframe.html"
],
function(require, createEditor, transpile, iframeContent) {

  function innerText(id) {
    return document.getElementById(id) && document.getElementById(id).innerText || "";
  }

  const tsSample = innerText("typescriptSample");
  const jsSample = innerText("javascriptSample");
  const tsExtraLib = innerText("typescriptExtraLib");
  const iframeHolder = document.getElementById("iframeHolder");

  const editor = createEditor("monacoEditor", tsSample || jsSample, {
    language: tsSample ? "typescript" : "javascript",
    extraLibs: [tsExtraLib]
  });

  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, triggerCompile);

  /**
   * @type {HTMLIFrameElement}
   */
  let iframe;
   
  function triggerCompile() {
    if (iframe) {
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    }

    let output = transpile(editor.getValue(), {
      module: ts.ModuleKind.AMD,
      target: ts.ScriptTarget.ES5,
      noLib: true,
      noResolve: true,
      suppressOutputPathCheck: true,
      noImplicitUseStrict: true
    });

    // don't look at me
    output = output.replace(`define(["require", "exports",`, `require(["require",`)
      .replace("exports, ", "");

    iframe = document.createElement("iframe");
    iframe.onload = () => {
      const script = iframe.contentWindow.document.createElement("script");
      iframe.contentWindow.document.body.appendChild(script);
      script.textContent = output;
    };
    iframe.src = require.toUrl("./iframe.html");
    iframeHolder.appendChild(iframe);

  }

  triggerCompile();
})