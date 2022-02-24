

function testerRadio() {
    var elements =[];
    elements.push(document.getElementById("element"));
    elements.push(document.getElementById("niveau"));

    elements.forEach(e => {
        if (e.checked){
            console.log(e.value);
        }
        
    });
    
  }


