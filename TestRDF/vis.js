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

	edges.forEach( e => {
		var id = parseInt(e.id,10);
		var id_from = parseInt(e.from,10);
		var id_to = parseInt(e.to,10);
		var parent_node = nodes.get(id_from);
		var child_node = nodes.get(id_to);
		if(!parent_node.expanded && id_from === id_node_origine){
			var id_child_node = parseInt(child_node.id,10);
			var connectedEdges = network.getConnectedEdges(id_child_node, "from");
			console.log(connectedEdges)
			if(connectedEdges.length === 1){
				nodes.update({id: id_child_node, hidden: true});
			} else {
				var cpt_visible = 0;
				var cpt_parent = 0;
				connectedEdges.forEach( e => {
					var edge = edges.get(e);
					var edge_id = parseInt(edge.from,10);
					var parent = nodes.get(edge_id);
					if(parent.expanded){
						cpt_visible++;
					}
					if(parent.id === parent_node.id){
						cpt_parent++
					}
				})
				if (cpt_visible===1 || cpt_parent === 1){
					nodes.update({id: id_child_node, hidden: true});
				}
			}

			network.getConnectedEdges(id_child_node, "from")



			
			
		}
	})
}	

function reveal(element){
	var id_node_origine = parseInt(element.id,10);

	network.getConnectedNodes(element.id, "to").forEach( e => {
		var id = parseInt(e,10);
		nodes.update({id:id, hidden: false});
	})

	edges.forEach( e => {
		var id = parseInt(e.id,10);
		var id_from = parseInt(e.from,10);
		var id_to = parseInt(e.to,10);
		var from_visibility = nodes.get(id_from).hidden;
		var to_visibility = nodes.get(id_to).hidden;
		if(!from_visibility && !to_visibility){
			edges.update({id: id, hidden: false});
		}
	})

}
	
	
	
var color = "gray";
var len = undefined;

var nodes = new vis.DataSet([
	{id: 1, label: "Tour", title: "TourLab",value: 30,group: 1,level: 1, levelLabel: "généralité", hidden: false, expanded: false},
	{id: 3, label: "Orléans", title: "OrléansLab",value: 30,group: 1,level: 1, levelLabel: "généralité", hidden: false, expanded: false},
	{id: 4, label: "Ambroise", title: "AmbroiseLab",value: 20,group: 2,level: 2, levelLabel: "elections", hidden: true, expanded: false},
	{id: 5, label: "Chinon", title: "ChinonLab",value: 20,group: 2,level: 2, levelLabel: "elections", hidden: true, expanded: false},
	{id: 6, label: "Loches", title: "LochesLab",value: 20,group: 2,level: 2, levelLabel: "elections", hidden: true, expanded: false},
	{id: 8, label: "A", title: "ALab",value: 10,group: 3,level: 3, levelLabel: "communes", hidden: true, expanded: false},
	{id: 9, label: "B", title: "BLab",value: 10,group: 3,level: 3, levelLabel: "communes", hidden: true, expanded: false},
	{id: 10, label: "C", title: "CLab",value: 10,group: 3,level: 3, levelLabel: "communes", hidden: true, expanded: false},
	{id: 11, label: "D", title: "DLab",value: 10,group: 3,level: 3, levelLabel: "communes", hidden: true, expanded: false},
]);
var edges = new vis.DataSet([
	{id: 1,label: "subFeature", from: 1 , to: 4 , arrows:"to", hidden: true},
	{id: 2,label: "subFeature", from: 1 , to: 5 , arrows:"to", hidden: true},
	{id: 3,label: "subFeature", from: 1 , to: 6 , arrows:"to", hidden: true},
	{id: 7,label: "subFeature", from: 4 , to: 8 , arrows:"to", hidden: true},
	{id: 8,label: "subFeature", from: 4 , to: 9 , arrows:"to", hidden: true},
	{id: 9,label: "subFeature", from: 5 , to: 10 , arrows:"to", hidden: true},
	{id: 10,label: "subFeature", from: 6 , to: 11 , arrows:"to", hidden: true},
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
	physics: true,
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

	if(clicked_node.id != null){
		if(!clicked_node.expanded){
			nodes.update({id: clicked_node_id, expanded: true});
			reveal(clicked_node);
		}else{
			nodes.update({id: clicked_node_id, expanded: false});
			hide(clicked_node);
		}
	}
	
	updateReferencePoint();
	updateLegend();
});

function getPosDom(e) {
	var pos = network.getPositions(e.id)[e.id];
	return corner = network.canvasToDOM({
		x: pos.x,
		y: pos.y
	});
}

function updateLegend(){
	var elements = document.getElementsByClassName('legende');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }

	referencePoints.forEach( e => {
		var pos = getPosDom(e);
		if(!e.hidden){
			var obj = composeLegendElement(pos, e)
			document.body.appendChild(obj);
		}	
	})
}

var setLevels = new Set();
var referencePoints = new Set();
function updateReferencePoint(){
	setLevels = new Set();
	referencePoints = new Set();
	nodes.forEach( e => {
		if(!setLevels.has(e.level) && !e.hidden){
			setLevels.add(e.level);
			referencePoints.add({id: e.id, level: e.level, label: e.levelLabel, nom: e.title, hidden: e.hidden})
		}
	});
}
updateReferencePoint();
updateLegend();

function composeLegendElement(pos, e){
	var obj = document.createElement('div');
	obj.id = ""+e.id;
	obj.innerText = e.label;
	obj.style.cssText = 'position:absolute;z-index: 100;top:'+ pos.y + 'px;margin-left:10px;width:100px;height:50px;-moz-border-radius:10px;border:1px  solid #ddd;-moz-box-shadow: 0px 0px 8px  #fff';
	obj.classList.add('legende');
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
	updateLegend();
}

//Assign events
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);
//Also clear the interval when user leaves the window with mouse
document.addEventListener("mouseout", mouseup);

