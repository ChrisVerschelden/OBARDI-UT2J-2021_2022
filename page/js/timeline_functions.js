//group list
var groups = new vis.DataSet([
    { id: 0, content: 'Evenements', value: 1 },
    { id: 1, content: '|||||||||||', value: 2 },
]);

//item list
var items = new vis.DataSet();

var container = document.getElementById('visualization');
var options = {
    groupOrder: function(a, b) {
        return b.value - a.value;
    },
    editable: false,
    stack: false,
    min: new Date(anneeMin, 1, 1),
    max: new Date(anneeMax, 1, 1),
    dataAttributes: ['id']
};

var timeline = new vis.Timeline(container);
timeline.setOptions(options);
timeline.setGroups(groups);
timeline.setItems(items);
timeline.fit()

timeline.on("doubleClick", function(properties) {
    var eventProps = timeline.getEventProperties(properties.event);

    if (eventProps.what === "custom-time") {
        timeline.removeCustomTime(eventProps.customTime);
    } else {
        var id = new Date().getTime();
        timeline.addCustomTime(eventProps.time, id);
        timeline.setCustomTimeMarker("Modifier votre texte", id, true);
    }
})





// Configuration for the Timeline
var options = { stack: false, min: anneeMin + '-01-01', max: anneeMax + '-01-01' };




(async function() {

    let query="PREFIX : <http://www.semanticweb.org/lucas/ontologies/2021/11/HHT_Ontology#> PREFIX var: <"+uriavantclear+"> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX time: <http://www.w3.org/2006/time#> select DISTINCT ?x ?groupe ?nom ?debut ?fin where {var: :isMemberOf ?groupe . var: :referencePeriod ?date . var: rdfs:label ?nom . ?niveau a :LevelVersion . ?date time:hasBeginning ?debut . ?date time:hasEnd ?fin . } "
    let url = 'http://localhost:7200/repositories/test?query=' + encodeURIComponent(query) + '&output=json';

    $.ajax({
        url: url,
        dataType: "json",
        success: function (data) {
        $('#results').show();
        $('#raw_output').text(JSON.stringify(data, null, 3));
        let data_array = data.results.bindings;
        document.getElementById('titre').innerText=data_array[0].nom.value;
        for (var i = 0; i < data_array.length; i++) {
            var date = window.location.href.split('=')[2];
            var classname = data_array[i].debut.value.split('#')[1] < date && data_array[i].debut.value.split('#')[1] > date ? 'not-selected': 'green';
            items.add({ id: i, group: 0, content: data_array[i].nom.value, start: new Date(data_array[i].debut.value.split('#')[1] + "-01-01"), end: new Date(data_array[i].fin.value.split('#')[1] + "-01-01"), className: classname });
        }
        console.log(urlParams)
        if (urlParams.has('date')) {
            var date = urlParams.get('date');
            console.log(date)
            items.forEach(e=>{
                if(e['start'] < date && e['end'] > date){
                    items.update({ id: e['id'], group: e["group"], content: e["content"], className: 'green' });
                }
            });
            
            // document.getElementById('item_id').innerHTML = item_selected.id;
            // document.getElementById('item_content').innerHTML = item_selected.content;
            // document.getElementById('item_date').innerHTML = item_selected.start.getFullYear() + " / " + item_selected.end.getFullYear();
            // timeline.fit(parseInt(urlParams.get('id')));
        }
    
        timeline.setItems(items);
        timeline.redraw();
        timeline.fit();
    
    
        $(document).ready(function() {
            $('.vis-item').on('click', function() {
                var e = $(this);
                var id = e.attr('data-id')
                var item = items.get(parseInt(id, 10))
                items.forEach((item) => {
                    if (item.id != id) {
                        items.update({ id: item["id"], group: item["group"], content: item["content"], className: 'not-selected' });
                    } else {
                        var item_selected = item;
                        items.update({ id: item_selected['id'], group: item["group"], content: item["content"], className: 'green' });
                    }
                })
                var url_propre = window.location.search.split('?')[0];
                window.open(url_propre + '?id=' + id + "&id_frise=" + id_frise, '_blank').focus();
            });
        });
        
        },
        error: function(e) {console.log("Query error");}
    });


    

})();