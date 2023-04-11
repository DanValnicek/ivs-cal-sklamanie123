// Based on Lateralus' answer on SO at: https://stackoverflow.com/a/64656306
// Licensed CC-BY-SA 4.0

import { contextBridge, ipcRenderer } from 'electron';

// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel, data) => {
    const validChannels = ['w:minimize', 'w:close']; // Allowed channels renderer -> main
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    const validChannels = [] // Allowed channels main -> renderer
    if (validChannels.includes(channel as never)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});