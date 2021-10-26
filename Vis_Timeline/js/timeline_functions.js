var groups = new vis.DataSet([
  {id: 0, content: 'Version_1', value: 1},
  {id: 1, content: 'évènement', value: 2},
]);

var items = new vis.DataSet();

// create visualization
var container = document.getElementById('visualization');
var options = {
groupOrder: function (a, b) {
    return b.value - a.value;
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
timeline.fit()

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

function reset_couleurs() {
  items.forEach(item => {
    items.update({id: item["id"], group: item["group"], content: item["content"], className:'base'});
  });
  timeline.redraw()
}

function reset_dates(){
  slider.noUiSlider.updateOptions({ start: [anneeMin, anneeMax]});
  options['min'] = new Date(anneeMin, 1, 1);
  options['max'] = new Date(anneeMax, 1, 1);
  timeline.setOptions(options);
  timeline.fit();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

document.getElementById('visualization').onclick = function (event) {
  var props = timeline.getEventProperties(event);
  
}

// <div id="slider"></div>
var slider = document.getElementById('slider');
var sliderval = document.getElementById('slidervalue');

//var but = document.getElementById('valider');

var anneeMin = 1660;
var anneeMax = 1800;

var tabVal = new Array();

for(var val = anneeMin; val<=anneeMax; val = val + 10){
    tabVal.push(val);
}


// Configuration for the Timeline
var options = {stack : false, min : anneeMin+'-01-01', max : anneeMax+'-01-01'};

noUiSlider.create(slider, {
    start: [anneeMin, anneeMax],
    connect: true,
    tooltips: true,
    step: 1,
    range: {
        'min': anneeMin,
        'max': anneeMax
    },
    format: {
        to: function ( value ) {
            return value;
        },
        from: function ( value ) {
            return value.replace();
        }
    },
    pips: {
        mode:'values',
        values: tabVal,
        density: 2,
    }
});

slider.noUiSlider.on('change',function(){
    var min = slider.noUiSlider.get()[0];
    var max = slider.noUiSlider.get()[1];
    options['min'] = new Date(min, 1, 1);
    options['max'] = new Date(max, 1, 1);
    timeline.setOptions(options);
    timeline.fit();
});



(async function() {
  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        var json = [
          {id: 6, group: 0, content: 'Toulouse v1', start: '1661-01-01', end:'1686-01-01', className:"base"},
          {id: 7, group: 0, content: 'Toulouse v2', start: '1686-01-01', end:'1740-01-01', className:"base"},
          {id: 8, group: 0, content: 'Toulouse v3', start: '1740-01-01', end:'1798-01-01', className:"base"}
        ]
        resolve(json);
      }, 1000);
    });
  }

  var json

  async function f1() {
    json = await resolveAfter2Seconds();
    console.log(json);
  }
  await f1();

  for(var i = 0 ; i < json.length ; i++){
    items.add({id: i, group: 0, content: json[i]['content'], start: new Date(json[i]['start']), end: new Date(json[i]['end']), className:"base"})
  }

  timeline.setItems(items);
  timeline.redraw();
  timeline.fit();


$(document).ready(function(){
    $('.vis-item').on('click',function() {
      var e=$(this);
      // e.off('hover');
      var id = parseInt( e.attr('data-id'), 10 )
      // e.off('click')
      var item = items.get(id);
      // var contents = item.content + "\r" + item.start

      // e.popover({title: x, content: contents, placement: "top"}).popover('show');
      document.getElementById('item_id').innerHTML = item.id;
      document.getElementById('item_content').innerHTML = item.content;
      document.getElementById('item_date').innerHTML = item.start.toString() + " / " + item.end.toString();

      items.forEach((item) => {
        if(item.id != id){
          items.update({id: item["id"], group: item["group"], content: item["content"], className:'not-selected'});
        } else {
          var item_selected = items.get(id);
          items.update({id: item_selected['id'], group: item["group"], content: item["content"], className:'base'});
        }
      })
    });
});

})();

