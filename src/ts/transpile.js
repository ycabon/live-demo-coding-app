define([
  "vs/editor/editor.main",
  "vs/language/typescript/lib/typescriptServices"
], function () {

  return function transpile(input, options) {
    var inputFileName = options.jsx ? "module.tsx" : "module.ts";
    var sourceFile = ts.createSourceFile(inputFileName, input, ts.ScriptTarget.ES5);
    var outputText;
    var program = ts.createProgram([inputFileName], options, {
      getSourceFile: function (fileName) { return fileName.indexOf("module") === 0 ? sourceFile : undefined; },
      writeFile: function (_name, text) { outputText = text; },
      getDefaultLibFileName: function () { return "lib.d.ts"; },
      useCaseSensitiveFileNames: function () { return false; },
      getCanonicalFileName: function (fileName) { return fileName; },
      getCurrentDirectory: function () { return ""; },
      getNewLine: function () { return "\r\n"; },
      fileExists: function (fileName) { return fileName === inputFileName; },
      readFile: function () { return ""; },
      directoryExists: function () { return true; },
      getDirectories: function () { return []; }
    });
    
    
    program.emit();

    if (outputText === undefined) {
      throw new Error("Output generation failed");
    }

    return outputText;
  };

  // var output = transpileModule(lhs.editor.getValue(), {
  //   module: ts.ModuleKind.AMD,
  //   target: ts.ScriptTarget.ES5,
  //   noLib: true,
  //   noResolve: true,
  //   suppressOutputPathCheck: true
  // });

  // if (typeof output === "string") {
  //   var rhsModel = rhs.editor.getModel();
  //   // Save view state
  //   var viewState = rhs.editor.saveViewState();
  //   // Update content
  //   rhsModel.setValue(output);
  //   // Remove flicker: force tokenization
  //   rhsModel.getLineTokens(rhsModel.getLineCount());
  //   // Restore view state
  //   rhs.editor.restoreViewState(viewState);
  //   // Remove flicker: force rendering
  //   rhs.editor.getOffsetForColumn(1, 1);
  // }

});
