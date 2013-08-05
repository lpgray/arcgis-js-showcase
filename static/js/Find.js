dojo.require("esri.map");
dojo.require("esri.tasks.query");

var map, findTask, findParams, symbol, infoTemplate;
function init() {
	map = new esri.Map("map", {
		logo : false ,
		sliderStyle : 'large'
	});
	// var nanjing= "http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaCities_Community_BaseMap_CHN/NanJing_Community_BaseMap_CHN/MapServer";
	// var nanjingMap = new esri.layers.ArcGISTiledMapServiceLayer(nanjing);
	
	var cnxzbj = "http://192.168.0.202:6080/arcgis/rest/services/JCDL/XZFW/MapServer";
	var cnxzbjMap = new esri.layers.ArcGISTiledMapServiceLayer(cnxzbj);
	
	// map.addLayer(nanjingMap);
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
	findTask = new esri.tasks.FindTask("http://192.168.0.202:6080/arcgis/rest/services/JCDL/XZFW/MapServer");
	findParams = new esri.tasks.FindParameters();
	findParams.returnGeometry = true;
	findParams.layerIds = [9,10];
}

function infoTemplateDefinition(){
	infoTemplate = new esri.InfoTemplate("${SHIJXZQMC}", "名称 : ${SHIJXZQMC} <br /> 行政代码：${SHIJXZQDM}");
}

function querys(){
	findParams.searchText = dojo.byId('words').value;
	findTask.execute(findParams, function(msg){
		showResults(msg);
	}, function(err){
		console.error(msg);
	});
}


function showResults(myFeatureSet) {
	console.debug(myFeatureSet);
	
	map.graphics.clear();
	
	for (var i=0, il=myFeatureSet.length; i<il; i++) {
      //Get the current feature from the featureSet.
      //Feature is a graphic
      var graphic = myFeatureSet[i].feature;
      graphic.setSymbol(symbol);
      //Set the infoTemplate.
      graphic.setInfoTemplate(infoTemplate);
      //Add graphic to the map graphics layer.
      map.graphics.add(graphic);
      console.debug(graphic);
    }
    
    console.debug( map.graphics );
}

dojo.addOnLoad(init);