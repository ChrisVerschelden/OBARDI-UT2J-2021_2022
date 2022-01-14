# Table des matières

1. [OBARDI-UT2J-2021_2022](#obardi-ut2j-2021_2022)
    1. [Contexte](#contexte)
    2. [Qui sommes-nous ?](#qui-sommes-nous-?)
    3. [Notre client](#notre-client)
2. [Le graphique des UT](#le-graphique-ut)
    1. [Documentation utilisateur](#documentation-utilisateur)
    2. [Documentation Technique](#documentation-technique)
        1. [Librairies utilisées](#librairies-utilisées)
        2. [Importation des données](#importation-des-données)
3. [Tests sur navigateur](#tests-sur-navigateur)
4. [Choix techniques et design](#choix-techniques-et-design)
    1. [Etat de l'art](#etat-de-l-art)


# OBARDI-UT2J-2021_2022

<br>

## Contexte
Le projet Obardi est un projet de recherche interdisciplinaire qui a pour objectif d’aider les historiens à analyser l’évolution des unités territoriales pendant l'Ancien régime. Un site Web a été réalisé pour mettre en évidence les informations recueillies sur ces unités territoriales. Le but de projet tutoré est de mettre en place dans une application Web une frise permettant de visualiser et d’analyser les différentes périodes sur lesquelles une unité territoriale à évoluer.

## Qui sommes-nous ? 
Nous sommes six étudiants en Informatique à l’université Jean Jaurès. Dans le cadre de notre formation, nous sommes amenés à donner 8 semaines de notre temps à la création d’un projet tuteuré qui porte sur la création d’une frise web.

## Notre client
Notre client Lucas Bourel fait partie du projet Obardi et souhaite que nous créions une frise web afin d’aider les historiens à analyser l’évolution des unités territoriales pendant l’Ancien Régime.

<br>

# Le graphique des UT

[site de démonstration](https://chrisverschelden.github.io/OBARDI-UT2J-2021_2022/)

## Documentation utilisateur

- Se déplacer sur le graphique à la souris

Pour se déplacer sur le graphique, il suffit de cliquer et maintenir en déplaçant sa souris dans le cadre.


- Se déplacer sur le graphique avec les boutons

Pour se déplacer avec les boutons, vous pouvez utiliser les 4 boutons directionnels, les boutons + et -, ainsi que celui permettant de re-centrer le graphique.


- Zoomer/dézoomer sur le graphique

Pour zoomer ou dézoomer sur le graphique, il est possible de placer la souris dans le graphique et d'utiliser la molette de la souris vers l’avant ou l’arrière.


- Retracter/Etendre les noeud sur le graphique

Pour étendre un noeud il suffit de cliquer dessus, et pour le retracter, il faut cliquer dessus une deuxième fois après l'avoir sélectionné.


- Mettre en évidence un noeud

L’utilisateur pourra mettre en évidence un noeud en cliquant sur celui-ci.


- Sélectionner une periode 

Pour sélectionner une periode, il suffit de déplacer le slider sur les valeurs souhaitées.


## Documentation technique

### Librairies utilisées
(voir "Etat de l'art" dans la section "Choix techniques et design")
* Vis-network.js  
    Vis-network.js est la librairie principale pour faire fonctionner le graphique

    ```html

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

Pour pouvoir importer des données, veuillez lancer GraphDB, importer vos données et créer un repertoire de travail nommé "test" qui devra être celui actif au moment du test.


# Tests sur navigateur


# Choix techniques et design


## Etat de l'art


BALDE Ismaila-COSTES Lou-Anne - FEZZANI Ismael- JEANJEAN Cédric -TRINH Williams -VERSCHELDEN Chris
