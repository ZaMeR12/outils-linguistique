---
title: Synthétiseur
description: Guide d'utilisation du synthétiseur de texte pour les outils linguistiques.
---

# Synthétiseur

Le synthétiseur de texte est un outil qui permet de résumer un texte en tenant compte des différences linguistiques et culturelles entre les variantes d'une même langue. Il utilise l'intelligence artificielle pour générer des résumés adaptés à la région ou au pays de destination.

!!! warning "Attention"
    Malgré que l'invite système utilisé pour adapté la synthèse selon les différences régionales, ce n'est pas tout les modèles de langues qui savent bien faire la différence entre ces variantes.

    Je suggère le modèle [**Vera 2.1**](https://huggingface.co/Dorian2B/Vera-2.1-GGUF){: target="_blank"} qui est adapté avec ces différences linguistiques. Cependant il est disponible seulement sur :simple-huggingface: **Hugging Face**


!!! info 
    Il se peut que les impressions d'écrans ne soient pas 100% à jour sur les éléments qui ne représentent pas la dernière version de l'outil.

## Invite système

!!! quote "Invite système"
    L'invite système utilisé est en anglais pour une meilleur performance et compatibilité avec la majorité des modèles.

    <hr>

    _You are a text summarization expert. Your task is to summarize the following text to ${langue cible} as briefly as possible while strictly preserving linguistic variants and nuances. Ensure the summary is concise and does not exceed the minimum necessary words. Use regionally and culturally appropriate words for the chosen language variant. For example, use "melon d'eau" instead of "pastèque" for Canadian French: "${texte à résumer}"_


## Liste des langues disponibles

- Anglais américian
- Anglais britannique
- Français canadien
- Français de France

## Utilisation


<figure markdown>
  ![Présentation par défaut](synth-defaut.png){ width="1080" }
  <figcaption>Aperçu de l'outil par défaut</figcaption>
</figure>

### Actions


- Le champs de texte à gauche est modifiable pour inscrire le texte que vous souhaitez synthétiser.
- Le bouton **Synthétiser** lance la synthèse avec Ollama.
- Le bouton **Nettoyer** permet d'effacer le dernier texte à synthétiser et la dernière synthèse.
- Le bouton **Arrêter la réponse** permet d'arrêter Ollama pour la génération de sa réponse.
- Les champs textes sont redimensionnables au besoin.
- Il est possible de synthétiser et traduire un texte en même temps en sélectionnant la langue de destination dans le champ de la langue du résumé.

### Exemples

#### Texte à synthétiser
!!! quote "The Gas Station at the Edge of Nowhere"
    Somewhere out in the middle of Arizona — way past the last highway sign and a couple dozen miles beyond where your GPS gives up — there’s a gas station that doesn’t show up on any map.

    It’s the kind of place you stumble upon when you're not looking for it, like a thought you forgot you had. The sign just says "Earl’s — Since 1963", half the bulbs burned out, buzzing faintly like tired fireflies. The asphalt in the lot is cracked and faded, weeds growing up through the concrete like nature’s little reminders that time eats everything, eventually.

    I pulled in ‘cause the needle was buried on empty and my phone had no bars. The heat outside was the kind that makes your skin feel like it’s shrinking, and the wind carried just enough dust to coat your teeth if you breathed with your mouth open.

    Inside, the place smelled like old coffee, motor oil, and vinyl sunbaked for decades. Behind the counter sat a man who looked like he’d been carved out of leather and tobacco smoke. He had mirrored shades, even indoors, and a ball cap that said “Don’t Tread on Me” with a faded snake coiled across the brim.

    “Y’all lost?” he asked, voice gravelly like tires on a dirt road.

    “Nah, just... outta gas,” I replied, trying to sound casual, like I belonged here — like I wasn't a city kid in sneakers and Spotify playlists.

    He didn’t answer, just jerked a thumb toward the pump outside. “Cash only.”

    As I filled up, I noticed something odd — there was no price listed. No gallon count, either. Just the sound of fuel flowing and a faint humming, like the pump itself was breathing. I told myself I was just tired. Road-trippy weird.

    Back inside, I handed him a twenty. He gave me change in silver dollars, which I didn’t think people even used anymore. Then he slid a plastic cup of coffee toward me — unsolicited.

    “On the house,” he said. “Long road ahead.”

    That’s when I noticed something else. The radio in the corner wasn’t playing music. It was talking, but not in any language I recognized. Not Spanish, not Navajo, not even something you’d hear in sci-fi movies. It was all clicks and echoes, like whales underwater or tape played backwards.

    “You get that station out here?” I asked, pretending I wasn’t spooked.

    He didn’t look up. “Only plays after dark.”

    I took the coffee, nodded thanks, and left. As I drove away, I glanced in the rearview mirror.

    There was nothing behind me. No gas station. No cracked pavement. Just desert.

    And when I checked my pocket later, the silver dollars were gone — replaced by smooth, black stones that pulsed slightly when I held them.

    I never found that road again. I tried. God knows I tried. But Earl’s? It only shows up when you need something you didn’t know you were looking for.


    **Source:** [_ChatGPT gpt-4o (2025-07-30)_](https://chatgpt.com/){: target="_blank"}


#### Résumés

<div class="grid cards" markdown>

!!! quote "Résumé en français canadien"
    Voici un résumé en français canadien, concis et fidèle au texte original :
    "Au fin fond de l'Arizona, au bord de nulle part, il y a une station-service qui ne figure pas sur les cartes. Un type bizarre, un vieux costaud avec des lunettes de soleil, m'a servi du café, et quand je partis, mes sous étaient remplacé par des pierres noires. La station n'est apparue que quand j'en avais besoin, et ne réapparaîtra qu'un jour où je ne sais pas encore quand."

    **Source:** [_Vera 2.1(2025-07-30)_](https://huggingface.co/Dorian2B/Vera-2.1-GGUF){: target="_blank"}
!!! quote "Résumé en français de France"
    Bien sûr, voici un résumé en français, avec une nuance culturelle :

    "Au milieu de nulle part, en Arizona, se niche une station-service invisible sur les cartes. Son seul signe est "Earl's - Since 1963". Son gérant, un type taciturne avec des lunettes de soleil, offre un café et, en partant, remplace mon billet de 20$ par des pierres noires lumineuses. Une fois repartie, il n'y a plus rien, ni station, ni route, juste le désert. C'est un mystère, une apparition liée à vos besoins, pas à votre recherche."

    **Source:** [_Vera 2.1(2025-07-30)_](https://huggingface.co/Dorian2B/Vera-2.1-GGUF){: target="_blank"}

!!! quote "Résumé en anglais américain"
    Here's a concise summary of the text, preserving nuances:

    “Somewhere deep in Arizona, a gas station, ‘Earl’s,’ materialized seemingly from nowhere. It lacked a map, operated with cash-only transactions, and featured an enigmatic proprietor. After filling up, the narrator received silver dollars, which vanished, replaced by pulsing black stones. Upon leaving, the station vanished from the rearview mirror. It only appears when one needs something they didn’t realize they were searching for.”

    **Source:** [_Vera 2.1(2025-07-30)_](https://huggingface.co/Dorian2B/Vera-2.1-GGUF){: target="_blank"}
!!! quote "Résumé en anglais britannique"
    Here’s a concise summary in British English, maintaining cultural nuances:

    "In the middle of nowhere in Arizona, there exists a gas station that doesn’t appear on any map. The proprietor, a grizzled old man with sunglasses, serves coffee and, when I leave, replaces my $20 bill with glowing black stones. Once I drive away, there’s nothing behind me but desert. The station only appears when you need it, not when you’re looking for it."

    **Source:** [_Vera 2.1(2025-07-30)_](https://huggingface.co/Dorian2B/Vera-2.1-GGUF){: target="_blank"}

</div>








