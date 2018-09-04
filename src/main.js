const {app, ipcMain} = require('electron');

const SplashWindow = require('./windows/controllers/splash');
const SettingWindow = require('./windows/controllers/settings');
const IndexWindow = require('./windows/controllers/index');

class Main{
    constructor() {
        this.splashWindow = null;
        this.settingsWindow = null;
        this.indexWindow = null;
    }

    init() {
        this.initApp();
    }

    initApp() {
        app.on('ready', ()=> {
            this.createSplashWindow();
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