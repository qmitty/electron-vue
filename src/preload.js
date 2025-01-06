const { contextBridge, ipcRenderer } = require('electron')
const path = require('path')

// 暴露安全的 API 到渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
  // 获取最新图片
  getLatestImage: () => ipcRenderer.invoke('get-latest-image'),
  
  // 监听新图片事件
  onNewImage: (callback) => {
    ipcRenderer.on('new-image', callback)
    return () => ipcRenderer.removeListener('new-image', callback)
  },
  
  savePdf: (pdfData) => ipcRenderer.invoke('save-pdf', pdfData),
  
  // 监听 CSV 数据事件   ----------------------------------1.1
  onCSVData: (callback) => {
    ipcRenderer.on('new-csv-data', (event, data) => {
      callback(data);
    });
    return () => ipcRenderer.removeListener('new-csv-data', callback);
  },
  getLatestCSVData: async () => {
    return await ipcRenderer.invoke('get-latest-csv-data');
  },

  //获取guide页面的pdf设置数据  ----------------------------1.2
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  }
  //getDirname: () => __dirname,
  //getPath: (relativePath) => path.join(__dirname, relativePath)

})
