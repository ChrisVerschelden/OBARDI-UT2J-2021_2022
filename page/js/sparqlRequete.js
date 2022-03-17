let myMap = new Map();
let myMapid = new Map();
let groupeColor = new Map();

uriavantclear = urlParams.get('uri')

firstname = urlParams.get('firstname')
const radio_button = urlParams.get('radio_button')
const groupeget = urlParams.get('groupe')

if(radio_button=="Niveau"){
	retrieveGroupe(groupeget, 1);
}else if(firstname != null && groupeget != null){
	firstname = firstname.split(' ').join('');
	retrieveNom(firstname, groupeget);
}else{
	uriavantclear = window.location.href;
	uriavantclear = uriavantclear.split('=')[1];
	uriavantclear = uriavantclear.replace('%3A%2F%2F', '://');
	while(uriavantclear.includes("%2F")){
		uriavantclear = uriavantclear.replace('%2F', '/');
	}
	while(uriavantclear.includes("%23")){
		uriavantclear = uriavantclear.replace('%23','#');
	}

	retrieveURI(uriavantclear);
}

function load(data, nomgroupe, idsup = 0, level = 0){
	console.log("oui"+data);
	for(i = 0; i<data.length; i++){
		if(data[i].nom != null){
			nodes.add({id: id, label: data[i].nom.value, title: data[i].nom.value,value: 30,group: 0 ,level: level, levelLabel: nomgroupe, hidden: false, expanded: false, color : getColorGroup(nomgroupe),uri: data[i].x.value})
			id = id + 1;
			if(idsup != 0){
				edges.add({id: idedges,label: "subFeature", from: idsup , to: id , arrows:"to", hidden: false});
				idedges = idedges + 1;
				idsup = id;
			}
		}
		else if(data[i].subNom != null){
			nodes.add({id: id, label: data[i].subNom.value, title: data[i].subNom.value,value: 30,group: 0 ,level: level, levelLabel: data[i].subgrouplab.value, hidden: false, expanded: false, color : getColorGroup(data[i].subgrouplab.value),uri: data[i].x.value})
			edges.add({id: idedges,label: "subFeature", from: idsup , to: id , arrows:"to", hidden: false});
			idedges = idedges + 1;
			id = id + 1;
		}
	}
	updateReferencePoint();
	updateLegend();
}

function retrieveGroupe(groupe, nbgroupe = 0) {

	var date = " ?x :referencePeriod ?date . ?date time:hasBeginning ?y . ?date time:hasEnd ?z . ?y time:inXSDDate ?debut . ?z time:inXSDDate ?fin . FILTER ( xsd:dateTime(?debut) < xsd:dateTime(\""+slider.noUiSlider.get()+"-01-01T00:00:00\") && xsd:dateTime(?fin) > xsd:dateTime(\""+slider.noUiSlider.get()+"-01-01T00:00:00\")).";
	var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX time:<http://www.w3.org/2006/time#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> select ?nom ?x where { ?x a :Area. ?x rdfs:label ?nom. ?x :isMemberOf ?groupe. ?groupe rdfs:label \""+groupe+"\". OPTIONAL{ "+date+"}}";
	var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';
	$.ajax({
		url: url,
		dataType: "json",
		success: function (data) {
		$('#results').show();
		$('#raw_output').text(JSON.stringify(data, null, 3));
		console.log("oui"+data);
		if(data.results.bindings.length == 0){
			
		}else{
			load(data.results.bindings, groupe);
		}

		},
		error: function(e) {console.log("Query error");}
	});
}

function retrieveURI(uri, idsup = 0, level = 0)
{
	  var date = " ?sub :referencePeriod ?date . ?date time:hasBeginning ?y . ?date time:hasEnd ?z . ?y time:inXSDDate ?debut . ?z time:inXSDDate ?fin . FILTER ( xsd:dateTime(?debut) < xsd:dateTime(\""+slider.noUiSlider.get()+"-01-01T00:00:00\") && xsd:dateTime(?fin) > xsd:dateTime(\""+slider.noUiSlider.get()+"-01-01T00:00:00\")).";
	  var query = "PREFIX var: <"+uri+"> PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> SELECT ?label ?nomgroupe ?x ?upNom ?upgrouplab ?subNom ?subgrouplab WHERE { var: rdfs:label ?label . var: :isMemberOf ?groupe . ?groupe rdfs:label ?nomgroupe . OPTIONAL { var: :hasUpperUnit ?up. ?up :idObardi ?upId . ?up rdfs:label ?upNom . ?up :isMemberOf ?upgroup . ?upgroup rdfs:label ?upgrouplab} . OPTIONAL { var: :hasSubUnit ?sub . ?sub :idObardi ?subId . ?sub rdfs:label ?subNom . ?sub :isMemberOf ?subgroup . ?subgroup rdfs:label ?subgrouplab."+date+"} . }";
	  var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';

	  $.ajax({
		url: url,
		dataType: "json",
		success: function (data) {
		  $('#results').show();
		  $('#raw_output').text(JSON.stringify(data, null, 3));

		  if(data.results.bindings.length != 0){
			nomgroupe = data.results.bindings[0].nomgroupe.value;
			nom = data.results.bindings[0].label.value;
			if(idsup == 0){
				nodes.add({id: id, label: nom, title: nom,value: 30,group: 0 ,level: 1, levelLabel: nomgroupe, hidden: false, expanded: true, color : getColorGroup(nomgroupe),uri: data.results.bindings[0].x.value})
				idsup = id;
				id = id + 1;
				level = 2;
				if(data.results.bindings[0].upNom != null){
					nodes.add({id: id, label: data.results.bindings[0].upNom.value, title: data.results.bindings[0].upNom.value,value: 30,group: 0 ,level: 0, levelLabel: data.results.bindings[0].upgrouplab.value, hidden: false, expanded: false, color : getColorGroup(nomgroupe),uri: data.results.bindings[0].x.value})
					edges.add({id: idedges,label: "subFeature", from: id , to: idsup , arrows:"to", hidden: false});
					idedges = idedges + 1;
					id = id + 1;
				}
			}
			load(data.results.bindings, nomgroupe, idsup, level);
		  }
		},
		error: function(e) {console.log("Query error");}
	  });
}

