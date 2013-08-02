dojo.require("esri.map");
dojo.require("esri.dijit.Directions");
dojo.require("esri.layout");

var map, direction;
function init() {
	map = new esri.Map("map", {
		center : [-56.049, 38.485],
		zoom : 3,
		basemap : "streets"
	});
	
	directions = new esri.dijit.Directions({
	  map: map
	}, "dir");
	
	directions.startup();
}
dojo.ready(init); 