---
title: Accueil
description: Documentation pour l'application d'outils linguistique.
hide:
  - navigation
  - title
---

![Logo](icon-512.png){  width="100" height="100" }

# Documentation pour l'application d'outils linguistiques


## Description du projet

Ce projet constitue l'épreuve finale de mon DEC (diplôme d'études collégiales) en technique informatique au Cégep de Victoriaville.

Il a été réalisé dans le cadre du cours de Projet personnel de la technique, avec pour contrainte qu'il soit réalisable en environ 45 heures.

## Technologies utilisées

### Vite :simple-vite:

J'ai utilisé le générateur Vite pour simplifier la mise en place de l'architecture des fichiers du projet. Vite est également reconnu pour son respect des normes de sécurité et des standards modernes en programmation, notamment grâce à l'intégration native d'outils comme ESLint.

### Electron :simple-electron:

J'ai opté pour Electron en tant que backend et framework pour compiler le projet en exécutable. Ce choix s'explique par mon expérience préalable avec cet outil dans un projet antérieur. Par ailleurs, compte tenu des contraintes de temps, j'ai préféré ne pas utiliser Tauri, bien que ce dernier aurait probablement été plus léger et mieux adapté à la taille de ce projet.

### React :simple-react:

Pour le frontend, j'ai choisi React, le framework avec lequel j'ai le plus d'expérience récente et que je maîtrise le mieux pour le développement web. De plus, la bibliothèque [MUI](https://mui.com/) offre des composants React pré-stylisés, permettant de concevoir une interface utilisateur propre et professionnelle plus rapidement.

### TypeScript :material-language-typescript:

La génération d'un projet Electron avec React via Vite inclut par défaut TypeScript. Ce choix est également délibéré de ma part, car TypeScript offre une meilleure stabilité à long terme grâce à son typage strict et à sa capacité à détecter les erreurs de manière proactive.

### Ollama :simple-ollama:

J'ai choisi d'utiliser les services et l'API locaux d'Ollama pour exécuter les outils linguistiques directement sur la machine, sans nécessiter de connexion Internet (une fois les installations terminées) et en garantissant une confidentialité totale.