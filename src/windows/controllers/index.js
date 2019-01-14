"use strict";

const path = require('path');
const { BrowserWindow,dialog} = require('electron');
var remote = require('electron');
var Menu = remote.Menu;
const clidwindow=require('./clidwindow');
const clidw=new clidwindow();
//const AppConfig = require('../../configuration');

//const lan = AppConfig.readSettings('language');

//const Common = require('../../common');


var template = [{
  label: '账户',
  submenu: [{
    label: '新建账户',
    accelerator: 'Ctrl+N'
    // role: 'copy',
    //click
  }, {
    type: 'separator'   //分割符
  },{
    label: '导出私钥',
    // accelerator: 'Ctrl+Z',
    role: 'export',
    submenu:[{
      label:'导出',
      click:function(){
        dialog.showOpenDialog(null,{
          properties: ['openFile', 'showHiddenFiles'],
          filters: [{
            name: 'Text', 
          }]
        },function(files){
          if(files!=null){
            let pathss=files[0];

            clidw.clidwindow(top,pathss,'1');
          }
        })
      }
    },{
      label:'另存为',
      click:function(){
        dialog.showOpenDialog(null,{
          properties: ['openFile', 'showHiddenFiles'],
          filters: [{
            name: 'Text', 
          }]
        },function(files){
          if(files!=null){
            let pathss=files[0];
            clidw.clidwindow(top,pathss,'2');
          }
        })
      }
    }]
  }, {
    label: '二维码',
    accelerator:'Ctrl+Z',
    click:function(){
      dialog.showOpenDialog(null,{
        properties: ['openFile', 'showHiddenFiles'],
        filters: [{
          name: 'Text', 
        }]
      },function(files){
        if(files!=null){
          let pathss=files[0];

          clidw.qrcode(top,pathss);
        }
      })
    }
  }]
}, {
  label: '关于',
  role: 'about',
  submenu: [{
    label: '学习更多',
    click: function () {
      remote.shell.openExternal('http://electron.atom.io')
    }
  }]
}];

let top;

class Index {
  constructor() {
    top = new BrowserWindow({
      width: 800,
      height: 600,
      title: 'Wise Wallet',
      resizable: true,
      center: true,
      show: false,
      frame: true,
      autoHideMenuBar: false,
      alwaysOnTop: false,
      icon: 'assets/icon.jpg',
      titleBarStyle: 'hidden',
    });

    top.loadURL(`file://${path.join(__dirname, '/../views/index.html')}`);
    top.isShown = false;

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

  }

  show() {
    top.show();
    top.isShown = true;

    // 打开开发者工具
    //top.webContents.openDevTools()
  }

  hide() {
    top.hide();
    top.isShown = false;
  }

  close() {
    top.close();
  }

}

module.exports = Index;