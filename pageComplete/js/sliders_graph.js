const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

var anneeMin = 1660, anneeMax = 1800;

var slider_tools = document.getElementById("slider-tools");

noUiSlider.create(slider_tools, {
    start: parseInt(urlParams.get('date')),
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

