// !判断是否联网

const {
  ipcRenderer
} = require('electron')

let indexOfUrl = window.location.href.includes('electron')

const updateOnlineStatus = () => {
  ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
}
if (!indexOfUrl) {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
}

// updateOnlineStatus()