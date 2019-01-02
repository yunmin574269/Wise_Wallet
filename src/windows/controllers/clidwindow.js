"use strict";

const path = require('path');
const { BrowserWindow} = require('electron');
const {dialog} = require('electron')
var remote = require('electron');
var session=remote.session;
const KeyStore = require('../lib/keystore');
// const indexs=require('./index.js');

var win;
var qr;

class clidwindow{
  constructor(){ 
  }
  

  clidwindow(top,pathss,type){
    const modalPath = path.join(`file://${path.join(__dirname, '../views/inputpasswd.html')}`)
    win= new BrowserWindow({ 
      width: 400, 
      height: 105,
      title:'请输入密码',
      parent: top, 
      modal: true,
      show: false,
      resizable:false,
      autoHideMenuBar: true })
    //Menu.setApplicationMenu(null);
    win.on('closed', function () { win = null })
    win.loadURL(modalPath)
    win.show()
    //let winweb=win.webContents;
    this.setCookies('pathss',pathss);
    this.setCookies('type',type);
    //win.webContents.openDevTools()  
  }

qrcode(top,pathss){
    const modalPath = path.join(`file://${path.join(__dirname, '../views/qrcode.html')}`)
    qr= new BrowserWindow({ 
      width: 400, 
      height: 400,
      title:'请输入密码',
      parent: top, 
      modal: true,
      show: false,
      resizable:false,
      autoHideMenuBar: true })
    //Menu.setApplicationMenu(null);
    qr.on('closed', function () { win = null })
    qr.loadURL(modalPath)
    qr.show()
    //let winweb=win.webContents;
    this.setCookies('pathss',pathss);
    //qr.webContents.openDevTools();
  }

setCookies(name, value){
  const cookie = {
    url: "http://www.github.com",
    name: name,
    value: value
    //expirationDate: date
  };
  session.defaultSession.cookies.set(cookie, (error) => {
    if (error) console.error(error);
  });
}

}
module.exports = clidwindow;
