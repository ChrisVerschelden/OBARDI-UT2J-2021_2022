


const express=require("express");

const app=express();

const ejs=require("ejs");

const https=require("https");


app.set("view engine","ejs");

app.use(express.static("public"));



app.get("/",(req,res)=>{   

    const data={
        ville:"toulouse",

        nbVersions:{
            titre:"toulouse V1",
            titre2:"toulouse V2",
            titre3:"toulouse V3",
            titre4:"toulouse V1",
            titre5:"toulouse V2",
            titre6:"toulouse V3"
            

        },
    
        descriptions:{
            texte1:"ceci est première version de toulouse",
            texte2:"seconde version de toulouse",
            texte3:"troisième version de toulouse",
            texte4:"ceci est première version de toulouse",
            texte5:"seconde version de toulouse",
            texte6:"troisième version de toulouse",
            


        },

        dates:{
            dateInitiale:1661,          
            dateFinPeriode1:1670,
            dateFinPeriode2:1710,
            dateFinPeriode3:1670,
            dateFinPeriode4:1710,
            dateFinale:1789
        }
    }
    

    res.render("index",{object:data});

});



app.listen(3000,()=>{
    console.log("connexion au serveur effectuée");
});


