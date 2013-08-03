dojo.require("esri.map");
dojo.require("esri.tasks.query");

var map, queryTask, query, symbol, infoTemplate;
function init() {
	map = new esri.Map("map", {
		logo : false ,
		sliderStyle : 'large'
	});
	var nanjing= "http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaCities_Community_BaseMap_CHN/NanJing_Community_BaseMap_CHN/MapServer";
	var nanjingMap = new esri.layers.ArcGISTiledMapServiceLayer(nanjing);
	
	var cnxzbj = "http://www.arcgisonline.cn/ArcGIS/rest/services/Thematic_Drawings/MapServer";
	var cnxzbjMap = new esri.layers.ArcGISDynamicMapServiceLayer(cnxzbj);
	
	map.addLayer(nanjingMap);
	map.addLayer(cnxzbjMap);
	
	dojo.connect(map, "onLoad", function() {
	  taskDefinition();
	  symbolDefinition();
	  infoTemplateDefinition();
	});
}

function symbolDefinition(){
	symbol = new esri.symbol.SimpleMarkerSymbol();
    symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
    symbol.setSize(10);
    symbol.setColor(new dojo.Color([255,255,0,0.5]));
}

function taskDefinition(){
	queryTask = new esri.tasks.QueryTask("http://www.arcgisonline.cn/ArcGIS/rest/services/Thematic_Drawings/MapServer/5");
	query = new esri.tasks.Query();
	query.returnGeometry = true;
}

function infoTemplateDefinition(){
	infoTemplate = new esri.InfoTemplate("${Name_CHN}", "Name : ${Name_CHN}");
}

function querys(){
	query.text = dojo.byId('words').value;
	queryTask.execute(query, function(msg){
		showResults(msg);
	}, function(err){
		console.error(msg);
	});
}


function showResults(myFeatureSet) {
	console.debug(myFeatureSet);
	
	map.graphics.clear();
	
	var resultFeatures = myFeatureSet.features;
	
	for (var i=0, il=resultFeatures.length; i<il; i++) {
      //Get the current feature from the featureSet.
      //Feature is a graphic
      var graphic = resultFeatures[i];
      graphic.setSymbol(symbol);
      //Set the infoTemplate.
      graphic.setInfoTemplate(infoTemplate);
      //Add graphic to the map graphics layer.
      map.graphics.add(graphic);
    }
}

dojo.addOnLoad(init);