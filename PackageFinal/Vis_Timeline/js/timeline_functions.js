const anneeMin = 1660;
const anneeMax = 1800;

//group list
var groups = new vis.DataSet([
    { id: 0, content: 'Version_1', value: 1 },
]);

//item list
var items = new vis.DataSet();

var container = document.getElementById('visualization');
var options = {
    groupOrder: function(a, b) {
        return a.value - b.value;
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



function reset_dates() {
    tabVal2 = new Array;
    for (var val = anneeMin; val <= anneeMax; val = val + 10) {
        tabVal2.push(val);
    }
    slider2.noUiSlider.updateOptions({
        range: {
            'min': anneeMin,
            'max': anneeMax
        },
        pips: {
            mode: 'values',
            values: tabVal2,
            density: 2,
        }
    });
    slider.noUiSlider.updateOptions({ start: [anneeMin, anneeMax] });
    slider2.noUiSlider.updateOptions({ start: [anneeMin, anneeMax] });
    options['min'] = new Date(anneeMin, 1, 1);
    options['max'] = new Date(anneeMax, 1, 1);
    items.remove('background_item');
    timeline.setOptions(options);
    timeline.fit();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// document.getElementById('visualization').onclick = function(event) {
//     var props = timeline.getEventProperties(event)
// }

var slider = document.getElementById('slider');
var sliderval = document.getElementById('slidervalue');

var tabVal = new Array();
var tabVal2 = new Array();

for (var val = anneeMin; val <= anneeMax; val = val + 10) {
    tabVal.push(val);
    tabVal2.push(val);
}


// Configuration for the Timeline
var options = { stack: false, min: anneeMin + '-01-01', max: anneeMax + '-01-01' };

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
        to: function(value) {
            return value;
        },
        from: function(value) {
            return value.replace();
        }
    },
    pips: {
        mode: 'values',
        values: tabVal,
        density: 2,
    }
});

slider.noUiSlider.on('slide', function() {
    var min = slider.noUiSlider.get()[0];
    var max = slider.noUiSlider.get()[1];
    tabVal2 = new Array;
    for (var val = min; val <= max; val = val + 10) {
        tabVal2.push(val);
    }
    slider2.noUiSlider.updateOptions({
        range: {
            'min': min,
            'max': max
        },
        pips: {
            mode: 'values',
            values: tabVal2,
            density: 2,
        }
    });
    options['min'] = new Date(min, 1, 1);
    options['max'] = new Date(max, 1, 1);
    timeline.setOptions(options);
    timeline.fit();
})

//slider highLight
var slider2 = document.getElementById("slider2");

noUiSlider.create(slider2, {
    start: [anneeMin, anneeMax],
    connect: true,
    tooltips: true,
    step: 1,
    range: {
        'min': anneeMin,
        'max': anneeMax
    },
    format: {
        to: function(value) {
            return value;
        },
        from: function(value) {
            return value.replace();
        }
    },
    pips: {
        mode: 'values',
        values: tabVal2,
        density: 2,
    }
});

slider2.noUiSlider.on('slide', function() {
    items.update({ id: 'background_item', content: "", start: slider2.noUiSlider.get()[0] + "-01-01", end: slider2.noUiSlider.get()[1] + "-01-01", type: "background", style: "background-color: orange" });
    console.log(items.get('background_item'))
    console.log(items.get(1))
});

(async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_frise = parseInt(urlParams.get('id_frise'));
    await fetch("http://myjson.dit.upm.es/api/bins/8box")
        .then(res => res.json())
        .then((out) => {
            var json = out[id_frise];
            for (var i = 0; i < json.intervals.length; i++) {
                items.add({ id: i, group: 0, content: json.intervals[i].uri, start: new Date(json.intervals[i].begin + "-01-01"), end: new Date(json.intervals[i].end + "-01-01"), className: "not-selected" });
            }
        })
        .catch(err => { throw err });


    if (urlParams.has('id')) {
        var item_selected = items.get(parseInt(urlParams.get('id')));
        items.update({ id: item_selected['id'], group: item_selected["group"], content: item_selected["content"], className: 'green' });
        document.getElementById('item_id').innerHTML = item_selected.id;
        document.getElementById('item_content').innerHTML = item_selected.content;
        document.getElementById('item_date').innerHTML = item_selected.start.getFullYear() + " / " + item_selected.end.getFullYear();
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
            window.open("file:///C:/Users/chris/Documents/COURS/OBARDI-UT2J-2021_2022/PackageFinal/Vis_Timeline/VisTimeline.html" + '?id=' + id + "&id_frise=" + id_frise, '_blank').focus();
        });
    });

})();