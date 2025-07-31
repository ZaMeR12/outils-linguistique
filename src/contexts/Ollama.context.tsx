/**
 * Ce fichier a été fortement inspiré d'un autre projet que j'ai fait par le passé, amis réadapté pour ce projet.
 * Il gère la communication avec le serveur Ollama, y compris la récupération des modèles disponibles,
 * la génération de réponses et la gestion des erreurs.
 * Source: Projet du cours de Technologies émergentes du Cégep de Victoriavlle.
 * @author ZaMeR_12
 */

import { IModeleOllama } from "@/models/Ollama.models";
import _ from "lodash";
import { Message } from "ollama";
import { ListResponse, Ollama } from "ollama/browser";
import React, { useCallback, useEffect, useRef, useState } from "react";
import useLocalStorage from "use-local-storage";

export type OllamaContextType = {
  ollamaUrl: URL;
  setOllamaUrl: (url: URL) => void;
  modeles: IModeleOllama[];
  chercherModeles: () => Promise<void>;
  ollamaEstChargeNav: boolean;
  ollamaEstChargeOutil: boolean;
  arreterReponseOllama: () => void;
  genererReponseOllama: (
    modele: IModeleOllama,
    messages: Message[]
  ) => Promise<void>;
  ollamaErreur: string;
  traductionModele: IModeleOllama;
  setTraductionModele: (modele: IModeleOllama) => void;
  resumeModele: IModeleOllama;
  setResumeModele: (modele: IModeleOllama) => void;
  reformulationModele: IModeleOllama;
  setReformulationModele: (modele: IModeleOllama) => void;
  reponseOllama: string;
  viderReponseOllama: () => void;
};

const localOllamaUrl: URL = new URL("http://127.0.0.1:11434");

// eslint-disable-next-line react-refresh/only-export-components
export const OllamaContext = React.createContext<OllamaContextType>({
  ollamaUrl: localOllamaUrl,
  setOllamaUrl: () => {},
  modeles: [],
  chercherModeles: async () => {},
  ollamaEstChargeNav: false,
  ollamaEstChargeOutil: false,
  arreterReponseOllama: () => {},
  genererReponseOllama: async () => {},
  ollamaErreur: "",
  traductionModele: { nom: "Défaut", temperature: 0.7 },
  resumeModele: { nom: "Défaut", temperature: 0.7 },
  reformulationModele: { nom: "Défaut", temperature: 0.7 },
  reponseOllama: "",
  viderReponseOllama: () => {},
  setTraductionModele: () => {},
  setResumeModele: () => {},
  setReformulationModele: () => {},
});

