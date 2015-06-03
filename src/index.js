'use strict';

import app from "app";
import BrowserWindow from "browser-window";

require('crash-reporter').start();

let mainWindow = null;

app.on('window-all-closed', () => {
  if (process.platform != 'darwin')
    app.quit();
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 1000, height: 750});
  mainWindow.maximize();
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
