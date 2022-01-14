var anneeMin = 1660, anneeMax = 1800;

var slider = document.getElementById("slider");

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
});

slider.noUiSlider.on('slide', function() {
});