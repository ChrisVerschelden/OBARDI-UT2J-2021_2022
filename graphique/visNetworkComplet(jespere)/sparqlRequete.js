let myMap = new Map();
let myMapid = new Map();
let groupe = new  Map();

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
				nodes.add({id: id, label: data[i].nom.value, title: data[i].nom.value,value: 30,group: grouptemp ,level: leveltemp, levelLabel: data[i].nomgroupe, hidden: false, expanded: false, color : color});
			}
			else
			{
				nodes.add({id: id, label: data[i].nom.value, title: data[i].nom.value,value: 30,group: grouptemp ,level: leveltemp, levelLabel: data[i].nomgroupe, hidden: false, expanded: false, color : color});
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