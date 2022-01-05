	var color = "gray";
	var len = undefined;

	var nodes = new  vis.DataSet([
      { id: 0, label: "Europe", group: 0 },

      { id: 1, label: "Suede", group: 0 },
      { id: 2, label: "Irlande", group: 0 },
      { id: 3, label: "Allemagne", group: 2 },
      { id: 4, label: "France", group: 1 },

      { id: 5, label: "Ile-de-france", group: 1 },

      { id: 6, label: "Nouvelle-Aquitaine", group: 1 },

      { id: 7, label: "Occitanie", group: 3 },
      { id: 8, label: "Aude", group: 3 },
      { id: 9, label: "Herault", group: 3 },

      { id: 10, label: "Haute-Garonne", group: 5 },
      { id: 11, label: "Toulouse", group: 5 },
      { id: 12, label: "Revel", group: 5 },

      { id: 13, label: "Abbaye poupidou", group: 9 },
      { id: 14, label: "Abbaye soumpidou", group: 9 },

      { id: 15, label: "Bretagne", group: 6 },
      { id: 16, label: "Morbihan", group: 6 },
      { id: 17, label: "Finistere", group: 6 },

      { id: 18, label: "Hesse", group: 2 },
      { id: 19, label: "Baviere", group: 8 },
      { id: 20, label: "Augsburg", group: 8 },
      { id: 21, label: "Munchen", group: 8 },
    ]);
    var edges = [
      { from: 0, to: 1},
      { from: 0, to: 2},
      { from: 0, to: 3 },
      { from: 0, to: 4 },
      { from: 4, to: 5 },
      { from: 4, to: 6},
      { from: 4, to: 7 },
      { from: 7, to:8},
      { from: 7, to:9},
      { from: 4, to: 10 },
      { from: 10, to:11 },
      { from: 10, to:12 },
      { from: 11, to:13 },
      { from: 11, to:14 },
      { from: 4, to: 15 },
      { from:15, to: 16 },
      { from:15, to: 17 },
      { from: 3, to: 18 },
      { from: 3, to: 19 },
      { from: 19, to: 20 },
      { from: 19, to: 21 },
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
		id = params.nodes[0];
		if(network.isCluster(id))
		{
			obj.declust(id);
		}
		else
		{
			obj.foo(id);
		}
	});
	
	const obj = {
	  foo(id) {
			var clickedNodes = nodes.get(id);
			arrayOfParents = network.getConnectedNodes(id, 'to');
			var options = {
				joinCondition:function(nodeOptions) {
				return nodeOptions.group === nodes.get(arrayOfParents[0]).group;
				},
				processProperties: function (clusterOptions, childNodes, childEdges) 
				{
					let nbNodes = childNodes.length;                           // Récupération du nombre de noeuds de notre cluster
					clusterOptions.label = clickedNodes.label;    			   // Mise à jour du label de notre cluster 
					return clusterOptions;                                     // On retourne les options de notre cluster
				},
				clusterNodeProperties: {
					allowSingleNodeCluster: true,
					cluster: true,
					id: 1000+id
				}
			}

			network.clustering.cluster(options);
		},
		
	  declust(id){
			network.openCluster(id)
	  }
	};