dojo.require("esri.map");

var map, baseLayer, geoServiceTask, geoServiceParams,
	baseLayerUrl = "http://192.168.0.202:6080/arcgis/rest/services/lanxy/JiangsuIndex/MapServer",
	geometryServiceUrl = "http://192.168.0.202:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
	
function init() {
	map = new esri.Map("map", {
		logo : false ,
		sliderStyle : 'large'
	});
	
	baseLayer = new esri.layers.ArcGISTiledMapServiceLayer(baseLayerUrl);
	
	map.addLayer(baseLayer);
	
	dojo.connect(map, "onLoad", function() {
	  initGeometryTool();
	  initGeoService();
	});
}

function initGeoService(){
	geoServiceParams = new esri.tasks.AreasAndLengthsParameters();
	geoServiceParams.lengthUnit = esri.tasks.GeometryService.UNIT_KILOMETER;
	geoServiceParams.areaUnit = esri.tasks.GeometryService.UNIT_SQUARE_KILOMETERS;
	
	geoService = new esri.tasks.GeometryService(geometryServiceUrl);
	
	dojo.connect(geoService, 'onAreasAndLengthsComplete', onMeasureEnd);
}

function initGeometryTool(){
  var tb = new esri.toolbars.Draw(map);
  dojo.connect( tb, 'onDrawEnd', drawEnd );
  tb.activate(esri.toolbars.Draw.POLYGON);
}

function drawEnd( geometry ){
	map.graphics.clear();
	var graphic = map.graphics.add(new esri.Graphic(geometry, new esri.symbol.SimpleFillSymbol()));
	
	geoService.simplify([geometry], function(simplifiedGeometries) {
        geoServiceParams.polygons = simplifiedGeometries;
        geoService.areasAndLengths(geoServiceParams);
    });
}

function onMeasureEnd( result ){
	//console.log('面积：' + result.areas[0] + '平方公里 <br /> 周长：' + result.length[0] + '公里');
	console.log(result);
	alert('面积：' + parseFloat(result.areas[0]).toFixed(2) + '平方公里\n周长：' + parseFloat(result.lengths[0]).toFixed(2) + '公里');
}

dojo.addOnLoad(init);