// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
  ipcMain
} = require('electron')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


function createWindow() {

  require('getmac').getMac(function (err, macAddress) {
    if (err) throw err
    mainWindow.loadURL(`file://${__dirname}/index.html?mac=${macAddress.replace(/-/g, "")}`)
  })


  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 800,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'test.js')
    }
  })
  // *全屏
  mainWindow.setFullScreen(true)

  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
  if (status == 'offline') {
    require('getmac').getMac(function (err, macAddress) {
      if (err) throw err
      mainWindow.loadURL(`file://${__dirname}/index.html?mac=${macAddress.replace(/-/g, "")}`)
    })
  }
})



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.