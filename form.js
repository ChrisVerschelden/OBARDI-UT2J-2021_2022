

function testerRadio() {
    var elements =[];
    elements.push(document.getElementById("element"));
    elements.push(document.getElementById("niveau"));

    elements.forEach(e => {
        if (e.checked && e.value === 'element'){
            console.log(e.value);
            document.getElementById('furtive').style.display = "block";
        } else if (e.checked) {
            console.log("hey")
            document.getElementById('furtive').style.display = "none";
        }
        
    });  
    
  }

document.getElementById("niveau").addEventListener('click', () => {
    console.log('yo');
    document.getElementById('furtive').style.display = "block";
    document.getElementById('nomUnite').style.display = "none";
    document.getElementById('furtive').innerHTML = '<select name="niveau" id="niveau-select"><option value="generalites">Généralités</option><option value="elections">Elections</option><option value="paroisses">Paroisses</option></select>';
})

document.getElementById("element").addEventListener('click', () => {
    console.log('ya');
    document.getElementById('furtive').style.display = "block";
    document.getElementById('nomUnite').style.display = "block";

    document.getElementById('furtive').innerHTML = ' <select name="element" id="element-select"><option value="e1">e1</option><option value="e2">e2</option><option value="e3">e3</option></select>';
})


