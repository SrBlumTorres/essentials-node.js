const path = require('node:path');

// barra separadora de carpetas segun SO
    //? En nuestro caso /
    //? En caso de Windos \
console.log(path.sep);

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt'); // --> content/subfolder/test.txt
console.log(filePath);

const base = path.basename('/tmp/secret-files/secret.txt');
console.log(base);

const filename = path.basename('/tmp/secret-files/secret.txt', '.txt');
console.log(filename);

const extension = path.extname('/tmp/file.js');
console.log(extension);
