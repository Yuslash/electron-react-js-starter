import { app, BrowserWindow, Menu, screen, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow

app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width,
    height,
    frame: true,
    webPreferences: { nodeIntegration: true, contextIsolation: false }
  })

  mainWindow.maximize()
  Menu.setApplicationMenu(null)

  const devServerUrl = 'http://localhost:5173'
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL(devServerUrl)
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'))
  }

  mainWindow.on('closed', () => { mainWindow = null })
})

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
