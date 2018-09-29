"use strict";

const {app, ipcMain} = require('electron');

const SplashWindow = require('./windows/controllers/splash');
const SettingWindow = require('./windows/controllers/settings');
const IndexWindow = require('./windows/controllers/index');
const SqliteHandle = require('./windows/lib/sqlite-handle');
const IpcMainHandle = require('./windows/lib/ipcmain-handle');
const nacl = require('./windows/lib/nacl.min.js');
//const AccountHandle = require('./windows/lib/account-handle');
const KeyStore = require('./windows/lib/keystore');
require('../test/GetMaxNum');
const Verification = require('./windows/lib/Verification');

class Main{
    constructor() {
        this.splashWindow = null;
        this.settingsWindow = null;
        this.indexWindow = null;
    }

    async init() {
        new IpcMainHandle().init();
        new SqliteHandle().init();
        this.initApp(); 
        //this.test();
        //let keyStore = new AccountHandle().CreateKeyStore();
        const keystore = new KeyStore();
        const savefile = await keystore.Create('123456');
        // keystore.Save(savefile);
        await keystore.DecryptSecretKey('1BYryVWkZJki9s3YYSS9pZhwApnG9qLrw3', '123456');

        Verification.AddressVerify('1BYryVWkZJki9s3YYSS9pZhwApnG9qLrw3');
    }

    // test() {
    //     let seed = new Uint8Array(32);
    //     for(let i=0; i<32; i++)
    //     {
    //         seed[i] = 0;
    //     }
    //     let keyPair = nacl.sign.keyPair.fromSeed(seed);
    //     new AccountHandle().createAccountWithPubKey(keyPair.publicKey);
    // }

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