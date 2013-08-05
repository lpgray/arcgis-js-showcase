dojo.require("esri.map");
dojo.require("esri.tasks.query");

var map, identifyTask, identifyParams, symbol;
function init() {
	map = new esri.Map("map", {
		logo : false ,
		sliderStyle : 'large'
	});
	
	var JSINDEX = "http://192.168.0.202:6080/arcgis/rest/services/JCDL/XZFW/MapServer";
	var JSMap = new esri.layers.ArcGISTiledMapServiceLayer(JSINDEX);
	map.addLayer(JSMap);
	
	dojo.connect(map, "onLoad", function() {
	  taskDefinition();
	  infoWindowDefinition();
	  symbolDefinition();
	  dojo.connect(map, "onClick", doIdentify);
	});
}

function infoWindowDefinition(){
	map.infoWindow.resize(450, 200);
	map.infoWindow.setTitle('信息');
}

function symbolDefinition(){
	symbol = new esri.symbol.SimpleMarkerSymbol();
    symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
    symbol.setSize(10);
    symbol.setColor(new dojo.Color([255,255,0,0.5]));
}

function taskDefinition(){
	// parameters definition
	identifyParams = new esri.tasks.IdentifyParameters();
	
	identifyParams.tolerance = 3;
    identifyParams.returnGeometry = true;
    identifyParams.layerIds = [13, 12, 11, 10]; // query 省级 and 市级
    identifyParams.width  = map.width;
    identifyParams.height = map.height;
    
    identifyTask = new esri.tasks.IdentifyTask("http://192.168.0.202:6080/arcgis/rest/services/JCDL/XZFW/MapServer");
}

function doIdentify( e ){
	identifyParams.geometry = e.mapPoint;
	identifyParams.mapExtent = map.extent;
	identifyTask.execute(identifyParams, function(results){
		showResult(e, results );
	}, function(err){
		console.error(err);
	});
}

function showResult( e, results ){
	map.graphics.clear();
	var feature = results[0].feature;
	feature.setSymbol(symbol);
	map.graphics.add(feature);
	map.infoWindow.setContent(formatContent( feature.attributes ));
	map.infoWindow.show(e.screenPoint, map.getInfoWindowAnchor(e.screenPoint));
}

function formatContent( attributes ){
	var back = '';
	for( name in attributes ){
		back += '<strong>' + name + ': </strong>' + attributes[name] + '<br />';
	}
	return back;
}

dojo.addOnLoad(init);