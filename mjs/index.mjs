//! TODO esto en el entorno de NODE

// .js -> node por defecto utiliza CommonJS (cjs)
// .mjs -> para utilizar ES modules
// .cjs -> para utilizar CommonJS (lo fuerzas a cjs)

import { sum, sub, multi } from './sum.mjs';

console.log('La suma es:', sum(3, 5));
console.log('La resta es:', sub(3, 5));
console.log('La multiplicación es:', multi(3, 5)); 