# Traducteur

Le traducteur est un outil qui permet de traduire un texte dans une autre langue en tenant compte des différences linguistiques et culturelles entre les variantes d'une même langue. Il utilise l'intelligence artificielle pour générer des traductions adaptées à la région ou au pays de destination.


!!! warning "Attention"
    Malgré que l'invite système utilisé pour adapté la traduction selon les différences régionales, ce n'est pas tout les modèles de langues qui savent bien faire la différence entre ces variantes.

    Je suggère le modèle [**Vera 2.1**](https://huggingface.co/Dorian2B/Vera-2.1-GGUF){: target="_blank"} qui est adapté avec ces différences linguistiques. Cependant il est disponible seulement sur :simple-huggingface: **Hugging Face**


!!! info 
    Il se peut que les impressions d'écrans ne soient pas 100% à jour sur les éléments qui ne représentent pas la dernière version de l'outil.

## Invite système

!!! quote "Invite système"
    L'invite système utilisé est en anglais pour une meilleur performance et compatibilité avec la majorité des modèles.

    <hr>

    _Translate the following text from ${langue du texte à traduire} to ${langue de traduction}, ensuring strict adherence to all regional and cultural word differences. Pay close attention to linguistic nuances, idiomatic expressions, and vocabulary specific to the target region. For example, Canadian French uses terms like "melon d'eau" instead of "pastèque" in French from France, but this is just one of many differences to consider. Be comprehensive and consistent in applying these distinctions. Only provide the translated text, nothing else: "${texte à traduire}"_
    


## Liste des langues disponibles

- Anglais américian
- Anglais britannique
- Français canadien
- Français de France

## Utilisation


<figure markdown>
  ![Présentation par défaut](trad-defaut.png){ width="1080" }
  <figcaption>Aperçu de l'outil par défaut</figcaption>
</figure>

### Actions


- Le champs de texte à gauche est modifiable pour inscrire le texte que vous souhaitez traduire.
- Le bouton **Traduire** lance la traduction avec Ollama.
- Le bouton **Nettoyer** permet d'effacer le dernier texte à traduire et la dernière traduction.
- Le bouton **Arrêter la réponse** permet d'arrêter Ollama pour la génération de sa réponse.
- Les champs textes sont redimensionnables au besoin.
- Les langues choisies peuvent s'interverser si vous sélectionnez la même langue que son confrère.

### Exemples

<div class="grid cards" markdown>
<figure markdown class="card">
  ![Exemple FR-CA vers FR-FR](trad-exemple-fr_ca-fr.png){ width="1080" }
  <figcaption>Modèle: Vera 2.1</figcaption>
  <figcaption>Français canadien vers français de France</figcaption>
</figure>

<figure markdown class="card">
  ![Exemple FR-CA vers ENG-US](trad-exemple-fr_ca-en_us.png){ width="1080" }
  <figcaption>Modèle: Vera 2.1</figcaption>
  <figcaption>Français canadien vers anglais américain</figcaption>
</figure>

<figure markdown class="card">
  ![Exemple FR-CA vers ENG-US](trad-exemple-fr_ca-en_brit.png){ width="1080" }
  <figcaption>Modèle: Vera 2.1</figcaption>
  <figcaption>Français canadien vers anglais britannique</figcaption>
</figure>
</div>

