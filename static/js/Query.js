dojo.require("esri.map");
dojo.require("esri.tasks.query");

var map, queryTask, query;
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
	});
}

function taskDefinition(){
	queryTask = new esri.tasks.QueryTask("http://www.arcgisonline.cn/ArcGIS/rest/services/Thematic_Drawings/MapServer/5");
	query = new esri.tasks.Query();
	query.returnGeometry = true;
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
	var s = "";
	for (var i = 0, il = myFeatureSet.features.length; i < il; i++) {
		var featureAttributes = myFeatureSet.features[i].attributes;
		for (att in featureAttributes) {
			s = s + "<strong>" + att + ": </strong>" + featureAttributes[att] + "<br />";
		}
	}
	dojo.byId("result").innerHTML = s;
}

dojo.addOnLoad(init);