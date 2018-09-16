const electron = require('electron');
// Module to control application life.
const app = electron.app;
const globalShortcut = electron.globalShortcut;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const HotwordDetector = require('node-hotworddetector');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

const detectorData = {
    resource: '../node_modules/snowboy/resources/common.res'
};
const modelData = [
    {
        file: './Hi_devil.pmdl',
        hotwords: 'Hi Devil',
        sensitivity: '0.5'
    }
];
const recorderData = {
    audioGain: 2,
};
const logger = console;
let hotwordDetector =  new HotwordDetector(detectorData, modelData, recorderData, logger);

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 500,
        height: 600,
        frame: false,
        // vibrancy: 'ultra-dark',
        alwaysOnTop: true,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        skipTaskbar: true,
        radii: [5, 5, 5, 5],
        titleBarStyle: 'hiddenInset',
        icon: __dirname + '/assets/images/logo.png',
        backgroundColor: '#000000'
    });
    mainWindow.setResizable(false);
    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
    // mainWindow.on('blur', function () {
    //     mainWindow.hide();
    // })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
    
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
app.on('ready', () => {
    createWindow;

    const ret = globalShortcut.register('CommandOrControl+Space', () => {
        console.log('CommandOrControl+X is pressed');
        mainWindow.show();
    });
    if (!ret) {
        console.log('registration failed');
    }
    // Check whether a shortcut is registered.
    // hotwordDetector.start();
    // hotwordDetector.on('error', function (error) {
    //     console.error('hotwordDetector: ' + error);
    // });
    // // Triggered when a hotword has been detected.
    // hotwordDetector.on('hotword', function (index, hotword, buffer) {
    //     console.log('hotwordDetector: Hotword detected: ' + hotword);
    //     mainWindow.show();
    // });
    // console.log(globalShortcut.isRegistered('CommandOrControl+X'));
})

//   // Triggered when there is no audible sound being recorded.
//   hotwordDetector.on('silence', function() {
//     console.log('hotwordDetector: silence');
//   });
//   // Triggered when there is audible sound being recorded.
//   hotwordDetector.on('sound', function(buffer) {
//     // Buffer is the most recent section from the audio buffer.
//     console.log('hotwordDetector: sound: ' + buffer);
//   });