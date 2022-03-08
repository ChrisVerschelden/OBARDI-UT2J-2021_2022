var anneeMin = 1660, anneeMax = 1800;

var slider = document.getElementById("slider");

var tabVal = new Array();
var tabVal2 = new Array();

for (var val = anneeMin; val <= anneeMax; val = val + 10) {
    tabVal.push(val);
    tabVal2.push(val);
}
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
    }
});

var zoom_min = 0.001, zoom_max = 1.5;
var zoom = network.getScale();

var slider_zoom = document.getElementById("slider-zoom");


noUiSlider.create(slider_zoom, {
    start: zoom,
    orientation: 'vertical',
    step: 0.001,
    range: {
        'min': zoom_min,
        'max': zoom_max
    },
    format: {
        to: function(value) {
            return value;
        },
        from: function(value) {
            return value.replace();
        }
    }
});

slider_zoom.noUiSlider.on('slide', function() {
    network.moveTo({scale:slider_zoom.noUiSlider.get(true)});
});

