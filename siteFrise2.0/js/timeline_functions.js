var groups = new vis.DataSet([
{id: 0, content: 'Version_1', value: 1},
{id: 1, content: 'Version_2', value: 2},
{id: 2, content: 'Version_3', value: 3}
]);

var groups1_2 = new vis.DataSet([
{id: 0, content: 'Version_1', value: 1},
{id: 1, content: 'Version_2', value: 2}
]);

var groups2_3 = new vis.DataSet([
{id: 1, content: 'Version_2', value: 2},
{id: 2, content: 'Version_3', value: 3}
]);

var groups1_3 = new vis.DataSet([
{id: 0, content: 'Version_1', value: 1},
{id: 2, content: 'Version_3', value: 3}
]);

// create a dataset with items
// note that months are zero-based in the JavaScript Date object, so month 3 is April
var items = new vis.DataSet([
{id: 0, group: 0, content: 'item 0', start: new Date(1760, 3, 17), end: new Date(1761, 3, 21), className:"green"},
{id: 1, group: 0, content: 'item 1', start: new Date(1760, 3, 19), end: new Date(1761, 3, 20), className:"green"},
{id: 2, group: 1, content: 'item 2', start: new Date(1760, 3, 16), end: new Date(1761, 3, 24), className:"green"},
{id: 3, group: 1, content: 'item 3', start: new Date(1760, 3, 23), end: new Date(1761, 3, 24), className:"green"},
{id: 4, group: 1, content: 'item 4', start: new Date(1760, 3, 22), end: new Date(1761, 3, 26), className:"green"},
{id: 5, group: 0, content: 'item 5', start: new Date(1760, 3, 24), end: new Date(1761, 3, 27), className:"green"},
{id: 6, group: 2, content: 'Toulouse v1', start: '1661-01-01', end:'1686-01-01', className:"green"},
{id: 7, group: 2, content: 'Toulouse v2', start: '1686-01-01', end:'1740-01-01', className:"green"},
{id: 8, group: 2, content: 'Toulouse v3', start: '1740-01-01', end:'1798-01-01', className:"green"}
]);

// create visualization
var container = document.getElementById('visualization');
var options = {
// option groupOrder can be a property name or a sort function
// the sort function must compare two groups and return a value
//     > 0 when a > b
//     < 0 when a < b
//       0 when a == b
groupOrder: function (a, b) {
    return a.value - b.value;
},
editable: true,
stack: false,
min: new Date(1660, 1, 1),
max: new Date(1800, 1, 1),
dataAttributes: ['id']
};

var timeline = new vis.Timeline(container);
timeline.setOptions(options);
timeline.setGroups(groups);
timeline.setItems(items);


timeline.on("doubleClick", function (properties) {
    var eventProps = timeline.getEventProperties(properties.event);

    if (eventProps.what === "custom-time") {
        timeline.removeCustomTime(eventProps.customTime);
    } else {
        var id = new Date().getTime();
        timeline.addCustomTime(eventProps.time, id);
        timeline.setCustomTimeMarker("Modifier votre texte", id, true);
    }
})


function cacher1() {
  timeline.setGroups(groups2_3);
}

function cacher2() {
  timeline.setGroups(groups1_3);
}

function cacher3() {
  timeline.setGroups(groups1_2);
}

function montrerTout() {
  timeline.setGroups(groups)
}

// function changer_les_couleurs(id_item) {
//   if(getRandomInt(2) == 0){
//     items.forEach(item => {
//       items.update({id: item["id"], group: item["group"], content: item["content"], className:'red'});
//     });
//   }else{
//     items.forEach(item => {
//       items.update({id: item["id"], group: item["group"], content: item["content"], className:'green'});
//     });
//   }
//   timeline.redraw()
// }

function reset_couleurs() {
  items.forEach(item => {
    items.update({id: item["id"], group: item["group"], content: item["content"], className:'base'});
  });
  timeline.redraw()
}

function reset_dates(){
  slider.noUiSlider.updateOptions({ start: [anneeMin, anneeMax]})
  options['min'] = new Date(anneeMin, 1, 1)
  options['max'] = new Date(anneeMax, 1, 1)
  timeline.setOptions(options)
  timeline.fit()
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

document.getElementById('visualization').onclick = function (event) {
  var props = timeline.getEventProperties(event)
}

// $(document).ready(function(){
//     $('.vis-item').on('click',function() {
//       var e=$(this);
//       e.off('hover');
//       var x = e.attr('data-id')
//       e.off('click')
//       var item = items.get(parseInt(x, 10))
//       var contents = item.content + "\r" + item.start

//       e.popover({title: x, content: contents, placement: "top"}).popover('show');
//     });
// });