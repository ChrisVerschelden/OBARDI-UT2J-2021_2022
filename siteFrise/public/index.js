

var colors=[];

for(let i=1;i<=parseInt(document.getElementById("nbGen").textContent);i++){
    colors.push(document.getElementById("button"+i.toString()).style.backgroundColor)
}

console.log(colors)

var cptButton=parseInt(document.getElementById("nbGen").textContent);




while(1<=cptButton){
    if (document.body.contains(document.getElementById("button"+cptButton.toString()))){
        document.getElementById("button"+cptButton.toString()).addEventListener("click",(e)=>{            
            for(var cptCard=colors.length;1<=cptCard;cptCard--){
                
                console.log(cptCard+":"+parseInt(e.target.id.slice(6)));
                console.log(cptCard===parseInt(e.target.id.slice(6)));
                if(cptCard===parseInt(e.target.id.slice(6))){
                    console.log(colors[cptCard-1])
                    document.getElementById("cardGestion"+cptCard.toString()).style.backgroundColor=colors[cptCard-1];
                }
                else{
                    document.getElementById("cardGestion"+cptCard.toString()).style.backgroundColor="grey";
                }
                
            }
            
        });
    }
   
    cptButton-=1;
    
}

document.getElementById("reset").addEventListener("click",()=>{
    for(var j=1;j<=colors.length;j++){
        document.getElementById("cardGestion"+j.toString()).style.backgroundColor=colors[j-1];
    }
    console.log("modification effectuée")
})

