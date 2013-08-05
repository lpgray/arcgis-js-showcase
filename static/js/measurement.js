dojo.require('esri.map');
dojo.require("esri.dijit.Measurement");

var map, symbol;

function init(){
	esri.config.defaults.io.proxyUrl = "/proxy";
    esri.config.defaults.io.alwaysUseProxy = false;
	esri.config.defaults.geometryService = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
	
	var tileMap = new esri.layers.ArcGISTiledMapServiceLayer("http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaCities_Community_BaseMap_CHN/NanJing_Community_BaseMap_CHN/MapServer");
	
	map = new esri.Map("map", {
		logo : false ,
		zoom : 11,
		sliderStyle : 'large'
	});
	
	map.addLayer(tileMap);
	
	dojo.connect(map, 'onLoad', function(){
		var measurement = new esri.dijit.Measurement({
          map: map
        }, dojo.byId('measurement'));
        measurement.startup();
	});
}

dojo.addOnLoad(init);
