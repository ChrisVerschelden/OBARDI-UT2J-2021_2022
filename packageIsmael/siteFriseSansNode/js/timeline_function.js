
//objet javascript contenant les données

const data={
    ville:"toulouse",

    nbVersions:{
        titre:"toulouse V1",
        titre2:"toulouse V2",
        titre3:"toulouse V3",
        titre4:"toulouse V4",
        titre5:"toulouse V5",
        titre6:"toulouse V6",
        titre7:"toulouse V7",
        titre8:"toulouse V8"
        

    },

    descriptions:{
        texte1:"ceci est première version de toulouse",
        texte2:"seconde version de toulouse",
        texte3:"troisième version de toulouse",
        texte4:"quatrième version de toulouse",
        texte5:"cinquième version de toulouse",
        texte6:"sixième version de toulouse",
        texte7:"septième version de toulouse",
        titre8:"huitième version de toulouse"
        


    },

    dates:{
        dateInitiale:1661,          
        dateFinPeriode1:1680,
        dateFinPeriode2:1710,
        dateFinPeriode3:1732,
        dateFinPeriode4:1750,
        dateFinPeriode5:1762,
        dateFinPeriode6:1769,
        dateFinPeriode7:1778,
        dateFinale:1789
    }
}

//liste des couleurs
var colorListButton=["chartreuse","deepSkyBlue","yellow","red","cyan","orange","purple","orangeRed"]

//liste des couleurs générées aléatoirement en fonction du nombre de données
var resColors=[]
for(var i=0;i<=Object.values(data.nbVersions).length-1;i++) { 
    var resRandom=colorListButton[Math.floor(Math.random()*(colorListButton.length))] 
          
    if(resColors.includes(resRandom)!==true) {
        resColors.push(resRandom)   
                  
    }else{ 
        var randomRes2=Math.floor(Math.random()*(colorListButton.length)); 
        while (resColors.includes(colorListButton[randomRes2])===true){ 
            randomRes2=Math.floor(Math.random()*(colorListButton.length)) 
        }
        resColors.push(colorListButton[randomRes2])  
    }                                              
}  

//tableau des dates et des différentes versions 
var versions=[]
var dates=[]
    //ajout des versions enregistrées
for (var cptVers=0;cptVers<=Object.values(data.nbVersions).length-1;cptVers++){
        versions.push(Object.values(data.nbVersions)[cptVers])
}
//ajout des dates
for (var cptDates=0;cptDates<=Object.values(data.dates).length-1;cptDates++){
    dates.push(Object.values(data.dates)[cptDates])
}
            
        
            
// create a dataset with items
// note that months are zero-based in the JavaScript Date data, so month 3 is April
var items = new vis.DataSet([
    
]);

for (var cptItems=1;cptItems<=versions.length;cptItems++){                            
    items.add({id: cptItems-1, group: 1, content: versions[cptItems-1], start: new Date(dates[cptItems-1], 3, 17), end: new Date(dates[cptItems], 3, 21), className:"green"})
}

//definition des couleurs des items de la frise en changeant leurs classes en des classes css qui modifient leur couleur
        
$(document).ready(()=>{
    var tabId=items.getIds();
    tabId.forEach((item) => {
                
        items.update({id: item, className:"selected-"+resColors[item]}); 
    })
        timeline.redraw()
        timeline.fit()
})


//permet de cacher les cards et de les afficher en fonction de l'id de l'item cliqué de la frise
            

$(document).ready(function(){
    $('.vis-item').on('click',function() {
        var tabId=items.getIds()
        var id = timeline.getSelection();
        tabId.forEach((item) => {
            if(item != id){
                items.update({id:item,className:"not-selected"});
                document.getElementById("cardGestion"+(item+1)).hidden=true;
            } else {
                        
                items.update({id:item,className:"selected-"+resColors[item]});
                document.getElementById("cardGestion"+(item+1)).hidden=false;
            }
        });
                    
    });
    timeline.redraw()
    timeline.fit()
});

        


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
    editable: false,
    stack: false,
    min: new Date(1660, 1, 1),
    max: new Date(1800, 1, 1),
    dataAttributes: ['id']
};


//initialisation de la timeline
var timeline = new vis.Timeline(container);
timeline.setOptions(options);
timeline.setItems(items);


           
            
//génération des cards en fonction des données 
for(var cptCreateCard=0;cptCreateCard<=Object.values(data.nbVersions).length-1;cptCreateCard++){
    document.getElementById("cardList").innerHTML+="<li class=\"nav-item\"><div class=\"card\" id=\"card\"><div class=\"card-body mx-auto\" style=\"background-color:"+resColors[cptCreateCard]+";\"id=\"cardGestion"+(cptCreateCard+1).toString()+"\"><h1 class=\"card-title\">"+Object.values(data.nbVersions)[cptCreateCard]+"</h1><p class=\"card-text\">"+Object.values(data.descriptions)[cptCreateCard]+"</p></div></div></li>"
}
        

//cache toutes les cards

for (var cptCard=1;cptCard<=versions.length;cptCard++){
    document.getElementById("cardGestion"+cptCard).hidden=true;
}

 
//permet  de réinitialiser les couleurs de la frise quand ces dernières sont grisées lors des sélections

function reset_couleurs() {
    var tabId=items.getIds();
    tabId.forEach((item) => {
                
        items.update({id: item, className:"selected-"+resColors[item]}); 
        console.log("selected-"+resColors[item])               
    })
}

//réinitialise le slider de la frise 

function reset_dates(){
    slider.noUiSlider.updateOptions({ start: [anneeMin, anneeMax]})
    options['min'] = new Date(anneeMin, 1, 1)
    options['max'] = new Date(anneeMax, 1, 1)
    timeline.setOptions(options)
    timeline.fit()
}

            

//permet de faire disparaître les items de la listes hors périodes lorque l'on definie des périodes sur le slider
slider.noUiSlider.on('slide',function(){
    var min = slider.noUiSlider.get()[0];
    var max = slider.noUiSlider.get()[1];
    options['min'] = new Date(min, 1, 1);
    options['max'] = new Date(max, 1, 1);
    timeline.setOptions(options);
    timeline.fit();
});

            

            