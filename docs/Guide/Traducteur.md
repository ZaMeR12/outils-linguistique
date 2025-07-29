# Traducteur

Le traducteur permet de traduire un texte dans une autre langues et se en prenant en compte les différences régionales et culturels au niveau linguistique.

!!! warning "Attention"
    Malgré que l'invite système utilisé pour adapté la traduction selon les différences régionales, ce n'ets pas tout les modèles de langues qui savent bien faire la différence entre ces variantes. 

    Je suggère le modèle [**Vera 2.1**](https://huggingface.co/Dorian2B/Vera-2.1-GGUF){: target="_blank"} qui est adapté avec ces différences linguistiques. Cependant il est disponible seulement sur :simple-huggingface: **Hugging Face**


## Invite système

!!! quote "Invite système"
    L'invite système utilisé est en anglais pour une meilleur performance et compatibilité avec la majorité des modèles.

    <hr>

    _Translate the following text from ${langue du texte à traduire} to ${langue de traduction}, ensuring strict adherence to all regional and cultural word differences. Pay close attention to linguistic nuances, idiomatic expressions, and vocabulary specific to the target region. For example, Canadian French uses terms like "melon d'eau" instead of "pastèque" in French from France, but this is just one of many differences to consider. Be comprehensive and consistent in applying these distinctions. Only provide the translated text, nothing else: "${texte à traduire}"_
    


## Liste des langues disponibles

- Anglais Américian
- Anglais Britannique
- Français canadien
- Français de France

## Utilisation


<figure markdown>
  ![Présentation par défaut](trad-defaut.png){ width="1080" }
  <figcaption>Aperçu de l'outil par défaut</figcaption>
</figure>


Le champs de texte à gauche est modifiable pour inscrire le texte que vous souhaitez traduire.

Le bouton **Traduire** lance la traduction avec Ollama.

Le bouton **Nettoyer** permet d'effacer le dernier texte à traduire et la dernière traduction.

Le bouton **Arrêter la réponse** permet d'arrêter Ollama pour la génération de sa réponse.

Les champs textes sont redimensionnables au besoin.

### Exemples

<figure markdown>
  ![Exemple FR-CA vers FR-FR](trad-exemple-fr_ca-fr.png){ width="1080" }
  <figcaption>Modèle: Vera 2.1</figcaption>
  <figcaption>Français canadien vers français de France</figcaption>
</figure>

<figure markdown>
  ![Exemple FR-CA vers ENG-US](trad-exemple-fr_ca-en_us.png){ width="1080" }
  <figcaption>Modèle: Vera 2.1</figcaption>
  <figcaption>Français canadien vers anglais américain</figcaption>
</figure>

<figure markdown>
  ![Exemple FR-CA vers ENG-US](trad-exemple-fr_ca-en_brit.png){ width="1080" }
  <figcaption>Modèle: Vera 2.1</figcaption>
  <figcaption>Français canadien vers anglais britannique</figcaption>
</figure>