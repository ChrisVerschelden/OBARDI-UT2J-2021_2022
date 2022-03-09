function testerRadio() {
    var elements = [];
    elements.push(document.getElementById("element"));
    elements.push(document.getElementById("niveau"));

    elements.forEach(e => {
        if (e.checked && e.value === 'element') {
            document.getElementById('furtive').style.display = "block";
        } else if (e.checked) {
            document.getElementById('furtive').style.display = "none";
        }

    });

}

document.getElementById("niveau").addEventListener('click', () => {
    document.getElementById('furtive').style.display = "block";
    document.getElementById('nomUnite').style.display = "none";
    niveau();
})

document.getElementById("element").addEventListener('click', () => {
    document.getElementById('furtive').style.display = "block";
    document.getElementById('nomUnite').style.display = "block";
    elem();
})


namesearch = document.getElementById('firstname');
namesearch.addEventListener('input', () => {
    elem();
})

function elem(){
    namesearch = document.getElementById('firstname');

    text = '<select name="niveau" id="niveau-select">';

    var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT ?name ?nomgroupe WHERE { ?x a :Area  . ?x rdfs:label ?name . ?x :isMemberOf ?groupe . ?groupe rdfs:label ?nomgroupe . FILTER regex(?name, \"" + namesearch.value + "\", \"i\") }";
    var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';
    console.log(query);
    $.ajax({
        url: url,
        dataType: "json",
        success: function (data) {
            $('#results').show();
            $('#raw_output').text(JSON.stringify(data, null, 3));
            for (let i = 0; i < data.results.bindings.length; i++) {
                text += "<option value=\"" + data.results.bindings[i].name.value + "\">" + data.results.bindings[i].name.value +" ("+data.results.bindings[i].nomgroupe.value+")" + "</option>";
            }
            text += '</select>';
            document.getElementById('furtive').innerHTML = text;

        },
        error: function (e) { console.log("Query error"); }
    });
}

function niveau(){
    text = '<select name="niveau" id="niveau-select">';

    var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#>PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>select ?name where {?x a :LevelVersion .?x rdfs:label ?name .}";
    var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';
    console.log(query);
    $.ajax({
        url: url,
        dataType: "json",
        success: function (data) {
            $('#results').show();
            $('#raw_output').text(JSON.stringify(data, null, 3));
            console.log(data);
            for (let i = 0; i < data.results.bindings.length; i++) {
                text += "<option value=\"" + data.results.bindings[i].name.value + "\">" + data.results.bindings[i].name.value +"</option>";
            }
            text += '</select>';
            document.getElementById('furtive').innerHTML = text;

        },
        error: function (e) { console.log("Query error"); }
    });
}

