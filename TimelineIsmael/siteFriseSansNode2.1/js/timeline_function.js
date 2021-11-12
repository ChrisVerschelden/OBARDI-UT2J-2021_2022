
//url où est généré le Json (myJSON)
let url = 'https://chrisverschelden.github.io/jsonProvider/data.json';

//requete permettant de récupérer le JSON 
var req=new XMLHttpRequest();
req.open('GET',url)
req.onload=function(){
    var res=JSON.parse(req.responseText);
    frise(res[70])
}
req.send()

//fonction traitant les données du JSON
function frise(res){


    var versions=[]
    var dates=[]
    var nom=res.name;



    //ajout dans les tableaux dates et versions des dates et des versions contenues dans le JSON
    for (var cptElt=0;cptElt<=res.intervals.length-1;cptElt++){
        versions.push(res.intervals[cptElt].uri)
            if (dates.includes(res.intervals[cptElt].begin)!==true){
                dates.push(res.intervals[cptElt].begin)
                
            }
           
            dates.push(res.intervals[cptElt].end)
    }
    
    //objet permettant de synthétiser les données du JSON
    var data2={
        nbVersions:versions,
        datesPeriodes:dates,
        nomLieu:nom
        
    };

    //liste des couleurs potentielles des items de la frise
    var colorListButton=["chartreuse","deepSkyBlue","yellow","red","cyan","orange","purple","orangeRed"]
    
                
    // create a dataset with items
    // note that months are zero-based in the JavaScript Date data, so month 3 is April
    var items = new vis.DataSet([]);
    
    for (var cptItems=1;cptItems<=data2.nbVersions.length;cptItems++){                    
        items.add({id: cptItems-1, group: 1, content: data2.nbVersions[cptItems-1], start: new Date(data2.datesPeriodes[cptItems-1], 3, 17), end: new Date(data2.datesPeriodes[cptItems], 3, 21), className:"green"})
    }
            
    $(document).ready(()=>{
        var tabId=items.getIds();
        tabId.forEach((item) => {
                    
            items.update({id: item, className:"selected-"+colorListButton[item]}); 
        })
        timeline.redraw()
        timeline.fit()
    })
    
                
                
    //fonction permettant d'ouvrir une nouvelle page avec pour caractère final l'id de l'item cliqué
    $(document).ready(function(){
                    
        $('.vis-item').on('click',function() {
            var tabId=items.getIds()
            var id = timeline.getSelection();
                        
            tabId.forEach((item) => {
                           
                if(item != id){
                    items.update({id:item,className:"not-selected"});
                    document.getElementById("cardGestion"+(item+1)).hidden=true;
                } else {
                                
                    window.open("VisTimeline.html"+"?id="+item, '_blank').focus();   
                    items.update({id:item,className:"selected-"+colorListButton[item]});
                                    
                }
                            
            });   
        });
                        
    });
    
    //fonction permettant le zoom sur l'item cliqué 
    $(document).ready(()=>{
        const url=window.location.href;
        var resWindow=parseInt(url[url.length-1]);
        
        if (isNaN(resWindow)===true){
            console.log("pas d\' élément sélectionné")
        }
        else{
            var paramsPage={
                groupOrder: function (a, b) {
                    return a.value - b.value;    
                },
                editable: false,
                stack: false,
                min: new Date(res.intervals[resWindow].begin, 1, 1),
                max: new Date(res.intervals[resWindow].end, 1, 1),
                dataAttributes: ['id']
                                
            }
                        
                        
            slider.noUiSlider.updateOptions({ start: [res.intervals[resWindow].begin, res.intervals[resWindow].end]});
            document.getElementById("cardGestion"+(resWindow+1).toString()).hidden=false;
                                                         
        }
        timeline.setOptions(paramsPage);
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
    
    
    
                
    // permet de créer les cartes d'information à l'aide des données du JSON  s'affichant après zoom sur l'item
    for(var cptCreateCard=0;cptCreateCard<=data2.nbVersions.length-1;cptCreateCard++){
        document.getElementById("cardList").innerHTML+="<li class=\"nav-item\"><div class=\"card\" id=\"card\"><div class=\"card-body mx-auto\" style=\"background-color:"+colorListButton[cptCreateCard]+";\"id=\"cardGestion"+(cptCreateCard+1).toString()+"\"><h1 class=\"card-title\">"+data2.nbVersions[cptCreateCard]+"</h1><p class=\"card-text\"> version numero "+(cptCreateCard+1).toString()+" de "+data2.nomLieu+"</p></div></div></li>"
    }
            
     //permet de cacher les cartes crées       
    for (var cptCard=1;cptCard<=data2.nbVersions.length;cptCard++){
        document.getElementById("cardGestion"+cptCard).hidden=true;
    }
    
        
                
                
                
                
                
     // création du slider           
    var slider = document.getElementById('slider');
    var sliderval = document.getElementById('slidervalue');

                   
    var anneeMin = 1660;
    var anneeMax = 1800;
                
    // Configuration for the Timeline
    var options = {stack : false, min : anneeMin+'-01-01', max : anneeMax+'-01-01'};
                
                
                
    // fonction permettant l'ajustement de la frise via l'utilisation su slider            

    slider.noUiSlider.on('slide',function(){
        var min = slider.noUiSlider.get()[0];
            var max = slider.noUiSlider.get()[1];
            options['min'] = new Date(min, 1, 1);
            options['max'] = new Date(max, 1, 1);
            timeline.setOptions(options);                       
            timeline.redraw();
            timeline.fit();
        });
            
    document.getElementById("bouttonDates").addEventListener("click",reset_dates)

    // fonction permettant de réinitialiser la frise en remettant les dates initiales
    function reset_dates(){
        slider.noUiSlider.updateOptions({ start: [anneeMin, anneeMax]})
        options['min'] = new Date(anneeMin, 1, 1)
        options['max'] = new Date(anneeMax, 1, 1)
        timeline.setOptions(options)
        timeline.redraw()
        timeline.fit()
                                
    }

}