function retrieveNom(nom, nomgroupe, idsup = 0, level = 0)
{
	  var date = " ?sub :referencePeriod ?date . ?date time:hasBeginning ?y . ?date time:hasEnd ?z . ?y time:inXSDDate ?debut . ?z time:inXSDDate ?fin . FILTER ( xsd:dateTime(?debut) < xsd:dateTime(\""+slider.noUiSlider.get()+"-01-01T00:00:00\") && xsd:dateTime(?fin) > xsd:dateTime(\""+slider.noUiSlider.get()+"-01-01T00:00:00\")).";
	  var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> SELECT ?nomgroupe ?x ?upNom ?upgrouplab ?subNom ?subgrouplab WHERE { ?x a :Area . ?x rdfs:label \""+nom+"\". ?x :isMemberOf ?groupe . ?groupe rdfs:label \""+nomgroupe+"\" . ?groupe rdfs:label ?nomgroupe . OPTIONAL { ?x :hasUpperUnit ?up. ?up :idObardi ?upId . ?up rdfs:label ?upNom . ?up :isMemberOf ?upgroup . ?upgroup rdfs:label ?upgrouplab} . OPTIONAL { ?x :hasSubUnit ?sub . ?sub :idObardi ?subId . ?sub rdfs:label ?subNom . ?sub :isMemberOf ?subgroup . ?subgroup rdfs:label ?subgrouplab."+date+"} . }";
	  var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';

	  $.ajax({
		url: url,
		dataType: "json",
		success: function (data) {
		  $('#results').show();
		  $('#raw_output').text(JSON.stringify(data, null, 3));

		  console.log("oui"+data);
		  if(data.results.bindings.length != 0){
			if(idsup == 0){
				nodes.add({id: id, label: nom, title: nom,value: 30,group: 0 ,level: 1, levelLabel: nomgroupe, hidden: false, expanded: true, color : getColorGroup(nomgroupe),uri : data.results.bindings[0].x.value})
				idsup = id;
				id = id + 1;
				level = 2;
				if(data.results.bindings[0].upNom != null){
					nodes.add({id: id, label: data.results.bindings[0].upNom.value, title: data.results.bindings[0].upNom.value,value: 30,group: 0 ,level: 0, levelLabel: data.results.bindings[0].upgrouplab.value, hidden: false, expanded: false, color : getColorGroup(nomgroupe), uri:data.results.bindings[0].x.value})
					edges.add({id: idedges,label: "subFeature", from: id , to: idsup , arrows:"to", hidden: false});
					idedges = idedges + 1;
					id = id + 1;
				}
			}
			load(data.results.bindings, nomgroupe, idsup, level);
		  }
		},
		error: function(e) {console.log("Query error");}
	  });
}

function getColorGroup(nomgroupe){
	//Attribution d'une couleur pour un groupe
	let color;

	for (const key of groupeColor.keys()){
		if(nomgroupe == key){
			return groupeColor.get(key);
		}
	}
	
	groupeColor.set(nomgroupe, colorgroup[couleurcomp]);
	color = colorgroup[couleurcomp];
	couleurcomp = couleurcomp + 1;

	return color;
}

function updateDate(){
	deleteAll();
	if(radio_button=="Niveau"){
		retrieveGroupe(groupeget, 1);
	}else{
		retrieveNom(firstname.slice(0, -1),groupeget);
	}
}

function deleteAll(){
	nodes.clear();
	edges.clear();
	updateReferencePoint();
	updateLegend();
}

function sortParents(sorted_array, parent){
	let node = [];
	sorted_array
	.filter(function(d){ return d.parent === parent})
	.forEach(function(d){
	  var cd = d;
	  cd.child = sortParents(sorted_array, d.name);
	  return node.push(cd);
	})
	return node;
}


function getAllLevels(nommenclature){
	 
	var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#>PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>select ?nom ?up where { ?x a :LevelVersion .?x :isDivisionOf ?y .?x rdfs:label ?nom .?y rdfs:label \"" + nommenclature + "\" .OPTIONAL{?x :hasUpperLevel ?z .?z rdfs:label ?up .}}";
	var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';
	$.ajax({
	url: url,
	dataType: "json",
	success: function (data) {
		$('#results').show();
		$('#raw_output').text(JSON.stringify(data, null, 3));
		var array_levels = data.results.bindings;
		var sorted_array = [];

		array_levels.forEach((element) => {
			if ('up' in element){
				sorted_array.push({id: element.nom.value, parentId: element.up.value});
			} else {
				sorted_array.push({id: element.nom.value, parentId: null});
			}
		});
		
		const idMapping = sorted_array.reduce((acc, el, i) => {
			acc[el.id] = i;
			return acc;
		  }, {});

		  let root;
		  sorted_array.forEach((el) => {
			// Handle the root element
			if (el.parentId === null) {
			  root = el;
			  return;
			}
			// Use our mapping to locate the parent element in our data array
			const parentEl = sorted_array[idMapping[el.parentId]];
			// Add our current el to its parent's `children` array
			parentEl.children = [...(parentEl.children || []), el];
		  });

	},
	error: function(e) {console.log("Query error");}
	});
}

slider.noUiSlider.on('change', function() {
    updateDate();
});

