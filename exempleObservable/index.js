var t = new NetChart({
    container: document.getElementById("demo"),
    area: { height: null },
    data: { url: "http://myjson.dit.upm.es/api/bins/grc1" },
    navigation: { initialNodes: ["m-1"], mode: "focusnodes" },
    style: {
        nodeStyleFunction: nodeStyle,
        linkStyleFunction: linkStyle
    }
});

function nodeStyle(node) {
    node.label = node.data.name;
}

function linkStyle(link) {
    link.fromDecoration = "circle";
    link.toDecoration = "arrow";
}


nodes.update({
    id: parseInt(nodes.get(params.nodes[0]['id']),10), 
    hidden:true
});


var data = {
    nodes: nodes,
    edges: edges,
};

network = new vis.Network(container, data, options);