---
title: Reformulation
description: Guide d'utilisation de l'outil de reformulation de texte.
---

# Reformulation

L'outil de reformulation permet de réécrire un texte en adoptant un style d'écriture spécifique ou en respectant une limite de mots. Il est utile pour adapter le contenu à différents contextes ou publics.

!!! warning "Attention"
    Malgré que l'invite système utilisé pour adapté la reformulation selon les différences régionales, ce n'est pas tout les modèles de langues qui savent bien faire la différence entre ces variantes.

    Je suggère le modèle [**Vera 2.1**](https://huggingface.co/Dorian2B/Vera-2.1-GGUF){: target="_blank"} qui est adapté avec ces différences linguistiques. Cependant il est disponible seulement sur :simple-huggingface: **Hugging Face**

!!! info 
    Il se peut que les impressions d'écrans ne soient pas 100% à jour sur les éléments qui ne représentent pas la dernière version de l'outil.

## Invite système

!!! quote "Invite système"
    L'invite système utilisé est en anglais pour une meilleur performance et compatibilité avec la majorité des modèles.

    <hr>

    _Reformulate the following text in ${langue} as if you were a person adopting the ${style} writing style. Only provide the reformulated text, nothing else: "${texteInitial}" Ensure the reformulation strictly adheres to the word limit of ${limite de mots} words, with minimal deviation (e.g., within 5 words). Avoid generating significantly fewer words than the limit._

## Liste des langues disponibles

- Anglais américian
- Anglais britannique
- Français canadien
- Français de France

## Utilisation


<figure markdown>
  ![Présentation par défaut](reform-defaut.png){ width="1080" }
  <figcaption>Aperçu de l'outil par défaut</figcaption>
</figure>

### Actions

!!! warning "Attention"
    L'outil ne fonctionne que si vous avez activé au moins un style d'écriture ou une limite de mots. Sinon, l'outils ne causera aucune action.


- Le champs de texte à gauche est modifiable pour inscrire le texte que vous souhaitez reformuler.
- Le bouton **Reformuler** lance la reformulation avec Ollama.
- Le bouton **Nettoyer** permet d'effacer le dernier texte à reformuler et la dernière reformulation.
- Le bouton **Arrêter la réponse** permet d'arrêter Ollama pour la génération de sa réponse.
- Les champs textes sont redimensionnables au besoin.
- Vous pouvez choisir un style d'écriture et/ou une limite de mots pour la reformulation.

### Exemples


#### Texte à reformuler
!!! quote "Exemple"
    Par-delà les collines et les forêts épaisses, s'étendait un village ancien où les jours passaient lentement, rythmés par les saisons et les cloches du matin. Les habitants, simples mais fiers, vivaient de la terre, du bois, et du vent. Leurs mains étaient calleuses, leurs regards francs, et leurs mots pesaient davantage que l'or.

    Chaque matin, le vieux meunier descendait vers la rivière, saluait les pêcheurs et vérifiait que le moulin tournait bien. Plus haut, dans les champs, les enfants couraient entre les épis, riant sous le soleil tandis que les anciens, à l’ombre d’un grand chêne, racontaient les histoires d’un autre temps.

    Nul ne cherchait à fuir ce quotidien, car chacun y trouvait sa place. Il n’y avait ni roi ni guerre, seulement le calme, la pluie, le pain chaud, et la lumière du feu au soir venu. Le silence n’était pas vide ; il était plein de souvenirs et d’avenir.

    **Source:** [_ChatGPT gpt-4o (2025-08-04)_](https://chatgpt.com/){: target="_blank"}

#### Résultat de la reformulation

Options:

- **Style d'écriture**: Pirate
- **Limite de mots**: Aucune

!!! quote "Reformulation"
    Au-delà des sommets et des bosquets denses, se dressait un village d'antan, où le temps s'étirait comme un navire à voile, bercé par les saisons et les sonnailles du matin. Ses habitants, humbles mais d'une fierté sans faille, tiraient leur subsistance de la terre, du bois, et des vents. Le grain de leurs mains était rude, leurs yeux francs, et leurs paroles avaient plus de poids que l'or le plus pur.
    Chaque aube, le vieux meunier s'enfonçait vers la rivière, saluait les pêcheurs, et vérifiait que son moulin tourna toujours. Plus haut, dans les champs, les enfants couraient entre les épis, riant sous le soleil, tandis que les anciens, à l'ombre d'un chêne centenaire, chantaient les contes d'un temps lointain.
    Nul ne cherchait à s'enfuir de cette vie simple, car chacun y trouvait sa place. Pas de roi, pas de guerre, juste le calme, la pluie, le pain chaud, et la lumière du feu au crépuscule. Le silence n'était pas mort, il était rempli de souvenirs et de promesses d'avenir.

    **Source:** [_Vera 2.1(2025-07-30)_](https://huggingface.co/Dorian2B/Vera-2.1-GGUF){: target="_blank"}