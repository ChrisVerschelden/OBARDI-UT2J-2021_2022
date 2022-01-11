function loadDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	  if (this.readyState == 4 && this.status == 200) {
		  console.log("hey");
		console.log( this.responseText + "ok");
	  }
	};
	xhttp.open("GET", "Access-Control-Allow-Origin: http://localhost:7200/rest/data/import/server/2", true);
	xhttp.send();
}


function hide(element){
	var id_node_origine = parseInt(element.id,10);

	network.getConnectedEdges(id_node_origine, "to").forEach( e => {
		var node = nodes.get(e);
		var id_node_child = parseInt(node.id, 10);
		if (network.getConnectedEdges(e, "from").length === 1){
			nodes.update({id: id_node_child, hidden: true})
		}
	})
}	

function reveal(element){
	var id_node_origine = parseInt(element.id,10);
	edges.forEach(e => {
		var id_edge = parseInt(e.id,10);
		var id_from = parseInt(e.from,10);
		var id_to = parseInt(e.to,10);

		if(id_from === id_node_origine && Number.isInteger(id_to)){
			nodes.update({id: id_to, hidden:false});
			edges.update({id: id_edge, hidden:false});
		}
	})
}
	
	
	
var color = "gray";
var len = undefined;

var nodes_permanent = new vis.DataSet([

]);
var edges_permanent = [

];

var nodes = new vis.DataSet([
	{id: 1, label: "Tour", title: "TourLab",value: 30,group: 1,level: 1, levelLabel: "généralité", hidden: false, expanded: false},
	{id: 2, label: "Consul", title: "ConsulLab",value: 30,group: 1,level: 1, levelLabel: "généralité", hidden: false, expanded: false},
	{id: 3, label: "Orléans", title: "OrléansLab",value: 30,group: 1,level: 1, levelLabel: "généralité", hidden: false, expanded: false},
	{id: 4, label: "Ambroise", title: "AmbroiseLab",value: 20,group: 2,level: 2, levelLabel: "elections", hidden: true, expanded: false},
	{id: 5, label: "Chinon", title: "ChinonLab",value: 20,group: 2,level: 2, levelLabel: "elections", hidden: true, expanded: false},
	{id: 6, label: "Loches", title: "LochesLab",value: 20,group: 2,level: 2, levelLabel: "elections", hidden: true, expanded: false},
	{id: 7, label: "subdélégué", title: "subdéléguéLab",value: 20,group: 2,level: 2, levelLabel: "elections", hidden: true, expanded: false},
	{id: 8, label: "A", title: "ALab",value: 10,group: 3,level: 3, levelLabel: "communes", hidden: true, expanded: false},
	{id: 9, label: "B", title: "BLab",value: 10,group: 3,level: 3, levelLabel: "communes", hidden: true, expanded: false},
	{id: 10, label: "C", title: "CLab",value: 10,group: 3,level: 3, levelLabel: "communes", hidden: true, expanded: false},
	{id: 11, label: "D", title: "DLab",value: 10,group: 3,level: 3, levelLabel: "communes", hidden: true, expanded: false},
]);
var edges = new vis.DataSet([
	{id: 1,label: "subFeature", from: 1 , to: 4 , arrows:"to", hidden: false},
	{id: 2,label: "subFeature", from: 1 , to: 5 , arrows:"to", hidden: false},
	{id: 3,label: "subFeature", from: 1 , to: 6 , arrows:"to", hidden: false},
	{id: 4,label: "attachedTo", from: 2 , to: 3 , arrows:"to", hidden: false},
	{id: 5,label: "isClaiming", from: 2 , to: 5 , arrows:"to", hidden: false},
	{id: 6,label: "isClaiming", from: 2 , to: 6 , arrows:"to", hidden: false},
	{id: 7,label: "subFeature", from: 4 , to: 8 , arrows:"to", hidden: true},
	{id: 8,label: "subFeature", from: 4 , to: 9 , arrows:"to", hidden: true},
	{id: 9,label: "subFeature", from: 5 , to: 10 , arrows:"to", hidden: true},
	{id: 10,label: "subFeature", from: 6 , to: 11 , arrows:"to", hidden: true},
	{id: 11,label: "attachedTo", from: 7 , to: 6 , arrows:"to", hidden: true},
	{id: 12,label: "isDeclaredUnder", from: 7 , to: 3 , arrows:"to", hidden: true},
	{id: 13,label: "test", from: 11 , to: 1 , arrows:"to", hidden: true},
	{id: 14,label: "test", from: 5 , to: 9 , arrows:"to", hidden: true},
]);


