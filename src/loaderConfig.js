const href = location.href;
var app =  href.substring(href.lastIndexOf('/'), href.indexOf(".html"));
var path = href.substring(0, href.lastIndexOf('/') + 1);
var api = "https://js.arcgis.com/4.9/";

var loaderConfig = {
  paths: {
    text: `${path}node_modules/text/text`,
    vs: `${path}node_modules/monaco-editor/min/vs`,
    "@types": `${path}node_modules/@types`,
    compileAndExecute: `${path}src/compileAndExecute`,
    stepsApplication: `${path}src/stepsApplication`,
    ts: `${path}src/ts`,
    app: `${path}apps/${app}`,
    esri: `${api}esri`,
    dojo: `${api}dojo`,
    dojox: `${api}dojox`,
    dijit: `${api}dijit`,
    moment: `${api}moment`
  },
  packages: [
    {
      name: "@dojo",
      location: `${path}node_modules/@dojo`
    },
    {
      name: "cldrjs",
      location: `${path}node_modules/cldrjs`,
      main: "dist/cldr"
    },
    {
      name: "globalize",
      location: `${path}node_modules/globalize`,
      main: "dist/globalize"
    },
    {
      name: "maquette",
      location: `${path}node_modules/maquette`,
      main: "dist/maquette.umd"
    },
    {
      name: "maquette-css-transitions",
      location: `${path}node_modules/maquette-css-transitions`,
      main: "dist/maquette-css-transitions.umd"
    },
    {
      name: "maquette-jsx",
      location: `${path}node_modules/maquette-jsx`,
      main: "dist/maquette-jsx.umd"
    },
    {
      name: "tslib",
      location: `${path}node_modules/tslib`,
      main: "tslib"
    }
  ],
  baseUrl: `${api}dojo`
}

window.dojoConfig = loaderConfig;
