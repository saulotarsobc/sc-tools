import { app, BrowserWindow, ipcMain, IpcMainEvent, shell } from "electron";
import { join } from "node:path";


if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow;

async function createWindow() {
  win = new BrowserWindow({
    title: `SC - Tools - v0.0.1`,
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, "preload.js"),
      webSecurity: true,
    },
  });

  if (app.isPackaged) {
    win.loadFile(join(__dirname, "..", "..", "dist", "frontend", "index.html"));
  } else {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  };

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
  });

  app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  app.on("activate", () => {
    const allWindows = BrowserWindow.getAllWindows();
    if (allWindows.length) {
      allWindows[0].focus();
    } else {
      createWindow();
    }
  });
}

app.whenReady().then(createWindow);

ipcMain.on("say-hello", (event: IpcMainEvent) => {
  console.log("Hello from main process");
  console.log(event);
});

