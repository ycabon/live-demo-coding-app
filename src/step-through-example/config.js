define([
  "esri/Map",

  "esri/views/MapView",
],
function(
  Map,
  MapView
) {
  var map, view;

  return {
    setup: function() {
      map = new Map({
        basemap: "topo"
      });

      view = new MapView({
        map: map,
        container: "viewDiv",
        center: [60, 40],
        zoom: 3
      });

      view.ui.empty("top-left");
    },
    steps: [

/////////////////////////////////////////////////////////////////////////////////
//
//
//
/////////////////////////////////////////////////////////////////////////////////

      {
        title: "Step 1",
        code: `          
view.goTo([-100, 40]);
        `,
        before: function() {},
        run: function() {
view.goTo([-100, 40]);
        },
        after: function() {}
      },
      
/////////////////////////////////////////////////////////////////////////////////
//
//
//
/////////////////////////////////////////////////////////////////////////////////

      {
        title: "Step 2",
        code: `
view.goTo([60, 40]);
        `,
        before: function() {},
        run: function() {
view.goTo([60, 40]);
        },
        after: function() {}
      }
    ]
  }
});

