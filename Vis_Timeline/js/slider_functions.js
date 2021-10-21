// <div id="slider"></div>
var slider = document.getElementById('slider');
var sliderval = document.getElementById('slidervalue');

var but = document.getElementById('valider');

var anneeMin = 1660;
var anneeMax = 1800;

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
    }
});

slider.noUiSlider.on('change',function(){
    options['min'] = new Date(slider.noUiSlider.get()[0], 1, 1)
    options['max'] = new Date(slider.noUiSlider.get()[1], 1, 1)
    timeline.setOptions(options)
    timeline.fit()
});

but.onclick = function(){
    alert(slider.noUiSlider.get()[0] + ' - ' + slider.noUiSlider.get()[1]);
    var newitems = items.getDataSet();
    newitems.add({id : 4, content : "Nouvelle Periode", start : slider.noUiSlider.get()[0]+'-01-01', end : slider.noUiSlider.get()[1]+'-01-01'});
};