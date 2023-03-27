import { app, shell, BrowserWindow, screen } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

const WINDOW_WIDTH = 400
const WINDOW_HEIGHT = 440
const TG_8_DEG = 0.140540835

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    show: false,
    autoHideMenuBar: true,
    transparent: true,
    titleBarStyle: 'hidden',
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.setResizable(false)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // BrowserWindow.getAllWindows()[0].setIgnoreMouseEvents(true);

  setInterval(() => {
    const windowPos = BrowserWindow.getAllWindows()[0].getPosition()
    const cursorPos = screen.getCursorScreenPoint()

    const rcx = cursorPos.x - (windowPos[0] + 57) // TODO: calc 57 as padding with sin
    const rcy = cursorPos.y - windowPos[1]

    const distanceFromTop = -rcy
    const distanceFromBot = -(WINDOW_HEIGHT - rcy) + 15 // TODO: 15 is a magic number

    const distanceFromLeft = TG_8_DEG * -distanceFromBot - rcx - 33 // TODO: 33 is a magic number
    const distanceFromRight = -(distanceFromLeft + (WINDOW_WIDTH - 2 * 57))

    if (
      distanceFromTop > 0 ||
      distanceFromBot > 0 ||
      distanceFromLeft > 0 ||
      distanceFromRight > 0
    ) {
      BrowserWindow.getAllWindows()[0].setIgnoreMouseEvents(true, { forward: true })
    } else {
      BrowserWindow.getAllWindows()[0].setIgnoreMouseEvents(false)
    }
  }, 100)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
