dojo.require("esri.map");

var map, dynamicMapServiceLayer, layerId;
function init() {
	map = new esri.Map("map");
    
    layerId = "http://192.168.0.202:6080/arcgis/rest/services/ganyu/TDLYXZ_H_320721_2012/MapServer";
    dynamicMapServiceLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerId);
    
    map.addLayer(dynamicMapServiceLayer);
}
dojo.ready(init);