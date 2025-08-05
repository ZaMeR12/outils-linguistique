import { app as c, BrowserWindow as d, ipcMain as n } from "electron";
import { fileURLToPath as L } from "node:url";
import s from "node:path";
import R from "better-sqlite3";
const o = new R(s.join(c.getPath("userData"), "database.db"));
o.exec(`
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
o.exec(`
    CREATE TABLE IF NOT EXISTS synthese (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      texte_original TEXT NOT NULL,
      texte_synthetise TEXT NOT NULL,
      langue_origine TEXT NOT NULL,
      modele TEXT NOT NULL,
      date_synthese TEXT NOT NULL
    );
`);
o.exec(`
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
const y = (r, e, t, i, l, u) => {
  o.prepare(`
    INSERT INTO traduction (texte_original, texte_traduit, langue_origine, langue_cible, date_traduction, modele)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    r,
    e,
    t,
    i,
    l,
    u
  );
}, g = (r, e, t, i, l) => {
  o.prepare(`
    INSERT INTO synthese (texte_original, texte_synthetise, langue_origine, date_synthese, modele)
    VALUES (?, ?, ?, ?, ?)
  `).run(r, e, t, i, l);
}, N = (r, e, t, i, l, u, p) => {
  o.prepare(`
    INSERT INTO reformulation (texte_original, texte_reformule, langue_origine, style, limite_mots, date_reformulation, modele)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    r,
    e,
    t,
    i,
    l,
    u,
    p
  );
}, O = (r) => {
  o.prepare("DELETE FROM traduction WHERE id = ?").run(r);
}, _ = (r) => {
  o.prepare("DELETE FROM synthese WHERE id = ?").run(r);
}, I = (r) => {
  o.prepare("DELETE FROM reformulation WHERE id = ?").run(r);
}, f = async (r, e) => o.prepare(
  " SELECT * FROM traduction ORDER BY date_traduction DESC LIMIT ? OFFSET ?"
).all(e, r * e), S = async (r, e) => o.prepare(
  " SELECT * FROM synthese ORDER BY date_synthese DESC LIMIT ? OFFSET ?"
).all(e, r * e), U = async (r, e) => o.prepare(
  " SELECT * FROM reformulation ORDER BY date_reformulation DESC LIMIT ? OFFSET ?"
).all(e, r * e), P = () => {
  o.close();
}, x = L(import.meta.url), E = s.dirname(x);
process.env.APP_ROOT = s.join(E, "..");
console.log("APP_ROOT:", process.env.APP_ROOT);
const T = process.env.VITE_DEV_SERVER_URL, M = s.join(process.env.APP_ROOT, "dist-electron"), m = s.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = T ? s.join(process.env.APP_ROOT, "public") : m;
let a;
const j = s.resolve(E, "../dist-electron/preload.js");
console.log("Preload path:", j);
function h() {
  const r = process.platform === "linux" ? s.join(process.env.VITE_PUBLIC, "icon-512.png") : s.join(process.env.VITE_PUBLIC, "favicon.ico");
  console.log("Icon path:", r), a = new d({
    icon: r,
    resizable: !0,
    height: 850,
    width: 1050,
    minWidth: 1050,
    minHeight: 850,
    webPreferences: {
      preload: s.resolve(E, "preload.js"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !0,
      sandbox: !0
    }
  }), a.webContents.on("did-finish-load", () => {
    a == null || a.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), T ? a.loadURL(T) : a.loadFile(s.join(m, "index.html"), { hash: "/" });
}
c.on("window-all-closed", () => {
  process.platform !== "darwin" && (P(), c.quit(), a = null);
});
c.on("activate", () => {
  d.getAllWindows().length === 0 && h();
});
c.whenReady().then(h);
n.on(
  "ajout-trad",
  (r, e) => {
    try {
      y(
        e.texteOriginal,
        e.texteTraduit,
        e.langueOrigine,
        e.langueCible,
        e.dateTraduction,
        e.modele
      ), r.reply("ajout-trad-success", "Traduction ajoutée avec succès.");
    } catch (t) {
      console.error("Erreur lors de l'insertion de la traduction :", t), r.reply("ajout-trad-error", t.message);
    }
  }
);
n.on(
  "ajout-synth",
  (r, e) => {
    try {
      g(
        e.texteOriginal,
        e.texteSynthetise,
        e.langueOrigine,
        e.dateSynthese,
        e.modele
      ), r.reply("ajout-synth-success", "Synthèse ajoutée avec succès.");
    } catch (t) {
      console.error("Erreur lors de l'insertion de la synthèse :", t), r.reply("ajout-synth-error", t.message);
    }
  }
);
n.on(
  "ajout-reform",
  (r, e) => {
    try {
      N(
        e.texteOriginal,
        e.texteReformule,
        e.langueOrigine,
        e.style,
        e.limiteMots,
        e.dateReformulation,
        e.modele
      ), r.reply("ajout-reform-success", "Reformulation ajoutée avec succès.");
    } catch (t) {
      console.error("Erreur lors de l'insertion de la reformulation :", t), r.reply("ajout-reform-error", t.message);
    }
  }
);
n.on(
  "sup-trad",
  (r, e) => {
    try {
      O(e.id), r.reply("sup-trad-success", "Traduction supprimée avec succès.");
    } catch (t) {
      console.error("Erreur lors de la suppression de la traduction :", t), r.reply("sup-trad-error", t.message);
    }
  }
);
n.on(
  "sup-synth",
  (r, e) => {
    try {
      _(e.id), r.reply("sup-synth-success", "Synthèse supprimée avec succès.");
    } catch (t) {
      console.error("Erreur lors de la suppression de la synthèse :", t), r.reply("sup-synth-error", t.message);
    }
  }
);
n.on(
  "sup-reform",
  (r, e) => {
    try {
      I(e.id), r.reply("sup-reform-success", "Reformulation supprimée avec succès.");
    } catch (t) {
      console.error(
        "Erreur lors de la suppression de la reformulation :",
        t
      ), r.reply("sup-reform-error", t.message);
    }
  }
);
n.handle(
  "get-trads",
  async (r, e) => {
    try {
      return await f(e.page, e.taille);
    } catch (t) {
      throw console.error("Erreur lors de la récupération des traductions :", t), t;
    }
  }
);
n.handle(
  "get-synths",
  async (r, e) => {
    try {
      return await S(e.page, e.taille);
    } catch (t) {
      throw console.error("Erreur lors de la récupération des synthèses :", t), t;
    }
  }
);
n.handle(
  "get-reforms",
  async (r, e) => {
    try {
      return await U(e.page, e.taille);
    } catch (t) {
      throw console.error(
        "Erreur lors de la récupération des reformulations :",
        t
      ), t;
    }
  }
);
export {
  M as MAIN_DIST,
  m as RENDERER_DIST,
  T as VITE_DEV_SERVER_URL
};
