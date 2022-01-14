let id = 1;
let idedges = 0;
let levelperms = 0;
let groupperms = 1;
let nom = [];
let couleurcomp = 0;
let colorgroup = ["red","green","yellow","blue","pink","orange", "white"];


function hide(element){
	var id_node_origine = parseInt(element.id,10);

	var connectedEdges = network.getConnectedEdges(id_node_origine, "from");

	connectedEdges.forEach( e => {
		var child_node = nodes.get(e);
		var child_node_id = parseInt(child_node.id, 10);
		if (network.getConnectedEdges(child_node_id, "from").length === 1) {
			nodes.remove(child_node_id);
		}
		edges.remove(e);
	});

	for(let i = 0; i<nom.length; i++){
		if(nom[i] == name){
			delete nom[i];
		}
	}
}	
	
var color = "gray";
var len = undefined;

var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([]);


// create a network
var container = document.getElementById("mynetwork");

var data = {
	nodes: nodes,
	edges: edges,
};

var options = {
	interaction: {
		navigationButtons: true,
		keyboard: true,},
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
        smooth : true,
	},
	physics: false,
	layout: {
		hierarchical: {
			levelSeparation: 450,
			nodeSpacing: 200,
			treeSpacing: 200,
			direction: "UD",
			sortMethod: 'directed',
			blockShifting: false,
		},
	},
};

network = new vis.Network(container, data, options);

