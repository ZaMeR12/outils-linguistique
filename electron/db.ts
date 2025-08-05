import Database from "better-sqlite3";
import { app } from "electron";
import path from "node:path";

const db = new Database(path.join(app.getPath("userData"), "database.db"));

//Créer la table traduction si elle n'existe pas
db.exec(`
  CREATE TABLE IF NOT EXISTS traduction (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texte_original TEXT NOT NULL,
    texte_traduit TEXT NOT NULL,
    langue_origine TEXT NOT NULL,
    langue_cible TEXT NOT NULL,
    modele TEXT NOT NULL,
    date_traduction TEXT NOT NULL
  );
`);

//Créer la table synthese si elle n'existe pas
db.exec(`
    CREATE TABLE IF NOT EXISTS synthese (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      texte_original TEXT NOT NULL,
      texte_synthetise TEXT NOT NULL,
      langue_origine TEXT NOT NULL,
      modele TEXT NOT NULL,
      date_synthese TEXT NOT NULL
    );
`);

//Créer la table reformulation si elle n'existe pas
db.exec(`
  CREATE TABLE IF NOT EXISTS reformulation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texte_original TEXT NOT NULL,
    texte_reformule TEXT NOT NULL,
    langue_origine TEXT NOT NULL,
    style TEXT NOT NULL,
    limite_mots INTEGER NOT NULL,
    modele TEXT NOT NULL,
    date_reformulation TEXT NOT NULL
  );
`);

/**
 * Ajoute une traduction à la base de données.
 * @author ZaMeR12
 * @param texteOriginal  Le texte original à traduire.
 * @param texteTraduit  Le texte traduit.
 * @param langueOrigine  La langue d'origine du texte.
 * @param langueCible  La langue cible de la traduction.
 * @param dateTraduction  La date de la traduction.
 * @param modele  Le modèle utilisé pour la traduction.
 */
