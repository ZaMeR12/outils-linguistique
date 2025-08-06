import { app as i, BrowserWindow as m, ipcMain as n } from "electron";
import { fileURLToPath as y } from "node:url";
import s from "node:path";
import R from "better-sqlite3";
const o = new R(s.join(i.getPath("userData"), "database.db"));
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
      langue_synthese TEXT NOT NULL,
      modele TEXT NOT NULL,
      date_synthese TEXT NOT NULL
    );
`);
o.exec(`
  CREATE TABLE IF NOT EXISTS reformulation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texte_original TEXT NOT NULL,
    texte_reformule TEXT NOT NULL,
    langue_reformule TEXT NOT NULL,
    style TEXT NOT NULL,
    limite_mots INTEGER NOT NULL,
    modele TEXT NOT NULL,
    date_reformulation TEXT NOT NULL
  );
`);
const L = (r, e, t, l, c, u) => {
  o.prepare(`
    INSERT INTO traduction (texte_original, texte_traduit, langue_origine, langue_cible, date_traduction, modele)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    r,
    e,
    t,
    l,
    c,
    u
  );
}, O = (r, e, t, l, c) => {
  o.prepare(`
    INSERT INTO synthese (texte_original, texte_synthetise, langue_synthese, date_synthese, modele)
    VALUES (?, ?, ?, ?, ?)
  `).run(
    r,
    e,
    t,
    l,
    c
  );
}, g = (r, e, t, l, c, u, T) => {
  o.prepare(`
    INSERT INTO reformulation (texte_original, texte_reformule, langue_reformule, style, limite_mots, date_reformulation, modele)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    r,
    e,
    t,
    l,
    c,
    u,
    T
  );
}, N = (r) => {
  o.prepare("DELETE FROM traduction WHERE id = ?").run(r);
}, _ = (r) => {
  o.prepare("DELETE FROM synthese WHERE id = ?").run(r);
}, f = (r) => {
  o.prepare("DELETE FROM reformulation WHERE id = ?").run(r);
}, I = async (r, e) => o.prepare(
  " SELECT * FROM traduction ORDER BY date_traduction DESC LIMIT ? OFFSET ?"
).all(e, r * e), S = async (r, e) => o.prepare(
  " SELECT * FROM synthese ORDER BY date_synthese DESC LIMIT ? OFFSET ?"
).all(e, r * e), w = async (r, e) => o.prepare(
  " SELECT * FROM reformulation ORDER BY date_reformulation DESC LIMIT ? OFFSET ?"
).all(e, r * e), U = () => o.prepare("SELECT COUNT(*) AS total FROM traduction").get().total, b = () => o.prepare("SELECT COUNT(*) AS total FROM synthese").get().total, P = () => o.prepare("SELECT COUNT(*) AS total FROM reformulation").get().total, C = (r) => o.prepare("SELECT * FROM traduction WHERE id = ?").get(r), x = (r) => o.prepare("SELECT * FROM synthese WHERE id = ?").get(r), A = (r) => o.prepare("SELECT * FROM reformulation WHERE id = ?").get(r), j = () => {
  o.close();
}, M = y(import.meta.url), E = s.dirname(M);
process.env.APP_ROOT = s.join(E, "..");
console.log("APP_ROOT:", process.env.APP_ROOT);
const d = process.env.VITE_DEV_SERVER_URL, W = s.join(process.env.APP_ROOT, "dist-electron"), p = s.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = d ? s.join(process.env.APP_ROOT, "public") : p;
let a;
const D = s.resolve(E, "../dist-electron/preload.js");
console.log("Preload path:", D);
function h() {
  const r = process.platform === "linux" ? s.join(process.env.VITE_PUBLIC, "icon-512.png") : s.join(process.env.VITE_PUBLIC, "favicon.ico");
  console.log("Icon path:", r), a = new m({
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
  }), d ? a.loadURL(d) : a.loadFile(s.join(p, "index.html"), { hash: "/" });
}
i.on("window-all-closed", () => {
  process.platform !== "darwin" && (j(), i.quit(), a = null);
});
i.on("activate", () => {
  m.getAllWindows().length === 0 && h();
});
i.whenReady().then(h);
n.on(
  "ajout-trad",
  (r, e) => {
    try {
      L(
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
      O(
        e.texteOriginal,
        e.texteSynthetise,
        e.langueSynthese,
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
      g(
        e.texteOriginal,
        e.texteReformule,
        e.langueReformule,
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
      N(e.id), r.reply("sup-trad-success", "Traduction supprimée avec succès.");
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
      f(e.id), r.reply("sup-reform-success", "Reformulation supprimée avec succès.");
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
      return await I(e.page, e.taille);
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
      return await w(e.page, e.taille);
    } catch (t) {
      throw console.error(
        "Erreur lors de la récupération des reformulations :",
        t
      ), t;
    }
  }
);
n.handle("get-nombre-trads", async () => {
  try {
    return U();
  } catch (r) {
    throw console.error(
      "Erreur lors de la récupération du nombre total de traductions :",
      r
    ), r;
  }
});
n.handle("get-nombre-synths", async () => {
  try {
    return await b();
  } catch (r) {
    throw console.error(
      "Erreur lors de la récupération du nombre total de synthèses :",
      r
    ), r;
  }
});
n.handle("get-nombre-reforms", async () => {
  try {
    return await P();
  } catch (r) {
    throw console.error(
      "Erreur lors de la récupération du nombre total de reformulations :",
      r
    ), r;
  }
});
n.handle("get-trad-par-id", async (r, e) => {
  try {
    return C(e);
  } catch (t) {
    throw console.error(
      "Erreur lors de la récupération de la traduction par ID :",
      t
    ), t;
  }
});
n.handle("get-synth-par-id", async (r, e) => {
  try {
    return x(e);
  } catch (t) {
    throw console.error(
      "Erreur lors de la récupération de la synthèse par ID :",
      t
    ), t;
  }
});
n.handle("get-reform-par-id", async (r, e) => {
  try {
    return A(e);
  } catch (t) {
    throw console.error(
      "Erreur lors de la récupération de la reformulation par ID :",
      t
    ), t;
  }
});
export {
  W as MAIN_DIST,
  p as RENDERER_DIST,
  d as VITE_DEV_SERVER_URL
};
