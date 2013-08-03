dojo.require("esri.map");



var map;
function init() {
	map = new esri.Map("map", {
		minZoom : 11 ,
		logo : false ,
		sliderStyle : 'large'
	});
	var nanjing= "http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaCities_Community_BaseMap_CHN/NanJing_Community_BaseMap_CHN/MapServer"
	var nanjingMap = new esri.layers.ArcGISTiledMapServiceLayer(nanjing);
	
	var shanghai = "http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaCities_Community_BaseMap_CHN/ShangHai_Community_BaseMap_CHN/MapServer"
	var shanghaiMap = new esri.layers.ArcGISTiledMapServiceLayer(shanghai);
	map.addLayer(nanjingMap);
	map.addLayer(shanghaiMap);
	
	function myOnClickHandler(){
		console.log(arguments);
	}
	
	var myOnClick_connect = dojo.connect(map, "onClick", myOnClickHandler);
	
	dojo.connect(map, "onLoad", function() {
	  //map.disablePan();
	  console.log(map.isPan + ' ' + map.getZoom());
	  
	});
}
dojo.addOnLoad(init);