'use strict'

const { app, protocol, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')
const chokidar = require('chokidar')
// const PDFDocument = require('pdfkit') ----------------------------1.2
import PDFDocument from 'pdfkit'    

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
const WATCH_DIR = 'C:/Users/c240119/Desktop/AUTO/image' // 设置要监控的文件夹路径

// 获取csv表格内容              --------------------------------1.1
const csv = require('csv-parser') // 需要安装 csv-parser 库
const DATA_DIR = 'C:/Users/c240119/Desktop/AUTO/data' // 设置 CSV 文件夹路径


// 在 createWindow 函数中添加 CSV 文件监控
let win;
let downloadPath = path.join(require('os').homedir(), 'Downloads', 'analyze.pdf')

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true }}
])
// pdf-guide 相关设置  -----------------------1.2
// 监听设置 PDF 路径的 IPC 事件
ipcMain.on('set-pdf-path', (event, userPath) => {
  if (userPath) {
    downloadPath = userPath; // 更新为用户设置的路径
  } else {
    downloadPath = path.join(require('os').homedir(), 'Downloads', 'analyze.pdf'); // 恢复为默认路径
  }
});

// 生成 PDF 的函数  --------------------------------1.2
function generatePDF2(imagePath, csvData) {
  const doc = new PDFDocument();
  const pdfPath = downloadPath; // 使用指定的保存路径
  console.log('PDF will be saved to:', pdfPath);
  doc.font('Times-Roman');
  //doc.font('C:/Users/c240119/Documents/vue-element/vue-element-admin-i18n/node_modules/pdfkit/js/data/Helvetica.afm');

  doc.pipe(fs.createWriteStream(pdfPath));

  // 添加图片
  doc.image(imagePath, { fit: [500, 400], align: 'center', valign: 'center' });

  // 添加 CSV 数据
  doc.text('First Three:', { underline: true });
  csvData.firstThree.forEach(item => {
    doc.text(item);
  });

  doc.text('Remaining:', { underline: true });
  csvData.remaining.forEach(item => {
    doc.text(item);
  });

  doc.end();
}

// 读取 CSV 文件的最新一行       -------------------------------1.1
  function getLatestCSVData() {
    return new Promise((resolve, reject) => {
      const csvFilePath = path.join(DATA_DIR, 'data.csv');
  
      if (!fs.existsSync(csvFilePath)) {
        console.log("未找到 data.csv 文件");
        return resolve({ firstThree: [], remaining: [] });
      }
  
      const results = [];
      fs.createReadStream(csvFilePath)
        .pipe(csv({ headers: false }))
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          if (results.length === 0) {
            console.log("CSV 文件是空的");
            return resolve({ firstThree: [], remaining: [] });
          }
  
          const latestRow = results[results.length - 1];
          const firstThree = Object.values(latestRow).slice(0, 3);
          const remaining = Object.values(latestRow).slice(3);
  
          resolve({ firstThree, remaining });
        })
        .on('error', (err) => {
          console.error("读取 CSV 文件时发生错误:", err);
          reject(err);
        });
    });
  }

// 获取文件夹中最新的图片
function getLatestImage() {
  const files = fs.readdirSync(WATCH_DIR)
  const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file))
  
  if (imageFiles.length === 0) return null
  
  const latestImage = imageFiles
    .map(file => ({
      name: file,
      path: path.join(WATCH_DIR, file),
      mtime: fs.statSync(path.join(WATCH_DIR, file)).mtime
    }))
    .sort((a, b) => b.mtime - a.mtime)[0]
    
  return latestImage.path
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false  // 允许加载本地资源
    }
  })

  // 设置图片文件监控
  const watcher = chokidar.watch(WATCH_DIR, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  })

  // 监听新图片文件
  watcher.on('add', async filepath => {
    if (/\.(jpg|jpeg|png)$/i.test(filepath)) {
      win.webContents.send('new-image', {
        path: filepath
      })

      try {       //-----------------------------------------1.2
        // 获取最新的 CSV 数据
        const csvData = await getLatestCSVData();
        // 生成 PDF
        await generatePDF2(filepath, csvData);
      } catch (error) {
        console.error("获取 CSV 数据时发生错误:", error);
      }
    }
  })

  // 处理 IPC 调用
  ipcMain.handle('get-latest-image', () => {
    return getLatestImage()
  })

  if (isDevelopment) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    win.loadURL(`file://${__dirname}/index.html`)
  }

  //save-pdf
  ipcMain.handle('save-pdf', async (event, pdfData) => {
    try {
      fs.writeFileSync(downloadPath, Buffer.from(pdfData));
      console.log('PDF saved successfully to:', downloadPath);
    } catch (error) {
      console.error('Error saving PDF:', error);
    }
  })

  // 监听 CSV 文件  ------------------------------------------------1.1
  const csvWatcher = chokidar.watch(path.join(DATA_DIR, 'data.csv'), {
    ignored: /(^|[\/\\])\../,
    persistent: true
  })

  csvWatcher.on('change', async (filepath) => {
    try {
      const data = await getLatestCSVData();
      if (win) {
        win.webContents.send('new-csv-data', data);
      }
    } catch (error) {
      console.error("获取 CSV 数据时发生错误:", error);
    }
  })
  //  -------------------------------1.1
  ipcMain.handle('get-latest-csv-data', async () => {
    try {
      return await getLatestCSVData();
    } catch (error) {
      console.error("获取 CSV 数据时发生错误:", error);
      return { firstThree: [], remaining: [] };
    }
  })
  
}



// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async() => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // try {
    //   await installExtension(VUEJS_DEVTOOLS)
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
