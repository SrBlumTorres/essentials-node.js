//! const os = require('os'); De esta forma no
const os = require('node:os');

console.log('Información del SO');
console.log('--------------------')
console.log('Nombre del sistema operativo:', os.platform());
console.log('Versión del sistema operativo:', os.release());
console.log('Arquitectura:', os.arch());
console.log('CPUs', os.cpus()) // <--- Vamos a poder escalar procesos en Node
console.log('Memoria libre:', os.freemem() / 1024 / 1024);
console.log('Memoria total:', os.totalmem() / 1024 / 1024); 