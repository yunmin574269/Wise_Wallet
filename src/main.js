"use strict";

const {app, ipcMain} = require('electron');

const SplashWindow = require('./windows/controllers/splash');
const SettingWindow = require('./windows/controllers/settings');
const IndexWindow = require('./windows/controllers/index');
const SqliteHandle = require('./windows/lib/sqlite-handle');
const IpcMainHandle = require('./windows/lib/ipcmain-handle');

class Main{
    constructor() {
        this.splashWindow = null;
        this.settingsWindow = null;
        this.indexWindow = null;
    }

    init() {
        new SqliteHandle().init();
        this.initApp(); 
    }

    // initEvent() {
    //     ipcMain.on('get-accounts', (event, arg) => {
    //         console.log(arg) // prints "ping"
    //         event.sender.send('accounts', 'pong')
    //       });
    // }

    initApp() {
        app.on('ready', ()=> {
            this.createSplashWindow();
            this.createIndexWindow();
            setTimeout(function(obj) {
                obj.splashWindow.close();
                obj.indexWindow.show();
            }, 2000, this);
        });

        app.on('activate', () => {
        });
    };

    createSplashWindow() {
        this.splashWindow = new SplashWindow();
        this.splashWindow.show();
    }

    createSettingsWindow() {
        this.settingsWindow = new SettingWindow();
    }

    createIndexWindow() {
        this.indexWindow = new IndexWindow();
    }
}

new Main().init();