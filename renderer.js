const { ipcRenderer } = require('electron')

window.send = (channel) => ipcRenderer.send(channel)

setInterval(() => {
  document.getElementById('time').innerText = new Date().toISOString()
}, 1000)
