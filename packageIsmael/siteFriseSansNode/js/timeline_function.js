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


var colorListButton=["chartreuse","deepSkyBlue","yellow","red","cyan","orange","purple","orangeRed",""]
var resColors=[]
for(var i=0;i<=Object.values(data.nbVersions).length-1;i++) { 
    var resRandom=colorListButton[Math.floor(Math.random()*(colorListButton.length-1))] 
          
    if(resColors.includes(resRandom)!==true) {
        resColors.push(resRandom)   
                  
    }else{ 
        var randomRes2=Math.floor(Math.random()*(colorListButton.length-1)); 
        while (resColors.includes(colorListButton[randomRes2])===true){ 
            randomRes2=Math.floor(Math.random()*(colorListButton.length-1)) 
        }
        resColors.push(colorListButton[randomRes2])  
    }                                              
}  

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
            

            var colorListButton=["chartreuse","deepSkyBlue","yellow","red","cyan","orange","orangeRed","purple"]
            var colors=[]
            
            //ajout des couleurs rendues précédemment dans le tableau resColors généré par ejs
            for(var cptResColors=0;cptResColors<=resColors.length-1;cptResColors++){
                colors.push(resColors[cptResColors]);
            }
        
            
            // create a dataset with items
            // note that months are zero-based in the JavaScript Date data, so month 3 is April
            var items = new vis.DataSet([
    
            ]);

            for (var cptItems=1;cptItems<=versions.length;cptItems++){
                
                items.add({id: cptItems-1, group: 1, content: versions[cptItems-1], start: new Date(dates[cptItems-1], 3, 17), end: new Date(dates[cptItems], 3, 21), className:"green"})
            }
        
            $(document).ready(()=>{
                var tabId=items.getIds();
                tabId.forEach((item) => {
                
                    items.update({id: item, className:"selected-"+colors[item]}); 
                })
                timeline.redraw()
                timeline.fit()
            })

            

            $(document).ready(function(){
                $('.vis-item').on('click',function() {
                    var tabId=items.getIds()
                    var id = timeline.getSelection();
                    tabId.forEach((item) => {
                        if(item != id){
                            items.update({id:item,className:"not-selected"});
                            document.getElementById("cardGestion"+(item+1)).hidden=true;
                        } else {
                        
                            items.update({id:item,className:"selected-"+colors[item]});
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

            var timeline = new vis.Timeline(container);
            timeline.setOptions(options);
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
            

            for(var cptCreateCard=0;cptCreateCard<=Object.values(data.nbVersions).length-1;cptCreateCard++){
                document.getElementById("cardList").innerHTML+="<li class=\"nav-item\"><div class=\"card\" id=\"card\"><div class=\"card-body mx-auto\" style=\"background-color:"+colors[cptCreateCard]+";\"id=\"cardGestion"+(cptCreateCard+1).toString()+"\"><h1 class=\"card-title\">"+Object.values(data.nbVersions)[cptCreateCard]+"</h1><p class=\"card-text\">"+Object.values(data.descriptions)[cptCreateCard]+"</p></div></div></li>"
            }
        
        
            for (var cptCard=1;cptCard<=versions.length;cptCard++){
                document.getElementById("cardGestion"+cptCard).hidden=true;
            }

 
 

            function reset_couleurs() {
                var tabId=items.getIds();
                tabId.forEach((item) => {
                
                    items.update({id: item, className:"selected-"+colors[item]}); 
                    console.log("selected-"+colors[item])               
                })
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

            slider.noUiSlider.on('slide',function(){
                var min = slider.noUiSlider.get()[0];
                var max = slider.noUiSlider.get()[1];
                options['min'] = new Date(min, 1, 1);
                options['max'] = new Date(max, 1, 1);
            timeline.setOptions(options);
            timeline.fit();
            });

            

            