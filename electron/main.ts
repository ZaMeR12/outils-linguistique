import { app, BrowserWindow } from "electron";
import { ipcMain } from "electron";
// import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import "./db";
import {
  ajouterTraduction,
  ajouterSynthese,
  ajouterReformulation,
  fermerBaseDeDonnees,
  supprimerTraductionParId,
  supprimerSyntheseParId,
  supprimerReformulationParId,
  obtenirTradPagination,
  obtenirSynthPagination,
  obtenirReformPagination,
  obtenirNombreTotalTraductions,
  obtenirNombreTotalSyntheses,
  obtenirNombreTotalReformulations,
  obtenirTraductionParId,
  obtenirReformulationParId,
  obtenirSyntheseParId,
} from "./db";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");
console.log("APP_ROOT:", process.env.APP_ROOT);

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;
const preloadPath = path.resolve(__dirname, "../dist-electron/preload.js");
console.log("Preload path:", preloadPath);
function createWindow() {
  const cheminIcon =
    process.platform === "linux"
      ? path.join(process.env.VITE_PUBLIC, "icon-512.png")
      : path.join(process.env.VITE_PUBLIC, "favicon.ico");

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
      sandbox: true,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"), { hash: "/" });
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    fermerBaseDeDonnees();
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);

/**
 * IPC pour gérer les interactions avec la base de données.
 * Ces fonctions sont appelées depuis le processus Renderer.
 */

// Ajouter des traductions
ipcMain.on(
  "ajout-trad",
  (
    event,
    data: {
      texteOriginal: string;
      texteTraduit: string;
      langueOrigine: string;
      langueCible: string;
      dateTraduction: string;
      modele: string;
    }
  ) => {
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
      event.reply("ajout-trad-error", (erreur as Error).message);
    }
  }
);

// Ajouter des synthèses
ipcMain.on(
  "ajout-synth",
  (
    event,
    data: {
      texteOriginal: string;
      texteSynthetise: string;
      langueOrigine: string;
      langueCible: string;
      dateSynthese: string;
      modele: string;
    }
  ) => {
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
      event.reply("ajout-synth-error", (erreur as Error).message);
    }
  }
);

// Ajouter des reformulations
ipcMain.on(
  "ajout-reform",
  (
    event,
    data: {
      texteOriginal: string;
      texteReformule: string;
      langueOrigine: string;
      style: string;
      limiteMots: number;
      dateReformulation: string;
      modele: string;
    }
  ) => {
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
      event.reply("ajout-reform-error", (erreur as Error).message);
    }
  }
);

// Supprimer des traductions
ipcMain.on(
  "sup-trad",
  (
    event,
    data: {
      id: number;
    }
  ) => {
    // Supprimer une traduction par son ID
    try {
      supprimerTraductionParId(data.id);
      event.reply("sup-trad-success", "Traduction supprimée avec succès.");
    } catch (erreur) {
      console.error("Erreur lors de la suppression de la traduction :", erreur);
      event.reply("sup-trad-error", (erreur as Error).message);
    }
  }
);

// Supprimer des synthèses
ipcMain.on(
  "sup-synth",
  (
    event,
    data: {
      id: number;
    }
  ) => {
    // Supprimer une synthèse par son ID
    try {
      supprimerSyntheseParId(data.id);
      event.reply("sup-synth-success", "Synthèse supprimée avec succès.");
    } catch (erreur) {
      console.error("Erreur lors de la suppression de la synthèse :", erreur);
      event.reply("sup-synth-error", (erreur as Error).message);
    }
  }
);

// Supprimer des reformulations
ipcMain.on(
  "sup-reform",
  (
    event,
    data: {
      id: number;
    }
  ) => {
    // Supprimer une reformulation par son ID
    try {
      supprimerReformulationParId(data.id);
      event.reply("sup-reform-success", "Reformulation supprimée avec succès.");
    } catch (erreur) {
      console.error(
        "Erreur lors de la suppression de la reformulation :",
        erreur
      );
      event.reply("sup-reform-error", (erreur as Error).message);
    }
  }
);

// Récupérer des traductions avec pagination
ipcMain.handle(
  "get-trads",
  async (_event, data: { page: number; taille: number }) => {
    try {
      return await obtenirTradPagination(data.page, data.taille);
    } catch (erreur) {
      console.error("Erreur lors de la récupération des traductions :", erreur);
      throw erreur;
    }
  }
);

// Récupérer des synthèses avec pagination
ipcMain.handle(
  "get-synths",
  async (_event, data: { page: number; taille: number }) => {
    try {
      return await obtenirSynthPagination(data.page, data.taille);
    } catch (erreur) {
      console.error("Erreur lors de la récupération des synthèses :", erreur);
      throw erreur;
    }
  }
);

// Récupérer des reformulations avec pagination
ipcMain.handle(
  "get-reforms",
  async (_event, data: { page: number; taille: number }) => {
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

// Récupérer le nombre total de traductions
ipcMain.handle("get-nombre-trads", async () => {
  try {
    return obtenirNombreTotalTraductions();
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération du nombre total de traductions :",
      erreur
    );
    throw erreur;
  }
});

// Récupérer le nombre total de synthèses
ipcMain.handle("get-nombre-synths", async () => {
  try {
    return await obtenirNombreTotalSyntheses();
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération du nombre total de synthèses :",
      erreur
    );
    throw erreur;
  }
});

// Récupérer le nombre total de reformulations
ipcMain.handle("get-nombre-reforms", async () => {
  try {
    return await obtenirNombreTotalReformulations();
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération du nombre total de reformulations :",
      erreur
    );
    throw erreur;
  }
});

// Récupérer une traduction par son ID
ipcMain.handle("get-trad-par-id", async (_event, id: number) => {
  try {
    return obtenirTraductionParId(id);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération de la traduction par ID :",
      erreur
    );
    throw erreur;
  }
});

// Récupérer une synthèse par son ID
ipcMain.handle("get-synth-par-id", async (_event, id: number) => {
  try {
    return obtenirSyntheseParId(id);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération de la synthèse par ID :",
      erreur
    );
    throw erreur;
  }
});
// Récupérer une reformulation par son ID
ipcMain.handle("get-reform-par-id", async (_event, id: number) => {
  try {
    return obtenirReformulationParId(id);
  } catch (erreur) {
    console.error(
      "Erreur lors de la récupération de la reformulation par ID :",
      erreur
    );
    throw erreur;
  }
});