export const ajouterTraduction = (
  texteOriginal: string,
  texteTraduit: string,
  langueOrigine: string,
  langueCible: string,
  dateTraduction: string,
  modele: string
) => {
  const stmt = db.prepare(`
    INSERT INTO traduction (texte_original, texte_traduit, langue_origine, langue_cible, date_traduction, modele)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    texteOriginal,
    texteTraduit,
    langueOrigine,
    langueCible,
    dateTraduction,
    modele
  );
};

/**
 * Ajoute une synthèse à la base de données.
 * @author ZaMeR12
 * @param texteOriginal  Le texte original à synthétiser.
 * @param texteSynthetise  Le texte synthétisé.
 * @param langueOrigine  La langue d'origine du texte.
 * @param dateSynthese  La date de la synthèse.
 * @param modele  Le modèle utilisé pour la synthèse.
 */
export const ajouterSynthese = (
  texteOriginal: string,
  texteSynthetise: string,
  langueOrigine: string,
  dateSynthese: string,
  modele: string
) => {
  const stmt = db.prepare(`
    INSERT INTO synthese (texte_original, texte_synthetise, langue_origine, date_synthese, modele)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(texteOriginal, texteSynthetise, langueOrigine, dateSynthese, modele);
};

/**
 * Ajoute une reformulation à la base de données.
 * @author ZaMeR12
 * @param texteOriginal  Le texte original à reformuler.
 * @param texteReformule  Le texte reformulé.
 * @param langueOrigine  La langue d'origine du texte.
 * @param style  Le style de la reformulation.
 * @param limiteMots  La limite de mots pour la reformulation.
 * @param dateReformulation  La date de la reformulation.
 */
export const ajouterReformulation = (
  texteOriginal: string,
  texteReformule: string,
  langueOrigine: string,
  style: string,
  limiteMots: number,
  dateReformulation: string,
  modele: string
) => {
  const stmt = db.prepare(`
    INSERT INTO reformulation (texte_original, texte_reformule, langue_origine, style, limite_mots, date_reformulation, modele)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  stmt.run(
    texteOriginal,
    texteReformule,
    langueOrigine,
    style,
    limiteMots,
    dateReformulation,
    modele
  );
};

/** Supprime une traduction de la base de données par son ID.
 * @author ZaMeR12
 * @param id  L'ID de la traduction à supprimer.
 */
export const supprimerTraductionParId = (id: number) => {
  const stmt = db.prepare(`DELETE FROM traduction WHERE id = ?`);
  stmt.run(id);
};

/** Supprime une synthèse de la base de données par son ID.
 * @author ZaMeR12
 * @param id  L'ID de la synthèse à supprimer.
 */
export const supprimerSyntheseParId = (id: number) => {
  const stmt = db.prepare(`DELETE FROM synthese WHERE id = ?`);
  stmt.run(id);
};

/**
 * Supprime une reformulation de la base de données par son ID.
 * @author ZaMeR12
 * @param id  L'ID de la reformulation à supprimer.
 */
export const supprimerReformulationParId = (id: number) => {
  const stmt = db.prepare(`DELETE FROM reformulation WHERE id = ?`);
  stmt.run(id);
};

/**
 * Obtenir les traductions avec pagination.
 * @author ZaMeR12
 * @param page  Le numéro de la page (0-indexé).
 * @param taille  Le nombre d'éléments par page.
 * @returns  Une promesse contenant les traductions de la page demandée.
 */
export const obtenirTradPagination = async (page: number, taille: number) => {
  const stmt = db.prepare(
    ` SELECT * FROM traduction ORDER BY date_traduction DESC LIMIT ? OFFSET ?`
  );
  return stmt.all(taille, page * taille);
};

/**
 * Obtenir les synthèses avec pagination.
 * @author ZaMeR12
 * @param page  Le numéro de la page (0-indexé).
 * @param taille  Le nombre d'éléments par page.
 * @returns  Une promesse contenant les synthèses de la page demandée.
 */
export const obtenirSynthPagination = async (page: number, taille: number) => {
  const stmt = db.prepare(
    ` SELECT * FROM synthese ORDER BY date_synthese DESC LIMIT ? OFFSET ?`
  );
  return stmt.all(taille, page * taille);
};

/**
 * Obtenir les reformulations avec pagination.
 * @author ZaMeR12
 * @param page  Le numéro de la page (0-indexé).
 * @param taille  Le nombre d'éléments par page.
 * @returns  Une promesse contenant les reformulations de la page demandée.
 */
export const obtenirReformPagination = async (page: number, taille: number) => {
  const stmt = db.prepare(
    ` SELECT * FROM reformulation ORDER BY date_reformulation DESC LIMIT ? OFFSET ?`
  );
  return stmt.all(taille, page * taille);
};

/**
 * Obtenir le nombre total de traductions dans la base de données.
 * @author ZaMeR12
 * @returns Le nombre total de traductions.
 */
export const obtenirNombreTotalTraductions = () => {
  const stmt = db.prepare(`SELECT COUNT(*) AS total FROM traduction`);
  const row = stmt.get() as { total: number };
  return row.total;
};

/**
 * Obtenir le nombre total de synthèses dans la base de données.
 * @author ZaMeR12
 * @returns Le nombre total de synthèses.
 */
export const obtenirNombreTotalSyntheses = () => {
  const stmt = db.prepare(`SELECT COUNT(*) AS total FROM synthese`);
  const row = stmt.get() as { total: number };
  return row.total;
};

/**
 * Obtenir le nombre total de reformulations dans la base de données.
 * @author ZaMeR12
 * @returns Le nombre total de reformulations.
 */
export const obtenirNombreTotalReformulations = () => {
  const stmt = db.prepare(`SELECT COUNT(*) AS total FROM reformulation`);
  const row = stmt.get() as { total: number };
  return row.total;
};

/**
 * Récupère une traduction par son ID.
 * @author ZaMeR12
 * @param id  L'ID de la traduction à récupérer.
 * @returns  La traduction correspondante à l'ID.
 */
export const obtenirTraductionParId = (id: number) => {
  const stmt = db.prepare(`SELECT * FROM traduction WHERE id = ?`);
  return stmt.get(id);
};

/**
 * Récupère une synthèse par son ID.
 * @author ZaMeR12
 * @param id  L'ID de la synthèse à récupérer.
 * @returns  La synthèse correspondante à l'ID.
 */
export const obtenirSyntheseParId = (id: number) => {
  const stmt = db.prepare(`SELECT * FROM synthese WHERE id = ?`);
  return stmt.get(id);
};

/**
 * Récupère une reformulation par son ID.
 * @author ZaMeR12
 * @param id  L'ID de la reformulation à récupérer.
 * @returns  La reformulation correspondante à l'ID.
 */
export const obtenirReformulationParId = (id: number) => {
  const stmt = db.prepare(`SELECT * FROM reformulation WHERE id = ?`);
  return stmt.get(id);
};

/** Ferme la connexion à la base de données.
 * @author ZaMeR12
 */
export const fermerBaseDeDonnees = () => {
  db.close();
};
