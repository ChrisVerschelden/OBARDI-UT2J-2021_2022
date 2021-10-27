// <div id="slider"></div>
var slider = document.getElementById('slider');
var sliderval = document.getElementById('slidervalue');

//var but = document.getElementById('valider');

var anneeMin = 1660;
var anneeMax = 1800;

var tabVal = new Array();
var tabVal2 = new Array();

for(var val = anneeMin; val<=anneeMax; val = val + 10){
    tabVal.push(val);
    tabVal2.push(val);
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
    tabVal2 = new Array;
    for(var val = min; val<=max; val = val + 10){
        tabVal2.push(val);
    }
    slider2.noUiSlider.updateOptions({
        start: [min, max],
        range: {
            'min': min,
            'max': max
        },
        pips: {
            mode:'values',
            values: tabVal2,
            density: 2,
        }
    });
    updateColors(min, max);
});


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
        to: function ( value ) {
            return value;
        },
        from: function ( value ) {
            return value.replace();
        }
    },
    pips: {
        mode:'values',
        values: tabVal2,
        density: 2,
    }
});

slider2.noUiSlider.on('change', function(){
    console.log("test")
    items.update({id: 100, content: "Periode mise en valeur", start: new Date(slider2.noUiSlider.get()[0]),  end: new Date(slider2.noUiSlider.get()[1]), type: "background"});
});



function updateColors(dateMin, dateMax){
    items.forEach(item => {
        var dateStart = new Date(item.start);
        //console.log(dateStart);
        var dateEnd = new Date(item.end);
        if( dateStart.getFullYear() >= dateMin && dateEnd.getFullYear() <= dateMax){
            items.update({id: item["id"], group: item["group"], content: item["content"], className:'green'});
        } else {
            items.update({id: item["id"], group: item["group"], content: item["content"], className:'base'});
        }
    });
}

window.addEventListener("load", updateColors(slider2.noUiSlider.get()[0], slider2.noUiSlider.get()[1]));