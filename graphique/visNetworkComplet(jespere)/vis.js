let id = 1;
let idedges = 0;
let levelperms = 0;
let groupperms = 1;
let nom = [];
let couleurcomp = 0;
let colorgroup = ["red", "green", "yellow", "blue", "pink", "orange", "white"];

var setLevels = new Set();
var referencePoints = new Set();

// create a network
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);
var data = {
	nodes: nodes,
	edges: edges,
};
var container = document.getElementById("mynetwork");
var options = {
	interaction: {
		navigationButtons: true,
		keyboard: true,
	},
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
		smooth: true,
	},
	physics: false,
	layout: {
		hierarchical: {
			levelSeparation: 150,
			nodeSpacing: 200,
			treeSpacing: 200,
			direction: "UD",
			sortMethod: 'directed',
			blockShifting: false,
		},
	},
};
network = new vis.Network(container, data, options);

network.on("click", function (params) {
	var clicked_node = nodes.get(params.nodes[0]);
	clicked_node_id = parseInt(clicked_node['id']);

	if (clicked_node.id != null) {
		if (!clicked_node.expanded) {
			nodes.update({ id: clicked_node_id, expanded: true });
			retrieveNom(clicked_node['label'], 0, 2, 0);
		} else {
			nodes.update({ id: clicked_node_id, expanded: false });
			hide(clicked_node);
		}
	}

	updateReferencePoint();
	updateLegend();
});

function hide(element) {
	var id_node_origine = parseInt(element.id, 10);
	var connectedEdges = network.getConnectedEdges(id_node_origine, "from");

	connectedEdges.forEach(e => {
		var edge = edges.get(e)
		var child_node_id = parseInt(edge.to, 10);

		var nomnode = nodes.get(child_node_id);
		var name = nomnode.label;
		for (let i = 0; i < nom.length; i++) {
			if (nom[i] == name) {
				delete nom[i];
			}
		}
		if (network.getConnectedEdges(child_node_id, "from").length === 1) {
			nodes.remove(child_node_id);
		}
		edges.remove(e);
	});
}

function getPosDom(e) {
	var pos = network.getPositions(e.id)[e.id];
	return corner = network.canvasToDOM({
		x: pos.x,
		y: pos.y
	});
}

function updateLegend() {
	var elements = document.getElementsByClassName('legende');
	document.getElementById('legende-complete').innerHTML = "";
	while (elements.length > 0) {
		elements[0].parentNode.removeChild(elements[0]);
	}

	referencePoints.forEach(e => {
		var pos = getPosDom(e);
		if (!e.hidden) {
			var objs = composeLegendElement(pos, e);
			document.getElementById('legende-mobile').appendChild(objs[0]);
			document.getElementById('legende-complete').appendChild(objs[1]);
		}
	})
}

function updateReferencePoint() {
	setLevels = new Set();
	referencePoints = new Set();
	nodes.forEach(e => {
		if (!setLevels.has(e.level) && !e.hidden) {
			setLevels.add(e.level);
			referencePoints.add({ id: e.id, level: e.level, label: e.levelLabel, nom: e.title, hidden: e.hidden })
		}
	});
}

function composeLegendElement(pos, e) {
	var obj = document.createElement('div');
	obj.id = "" + e.id;
	var obj_glob = document.createElement('div');
	obj_glob.id = "" + e.id;

	for (const [key, value] of groupe.entries()) {
		if (value[1] === e.level) {
			obj.innerHTML = '<p style="color:' + value[0] + ';">' + key + '</p>';
			obj.style.cssText = 'position:absolute;z-index: 100;top:' + (pos.y - 20) + 'px;margin-left:0;width:9vw;height:50px;text-align: center;  font-size: 1.2em; -moz-border-radius:10px;background-color: #f0f8ff; border-radius: 12px;-moz-box-shadow: 0px 0px 8px  #fff';
			obj_glob.innerHTML = '<p style="color:' + value[0] + ';"> ' + key + '</p>';
			obj_glob.style.cssText = 'color=' + value[0] + ";"
		}
	}
	obj.classList.add('legende');
	return [obj, obj_glob];
}

var search = document.getElementById('searchBar');
search.addEventListener("keydown", function (e) {
	if (e.code === 'Enter')
    	centerOn();
});

function centerOn(){
	var searchTerm = document.getElementById('searchBar').value.toLowerCase();

	if (searchTerm !== ""){
		var results = nodes.get({
			filter: function (item) {
			  return (item.label.toLowerCase().includes(searchTerm));
			}
		  });

		var coef_map = {};
		nodes.forEach(e => {
			coef_map[e.id] = diceCoefficient(searchTerm, e.label);
		});

		console.log(coef_map);

		var coef_map_sorted = Object.keys(coef_map).map(function(key) {
			return [key, coef_map[key]];
		  });

		  coef_map_sorted.sort(function(first, second) {
			return second[1] - first[1];
		  });

		console.log(coef_map_sorted);
	
		console.log(nodes.get(parseInt(coef_map_sorted[0][0])));
		network.focus(parseInt(coef_map_sorted[0][0]), {scale: 2});
		network.setSelection({nodes: coef_map_sorted[0][0], edges:[]})
		results = null;
	}
}

var mousedownID = -1;  //Global ID of mouse down interval
function mousedown(event) {
	if (mousedownID == -1)  //Prevent multimple loops!
		mousedownID = setInterval(whilemousedown, 10 /*execute every 100ms*/);
}
function mouseup(event) {
	if (mousedownID != -1) {  //Only stop if exists
		clearInterval(mousedownID);
		mousedownID = -1;
	}
}

function whilemousedown() {
	updateLegend();
}

function hideShowMenu(id) {
	switch (id) {
		case 'legende-mobile':
			var button = document.getElementById('bouton-legende-mobile');
			

			if (document.getElementById('legende-mobile').classList.contains('hidden')) {
				document.getElementById('legende-mobile').classList.remove('hidden');
				document.getElementById('mynetwork').classList.remove('hidden');

				button.innerText = "◀";
			} else {
				document.getElementById('legende-mobile').classList.add('hidden');
				document.getElementById('mynetwork').classList.add('hidden');

				button.innerText = "▶";
			}

			break;

		case 'legende-fixe':
			var button = document.getElementById('bouton-legende-fixe');
			
			if (document.getElementById('legende-complete').classList.contains('hidden')) {
				document.getElementById('legende-complete').classList.remove('hidden');
				button.innerText = "▶";
			} else {
				document.getElementById('legende-complete').classList.add('hidden');
				
				button.innerText = "⏪";
			}

			break;
		case 'outils':
			var button = document.getElementById('bouton-legende-outils');
			

			if (document.getElementById('boiteOutils').classList.contains('hidden')) {
				document.getElementById('boiteOutils').classList.remove('hidden');
				button.innerText = "▲";
			} else {
				document.getElementById('boiteOutils').classList.add('hidden');
				button.innerText = "⏬";
			}

			break;
	}
}

window.addEventListener("wheel", function (e) {
	updateLegend();
});



//Assign events
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);
//Also clear the interval when user leaves the window with mouse
document.addEventListener("mouseout", mouseup);

//charge les données du premier niveau
retrieveDataSup();