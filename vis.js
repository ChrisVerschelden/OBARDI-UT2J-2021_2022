	var color = "gray";
	var len = undefined;

	var nodes = new  vis.DataSet([
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
	]);
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