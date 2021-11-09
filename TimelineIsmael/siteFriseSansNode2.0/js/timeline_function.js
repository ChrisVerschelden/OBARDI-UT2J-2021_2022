let url = 'https://chrisverschelden.github.io/jsonProvider/data.json';

function printJson(url) {
    var res = []
    fetch(url)
        .then(res => res.json())
        .then((out) => {
            var elt = out[70]
            console.log('Checkout this JSON! ', JSON.stringify(elt));
            console.log(elt.name)


            var versions = [];
            var dates = []

            for (var cptElt = 0; cptElt <= elt.intervals.length - 1; cptElt++) {
                versions.push(elt.intervals[cptElt].uri)
                if (dates.includes(elt.intervals[cptElt].begin) !== true) {
                    dates.push(elt.intervals[cptElt].begin)

                }

                dates.push(elt.intervals[cptElt].end)


            }


            const data2 = {
                nom: elt.name,
                nbVersions: versions,
                datesPeriodes: dates
            };
            const data = {
                ville: elt.name,

                nbVersions: {
                    titre: "toulouse V1",
                    titre2: "toulouse V2",
                    titre3: "toulouse V3",
                    titre4: "toulouse V4",
                    titre5: "toulouse V5",
                    titre6: "toulouse V6",
                    titre7: "toulouse V7",
                    titre8: "toulouse V8"


                },

                descriptions: {
                    texte1: "ceci est première version de toulouse",
                    texte2: "seconde version de toulouse",
                    texte3: "troisième version de toulouse",
                    texte4: "quatrième version de toulouse",
                    texte5: "cinquième version de toulouse",
                    texte6: "sixième version de toulouse",
                    texte7: "septième version de toulouse",
                    titre8: "huitième version de toulouse"



                },

                dates: {
                    dateInitiale: 1661,
                    dateFinPeriode1: 1680,
                    dateFinPeriode2: 1710,
                    dateFinPeriode3: 1732,
                    dateFinPeriode4: 1750,
                    dateFinPeriode5: 1762,
                    dateFinPeriode6: 1769,
                    dateFinPeriode7: 1778,
                    dateFinale: 1789
                }
            }


            var colorListButton = ["chartreuse", "deepSkyBlue", "yellow", "red", "cyan", "orange", "purple", "orangeRed"]

            //liste des couleurs générées aléatoirement en fonction du nombre de données
            var resColors = []
            for (var i = 0; i <= data2.nbVersions.length - 1; i++) {
                var resRandom = colorListButton[Math.floor(Math.random() * (colorListButton.length))]

                if (resColors.includes(resRandom) !== true) {
                    resColors.push(resRandom)

                } else {
                    var randomRes2 = Math.floor(Math.random() * (colorListButton.length));
                    while (resColors.includes(colorListButton[randomRes2]) === true) {
                        randomRes2 = Math.floor(Math.random() * (colorListButton.length))
                    }
                    resColors.push(colorListButton[randomRes2])
                }
            }

            // create a dataset with items
            // note that months are zero-based in the JavaScript Date data, so month 3 is April
            var items = new vis.DataSet([

            ]);

            for (var cptItems = 1; cptItems <= data2.nbVersions.length; cptItems++) {

                items.add({ id: cptItems - 1, group: 1, content: data2.nbVersions[cptItems - 1], start: new Date(data2.datesPeriodes[cptItems - 1], 3, 17), end: new Date(data2.datesPeriodes[cptItems], 3, 21), className: "green" })
            }

            $(document).ready(() => {
                var tabId = items.getIds();
                tabId.forEach((item) => {

                    items.update({ id: item, className: "selected-" + colorListButton[item] });
                })
                timeline.redraw()
                timeline.fit()
            })




            $(document).ready(function() {

                $('.vis-item').on('click', function() {
                    var tabId = items.getIds()
                    var id = timeline.getSelection();

                    tabId.forEach((item) => {

                        if (item != id) {
                            items.update({ id: item, className: "not-selected" });
                            document.getElementById("cardGestion" + (item + 1)).hidden = true;
                        } else {

                            window.open("VisTimeline.html" + "?id=" + item, '_blank').focus();
                            console.log(item)


                            items.update({ id: item, className: "selected-" + colorListButton[item] });


                            /*
                            dateDeb+=elt.intervals[url[url.length-1]].begin;
                            dateFin+=elt.intervals[url[url.length-1]].end;
                            */

                        }

                    });

                });





            });


            $(document).ready(() => {
                const url = window.location.href;
                var res = parseInt(url[url.length - 1]);
                console.log(isNaN(res))
                if (isNaN(res) === true) {
                    console.log("pas d\' élément sélectionné")
                } else {
                    console.log(res)
                    var paramsPage = {
                        groupOrder: function(a, b) {
                            return a.value - b.value;
                        },
                        editable: false,
                        stack: false,
                        min: new Date(elt.intervals[res].begin, 1, 1),
                        max: new Date(elt.intervals[res].end, 1, 1),
                        dataAttributes: ['id']

                    }


                    slider.noUiSlider.updateOptions({ start: [elt.intervals[res].begin, elt.intervals[res].end] });
                    document.getElementById("cardGestion" + (res + 1).toString()).hidden = false;

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
                groupOrder: function(a, b) {
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


            for (var cptCreateCard = 0; cptCreateCard <= data2.nbVersions.length - 1; cptCreateCard++) {
                document.getElementById("cardList").innerHTML += "<li class=\"nav-item\"><div class=\"card\" id=\"card\"><div class=\"card-body mx-auto\" style=\"background-color:" + colorListButton[cptCreateCard] + ";\"id=\"cardGestion" + (cptCreateCard + 1).toString() + "\"><h1 class=\"card-title\">" + data2.nbVersions[cptCreateCard] + "</h1><p class=\"card-text\"> version numero " + (cptCreateCard + 1).toString() + " de " + elt.name + "</p></div></div></li>"
            }


            for (var cptCard = 1; cptCard <= data2.nbVersions.length; cptCard++) {
                document.getElementById("cardGestion" + cptCard).hidden = true;
            }




            function reset_couleurs() {
                var tabId = items.getIds();
                tabId.forEach((item) => {

                    items.update({ id: item, className: "selected-" + resColors[item] });
                    console.log("selected-" + resColors[item])
                })
            }




            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }

            document.getElementById('visualization').onclick = function(event) {
                var props = timeline.getEventProperties(event)
            }

            slider.noUiSlider.on('slide', function() {
                var min = slider.noUiSlider.get()[0];
                var max = slider.noUiSlider.get()[1];
                options['min'] = new Date(min, 1, 1);
                options['max'] = new Date(max, 1, 1);
                timeline.setOptions(options);
                timeline.fit();
            });



        })
        .catch(err => { throw err });

}

j = printJson(url);
console.log(j)


var slider = document.getElementById('slider');
var sliderval = document.getElementById('slidervalue');


var anneeMin = 1660;
var anneeMax = 1800;

// Configuration for the Timeline
var options = { stack: true, min: anneeMin + '-01-01', max: anneeMax + '-01-01' };



function reset_dates() {
    console.log("lol")
    slider.noUiSlider.updateOptions({ start: [anneeMin, anneeMax] })
    options['min'] = new Date(anneeMin, 1, 1)
    options['max'] = new Date(anneeMax, 1, 1)
    timeline.setOptions(options)
    timeline.fit()

}