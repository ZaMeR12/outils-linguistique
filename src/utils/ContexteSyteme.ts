/**
 * Les contextes de systèmes pour les outils linguistiques sont basés en anglais,
 * car ils osnt plus précis dans cette langue.
 * @author ZaMeR_12
 */

import { RoleMessageOllama } from "@/models/Ollama.models";
import { Message } from "ollama/browser";

export enum LangueTraducteurEng {
  FR_CA = "french canadian",
  FR_FR = "french from France",
  EN_US = "english american",
  EN_GB = "english british",
}

export enum LangueTraducteurFr {
  FR_CA = "Français canadien",
  FR_FR = "Français de France",
  EN_US = "Anglais américain",
  EN_GB = "Anglais britannique",
}

/**
 * Correspondance des langues entre l'anglais et le français.
 * @description
 * Exemple d'utilisation :
 * ```ts
 * const langueAnglaise = LangueTraducteurEng.FR_CA;
 * const langueFrancaise = correspondanceLangues[langueAnglaise];
 * ```
 * @author GitHub. (2025). GitHub Copilot (version juillet 2025) [Modèle de génération de code]. https://resources.github.com/copilot-for-business/
 */
export const correspondanceLangues: Record<
  LangueTraducteurEng,
  LangueTraducteurFr
> = {
  [LangueTraducteurEng.FR_CA]: LangueTraducteurFr.FR_CA,
  [LangueTraducteurEng.FR_FR]: LangueTraducteurFr.FR_FR,
  [LangueTraducteurEng.EN_US]: LangueTraducteurFr.EN_US,
  [LangueTraducteurEng.EN_GB]: LangueTraducteurFr.EN_GB,
};

export enum StyleEcritureEng {
  AUCUNE = "none",
  VICTORIEN = "victorian",
  PIRATE = "pirate",
  NOBLE = "noble",
  PAYSAN = "peasant",
  MEDIEVAL = "medieval",
  FUTURISTE = "futuristic",
  STEAMPUNK = "steampunk",
  ROMANTIQUE = "romantic",
  GUERRIER = "warrior",
  SORCIER = "wizard",
  DETECTIVE = "detective",
  SCIENTIFIQUE = "scientific",
  HUMORISTIQUE = "humorous",
  SOMBRE = "dark",
  ENTHOUSIASTE = "enthusiastic",
  SERIEUX = "serious",
  POETIQUE = "poetic",
  MODERNE = "modern",
}

export enum StyleEcritureFr {
  AUCUNE = "Aucun",
  VICTORIEN = "Victorien",
  PIRATE = "Pirate",
  NOBLE = "Noble",
  PAYSAN = "Paysan",
  MEDIEVAL = "Médiéval",
  FUTURISTE = "Futuriste",
  STEAMPUNK = "Steampunk",
  ROMANTIQUE = "Romantique",
  GUERRIER = "Guerrier",
  SORCIER = "Sorcier",
  DETECTIVE = "Détective",
  SCIENTIFIQUE = "Scientifique",
  HUMORISTIQUE = "Humoristique",
  SOMBRE = "Sombre",
  ENTHOUSIASTE = "Enthousiaste",
  SERIEUX = "Sérieux",
  POETIQUE = "Poétique",
  MODERNE = "Moderne",
}

/**
 * Correspondance des styles d'écriture entre l'anglais et le français.
 * @description
 * Exemple d'utilisation :
 * ```ts
 * const styleAnglais = StyleEcritureEng.PIRATE;
 * const styleFrancais = correspondanceStyles[styleAnglais];
 * ```
 * @author GitHub. (2025). GitHub Copilot (version juillet 2025) [Modèle de génération de code]. https://resources.github.com/copilot-for-business/
 */
export const correspondanceStyles: Record<StyleEcritureEng, StyleEcritureFr> = {
  [StyleEcritureEng.AUCUNE]: StyleEcritureFr.AUCUNE,
  [StyleEcritureEng.VICTORIEN]: StyleEcritureFr.VICTORIEN,
  [StyleEcritureEng.PIRATE]: StyleEcritureFr.PIRATE,
  [StyleEcritureEng.NOBLE]: StyleEcritureFr.NOBLE,
  [StyleEcritureEng.PAYSAN]: StyleEcritureFr.PAYSAN,
  [StyleEcritureEng.MEDIEVAL]: StyleEcritureFr.MEDIEVAL,
  [StyleEcritureEng.FUTURISTE]: StyleEcritureFr.FUTURISTE,
  [StyleEcritureEng.STEAMPUNK]: StyleEcritureFr.STEAMPUNK,
  [StyleEcritureEng.ROMANTIQUE]: StyleEcritureFr.ROMANTIQUE,
  [StyleEcritureEng.GUERRIER]: StyleEcritureFr.GUERRIER,
  [StyleEcritureEng.SORCIER]: StyleEcritureFr.SORCIER,
  [StyleEcritureEng.DETECTIVE]: StyleEcritureFr.DETECTIVE,
  [StyleEcritureEng.SCIENTIFIQUE]: StyleEcritureFr.SCIENTIFIQUE,
  [StyleEcritureEng.HUMORISTIQUE]: StyleEcritureFr.HUMORISTIQUE,
  [StyleEcritureEng.SOMBRE]: StyleEcritureFr.SOMBRE,
  [StyleEcritureEng.ENTHOUSIASTE]: StyleEcritureFr.ENTHOUSIASTE,
  [StyleEcritureEng.SERIEUX]: StyleEcritureFr.SERIEUX,
  [StyleEcritureEng.POETIQUE]: StyleEcritureFr.POETIQUE,
  [StyleEcritureEng.MODERNE]: StyleEcritureFr.MODERNE,
};

