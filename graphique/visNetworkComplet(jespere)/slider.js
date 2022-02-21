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
    },
    pips: {
        mode: 'values',
        values: tabVal,
        density: 2,
    }
});

slider.noUiSlider.on('slide', function() {
});