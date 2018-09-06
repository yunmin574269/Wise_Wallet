"use strict";

const path = require('path');
const { BrowserWindow } = require('electron');

//const AppConfig = require('../../configuration');

//const lan = AppConfig.readSettings('language');

//const Common = require('../../common');

class Index {
  constructor() {
    this.index = new BrowserWindow({
      width: 800,
      height: 600,
      title: 'Wise Wallet',
      resizable: true,
      center: true,
      show: true,
      frame: true,
      autoHideMenuBar: true,
      alwaysOnTop: false,
      icon: 'assets/icon.jpg',
      titleBarStyle: 'hidden',
    });

    this.index.loadURL(`file://${path.join(__dirname, '/../views/index.html')}`);
    this.isShown = false;
  }

  show() {
    this.index.show();
    this.isShown = true;

    // 打开开发者工具
    this.index.webContents.openDevTools()
  }

  hide() {
    this.index.hide();
    this.isShown = false;
  }

  close() {
      this.index.close();
  }
}

module.exports = Index;