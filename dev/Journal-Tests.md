# Liste des tests fonctionnels


## Interface 

### Navigation

- [x] Affichage graphique dynamique qui indique la bonne page lors d'une redirection interne
- [ ] Les redirections mènent tous vers de pages existantes 
- [ ] La navigation ne devrait pas être possible sauf sur la page principale s'il y a une erreur de connexion avec Ollama.
- [x] Au changement de page le cache de la réponse d'Ollama dans l'application est effacée.
- [x] Si la barre de navigation dépasse la hauteur de la fenêtre, elle deviens une zone a défilement séparée pour éviter un défilement générale (sur le body de la page)

## Paramètres

### Ollama

- [x] Message d'erreur s'affiche partout lorsqu'il y a des problèmes avec la connexion d'Ollama
- [x] L'application se souvient des modèles sélectionnés pour chaque outil et sa température
	- [x] Après fermeture de l'application
	- [x] Lors de changement de page
- [x] L'application se souvient de l'URL de l'api d'Ollama
	- [x] Après fermeture de l'application
	- [x] Lors de changement de page

## Fonctionnalités

### Traducteur

- [x] Prends en compte le contexte régional et culturel de même langue sur un modèle qui le supporte (Vera 2.1)
- [x] L'application se souvient du dernier texte à traduire inscrit par l'utilisateur
	- [x] Après fermeture de l'application
	- [x] Lors de changement de page
- [x] L'application se souvent de la dernière traduction demandée par l'utilisateur
	- [x] Après fermeture de l'application
	- [x] Lors de changement de page
- [x] Le bouton **Traduire** génère une réponse d'Ollama pour la traduction
	- [x] Le bouton est désactivé lorsqu'Ollama génère sa réponse
	- [x] Le bouton fait rien si l'utilisateur n'a pas mis de texte à traduire
	- [x] Seulement la nouvelle traduction est affichée
- [x] Le bouton **Nettoyer** efface en mémoire le dernier texte à traduire et la dernière traduction
	- [x] Le bouton est désactivé lorsqu'Ollama génère sa réponse
- [x] Le bouton **Arrêter la réponse** arrête la génération de la réponse d'Ollama
	- [x] Le bouton est désactivé lorsqu'Ollama ne génère pas de réponse présentement
- [x] Le champs texte du texte à traduire s'actualise automatiquement
	- [x] Il n'est pas modifiable lors de la génération d'une réponse d'Ollama
	- [x] Le champ peut être agrandi pour facilité de la lecture.
- [x] Le champs texte de la traduction s'actualise après la génération de la réponse d'Ollama
	- [x] Il n'est pas modifiable par l'utilisateur
	- [x] Le champ peut être agrandi pour facilité de la lecture.
- [x] Si la zone de traduction dépasse la hauteur de la fenêtre, elle deviens une zone a défilement séparée pour éviter un défilement générale (sur le body de la page)
- [x] L'application se souvent du dernier choix de la langue d'origine de la traduction
	- [x] Après fermeture de l'application
	- [x] Lors de changement de page
- [x] L'application se souvent du dernier choix de la langue de traduction
	- [x] Après fermeture de l'application
	- [x] Lors de changement de page
## Compilation

- [ ] Capable de construire l'installateur du premier livrable
- [ ] Capable de construire l'installateur du deuxième livrable