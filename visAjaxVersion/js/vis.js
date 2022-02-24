function retrieveData() {
	//var query = "PREFIX pub: <http://ontology.ontotext.com/taxonomy/> PREFIX pub-old: <http://ontology.ontotext.com/publishing#> select distinct ?x ?Person  where { ?x a pub:Person . ?x pub:preferredLabel ?Person . ?doc pub-old:containsMention / pub-old:hasInstance ?x . } ";
	//var query = "select * where { ?s ?p ?o . } limit 100 ";
	//var query = "PREFIX foaf:  <http://xmlns.com/foaf/0.1/> SELECT ?name WHERE { ?person foaf:name ?name . }";
	var query = "PREFIX db: <http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#> PREFIX vin: <http://www.w3.org/TR/2003/PR-owl-guide-20031209/wine#> SELECT * WHERE {?subject ?predicate ?object, vin:Wine }";
	console.log(query)
	var url = 'http://localhost:7200/repositories/chameau?query=' + encodeURIComponent(query) + '&output=json';
	
	var result="";
	console.log(url)
	$.ajax({
	  url: url,
	  dataType: "json",
	  success: function (data) {
		$('#results').show();
		$('#raw_output').text(JSON.stringify(data, null, 3));
		console.log(data)
		var res=[];

		for (var i=0;i<=8;i++){
			res.push({id:i,label:data.results.bindings[i].subject.value.slice(53,data.results.bindings[i].subject.value.length-1),group:0})
			console.log(data.results.bindings[i].subject.value.slice(53,data.results.bindings[i].subject.value.length-1))
		}		

		console.log(res)

		var color = "gray";
	var len = undefined;

	var nodes = new  vis.DataSet(
		res
		/*[
	  { id: 0, label: "Europe", group: 0 },
	  { id: 1, label: "Suede", group: 0 },
	  { id: 2, label: "Irlande", group: 0 },
	  { id: 3, label: "Nouvelle-Aquitaine", group: 1 },
	  { id: 4, label: "France", group: 1 },
	  { id: 5, label: "Ile-de-france", group: 1 },
	  { id: 7, label: "Allemagne", group: 2 },
	  { id: 8, label: "Hesse", group: 2 },
	  { id: 9, label: "Aude", group: 3 },
	  { id: 10, label: "Occitanie", group: 3 },
	  { id: 11, label: "Herault", group: 3 },
	  { id: 15, label: "Haute-Garonne", group: 5 },
	  { id: 16, label: "Toulouse", group: 5 },
	  { id: 17, label: "Revel", group: 5 },
	  { id: 18, label: "Morbihan", group: 6 },
	  { id: 19, label: "Bretagne", group: 6 },
	  { id: 20, label: "Finistere", group: 6 },
	  { id: 24, label: "Augsburg", group: 8 },
	  { id: 25, label: "Baviere", group: 8 },
	  { id: 26, label: "Munchen", group: 8 },
	  { id: 27, label: "Abbaye poupidou", group: 9 },
	  { id: 28, label: "Abbaye soumpidou", group: 9 },
	]
	*/
	);
	var edges = [
	  { from: 1, to: 0 },
	  { from: 2, to: 0 },
	  { from: 4, to: 3 },
	  { from: 5, to: 4 },
	  { from: 4, to: 0 },
	  { from: 8, to: 7 },
	  { from: 7, to: 0 },
	  { from: 10, to: 9 },
	  { from: 11, to: 10 },
	  { from: 10, to: 4 },
	  { from: 16, to: 15 , label:"extend"},
	  { from: 17, to: 15 },
	  { from: 15, to: 10 },
	  { from: 19, to: 18 },
	  { from: 20, to: 19 },
	  { from: 19, to: 4 },
	  { from: 25, to: 24 },
	  { from: 26, to: 25 },
	  { from: 25, to: 7 },
	  { from: 16, to: 27 },
	  { from: 16, to: 28 },
	];

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
            direction: "UD",
			blockShifting: false,
          },
        },
	};
	network = new vis.Network(container, data, options);
	
	network.on("click", function (params) {
		obj.foo(params.nodes[0]);
	});
	
	const obj = {
	  foo(id) {
			var clickedNodes = nodes.get(id);
			arrayOfParents = network.getConnectedNodes(id, 'from');

			var options = {
				joinCondition:function(nodeOptions) {
				return nodeOptions.group === nodes.get(arrayOfParents[0]).group;
				},
				processProperties: function (clusterOptions, childNodes, childEdges) 
				{
					let nbNodes = childNodes.length;                           // Récupération du nombre de noeuds de notre cluster
					clusterOptions.label = clickedNodes.label;    					 	 // Mise à jour du label de notre cluster 
					return clusterOptions;                                     // On retourne les options de notre cluster
				}
			}

			network.clustering.cluster(options);
		}
	};

		
	  },
	  error: function(e) {console.log("l'exécution n'est pas correcte");}
	});

	
}


$(document).ready(()=>{
	const url=window.location.href;
	var resWindow=parseInt(url[url.length-1]);
	
	if (isNaN(resWindow)===true){
		console.log("pas d\' élément sélectionné")
	}
	else{
		var paramsPage={
			groupOrder: function (a, b) {
				return a.value - b.value;    
			},
			editable: false,
			stack: false,
			min: new Date(res.intervals[resWindow].begin, 1, 1),
			max: new Date(res.intervals[resWindow].end, 1, 1),
			dataAttributes: ['id']
							
		}
					
					
		slider.noUiSlider.updateOptions({ start: [res.intervals[resWindow].begin, res.intervals[resWindow].end]});
		document.getElementById("cardGestion"+(resWindow+1).toString()).hidden=false;
													 
	}
	
});
  



var res=retrieveData();



console.log(res)






	document.getElementById("reset").addEventListener("click",()=>{
		network=new vis.Network(container, data, options)

		network.on("click", function (params) {
			obj.foo(params.nodes[0]);
		});
	})

	