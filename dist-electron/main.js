import { app as n, BrowserWindow as t } from "electron";
import { fileURLToPath as c } from "node:url";
import o from "node:path";
const l = c(import.meta.url), s = o.dirname(l);
process.env.APP_ROOT = o.join(s, "..");
console.log("APP_ROOT:", process.env.APP_ROOT);
const i = process.env.VITE_DEV_SERVER_URL, m = o.join(process.env.APP_ROOT, "dist-electron"), r = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = i ? o.join(process.env.APP_ROOT, "public") : r;
let e;
function a() {
  e = new t({
    icon: o.join(process.env.VITE_PUBLIC, "favicon.ico"),
    resizable: !0,
    height: 850,
    width: 1050,
    minWidth: 1050,
    minHeight: 850,
    webPreferences: {
      preload: o.join(s, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !0,
      sandbox: !0
    }
  }), e.webContents.on("did-finish-load", () => {
    e == null || e.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), i ? e.loadURL(i) : e.loadFile(o.join(r, "index.html"), { hash: "/" });
}
n.on("window-all-closed", () => {
  process.platform !== "darwin" && (n.quit(), e = null);
});
n.on("activate", () => {
  t.getAllWindows().length === 0 && a();
});
n.whenReady().then(a);
export {
  m as MAIN_DIST,
  r as RENDERER_DIST,
  i as VITE_DEV_SERVER_URL
};
