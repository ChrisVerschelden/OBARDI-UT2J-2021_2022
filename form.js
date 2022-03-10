first = true;
document.getElementById('furtive').style.display = "block";
document.getElementById('nomUnite').style.display = "none";
niveau();

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
    document.getElementById('furtive2').style.display = "none";

    niveau();
})

document.getElementById("element").addEventListener('click', () => {
    document.getElementById('furtive2').style.display = "block";
    document.getElementById('furtive').style.display = "block";
    document.getElementById('nomUnite').style.display = "block";

    elem();
    
})


namesearch = document.getElementById('firstname');
namesearch.addEventListener('input', () => {
    elem();
})

function getValue(selectObject) {
    var str = selectObject.value;
    var mySubString = str;
    var mySubString2 = str;
    if(str.includes("(")){
        mySubString = str.substring(
            str.indexOf("(") + 1, 
            str.lastIndexOf(")")
        );
        mySubString2 = str.substring(
            0, 
            str.lastIndexOf("(")
        );
    }
    document.getElementById('groupeval').value = mySubString;
    document.getElementById('firstname').value = mySubString2;
}

function elem(){
    namesearch = document.getElementById('firstname');

    text = '<select name="niveau" id="niveau-select" onchange="getValue(this)">';
    

    var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX owl: <http://www.w3.org/2002/07/owl#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT ?name ?nomgroupe WHERE { ?x a :Area  . ?x rdfs:label ?name . ?x :isMemberOf ?groupe . ?groupe rdfs:label ?nomgroupe . FILTER regex(?name, \"" + namesearch.value + "\", \"i\") }";
    var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';
    $.ajax({
        url: url,
        dataType: "json",
        success: function (data) {
            $('#results').show();
            $('#raw_output').text(JSON.stringify(data, null, 3));
            for (let i = 0; i < data.results.bindings.length; i++) {
                text += "<option value=\"" + data.results.bindings[i].name.value +" ("+data.results.bindings[i].nomgroupe.value+")"+ "\">" + data.results.bindings[i].name.value +" ("+data.results.bindings[i].nomgroupe.value+")" + "</option>";
            }
            text += '</select>';
            if(first){
                document.getElementById('firstname').value = data.results.bindings[0].name.value;
                first = false;
            }
            if(data.results.bindings[0] != null){
                document.getElementById('groupeval').value = data.results.bindings[0].nomgroupe.value;
            }

            document.getElementById('furtive').innerHTML = text;
            niveau(false);


            
        },
        error: function (e) { console.log("Query error"); }
    });
}

function niveau(val = true){
    text = '<select name="niveau" id="niveau-select" onchange="getValue(this)">';
    

    var query = "PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#>PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>select ?name where {?x a :LevelVersion .?x rdfs:label ?name .}";
    var url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';
    $.ajax({
        url: url,
        dataType: "json",
        success: function (data) {
            $('#results').show();
            $('#raw_output').text(JSON.stringify(data, null, 3));
            for (let i = 0; i < data.results.bindings.length; i++) {
                text += "<option value=\"" + data.results.bindings[i].name.value + "\">" + data.results.bindings[i].name.value +"</option>";
            }
            document.getElementById('groupeval').value = data.results.bindings[0].name.value;
            text += '</select>';
            if(val){
                document.getElementById('furtive').innerHTML = text;
            }
            else{
                document.getElementById('furtive2').innerHTML = text;
            }
        },
        error: function (e) { console.log("Query error"); }
    });

}

