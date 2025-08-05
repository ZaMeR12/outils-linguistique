import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Database from "better-sqlite3";
const db = new Database(path.join(app.getPath("userData"), "database.db"));
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
const ajouterTraduction = (texteOriginal, texteTraduit, langueOrigine, langueCible, dateTraduction, modele) => {
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
const ajouterSynthese = (texteOriginal, texteSynthetise, langueOrigine, dateSynthese, modele) => {
  const stmt = db.prepare(`
    INSERT INTO synthese (texte_original, texte_synthetise, langue_origine, date_synthese, modele)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(texteOriginal, texteSynthetise, langueOrigine, dateSynthese, modele);
};
const ajouterReformulation = (texteOriginal, texteReformule, langueOrigine, style, limiteMots, dateReformulation, modele) => {
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
const supprimerTraductionParId = (id) => {
  const stmt = db.prepare(`DELETE FROM traduction WHERE id = ?`);
  stmt.run(id);
};
const supprimerSyntheseParId = (id) => {
  const stmt = db.prepare(`DELETE FROM synthese WHERE id = ?`);
  stmt.run(id);
};
const supprimerReformulationParId = (id) => {
  const stmt = db.prepare(`DELETE FROM reformulation WHERE id = ?`);
  stmt.run(id);
};
const obtenirTradPagination = async (page, taille) => {
  const stmt = db.prepare(
    ` SELECT * FROM traduction ORDER BY date_traduction DESC LIMIT ? OFFSET ?`
  );
  return stmt.all(taille, page * taille);
};
const obtenirSynthPagination = async (page, taille) => {
  const stmt = db.prepare(
    ` SELECT * FROM synthese ORDER BY date_synthese DESC LIMIT ? OFFSET ?`
  );
  return stmt.all(taille, page * taille);
};
const obtenirReformPagination = async (page, taille) => {
  const stmt = db.prepare(
    ` SELECT * FROM reformulation ORDER BY date_reformulation DESC LIMIT ? OFFSET ?`
  );
  return stmt.all(taille, page * taille);
};
const fermerBaseDeDonnees = () => {
  db.close();
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
process.env.APP_ROOT = path.join(__dirname, "..");
console.log("APP_ROOT:", process.env.APP_ROOT);
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
const preloadPath = path.resolve(__dirname, "../dist-electron/preload.js");
console.log("Preload path:", preloadPath);
function createWindow() {
  const cheminIcon = process.platform === "linux" ? path.join(process.env.VITE_PUBLIC, "icon-512.png") : path.join(process.env.VITE_PUBLIC, "favicon.ico");
  console.log("Icon path:", cheminIcon);
  win = new BrowserWindow({
    icon: cheminIcon,
    resizable: true,
    height: 850,
    width: 1050,
    minWidth: 1050,
    minHeight: 850,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      sandbox: true
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"), { hash: "/" });
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    fermerBaseDeDonnees();
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
ipcMain.on(
  "ajout-trad",
  (event, data) => {
    try {
      ajouterTraduction(
        data.texteOriginal,
        data.texteTraduit,
        data.langueOrigine,
        data.langueCible,
        data.dateTraduction,
        data.modele
      );
      event.reply("ajout-trad-success", "Traduction ajoutée avec succès.");
    } catch (erreur) {
      console.error("Erreur lors de l'insertion de la traduction :", erreur);
      event.reply("ajout-trad-error", erreur.message);
    }
  }
);
ipcMain.on(
  "ajout-synth",
  (event, data) => {
    try {
      ajouterSynthese(
        data.texteOriginal,
        data.texteSynthetise,
        data.langueOrigine,
        data.dateSynthese,
        data.modele
      );
      event.reply("ajout-synth-success", "Synthèse ajoutée avec succès.");
    } catch (erreur) {
      console.error("Erreur lors de l'insertion de la synthèse :", erreur);
      event.reply("ajout-synth-error", erreur.message);
    }
  }
);
ipcMain.on(
  "ajout-reform",
  (event, data) => {
    try {
      ajouterReformulation(
        data.texteOriginal,
        data.texteReformule,
        data.langueOrigine,
        data.style,
        data.limiteMots,
        data.dateReformulation,
        data.modele
      );
      event.reply("ajout-reform-success", "Reformulation ajoutée avec succès.");
    } catch (erreur) {
      console.error("Erreur lors de l'insertion de la reformulation :", erreur);
      event.reply("ajout-reform-error", erreur.message);
    }
  }
);
ipcMain.on(
  "sup-trad",
  (event, data) => {
    try {
      supprimerTraductionParId(data.id);
      event.reply("sup-trad-success", "Traduction supprimée avec succès.");
    } catch (erreur) {
      console.error("Erreur lors de la suppression de la traduction :", erreur);
      event.reply("sup-trad-error", erreur.message);
    }
  }
);
ipcMain.on(
  "sup-synth",
  (event, data) => {
    try {
      supprimerSyntheseParId(data.id);
      event.reply("sup-synth-success", "Synthèse supprimée avec succès.");
    } catch (erreur) {
      console.error("Erreur lors de la suppression de la synthèse :", erreur);
      event.reply("sup-synth-error", erreur.message);
    }
  }
);
ipcMain.on(
  "sup-reform",
  (event, data) => {
    try {
      supprimerReformulationParId(data.id);
      event.reply("sup-reform-success", "Reformulation supprimée avec succès.");
    } catch (erreur) {
      console.error(
        "Erreur lors de la suppression de la reformulation :",
        erreur
      );
      event.reply("sup-reform-error", erreur.message);
    }
  }
);
ipcMain.handle(
  "get-trads",
  async (_event, data) => {
    try {
      return await obtenirTradPagination(data.page, data.taille);
    } catch (erreur) {
      console.error("Erreur lors de la récupération des traductions :", erreur);
      throw erreur;
    }
  }
);
ipcMain.handle(
  "get-synths",
  async (_event, data) => {
    try {
      return await obtenirSynthPagination(data.page, data.taille);
    } catch (erreur) {
      console.error("Erreur lors de la récupération des synthèses :", erreur);
      throw erreur;
    }
  }
);
ipcMain.handle(
  "get-reforms",
  async (_event, data) => {
    try {
      return await obtenirReformPagination(data.page, data.taille);
    } catch (erreur) {
      console.error(
        "Erreur lors de la récupération des reformulations :",
        erreur
      );
      throw erreur;
    }
  }
);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
