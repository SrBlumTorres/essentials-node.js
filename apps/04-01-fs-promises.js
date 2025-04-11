//! Manera promise

const fs = require('node:fs/promises');

console.log('-- Leyendo primer archivo... --');
fs.readFile('./file.txt', 'utf-8')
    .then(text => {
        console.log(text);
    });

console.log('-- Podríamos hacer algo mientras lee el archivo... --');

console.log('-- Leyendo segundo archivo... --');
fs.readFile('./file2.txt', 'utf-8')
    .then(text => {
        console.log(text)
    });