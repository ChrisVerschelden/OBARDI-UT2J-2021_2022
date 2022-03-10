let myMap = new Map();
let myMapid = new Map();
let groupeColor = new Map();

function load(data, nomgroupe, idsup = 0, level = 0){
	for(i = 0; i<data.length; i++){
		if(data[i].nom != null){
			nodes.add({id: id, label: data[i].nom.value, title: data[i].nom.value,value: 30,group: 0 ,level: level, levelLabel: nomgroupe, hidden: false, expanded: false, color : getColorGroup(nomgroupe)})
			id = id + 1;
			if(idsup != 0){
				edges.add({id: idedges,label: "subFeature", from: idsup , to: id , arrows:"to", hidden: false});
				idedges = idedges + 1;
				idsup = id;
			}
		}
		else if(data[i].subNom != null){
			nodes.add({id: id, label: data[i].subNom.value, title: data[i].subNom.value,value: 30,group: 0 ,level: level, levelLabel: data[i].subgrouplab.value, hidden: false, expanded: false, color : getColorGroup(data[i].subgrouplab.value)})
			edges.add({id: idedges,label: "subFeature", from: idsup , to: id , arrows:"to", hidden: false});
			idedges = idedges + 1;
			id = id + 1;
		}
	}
	updateReferencePoint();
	updateLegend();
}

