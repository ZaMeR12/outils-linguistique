---
title: Ollama
description: Guide d'utilisation de l'application Ollama pour les outils linguistiques.
---

# Ollama :simple-ollama:

L'application utilise Ollama pour fournir des outils linguistiques. Ollama est un logiciel qui permet d'exécuter des modèles de langage localement, ce qui offre une plus grande flexibilité et confidentialité par rapport aux services en ligne.

!!! info "Installation"
    Les informations d'installation d'Ollama sont décritent dans la page dédié à l'installation du logiciel et des dépendances.

    [Guide d'installation :material-book:](1-InstallationRapide.md){ .md-button .md-button--primary }

## Modèles recommandées

- [**Vera-2.1:Q8_0** :simple-huggingface:](https://huggingface.co/Dorian2B/Vera-2.1-GGUF){: target="_blank"}
- [***Gemma3:4b :simple-ollama:***](https://ollama.com/library/gemma3){: target="_blank"}
- [Gemma:7b :simple-ollama:](https://ollama.com/library/gemma){: target="_blank"}
- [Llama2-uncensored:7b :simple-ollama:](https://ollama.com/library/llama2-uncensored:7b){: target="_blank"}

!!! tips "Recommandation"
    1. Après quelques tests je recommande le modèle **Vera 2.1** qui prendre bien en compte les différences linguistiques régionnales et culturelles comparées aux autres modèles.

        Cependant, le modèle est sur :simple-huggingface: **Hugging Face**. Donc il faut avoir des connaissance un peu plus avancées pour l'installer.
    2. Pour les autres modèles, je recommande de prendre le modèle **Gemma3:4b** qui est plus facile à installer et à utiliser tout en étant performant.