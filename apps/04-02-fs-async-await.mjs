//! Manera Async - Await (Recomendado )
//! FÍJATE EN LA EXTENSIÓN DEL ARCHIVO .mjs ESModules

//? Al utilizar la extensión mjs ESMODULES si tienen el soporte para utilizar await en el cuerpo del archivo, esto se llama TOP LEVEL AWAIT

import { readFile } from 'node:fs/promises';

console.log('-- Leyendo primer archivo... --');

const text = await readFile('./file.txt', 'utf-8');
console.log('Primer archivo:', text);

console.log('-- Podríamos hacer algo mientras lee el archivo... --');

console.log('-- Leyendo segundo archivo... --');
const secondText = await readFile('./file2.txt', 'utf-8');
console.log('Segundo archivo:', secondText);