// create a network
var container = document.getElementById("mynetwork");
var data = {
	nodes: nodes,
	edges: edges,
};

var options = {
	nodes: {
		shape: "dot",
		size: 30,
		font: {
			size: 32,
			color: "#ffffff",
		},
		borderWidth: 2,
	},
	edges: {
		width: 2,
	},
	physics: false,
	layout: {
		hierarchical: {
			levelSeparation: 250,
			nodeSpacing: 200,
			treeSpacing: 200,
			direction: "UD",
			sortMethod: 'directed',
			blockShifting: false,
		},
	},
};
network = new vis.Network(container, data, options);

function reset(){
	nodes.forEach(e =>{
		var id_node = parseInt(e.id,10);
		if (e.level === 1) {
			nodes.update({id: id_node, hidden: false});
		} else {
			nodes.update({id: id_node, hidden: true});
		}
	})

	
}

network.on("click", function(params) {
	var clicked_node = nodes.get(params.nodes[0]);
	clicked_node_id = parseInt(clicked_node['id']);

	
	if(!clicked_node.expanded){
		reveal(clicked_node);
		nodes.update({id: clicked_node_id, expanded: true});
	}else{
		hide(clicked_node);
		nodes.update({id: clicked_node_id, expanded: false});
	}
	updateReferencePoint();
});

function getPosDom(e) {
	var pos = network.getPositions(e.id)[e.id];
	return corner = network.canvasToDOM({
		x: pos.x,
		y: pos.y
	});
}

var setLevels = new Set();
var referencePoints = new Set();
function updateReferencePoint(){
	setLevels = new Set();
	referencePoints = new Set();
	nodes.forEach( e => {
		if(!setLevels.has(e.level)){
			setLevels.add(e.level);
			referencePoints.add({id: e.id, level: e.level, label: e.levelLabel, nom: e.title, hidden: e.hidden})
		}
	});
}
updateReferencePoint();

function composeLegendElement(pos, e){
	var obj = document.createElement('div');
	obj.id = ""+e.id;
	obj.innerText = e.label;
	obj.style.cssText = 'position:absolute;top:'+ pos.y + 'px;margin-left:1200px;width:100px;height:50px;-moz-border-radius:10px;border:1px  solid #ddd;-moz-box-shadow: 0px 0px 8px  #fff';
	return obj;
}


var mousedownID = -1;  //Global ID of mouse down interval
function mousedown(event) {
  if(mousedownID==-1)  //Prevent multimple loops!
     mousedownID = setInterval(whilemousedown, 10 /*execute every 100ms*/);
}
function mouseup(event) {
   if(mousedownID!=-1) {  //Only stop if exists
     clearInterval(mousedownID);
     mousedownID=-1;
   }
}

function whilemousedown() {
    console.log("========================");
	referencePoints.forEach( e => {
		var pos = getPosDom(e);
		if(document.getElementById(e.id) != null){
			document.getElementById(e.id).remove();
		}
		
		if(!e.hidden){
			console.log(pos.x + " " + pos.y)
			var obj = composeLegendElement(pos, e)
			document.body.appendChild(obj);
		}	
	})
	
}

//Assign events
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);
//Also clear the interval when user leaves the window with mouse
document.addEventListener("mouseout", mouseup);

