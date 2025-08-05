// L'importation est fait en commonjs pour que le script soit lisible par electron.
const { ipcRenderer, contextBridge } = require("electron");

console.log("Preload script chargé.");
// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(
      channel,
      (event: Electron.IpcRendererEvent, ...args: unknown[]) =>
        (
          listener as (
            event: Electron.IpcRendererEvent,
            ...args: unknown[]
          ) => void
        )(event, ...args)
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },

  // You can expose other APTs you need here.
  // ...
});
