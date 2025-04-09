//! fileSystem, uno de los módulos más importantes de node

const fs = require('node:fs'); // A partir de node 16.0.0 se recomienda poner node: antes del módulo

const stats = fs.statSync('./file.txt'); // Información del fichero

//! De forma SÍNCRONA, ES DECIR, SE BLOQUEA EL PROCESO HASTA QUE ACABE
console.log(
    stats.isFile(), // --> si es un fuchero
    stats.isDirectory(), // --> si es un directorio
    stats.isSymbolicLink(), // --> si es un enlace simbólico
    stats.size // --> tamoño en bytes
);

//? En este caso, si no ejecutas node fichero.js, desde la raiz dónde se encuentra el fichero que busca, dará error

//? Cambia la ubicación de ejecución de node cuando lo hagas desde el terminal, ej: cd /apps y luego node fichero