network.on("click", function(params) {
	var clicked_node = nodes.get(params.nodes[0]);
	clicked_node_id = parseInt(clicked_node['id']);

	if(clicked_node.id != null){
		if(!clicked_node.expanded){
			nodes.update({id: clicked_node_id, expanded: true});
			retrieveNom(clicked_node['label'], 0, 2, 0);
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

window.addEventListener("wheel", function(e) {
	updateLegend();
});

//Assign events
document.addEventListener("mousedown", mousedown);
document.addEventListener("mouseup", mouseup);
//Also clear the interval when user leaves the window with mouse
document.addEventListener("mouseout", mouseup);

let myMap = new Map();
let myMapid = new Map();
let groupe = new  Map();

function load(data, group, level, recursif, idnem)
{
	console.log(data);
	let grouptemp = group;
	let leveltemp = levelperms;
	
	if(level != 0)
	{
		leveltemp = level;
	}
	
	for(let i = 0; i<data.length; i++)
	{
		if(group == 0)
		{
			grouptemp = groupperms;
			groupperms = groupperms + 1;
		}
		
		let trouve = false;
		//Regarde si le nom de la node est déjà présent, si c'est le cas il ajoute ses enfants
		for(let j = 0; j<nom.length; j++)
		{
			if(nom[j] == data[i].nom.value)
			{
				if(recursif && level != 1)
				{
					//Recupere le groupe de la node mère
					let groupnem = grouptemp;
					for (const key of myMap.keys()) {
					  if(key.value == data[i].nom.value)
					  {
						  groupnem = myMap.get(key);
					  }
					}
					
					//Recupere l'id de la node mère
					let idnem = id;
					for (const key of myMapid.keys()) {
					  if(key.value == data[i].nom.value)
					  {
						  idnem = myMapid.get(key);
					  }
					}

					//Recupere la node enfants
					retrieveNom(data[i].nomdeceluiquiestdessous.value, groupnem, (leveltemp + 1), idnem);
				}
				trouve = true;
			}
		}
		
		//Cas du nom de la nodes inexistant 
		if(!trouve)
		{
			//Attribution d'une couleur pour un groupe
			let trouvergroupe = false;
			let color;

			for (const key of groupe.keys())
			{
				if(data[i].nomgroupe.value == key)
				{
					trouvergroupe = true;
					color = groupe.get(key)[0];
				}
			}
			
			
			if(!trouvergroupe)
			{
				groupe.set(data[i].nomgroupe.value, [colorgroup[couleurcomp],leveltemp]);
				color = colorgroup[couleurcomp];
				couleurcomp = couleurcomp + 1;
			}
			
			//Ajout de la node
			if(leveltemp == 1)
			{
				nodes.add({id: id, label: data[i].nom.value, title: "TourLab",value: 30,group: grouptemp ,level: leveltemp, levelLabel: data[i].nomgroupe, hidden: false, expanded: false, color : color});
			}
			else
			{
				nodes.add({id: id, label: data[i].nom.value, title: "TourLab",value: 30,group: grouptemp ,level: leveltemp, levelLabel: data[i].nomgroupe, hidden: false, expanded: false, color : color});
			}
			nom.push(data[i].nom.value);
			myMap.set(data[i].nom, grouptemp);
			myMapid.set(data[i].nom, id);
			
			//Ajout des liaisons
			if(idnem != 0)
			{
				edges.add({id: idedges,label: "subFeature", from: idnem , to: id , arrows:"to", hidden: false});
				idedges = idedges + 1;
			}
			
			id = id + 1;
		}
	}

	updateReferencePoint();
	updateLegend();
}

function retrieveDataSup() {
  var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT ?nom WHERE { ?x a :Area . ?x rdfs:label ?nom . MINUS { ?x a :Area . ?x :hasUpperUnit ?z . } }";
  var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';

  $.ajax({
	url: url,
	dataType: "json",
	success: function (data) {
	  $('#results').show();
	  $('#raw_output').text(JSON.stringify(data, null, 3));
	  for(let i = 0; i<data.results.bindings.length; i++)
	  {
		  retrieveNom(data.results.bindings[i].nom.value, 0, 1, 0);
	  }
	  
	},
	error: function(e) {console.log("wesh ya pb la bro");}
  });
}

function retrieveNom(name, group, level, idnem)
{
	  var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT ?nom ?nomgroupe ?nomdeceluiquiestdessous  WHERE { ?x a :Area . ?x rdfs:label ?nom . ?x :isMemberOf ?groupe . ?groupe rdfs:label ?nomgroupe . ?x rdfs:label \""+name+"\" . ?x :hasSubUnit ?sousunite . ?sousunite rdfs:label ?nomdeceluiquiestdessous .}";

	  var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';

	  $.ajax({
		url: url,
		dataType: "json",
		success: function (data) {
		  $('#results').show();
		  $('#raw_output').text(JSON.stringify(data, null, 3));
		  if(data.results.bindings.length == 0)
		  {
			  retrieveNomSansEnfants(name, group, level, idnem);
		  }
		  else
		  {
			  data = dataremovedoublons(data.results.bindings);
			  load(data, group, level, true, idnem);
		  }
		},
		error: function(e) {console.log("wesh ya pb la bro");}
	  });
}

function retrieveNomSansEnfants(name, group, level, idnem)
{	  
	  var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT ?nom ?nomgroupe WHERE { ?x a :Area . ?x rdfs:label ?nom . ?x :isMemberOf ?groupe . ?groupe rdfs:label ?nomgroupe . ?x rdfs:label \""+ name +"\" . }";
	  var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';

	  $.ajax({
		url: url,
		dataType: "json",
		success: function (data) {
		  $('#results').show();
		  $('#raw_output').text(JSON.stringify(data, null, 3, false));
		  if(data.results.bindings.length == 0)
		  {
			  console.log("erreur");
		  }
		  else
		  {
			  load(data.results.bindings, group, level, false, idnem);
		  }
		},
		error: function(e) {console.log("wesh ya pb la bro");}
	  });
}

function dataremovedoublons(dataval)
{
	let val = [];
	for(let i = 0; i<dataval.length; i++)
	{
		if(!(dataval[i].nomdeceluiquiestdessous.value == dataval[i].nom.value))
		{
			val.push(dataval[i]);
		}
	}
	return val;
}

retrieveDataSup();

