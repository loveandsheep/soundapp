const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myapi', {
    nyan: async (data) => await ipcRenderer.invoke('nyan', data),
    osc: async(data) => await ipcRenderer.invoke('osc', data)    
  }
)