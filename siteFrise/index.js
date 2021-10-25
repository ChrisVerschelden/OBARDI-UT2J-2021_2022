
document.getElementById("button1").addEventListener("click",()=>{
    document.getElementById("card1").hidden=false;
    document.getElementById("card2").hidden=true;
    document.getElementById("card3").hidden=true;
})

document.getElementById("button2").addEventListener("click",()=>{
    document.getElementById("card1").hidden=true;
    document.getElementById("card2").hidden=false;
    document.getElementById("card3").hidden=true;
})

document.getElementById("button3").addEventListener("click",()=>{
    document.getElementById("card1").hidden=true;
    document.getElementById("card2").hidden=true;
    document.getElementById("card3").hidden=false;
})

