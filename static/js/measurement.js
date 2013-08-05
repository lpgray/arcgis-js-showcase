dojo.require('esri.map');
dojo.require("esri.dijit.Measurement");

var map;

function init(){
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