function retrieveGroupe(groupe, nbgroupe = 0) {

	var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> select ?nom where { ?x a :Area. ?x rdfs:label ?nom. ?x :isMemberOf ?groupe. ?groupe rdfs:label \""+groupe[nbgroupe]+"\". }";
	var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';

	$.ajax({
		url: url,
		dataType: "json",
		success: function (data) {
		$('#results').show();
		$('#raw_output').text(JSON.stringify(data, null, 3));
		
		if(data.results.bindings.length == 0){
			retrieveGroupe(groupe, (nbgroupe+1))
		}else{
			load(data.results.bindings, groupe[nbgroupe]);
		}
		
		},
		error: function(e) {console.log("Query error");}
	});
}

function retrieveNom(nom, nomgroupe, idsup = 0, level = 0)
{
	  var date = " ?sub :referencePeriod ?date . ?date time:hasBeginning ?y . ?date time:hasEnd ?z . ?y time:inXSDDate ?debut . ?z time:inXSDDate ?fin . FILTER ( xsd:dateTime(?debut) < xsd:dateTime(\""+slider.noUiSlider.get()+"-01-01T00:00:00\") && xsd:dateTime(?fin) > xsd:dateTime(\""+slider.noUiSlider.get()+"-01-01T00:00:00\")).";
	  var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> SELECT ?nomgroupe ?upNom ?upgrouplab ?subNom ?subgrouplab WHERE { ?x a :Area . ?x rdfs:label \""+nom+"\". ?x :isMemberOf ?groupe . ?groupe rdfs:label \""+nomgroupe+"\" . ?groupe rdfs:label ?nomgroupe . OPTIONAL { ?x :hasUpperUnit ?up. ?up :idObardi ?upId . ?up rdfs:label ?upNom . ?up :isMemberOf ?upgroup . ?upgroup rdfs:label ?upgrouplab} . OPTIONAL { ?x :hasSubUnit ?sub . ?sub :idObardi ?subId . ?sub rdfs:label ?subNom . ?sub :isMemberOf ?subgroup . ?subgroup rdfs:label ?subgrouplab."+date+"} . }";
	  var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';

	  console.log(query);
	  $.ajax({
		url: url,
		dataType: "json",
		success: function (data) {
		  $('#results').show();
		  $('#raw_output').text(JSON.stringify(data, null, 3));
		  if(data.results.bindings.length != 0){
			if(idsup == 0){
				nodes.add({id: id, label: nom, title: nom,value: 30,group: 0 ,level: 1, levelLabel: nomgroupe, hidden: false, expanded: true, color : getColorGroup(nomgroupe)})
				idsup = id;
				id = id + 1;
				level = 2;
				if(data.results.bindings[0].upNom != null){
					nodes.add({id: id, label: data.results.bindings[0].upNom.value, title: data.results.bindings[0].upNom.value,value: 30,group: 0 ,level: 0, levelLabel: data.results.bindings[0].upgrouplab.value, hidden: false, expanded: false, color : getColorGroup(nomgroupe)})
					edges.add({id: idedges,label: "subFeature", from: id , to: idsup , arrows:"to", hidden: false});
					idedges = idedges + 1;
					id = id + 1;
				}
			}
			load(data.results.bindings, nomgroupe, idsup, level);
		  }
		},
		error: function(e) {console.log("wesh ya pb la bro");}
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
	retrieveGroupe(groupe);
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

		console.log(array_levels)
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

		  console.log(root);

		// array_levels.forEach(element => {
		// 	if ('up' in element) {
		// 		if (element.up.value in sorted_array){
		// 			sorted_array[element.up.value].push(element.nom.value);
		// 		}
		// 	} else {
		// 		sorted_array[element.nom.value] = [];
		// 	}
		// });

		// console.log(sorted_array)

	},
	error: function(e) {console.log("wesh ya pb la bro");}
	});
}

slider.noUiSlider.on('change', function() {
    updateDate();
});

//charge les données du premier niveau
retrieveGroupe(groupe); 
//retrieveNom("Vendôme",groupe[1]);

/*
function load(data, group, level, recursif, idnem)
{
	let grouptemp = group;
	let leveltemp = levelperms;
	
	if(level != 0)
	{
		leveltemp = level;
	}
	
	for(let i = 0; i<data.length; i++)
	{
		if(id == 52){
			console.log("ouais ouais");
		}
		if(group == 0)
		{
			grouptemp = groupperms;
			groupperms = groupperms + 1;
		}
		
		let trouve = false;
		
		//Regarde si le nom de la node est déjà présent, si c'est le cas il ajoute ses enfants
		for(let j = 0; j<nom.length; j++)
		{
			if(nom[j] != null){
				if(nom[j][0] == data[i].nom.value && nom[j][1] == data[i].nomgroupe.value)
				{
					if(recursif && level != 1 && data[i].nomdeceluiquiestdessous != null)
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
						if(key[0] == data[i].nom.value && key[1] == data[i].nomgroupe.value)
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

			//console.log(data[i].nom.value+" , group "+grouptemp+", level"+leveltemp+" nomgroupe"+data[i].nomgroupe.value);
			if((level == 1 && data[i].nomgroupe.value != "Paroisse") || level!=1){
				nodes.add({id: id, label: data[i].nom.value, title: data[i].nom.value,value: 30,group: grouptemp ,level: leveltemp, levelLabel: data[i].nomgroupe, hidden: false, expanded: false, color : color});
				nom.push([data[i].nom.value, data[i].nomgroupe.value]);
				myMap.set(data[i].nom, grouptemp);
				myMapid.set([data[i].nom.value, data[i].nomgroupe.value], id);
				//Ajout des liaisons
				if(idnem != 0)
				{
					edges.add({id: idedges,label: "subFeature", from: idnem , to: id , arrows:"to", hidden: false});
					idedges = idedges + 1;
				}
			}
			
			id = id + 1;
		}
	}

	updateReferencePoint();
	updateLegend();
}

function retrieveGroupColor(group){
	for (const key of groupe.keys())
	{
		if(group == key)
		{
			return groupe.get(key)[0];
		}
	}
	return "yellow";
}

function retrieveDataSup() {
  //var date = " ?x :referencePeriod ?date . ?date time:hasBeginning ?y . ?date time:hasEnd ?z . ?y time:inXSDDate ?debut . ?z time:inXSDDate ?fin . FILTER ( xsd:dateTime(?debut) > xsd:dateTime(\""+slider.noUiSlider.get()[0]+"-01-01T00:00:00\") && xsd:dateTime(?fin) < xsd:dateTime(\""+slider.noUiSlider.get()[1]+"-01-01T00:00:00\")).";
  var date = "";
  var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT ?nom WHERE { ?x a :Area . ?x rdfs:label ?nom . MINUS { ?x a :Area . ?x :hasUpperUnit ?z . } "+date+"} ";
  var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';


console.log(query);
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
	  var date = " ?sousunite :referencePeriod ?sousdate .?sousdate time:hasBeginning ?y .?sousdate time:hasEnd ?z . ?y time:inXSDDate ?debut .?z time:inXSDDate ?fin .FILTER ( xsd:dateTime(?debut) > xsd:dateTime(\""+slider.noUiSlider.get()[0]+"-01-01T00:00:00\") && xsd:dateTime(?fin) < xsd:dateTime(\""+slider.noUiSlider.get()[1]+"-01-01T00:00:00\"))."
	  var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX time: <http://www.w3.org/2006/time#> SELECT ?nom ?nomgroupe ?nomdeceluiquiestdessous WHERE {  ?x a :Area .  ?x rdfs:label ?nom .  ?x :isMemberOf ?groupe .  ?groupe rdfs:label ?nomgroupe .  ?x rdfs:label \""+name+"\" . OPTIONAL{ ?x :hasSubUnit ?sousunite . ?sousunite rdfs:label ?nomdeceluiquiestdessous . } }";
	  var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';

	  $.ajax({
		url: url,
		dataType: "json",
		success: function (data) {
		  $('#results').show();
		  $('#raw_output').text(JSON.stringify(data, null, 3));
		  data = dataremovedoublons(data.results.bindings);
		  load(data, group, level, true, idnem);
		},
		error: function(e) {console.log("wesh ya pb la bro");}
	  });
}
/*
function retrieveNom(name, group, level, idnem)
{
	  var date = " ?sousunite :referencePeriod ?sousdate .?sousdate time:hasBeginning ?y .?sousdate time:hasEnd ?z . ?y time:inXSDDate ?debut .?z time:inXSDDate ?fin .FILTER ( xsd:dateTime(?debut) > xsd:dateTime(\""+slider.noUiSlider.get()[0]+"-01-01T00:00:00\") && xsd:dateTime(?fin) < xsd:dateTime(\""+slider.noUiSlider.get()[1]+"-01-01T00:00:00\"))."
	  var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX time: <http://www.w3.org/2006/time#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT ?nom ?nomgroupe ?nomdeceluiquiestdessous  WHERE { ?x a :Area . ?x rdfs:label ?nom . ?x :isMemberOf ?groupe . ?groupe rdfs:label ?nomgroupe . ?x rdfs:label \""+name+"\" . ?x :hasSubUnit ?sousunite . ?sousunite rdfs:label ?nomdeceluiquiestdessous . "+date+"}";

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
		  if(data.results.bindings.length == 0){
			  console.log("erreur");
		  }
		  else{
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
		if(dataval[i].nomdeceluiquiestdessous != null){
			if(!(dataval[i].nomdeceluiquiestdessous.value == dataval[i].nom.value))
			{
				val.push(dataval[i]);
			}
		}else{
			val.push(dataval[i]);
		}
	}
	return val;
}*/