export default function OllamaProvider(props: React.PropsWithChildren) {
  const [ollamaUrl, setOllamaUrl] = useLocalStorage<URL>(
    "ollamaUrl",
    localOllamaUrl
  );

  const [traductionModele, setTraductionModele] =
    useLocalStorage<IModeleOllama>("traductionModele", {
      nom: "gemma3:4b",
      temperature: 0.7,
    });

  const [resumeModele, setResumeModele] = useLocalStorage<IModeleOllama>(
    "resumeModele",
    { nom: "gemma3:4b", temperature: 0.7 }
  );

  const [reformulationModele, setReformulationModele] =
    useLocalStorage<IModeleOllama>("reformulationModele", {
      nom: "gemma3:4b",
      temperature: 0.7,
    });

  const ollamaEstChargeNav = useRef<boolean>(false);
  const [ollamaEstChargeOutil, setOllamaEstChargeOutil] =
    useState<boolean>(false);

  const [ollamaErreur, setOllamaErreur] = useState<string>("");

  const [reponseOllama, setReponseOllama] = useState<string>("");

  const [modeles, setModeles] = useLocalStorage<IModeleOllama[]>("modeles", [
    {
      nom: "gemma3:4b",
      temperature: 0.7,
    },
  ]);

  const ollama = useRef<Ollama>(new Ollama({ host: ollamaUrl.toString() }));

  /**
   *  Mise à jour de l'instance Ollama avec l'URL actuelle.
   *  Cette fonction est appelée lors de l'initialisation et à chaque changement d'URL.
   *  Elle crée une nouvelle instance d'Ollama avec l'URL spécifiée et
   *  initialise la liste des modèles.
   * @author ZaMeR_12
   */
  const chercherModeles = useCallback(async () => {
    try {
      const listeModelePure: ListResponse = await ollama.current.list();
      let listeModeleTemp: IModeleOllama[] = [];
      listeModelePure.models.forEach((model) => {
        const modeleTemp: IModeleOllama = {
          nom: model.name,
          temperature: 0.7,
        };
        listeModeleTemp.push(modeleTemp);
      });
      listeModeleTemp = _.orderBy(listeModeleTemp, ["nom"]);
      console.log("Liste des modèles:", listeModeleTemp);
      setModeles(listeModeleTemp);
      setOllamaErreur("");
    } catch (error) {
      setOllamaErreur(
        "Échec de la communication avec le serveur d'Ollama. Vérifiez l'URL et le statut du serveur."
      );
    }
  }, [setModeles]);

  const miseAjourOllamaServeur = useCallback(async () => {
    try {
      ollama.current = new Ollama({ host: ollamaUrl.toString() });
      chercherModeles();
      setOllamaErreur("");
      ollamaEstChargeNav.current = true;
      setOllamaEstChargeOutil(true);
      console.log("Mise à jour de l'instance Ollama avec l'URL:", ollamaUrl);
    } catch (error) {
      setOllamaErreur("Il y a un problème de connexion au serveur d'Ollama.");
      ollamaEstChargeNav.current = false;
      setOllamaEstChargeOutil(false);
    }
  }, [ollamaUrl, chercherModeles]);

  /**
   * Arrête la réponse d'Ollama.
   * Cette fonction utilise l'instance Ollama pour interrompre le flux de réponse en cours
   * @author ZaMeR_12
   */
  const arreterReponseOllama = () => {
    console.log("Arrêt de la réponse d'Ollama.");
    ollama.current.abort();
    setOllamaErreur("");
  };

  /**
   * Génère une réponse d'Ollama en utilisant le modèle spécifié et les messages fournis.
   * Cette fonction utilise l'instance Ollama pour démarrer un chat avec le modèle et les messages.
   * @author ZaMeR_12
   * @param modele Le modèle à utiliser pour générer la réponse.
   * @param messages Les messages à envoyer au modèle.
   */
  const genererReponseOllama = async (
    modele: IModeleOllama,
    messages: Message[]
  ) => {
    setReponseOllama("");
    ollamaEstChargeNav.current = false;
    setOllamaEstChargeOutil(false);
    ollama.current
      .chat({
        model: modele.nom,
        messages: messages,
        stream: true,
        options: {
          temperature: modele.temperature,
        },
      })
      .then(async (stream) => {
        console.log("Ollama stream a commencé.");
        for await (const chunk of stream) {
          setReponseOllama((prev) => prev + chunk.message.content);
        }
        setOllamaErreur("");
        ollamaEstChargeNav.current = true;
        setOllamaEstChargeOutil(true);
        console.log("Ollama stream terminé.");
      })
      .catch((error) => {
        if (error.name == "AbortError") {
          console.log("Ollama stream a été interrompu.");
          setOllamaErreur("");
          ollamaEstChargeNav.current = true;
          setOllamaEstChargeOutil(true);
        } else {
          console.log(error);
          setOllamaErreur(
            `Ollama ne peut pas répondre. Vérifiez si Ollama à l'adresse ${ollamaUrl.toString()} fonctionne toujours.`
          );
        }
      });
  };

  /**
   * Vide la réponse d'Ollama.
   * Cette fonction réinitialise la référence de la réponse d'Ollama à une chaîne vide.
   */
  const viderReponseOllama = () => {
    setReponseOllama("");
  };

  useEffect(() => {
    ollamaEstChargeNav.current = false;
    setOllamaEstChargeOutil(false);
  }, []);

  useEffect(() => {
    ollamaEstChargeNav.current = false;
    setOllamaEstChargeOutil(false);
    miseAjourOllamaServeur();
  }, [ollamaUrl, miseAjourOllamaServeur]);

  const values = {
    ollamaUrl,
    setOllamaUrl,
    modeles,
    chercherModeles,
    ollamaEstChargeNav: ollamaEstChargeNav.current,
    ollamaEstChargeOutil: ollamaEstChargeOutil,
    arreterReponseOllama,
    genererReponseOllama,
    ollamaErreur,
    traductionModele: traductionModele,
    setTraductionModele,
    resumeModele: resumeModele,
    setResumeModele,
    reformulationModele: reformulationModele,
    setReformulationModele,
    reponseOllama,
    viderReponseOllama,
  };

  return (
    <OllamaContext.Provider value={values}>
      {props.children}
    </OllamaContext.Provider>
  );
}
