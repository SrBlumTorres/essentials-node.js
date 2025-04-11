//! Manera Async - Await (Recomendado)
//! FÍJATE EN LA EXTENSIÓN DEL ARCHIVO .mjs ESModules

import { readFile } from 'node:fs/promises';

Promise.all([
    readFile('./file.txt', 'utf-8'),
    readFile('./file2.txt', 'utf-8')
]).then(([text, secondText]) => {
    console.log('Primer texto', text)
    console.log('Segundo texto', secondText)
});

console.log('Prueba');
console.log(Array.from({length: 10}, (_, i) => i + 1));

//? Aspectos positivos
    // - Más rápido, estamos leyendo los 2 archivos a la vez
    // - Ejecutamos códido en paralelo, en los otros códigos leemos los archivos de forma secuencial
