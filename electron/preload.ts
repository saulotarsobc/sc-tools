import { contextBridge, ipcRenderer } from "electron";

export const api = {
    sayHello: () => {
        ipcRenderer.send('say-hello');
    }
};

contextBridge.exposeInMainWorld("api", api);