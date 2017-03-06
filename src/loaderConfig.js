const href = location.href;
var app =  href.substring(href.lastIndexOf('/'), href.indexOf(".html"));
var path = href.substring(0, href.lastIndexOf('/') + 1);
var api = "https://js.arcgis.com/4.3/";

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
  aliases: [
    [/^webgl-engine/, function(){return "esri/views/3d/webgl-engine";}],
    [/^engine/, function(){return "esri/views/3d/webgl-engine";}]
  ],
  baseUrl: `${api}dojo`
}

window.dojoConfig = loaderConfig;
