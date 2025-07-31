import { app as n, BrowserWindow as t } from "electron";
import { fileURLToPath as a } from "node:url";
import e from "node:path";
const p = a(import.meta.url), r = e.dirname(p);
process.env.APP_ROOT = e.join(r, "..");
console.log("APP_ROOT:", process.env.APP_ROOT);
const i = process.env.VITE_DEV_SERVER_URL, R = e.join(process.env.APP_ROOT, "dist-electron"), c = e.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? e.join(process.env.APP_ROOT, "public") : c;
let o;
function l() {
  const s = process.platform === "linux" ? e.join(process.env.VITE_PUBLIC, "icon-512.png") : e.join(process.env.VITE_PUBLIC, "favicon.ico");
  console.log("Icon path:", s), o = new t({
    icon: s,
    resizable: !0,
    height: 850,
    width: 1050,
    minWidth: 1050,
    minHeight: 850,
    webPreferences: {
      preload: e.join(r, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !0,
      sandbox: !0
    }
  }), o.webContents.on("did-finish-load", () => {
    o == null || o.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? o.loadURL(i) : o.loadFile(e.join(c, "index.html"), { hash: "/" });
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), o = null);
});
n.on("activate", () => {
  t.getAllWindows().length === 0 && l();
});
n.whenReady().then(l);
export {
  R as MAIN_DIST,
  c as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};
