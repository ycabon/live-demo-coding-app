define([,
  "text!@types/arcgis-js-api/index.d.ts",

  "vs/editor/editor.main",
  "vs/language/typescript/lib/typescriptServices"
], function(test, esriTypings) {

  monaco.languages.typescript.typescriptDefaults.addExtraLib(esriTypings, "esri.d.ts");

  return function(div, sample, extraLibs) {
    if (extraLibs) {
      extraLibs.forEach((extraLib, i) => {
        monaco.languages.typescript.typescriptDefaults.addExtraLib(extraLib, `extraLib${i}.d.ts`);
      });
    }

    return monaco.editor.create(document.getElementById(div) || div, {
      value: sample,
      language: "typescript"
    });
  }

});
