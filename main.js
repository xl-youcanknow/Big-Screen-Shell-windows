//! 自助购系统 || 查询机系统 
//! 打包成.exe 

//*    系统推荐配置
//*    CPU：Intel酷睿双核处理器
//*    内存：4GB及以上
//*    显卡：无硬性要求 （标配即可）
//*    硬盘：55G（包括临时交换空间），推荐7200转机械硬盘
//*    操作系统：Windows 7（SP1）/8/10（64位) 推荐使用（win10）


// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow,
} = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // app.commandLine.appendSwitch('disable-pinch')
  // app.commandLine.appendSwitch("--disable-http-cache")

  require('getmac').getMac(function (err, macAddress) {
    if (err) throw err;
    fs.readFile('config.conf', 'utf-8', function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data)
        mainWindow.loadURL(
          `file://${__dirname}/index.html?sid=${data}&mac=${macAddress.replace(/-/g, '')}`
        );
      }
    });
  });

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1080,
    height: 1920,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'test.js')
    }
  });
  // *全屏
  mainWindow.setFullScreen(true);

  // mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

// ipcMain.on('online-status-changed', (event, status) => {
//   console.log(status);
//   if (status == 'offline') {
//     require('getmac').getMac(function (err, macAddress) {
//       if (err) throw err;
//       fs.readFile('config.conf', 'utf-8', function (err, data) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(data)
//           mainWindow.loadURL(
//             `file://${__dirname}/index.html?sid=${data}&mac=${macAddress.replace(/-/g, '')}`
//           );
//         }
//       });
//     });
//   }
// });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.