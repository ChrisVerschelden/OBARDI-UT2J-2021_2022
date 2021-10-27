


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
    

    res.render("VisTimeline",{object:data});

});



app.listen(3000,()=>{
    console.log("connexion au serveur effectuée");
});


