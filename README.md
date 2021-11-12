Liens vers ces informations sous forme de documents individuels:

[Documentation technique](https://docs.google.com/document/d/17fuz92WkovtW9EhOZAYqz8fv3NqDdExkeeilsL_BOrg/edit?usp=sharing)

[Manuel utilisateur](https://docs.google.com/document/d/1313UfUvu5JMydGfskpcGC2aoPb3ukhzSo4ToIS74r6w/edit?usp=sharing)

[Etat de l'art](https://docs.google.com/spreadsheets/d/1Qmp_tiZh09-4FGok3-u5c-aASvjVbPiT-ug5-PIHYd0/edit?usp=sharing)


# Table des matières

1. [OBARDI-UT2J-2021_2022](#obardi-ut2j-2021_2022)
    1. [Contexte](#contexte)
    2. [Qui sommes-nous ?](#qui-sommes-nous-?)
    3. [Notre client](#notre-client)
2. [La frise chronologique](#la-frise-chronologique)
    1. [Documentation utilisateur](#documentation-utilisateur)
    2. [Documentation Technique](#documentation-technique)
        1. [Librairies utilisées](#librairies-utilisées)
        2. [Importation des données](#importation-des-données)
3. [Tests sur navigateur](#tests-sur-navigateur)
4. [Choix techniques et design](#choix-techniques-et-design)
    1. [Etat de l'art](#etat-de-l-'-art)


# OBARDI-UT2J-2021_2022

<br>

## Contexte
Le projet Obardi est un projet de recherche interdisciplinaire qui a pour objectif d’aider les historiens à analyser l’évolution des unités territoriales pendant l'Ancien régime. Un site Web a été réalisé pour mettre en évidence les informations recueillies sur ces unités territoriales. Le but de projet tutoré est de mettre en place dans une application Web une frise permettant de visualiser et d’analyser les différentes périodes sur lesquelles une unité territoriale à évoluer.

## Qui sommes-nous ? 
Nous sommes six étudiants en Informatique à l’université Jean Jaurès. Dans le cadre de notre formation, nous sommes amenés à donner 8 semaines de notre temps à la création d’un projet tuteuré qui porte sur la création d’une frise web. 
Le groupe est composé de 6 magnifiques personnes.

## Notre client
Notre client Lucas Bourel fait partie du projet Obardi et souhaite que nous créions une frise web afin d’aider les historiens à analyser l’évolution des unités territoriales pendant l’Ancien Régime.

<br>

# La frise chronologique

[site de démonstration](https://chrisverschelden.github.io/OBARDI-UT2J-2021_2022/)

## Documentation utilisateur

- Se déplacer sur la frise

Pour se déplacer sur la frise, il suffit d’attraper la frise en cliquant et se déplaçant en même temps vers la droite ou vers la gauche. 

- Zoomer/dézoomer sur la frise 

Pour zoomer ou dézoomer sur la frise, il est possible de placer la souris dans la frise et de scroller vers l’avant ou l’arrière.


![zoomer et se déplacer sur la frise](https://media.giphy.com/media/CrTQ7r0OwwYwMHF6uN/giphy.gif)

- Re définir les bornes temporelles 

Il est possible pour l’utilisateur grâce à un slider de choisir une période de temps en particulier. Il suffit de prendre chaque extrémité du slider bleu et de les déplacer soit vers la droite soit vers la gauche.


![redimensionner la frise](https://media.giphy.com/media/Dz2mOh68QvOxBAeGTL/giphy.gif)

- Mettre en évidence une nouvelle période

L’utilisateur pourra mettre en évidence une nouvelle période en utilisant le slider jaune. Pour ce faire, il faudra faire comme avec le slider bleu. 


![mettre en valeur](https://media.giphy.com/media/ndEaLJv56kL8t0EJSa/giphy.gif)

- Sélectionner une version 

Pour sélectionner une version, il suffit de cliquer sur une période qui nous renverra sur une nouvelle page qui contiendra les informations de la version sélectionnée. 


![sélectionner une période](https://media.giphy.com/media/duJYe6eweCLUK2280R/giphy.gif)

## Documentation technique

### Librairies utilisées
(voir "Etat de l'art" dans la section "Choix techniques et design")
* Vis.js  
    Vis.js est la librairie principale pour faire fonctionner la frise chronologique. La documentation se trouve [ici](https://visjs.github.io/vis-timeline/docs/timeline/).
    Nous avons choisi de l'importer via son CDN (Content Delivery Network). C’est une bibliothèque de visualisation dynamique basée sur un navigateur. La bibliothèque est conçue pour être facile à utiliser, pour gérer de grandes quantités de données dynamiques et pour permettre la manipulation et l'interaction avec les données. La bibliothèque se compose des composants DataSet, Timeline, Network, Graph2d et Graph3d.

    (voir son importation dans le fichier VisTimeline.html) 

    ```html
    <script src="https://unpkg.com/vis-timeline@latest/standalone/umd/vis-timeline-graph2d.min.js"></script>
    <link href="https://unpkg.com/vis-timeline@latest/styles/vis-timeline-graph2d.min.css" rel="stylesheet"> 
    ```

* NoUiSlider

    NoUiSlider est la librairie qui permet de faire les sliders de la frise chronologique. Elle est actuellement téléchargé dans les dossier du projet, l'utilisation d'un CDN est encore à débattre. Cette librairie prend en charge le Multi-Touch sur les appareils IOS, Android et Windows et ne nécessite aucune dépendance externe. Il n’y a pas de reflow, le slider est donc rapide même sur les appareils les plus anciens. Le slider est également responsive et s’adapte sur tous types de supports.

    (voir son importation dans le fichier VisTimeline.html) 

    ```html
    <link href="../CSS/nouislider.css" rel="stylesheet">
    <link href="../CSS/slider.css" rel="stylesheet">
    <link href="../CSS/stylesheet.css" rel="stylesheet">
    ```

### Importation des données

L’importation des données se fait via un jeu de données JSON . Ce jeu de données représente à l’heure actuelle le seul moyen d’accéder à des données concernant des unités territoriales en absence de moyen d’interagir avec l’API d’Obardi. Les données JSON sont actuellement stocké sur un GITHUB Pages afin de simuler une API/CDN.

[GITHUB Pages](https://chrisverschelden.github.io/jsonProvider/data.json) 


# Tests sur navigateur

<table style="text-align: center;">
    <tr>
        <th> </th> <th> Opera </th> <th> Chrome </th> <th> Firefox </th> <th> Brave </th> <th> Edge </th> <th> Safari </th> <th> Chrome <br> android</th>
    </tr>
    <tr>
        <td> 
            redimensionnement de <br>
            la frise via le slider 1 
        </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
    </tr>
    <tr>
        <td> 
            les nouvelles bornes de la <br>
            frise correspondent à celles <br>
            définies sur le slider 1 <br> 
        </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
    </tr>
    <tr>
        <td> 
            changement de la <br>
            graduation du slider 2 <br>
            en fonction du slider 1 <br>
        </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
    </tr>
    <tr>
        <td> 
            les nouvelles bornes <br>
            du slider 2 <br>
            correspondent à celles <br>
            définies sur le slider 1 <br>
        </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
    </tr>
    <tr>
        <td> 
            le slider 2 créé un item <br>
            orange en backgroun <br>
        </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
    </tr>
    <tr>
        <td> 
            les nouvelles bornes <br>
            de l'item orange <br>
            correspondent à celles <br>
            définies sur le slider 2  <br>
        </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
    </tr>
    <tr>
        <td> 
            Le bouton reset remet <br>
            tout dans l'état d'origine <br>
        </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
    </tr>
    <tr>
        <td> 
            les données sont <br>
            correctement importées <br>
        </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
    </tr>
        <td> 
            ouvrir dans une nouvelle <br>
            page lors d'un clic <br>
        </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
    </tr>
        <td> 
            changer la couleur d'une  <br>
            période sélectionnée <br>
        </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
        <td> ✔️ </td>
    </tr>
</table>

# Choix techniques et design

## Etat de l'art

<br>
<table style="text-align: center;">
    <tr>
        <th> Nom </th> 
        <td> <a href="https://timeline.knightlab.com/"> Knightlab </a> </td>
        <td> <a href="https://ilkeryilmaz.github.io/timelinejs/"> Timeline.js </a> </td>
        <td> <a href="https://avo.alaska.edu/includes/js/timeglider/kitchen_sink.html"> Timeglider </a> </td>
        <td> <a href="https://vuejsexamples.com/a-simple-timeline-component-for-vue/"> Vue-Timeline-Component </a> </td>
        <td> <a href="http://propublica.github.io/timeline-setter/"> Timeline setter </a> </td>
        <td> <a href="http://www.simile-widgets.org/timeline/"> Simile widget timeline </a> </td>
        <td> <a href="https://visjs.github.io/vis-timeline/examples/timeline/"> Vis.js </a> </td>
    </tr>
    <tr>
        <th> Documentation </th>
        <td> Basique </td>
        <td> <a href="https://ilkeryilmaz.github.io/timelinejs/"> Basique </a> </td>
        <td> Inaccessible </td>
        <td> Très basiques (10 lignes) </td>
        <td> <a href="https://http://propublica.github.io/timeline-setter/documentation/index.html"> Basique </a> </td>
        <td> Basique </td>
        <td> <a href="https://visjs.github.io/vis-timeline/docs/timeline/"> Très Détaillée </a> </td>
    </tr>
    <tr>
        <th> Licence </th>
        <td> Licence MLP </td>
        <td> Open Source </td>
        <td> Source fermées </td>
        <td> Open Source </td>
        <td> Open Source </td>
        <td> Licence BSD</td>
        <td> Licence MIT </td>
    </tr>
    <tr>
        <th> Chargement 10/15/100 <br> éléments </th>
        <td> 3s / 3s / 10s   </td>
        <td> <1s / <1s / <1s </td>
        <td> <1s / <1s / <1s </td>
        <td> <1s / <1s / <1s </td>
        <td> <1s / <1s / <1s </td>
        <td> <1s / <1s / <1s </td>
        <td> <1s / <1s / <1s </td>
    </tr>
    <tr>
        <th> Librairies annexes </th>
        <td> Inconnu </td>
        <td> JQuery </td>
        <td> JQuery </td>
        <td> aucune </td>
        <td> TableFu / Underscore / JQuery </td>
        <td> aucune </td>
        <td> aucune </td>
    </tr>
    <tr>
        <th> CRUD des éléments </th> 
        <td> Simple mais pas instantané </td>
        <td> Difficile aucune documentation </td>
        <td> Simple mais pas instantané </td>
        <td> Simple mais pas instantané </td>
        <td> Simple mais pas instantané </td>
        <td> Simple mais pas instantané </td>
        <td> Simple mais est instantané </td>
    </tr>
    <tr>
        <th> Implémentation </th>
        <td> Simple </td>
        <td> Simple(node js) </td>
        <td> Simple </td>
        <td> Simple </td>
        <td> Difficile </td>
        <td> Simple </td>
        <td> Simple </td>
    </tr>
    <tr>
        <th> Implémentation des <br> besoins client</th>
        <td> Impossible ( code non accessible ) </td>
        <td> Difficile(difficultés d'ajout et d'édition)</td>
        <td> Impossible ( code non accessible ) </td>
        <td> Facile </td>
        <td> Difficile(difficultés d'ajout et d'édition) </td>
        <td> Difficile </td>
        <td> Facile </td>
    </tr> 
    <tr>
        <th> Format des <br> données</th>
        <td> Google Spreadsheet </td>
        <td> Json </td>
        <td> Json </td>
        <td> Json </td>
        <td> CSV  </td>
        <td> Json </td>
        <td> Json </td>
    </tr>
    <tr>
        <th> Elément cliquables </th>
        <td> Oui </td>
        <td> Oui </td>
        <td> Oui </td>
        <td> Non </td>
        <td> Oui </td>
        <td> Oui </td>
        <td> Oui </td>
    </tr>
    <tr>
        <th> Commentaires </th>
        <td> </td>
        <td> Documentation peu complètes et difficultées de modification </td>
        <td> Style déjà présent et difficilement modifiable </td>
        <td> Pas assez complet et peu modifiable </td>
        <td> Documentation sur l'installation pas assez précise </td>
        <td> </td>
        <td> Facilement modifiable </td>
    </tr>
</table>

<br>
<br>
<br>
<br>
<br>
<br>

BALDE Ismaila-COSTES Lou-Anne - FEZZANI Ismael- JEANJEAN Cédric -TRINH Williams -VERSCHELDEN Chris