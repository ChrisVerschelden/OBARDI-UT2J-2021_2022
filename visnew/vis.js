	var color = "gray";
	var len = undefined;

	var nodes = new vis.DataSet([
		{id: 1, label: "Tour",title: "TourLab",value: 30,group: 1,level: 1, hidden: false},
	    {id: 2,label: "Consul",title: "ConsulLab",value: 30,group: 1,level: 1, hidden: false},
	    {id: 3,label: "Orléans",title: "OrléansLab",value: 30,group: 1,level: 1, hidden: false},
	    {id: 4,label: "Ambroise",title: "AmbroiseLab",value: 20,group: 2,level: 2, hidden: false},
	    {id: 5,label: "Chinon",title: "ChinonLab",value: 20,group: 2,level: 2, hidden: false},
	    {id: 6,label: "Loches",title: "LochesLab",value: 20,group: 2,level: 2, hidden: false},
	    {id: 7,label: "subdélégué",title: "subdéléguéLab",value: 20,group: 2,level: 2, hidden: false},
	    {id: 8,label: "A",title: "ALab",value: 10,group: 3,level: 3, hidden: false},
		{id: 9,label: "B",title: "BLab",value: 10,group: 3,level: 3, hidden: false},
	    {id: 10,label: "C",title: "CLab",value: 10,group: 3,level: 3, hidden: false},
	    {id: 11,label: "D",title: "DLab",value: 10,group: 3,level: 3, hidden: false},
	]);
	var edges = [
		{label: "subFeature", from: 1 , to: 4 , arrows:"to"},
		{label: "subFeature", from: 1 , to: 5 , arrows:"to"},
		{label: "subFeature", from: 1 , to: 6 , arrows:"to"},
		{label: "attachedTo", from: 2 , to: 3 , arrows:"to"},
		{label: "isClaiming", from: 2 , to: 5 , arrows:"to"},
		{label: "isClaiming", from: 2 , to: 6 , arrows:"to"},
		{label: "subFeature", from: 4 , to: 8 , arrows:"to"},
		{label: "subFeature", from: 4 , to: 9 , arrows:"to"},
		{label: "subFeature", from: 5 , to: 10 , arrows:"to"},
		{label: "subFeature", from: 6 , to: 11 , arrows:"to"},
		{label: "attachedTo", from: 7 , to: 6 , arrows:"to"},
		{label: "isDeclaredUnder", from: 7 , to: 3 , arrows:"to"},
		{label: "test", from: 11 , to: 1 , arrows:"to"},
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

	function hide(element){
		var id_origine = parseInt(element['id']);
		var cpt = 0;

		edges.forEach(e => {
			var id_e = parseInt(e['to']);
			var nb_link_to = 0;
			edges.forEach(cpt => {
				var id_cpt = parseInt(cpt['from']);
				if (id_cpt === id_e){
					nb_link_to++;
				}
			})
			if (nb_link_to > 1){
				var id_from = parseInt(e['from'])
				if(e['from'] === id_origine){
					nodes.update({id: id_e, hidden:true});
				}
				hide(e);
			}
			
		});
	}

	network.on("click", function(params) {
		var clicked_node = nodes.get(params.nodes[0]);
		clicked_node_id = parseInt(clicked_node['id']);

		console.log(clicked_node_id)
		
		hide(clicked_node)



		var data = {
			nodes: nodes,
			edges: edges,
		};

		network = new vis.Network(container, data, options);
	});

	const obj = {
	    foo(id) {
	        var clickedNodes = nodes.get(id);
	        arrayOfParents = network.getConnectedNodes(id, 'from');

	        var options = {
	            joinCondition: function(nodeOptions) {
	                return nodeOptions.group === nodes.get(arrayOfParents[0]).group;
	            },
	            processProperties: function(clusterOptions, childNodes, childEdges) {
	                let nbNodes = childNodes.length; // Récupération du nombre de noeuds de notre cluster
	                clusterOptions.label = clickedNodes.label; // Mise à jour du label de notre cluster 
	                return clusterOptions; // On retourne les options de notre cluster
	            }
	        }

	        network.clustering.cluster(options);
	    }
	};