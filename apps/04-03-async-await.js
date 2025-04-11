//! ASYNC AWAIT COMMONJS

const { readFile } = require('node:fs/promises');

//? IIFE - Inmediatly Invoked Function Expression
( 
    async () => {
        console.log('-- Leyendo primer archivo... --');
        
        const text = await readFile('./file.txt', 'utf-8');
        console.log('Primer archivo:', text);
        
        console.log('-- Podríamos hacer algo mientras lee el archivo... --');
        
        console.log('-- Leyendo segundo archivo... --');
        const secondText = await readFile('./file2.txt', 'utf-8');
        console.log('Segundo archivo:', secondText);
    }
)();