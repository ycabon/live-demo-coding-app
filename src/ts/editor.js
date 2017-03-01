define([,
  "text!@types/arcgis-js-api/index.d.ts",

  "vs/editor/editor.main",
  "vs/language/typescript/lib/typescriptServices"
], function(test, esriTypings) {

  monaco.languages.typescript.typescriptDefaults.addExtraLib(esriTypings, "esri.d.ts");

  return function(div, sample, options) {
    const opts = Object.assign({
      extraLibs: [],
      value: sample,
      language: "typescript"
    }, options);

    opts.extraLibs.forEach((extraLib, i) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(extraLib, `extraLib${i}.d.ts`);
      monaco.languages.typescript.javascriptDefaults.addExtraLib(extraLib, `extraLib${i}.d.ts`);
    });

    delete opts.extraLibs;

    return monaco.editor.create(document.getElementById(div) || div, opts);
  }

});