/**
 * Génère le contexte de traduction pour Ollama avec prise en compte des différences régionales/culturelles.
 * Cette fonction crée un message système pour Ollama qui définit le rôle de l'IA
 * en tant qu'expert en traduction de langues, en tenant compte des spécificités culturelles
 * comme les différences entre le français canadien et le français de France.
 * @author ZaMeR_12
 * @param langOrigine Langue d'origine de la traduction.
 * @param langTrad Langue de destination de la traduction.
 * @param texteInitial Texte à traduire.
 * @returns Message système pour Ollama.
 */
export const genererContexteTraduction = (
  langOrigine: LangueTraducteurEng,
  langTrad: LangueTraducteurEng,
  texteInitial: string
): Message => {
  /**
   * Génération du contexte système a été optimisé par Github Copilot.
   * @author GitHub. (2025). GitHub Copilot (version juillet 2025) [Modèle de génération de code]. https://resources.github.com/copilot-for-business/
   */
  return {
    role: RoleMessageOllama.SYSTEM,
    content: `Translate the following text from ${langOrigine} to ${langTrad}, ensuring strict adherence to all regional and cultural word differences. Pay close attention to linguistic nuances, idiomatic expressions, and vocabulary specific to the target region. For example, Canadian French uses terms like "melon d'eau" instead of "pastèque" in French from France, but this is just one of many differences to consider. Be comprehensive and consistent in applying these distinctions. Only provide the translated text, nothing else: "${texteInitial}"`,
  };
};

/**
 * Génère le contexte de résumé pour Ollama.
 * Cette fonction crée un message système pour Ollama qui définit le rôle de l'IA
 * en tant qu'expert en résumé de texte, en adaptant le résumé au contexte régional
 * et culturel de la langue cible.
 * @author ZaMeR_12
 * @param texteInitial Texte à résumer.
 * @param langue Langue de destination du résumé.
 * @returns Message système pour Ollama.
 */
export const genererContexteResume = (
  texteInitial: string,
  langue: LangueTraducteurEng
): Message => {
  /**
   * Génération du contexte système a été optimisé par Github Copilot.
   * @author GitHub. (2025). GitHub Copilot (version juillet 2025) [Modèle de génération de code]. https://resources.github.com/copilot-for-business/
   */
  return {
    role: RoleMessageOllama.SYSTEM,
    content: `You are a text summarization expert. Your task is to summarize the following text to ${langue} as briefly as possible while strictly preserving linguistic variants and nuances. Ensure the summary is concise and does not exceed the minimum necessary words. Use regionally and culturally appropriate words for the chosen language variant. For example, use "melon d'eau" instead of "pastèque" for Canadian French: "${texteInitial}"`,
  };
};

/**
 * Génère le contenu pour le contexte de reformulation.
 * @author ZaMeR_12
 * @param texteInitial Texte à reformuler.
 * @param langue Langue de destination.
 * @param limiteMots Limite de mots (optionnel).
 * @param style Style d'écriture (optionnel).
 * @returns Contenu formaté pour le message système.
 */
const genererContenuReformulation = (
  texteInitial: string,
  langue: LangueTraducteurEng,
  limiteMots?: number,
  style?: StyleEcritureEng
): string => {
  let contenu = `You are a text reformulation expert. Your task is to reformulate the following text to ${langue}: "${texteInitial}"`;
  if (limiteMots) {
    contenu += ` Please limit your response to ${limiteMots} words.`;
  }
  if (style) {
    contenu += ` Please use the ${style} writing style.`;
  }
  return contenu;
};

export const genererContexteReformulation = (
  texteInitial: string,
  langue: LangueTraducteurEng,
  limiteMots?: number | undefined,
  style?: StyleEcritureEng | undefined
): Message => {
  return {
    role: RoleMessageOllama.SYSTEM,
    content: genererContenuReformulation(
      texteInitial,
      langue,
      limiteMots,
      style
    ),
  };
};
