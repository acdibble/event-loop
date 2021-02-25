const { app, BrowserWindow, ipcMain } = require('electron')
const { performance } = require('perf_hooks')
const { blocking, asynchronous, asynchronousParallel } = require('./functions')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

const benchmark = (label) => {
  const start = performance.now()
  console.log('beginning', label, 'call now')
  return () => {
    console.log(label, 'took', performance.now() - start, 'ms to execute')
  }
}

ipcMain.on('block', () => {
  const end = benchmark('blocking')
  blocking()
  end()
})

ipcMain.on('no-block', async () => {
  const end = benchmark('non-blocking')
  await asynchronous()
  end()
})

ipcMain.on('parallel', async () => {
  const end = benchmark('parallel')
  await asynchronousParallel()
  end()
})

ipcMain.on('quit', () => {
  app.quit()
})
