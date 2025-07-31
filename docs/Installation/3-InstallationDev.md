# Installation en environnement de développement


## Prérequis

- [NodeJS](https://nodejs.org/fr){: target="_blank"}
    - Version recommandée/utilisée: *22.13.1*
- [Git](https://git-scm.com/downloads){: target="_blank"}
- [Ollama](https://ollama.com/download){: target="_blank"}
- [Npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm){: target="_blank"}


## Récupérer le repo

1. Lancer Git dans un terminal au dossier que vous souhaitez mettre le code.
```sh title="Terminal"
git clone https://github.com/ZaMeR12/outils-linguistique.git
```
2. Installer les dépendances avec Npm.
```sh title="Terminal"
npm install
```

### Lancer l'environnement de développement

```sh title="Terminal"
npm run dev
```

### Construire l'installateur de l'exécutable

!!! info
    Vous pouvez produire des versions **Linux**, **Windows** et **Mac** de l'application. Cependant, vous avez besoin de lancer la construction de l'installateur avec l'OS que vous souhaitez construire.

!!! warning "Attention"
    La construction de l'installateur a été testé principalement pour **Windows**. Donc, il se peut que vous ayez besoin de modifier quelques informations dans le fichier **electron-builder.json5**. 
    
    De plus, **Mac** nécessite certaines clés de licence d'Apple pour pouvoir produire l'installateur correctement.

Pour compiler le .deb sur linux vous devez installer les dépendances suivantes:

- `ruby`
- `gem`
- `fpm` (par gem de ruby)


```sh title="Terminal"
npm run build
```

## Branches du repos

| Nom | Utilité |
|:--- | ---: |
| main | Branche principale du repo |
| dev | Banche de développement |
| docs | Branche de développement de la documentation|
| gh-pages | Branche du déploiement de la documentaion |