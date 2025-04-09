//! Manera SINCRONA
console.log('------------ MANERA SINCRONA ------------')
const fs = require('node:fs');

console.log('-- Leyendo primer archivo... --');
const text = fs.readFileSync('./file.txt', 'utf-8'); // Sincrono

console.log(text);
console.log('-- Podríamos hacer algo mientras lee el archivo... --');

console.log('-- Leyendo segundo archivo... --');
const text2 = fs.readFileSync('./file2.txt', 'utf-8'); // Sincrono

console.log(text2);
console.log('------------ MANERA ASÍNCRONA ------------');


//! Manera ASÍNCRONA
    //? En este ejemplo utilizaremos 'callbacks', que son funciones que se ejecutan cuando una tarea ha terminado

console.log('-- Leyendo primer archivo... --');
fs.readFile('./file.txt', 'utf-8', (err, text) => {
    console.log(text)
});

console.log('-- Podríamos hacer algo mientras lee el archivo... --');

console.log('-- Leyendo segundo archivo... --');
fs.readFile('./file2.txt', 'utf-8', (err, text) => {
    console.log(text)
})