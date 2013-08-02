dojo.require("esri.map");

var map;
function init() {
	map = new esri.Map("map", {
		zoom : 5,
		slider:false, 
		nav:false,
		center : [112.2, 32.8]
	});
	var basemapUrl= "http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaOnlineStreetWarm/MapServer"
	var basemap = new esri.layers.ArcGISTiledMapServiceLayer(basemapUrl);
	map.addLayer(basemap);
	
	function myOnClickHandler(  ){
		console.log(arguments);
	}
	
	var myOnClick_connect = dojo.connect(map, "onClick", myOnClickHandler);
}
dojo.addOnLoad(init);