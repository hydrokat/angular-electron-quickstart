// ./main.js
const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path');
const url = require('url');

require('electron-reload')(__dirname);

require('dotenv').config();

let win = null;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {

    // Initialize the window to our specified dimensions
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            plugins: true
        }
    });

    var title = "Angular Electron";
    // win.maximize();
    // win.setFullScreen(true);
    win.setTitle(title);
    win.setMenu(null);

    // Show dev tools
    // Remove this line before distributing
    win.webContents.openDevTools();

    // Specify entry point    
    if (typeof process.env.PACKAGE === "undefined" || process.env.PACKAGE === true) {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            // pathname: path.join(app.getAppPath(), 'dist/index.html'),
            protocol: 'file:',
            slashes: true
        }));
    } else {
        win.loadURL(process.env.HOST);
        win.webContents.openDevTools();
    }

    // Remove window once app is closed
    win.on('closed', function () {
        win = null;
    });

});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});