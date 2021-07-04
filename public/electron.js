// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const isDev = require("electron-is-dev");
const osc = require('node-osc');
const client = new osc.Client('localhost', 57110);
const server = new osc.Server(12500);
const {exec} = require('child_process');
const Encoding = require('encoding-japanese');

function createWindow () {

  /*
  exec('&"C:/Program Files/SuperCollider-3.11.2/scsynth.exe" -u 57110', (error, stdout, strerr) => {
    if (error) {
      console.error(`[ERROR] ${error}`);
    }

    const toString = (bytes) => {
      return Encoding.convert(bytes, {
        from: 'EUCJP',
        to: 'SJIS',
        type: 'string',
      });
    };
    
    console.log(`stdout:`);
    console.log(`${toString(stdout)}`);
    console.error(`strerr:`);
    console.error(`${toString(strerr)}`);

  });
  */

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );


  setTimeout(() => {
    var m = new osc.Message("/d_load");
    var appPath = app.getPath("exe");
    appPath = appPath.substr(0, appPath.lastIndexOf("\\"));
    var trimed = appPath.substr(0, appPath.lastIndexOf("\\"));
    m.append(trimed + "\\test.scsyndef");
    client.send(m);  
  }, 1500);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()


})

ipcMain.handle('osc', (event, data) => {
    var m = new osc.Message(data["address"]);
    m.append(data["args"]);
    client.send(m);
})

ipcMain.handle('nyan', (event, data) => {
  console.log('nyan');
})