---
title: Accueil
hide:
  - navigation
  - title
---

# Documentation pour l'application d'outils linguistique


## Description du projet

Ce projet est l'épreuve finale pour mon DEC (diplôme d'étude collégiale) de la technique en informatique au Cégep de Victoriaville.

Ce projet a été réalisé dans le cadre du cours de Projet personnel de la technique avec la contrainte qu'il doit être faisable pour environ 45h.

## Technologies utilisées

### Vite :simple-vite:

J'ai utilisé le générateur Vite pour simplifié la mise en place de l'architecture des fichiers du projet. De plus, Vite est connu pour son respect globale de la sécurité et des dernières normes en programmation avec par exemple Eslint d'intégrer.

### Electron :simple-electron:

J'ai choisi Electron comme backend et cadriciel pour compiler le projet en exécutable, car j'ai déjà produit un projet dans un ancien cours avec celui-ci. De surcroit, dû à la limite de temps, je n'ai pas voulu prendre Tauri vu que je n'ai jamais produit de logiciel avec ce cadriciel. Et ce malgré connaissance de cause que probablement Tauri aurait été plus léger et adapté à la taille de ce projet.

### React :simple-react:

J'ai choisi comme frontend React,car c'est le cadriciel frontal avec lequel que j'ai le plus travaillé récement et qui est celui que je maitrise le mieux pour les technologies web. De plus, il y a la bibliothèque nommée [MUI](https://mui.com/) qui offre des composants React déjà stylisés pour rendre un rendu d'interface propre plus rapidement.

### TypeScript :material-language-typescript:

Par défaut la génération d'Electron avec React de Vite mets en place TypeScript. Cependant, c'est aussi un choix de mon côté pour prendre ce langage de programmation au lieu de JavaScript. En effet, TypeScript permets d'avoir une meilleur stabilité sur le long terme avec la détections d'erreur et de typage strict.

### Ollama :simple-ollama:

J'ai décidé d'utiliser les services et l'API locaux d'Ollama pour utiliser faire tourner les outils linguistiques localement, sans besoins à une connection internet (lorsque les installations sont terminées) et 100% privée.