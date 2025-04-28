# Guía Completa de Módulos en Node.js

## Índice
1. [Introducción a los Módulos](#introducción-a-los-módulos)
2. [Sistema de Módulos CommonJS](#sistema-de-módulos-commonjs)
3. [Sistema de Módulos ECMAScript (ESM)](#sistema-de-módulos-ecmascript-esm)
4. [Módulos Core (Built-in)](#módulos-core-built-in)
5. [NPM y Gestión de Paquetes](#npm-y-gestión-de-paquetes)
6. [Package.json y Package-lock.json](#packagejson-y-package-lockjson)
7. [Creación de Módulos Propios](#creación-de-módulos-propios)
8. [Patrones Avanzados de Módulos](#patrones-avanzados-de-módulos)
9. [Mejores Prácticas](#mejores-prácticas)
10. [Recursos Adicionales](#recursos-adicionales)

## Introducción a los Módulos

Los módulos son bloques de código reutilizables que encapsulan funcionalidad relacionada. En Node.js, cada archivo se considera un módulo separado con su propio ámbito.

**Beneficios de usar módulos:**
- **Reutilización de código**: Escribir una vez, usar en múltiples lugares
- **Organización**: Mantener el código estructurado y fácil de mantener
- **Encapsulamiento**: Proteger variables y funciones en su propio ámbito
- **Dependencias**: Gestionar claramente las relaciones entre partes del código

## Sistema de Módulos CommonJS

CommonJS es el sistema de módulos original de Node.js. Se caracteriza por el uso de `require()` para importar y `module.exports` o `exports` para exportar.

### Exportar Módulos

Existen varias formas de exportar funcionalidad:

**1. Exportar múltiples elementos:**

```javascript
// matematicas.js
function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

// Exportar elementos individuales
exports.sumar = sumar;
exports.restar = restar;
exports.PI = 3.14159;
```

**2. Exportar un objeto único:**

```javascript
// matematicas.js
function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

// Reemplazar completamente el objeto exports
module.exports = {
  sumar,
  restar,
  PI: 3.14159
};
```

**3. Exportar una función o clase directamente:**

```javascript
// calculadora.js
function Calculadora() {
  this.sumar = (a, b) => a + b;
  this.restar = (a, b) => a - b;
}

// Exportar directamente la función constructora
module.exports = Calculadora;
```

### Importar Módulos

**1. Importar un módulo completo:**

```javascript
// app.js
const matematicas = require('./matematicas');
console.log(matematicas.sumar(5, 3)); // 8
console.log(matematicas.PI); // 3.14159
```

**2. Importar con destructuring:**

```javascript
// app.js
const { sumar, restar, PI } = require('./matematicas');
console.log(sumar(5, 3)); // 8
console.log(PI); // 3.14159
```

**3. Importar una función constructora:**

```javascript
// app.js
const Calculadora = require('./calculadora');
const miCalculadora = new Calculadora();
console.log(miCalculadora.sumar(5, 3)); // 8
```

### Cómo funciona require() internamente

El proceso `require()` de Node.js sigue estos pasos:

1. **Resolución**: Encuentra la ubicación exacta del archivo
   - Módulos core sin ruta (`fs`, `http`)
   - Rutas relativas (`./utils`, `../config`)
   - Módulos de node_modules (`express`, `lodash`)

2. **Carga**: Lee el archivo y evalúa su contenido

3. **Caché**: Almacena el resultado en caché para futuros requires
   - La caché está disponible en `require.cache`
   - Cada módulo se carga y ejecuta solo una vez

4. **Retorno**: Devuelve el objeto `module.exports` del módulo

```javascript
// Ejemplo para entender la caché de módulos
console.log("Primer require:");
const mod1 = require('./modulo');
console.log("Segundo require:");
const mod2 = require('./modulo');
console.log(mod1 === mod2); // true - es el mismo objeto (desde caché)
```

## Sistema de Módulos ECMAScript (ESM)

ESM es el sistema de módulos estándar de JavaScript moderno. Node.js añadió soporte para ESM a partir de la versión 12.

### Activar ESM en Node.js

Hay tres formas de usar ESM en Node.js:

**1. Usar la extensión `.mjs`:**
```javascript
// archivo.mjs
export function hola() {
  return "Hola mundo";
}
```

**2. Configurar `"type": "module"` en package.json:**
```json
{
  "name": "mi-proyecto",
  "version": "1.0.0",
  "type": "module"
}
```

**3. Usar la bandera `--input-type=module` al ejecutar:**
```bash
node --input-type=module mi-script.js
```

### Exportar con ESM

**1. Exportaciones con nombre:**

```javascript
// matematicas.mjs
export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}

export const PI = 3.14159;
```

**2. Exportar en bloque:**

```javascript
// matematicas.mjs
function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

const PI = 3.14159;

export { sumar, restar, PI };
```

**3. Exportación por defecto:**

```javascript
// calculadora.mjs
export default class Calculadora {
  sumar(a, b) {
    return a + b;
  }
  
  restar(a, b) {
    return a - b;
  }
}
```

**4. Combinación de exportaciones por defecto y con nombre:**

```javascript
// matematicas.mjs
export function sumar(a, b) {
  return a + b;
}

export function restar(a, b) {
  return a - b;
}

export default class Calculadora {
  constructor() {
    this.historial = [];
  }
  
  ejecutar(operacion, a, b) {
    let resultado;
    if (operacion === 'sumar') resultado = sumar(a, b);
    else if (operacion === 'restar') resultado = restar(a, b);
    
    this.historial.push(`${a} ${operacion} ${b} = ${resultado}`);
    return resultado;
  }
}
```

### Importar con ESM

**1. Importar elementos nombrados:**

```javascript
// app.mjs
import { sumar, restar, PI } from './matematicas.mjs';

console.log(sumar(5, 3)); // 8
console.log(PI); // 3.14159
```

**2. Importar exportación por defecto:**

```javascript
// app.mjs
import Calculadora from './calculadora.mjs';

const calc = new Calculadora();
console.log(calc.sumar(5, 3)); // 8
```

**3. Importar todo bajo un namespace:**

```javascript
// app.mjs
import * as mates from './matematicas.mjs';

console.log(mates.sumar(5, 3)); // 8
console.log(mates.PI); // 3.14159
console.log(new mates.default()); // Instancia de Calculadora
```

**4. Importar con alias:**

```javascript
// app.mjs
import { sumar as add, restar as subtract } from './matematicas.mjs';

console.log(add(5, 3)); // 8
console.log(subtract(10, 4)); // 6
```

**5. Importar dinámicamente (carga bajo demanda):**

```javascript
// app.mjs
async function cargarModulo() {
  try {
    // El módulo se carga solo cuando se ejecuta esta función
    const modulo = await import('./modulo-grande.mjs');
    console.log(modulo.funcionImportante());
  } catch (error) {
    console.error('Error al cargar el módulo:', error);
  }
}

cargarModulo();
```

### Diferencias clave entre CommonJS y ESM

| Característica | CommonJS | ESM |
|----------------|----------|-----|
| Sintaxis de importación | `require()` | `import` |
| Sintaxis de exportación | `module.exports`, `exports` | `export`, `export default` |
| Carga | Sincrónica | Asincrónica (analizadas estáticamente) |
| Tiempo de evaluación | En tiempo de ejecución | Antes de la ejecución (hoisting) |
| Estructura de datos | Copia de objetos | Enlaces en vivo (live bindings) |
| Importación dinámica | `require()` en cualquier lugar | Solo `import()` (que devuelve una promesa) |
| Extensiones de archivo | `.js` típicamente | `.mjs` o `.js` con config |
| Variables globales | `__dirname`, `__filename` | No disponibles directamente |

## Módulos Core (Built-in)

Node.js incluye un conjunto de módulos integrados que proporcionan funcionalidad esencial. Estos módulos están disponibles sin necesidad de instalación.

### Módulos Core Principales

#### fs (Sistema de Archivos)

```javascript
const fs = require('fs');

// Operaciones síncronas
try {
  // Leer un archivo
  const contenido = fs.readFileSync('archivo.txt', 'utf8');
  console.log(contenido);
  
  // Escribir en un archivo
  fs.writeFileSync('nuevo.txt', 'Hola mundo!');
  
  // Verificar si existe un archivo
  const existe = fs.existsSync('archivo.txt');
  console.log('¿El archivo existe?', existe);
} catch (error) {
  console.error('Error:', error);
}

// Operaciones asíncronas con callbacks
fs.readFile('archivo.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer:', err);
    return;
  }
  console.log('Contenido:', data);
});

// Operaciones asíncronas con promesas
fs.promises.readFile('archivo.txt', 'utf8')
  .then(contenido => console.log('Contenido (promesa):', contenido))
  .catch(error => console.error('Error:', error));

// Con async/await
async function leerArchivo() {
  try {
    const contenido = await fs.promises.readFile('archivo.txt', 'utf8');
    console.log('Contenido (async/await):', contenido);
  } catch (error) {
    console.error('Error:', error);
  }
}
leerArchivo();
```

#### path (Rutas de Archivos)

```javascript
const path = require('path');

// Unir segmentos de ruta (cross-platform)
const rutaCompleta = path.join(__dirname, 'carpeta', 'archivo.txt');
console.log('Ruta unida:', rutaCompleta);

// Obtener componentes de ruta
console.log('Directorio:', path.dirname(rutaCompleta));
console.log('Archivo base:', path.basename(rutaCompleta));
console.log('Extensión:', path.extname(rutaCompleta));
console.log('Nombre sin extensión:', path.basename(rutaCompleta, path.extname(rutaCompleta)));

// Normalizar rutas
console.log('Ruta normalizada:', path.normalize('/ruta///desordenada/./subdirectorio/../archivo.txt'));

// Ruta absoluta
console.log('Ruta absoluta:', path.resolve('archivo.txt'));
```

#### http/https (Servidor Web)

```javascript
const http = require('http');

// Crear un servidor HTTP básico
const servidor = http.createServer((req, res) => {
  // Información de la solicitud
  console.log(`Método: ${req.method}, URL: ${req.url}`);
  
  // Establecer encabezados de respuesta
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  
  // Enviar respuesta
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Mi Servidor Node.js</title>
      </head>
      <body>
        <h1>¡Hola desde mi servidor Node.js!</h1>
        <p>Ruta solicitada: ${req.url}</p>
      </body>
    </html>
  `);
});

// Escuchar en un puerto
const PUERTO = 3000;
servidor.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PUERTO}/`);
});
```

#### url (Análisis de URLs)

```javascript
const url = require('url');

// Analizar una URL completa
const miUrl = new URL('https://usuario:pass@www.ejemplo.com:8080/ruta/pagina?query=123&sort=desc#seccion');

console.log('Protocolo:', miUrl.protocol);
console.log('Host:', miUrl.host);
console.log('Hostname:', miUrl.hostname);
console.log('Puerto:', miUrl.port);
console.log('Pathname:', miUrl.pathname);
console.log('Search:', miUrl.search);
console.log('Parámetros:', [...miUrl.searchParams.entries()]);
console.log('Hash:', miUrl.hash);

// Forma antigua (legacy)
const parsedUrl = url.parse('https://www.ejemplo.com/ruta?query=123', true);
console.log('Objeto de consulta (query):', parsedUrl.query);
```

#### events (Eventos)

```javascript
const EventEmitter = require('events');

// Crear un emisor de eventos personalizado
class MiEmitter extends EventEmitter {}
const emisor = new MiEmitter();

// Registrar un listener
emisor.on('evento', (arg1, arg2) => {
  console.log('Evento recibido con argumentos:', arg1, arg2);
});

// Registrar un listener de una sola vez
emisor.once('eventoUnico', () => {
  console.log('Este listener solo se ejecutará una vez');
});

// Emitir eventos
emisor.emit('evento', 'Hola', 'Mundo');
emisor.emit('evento', 'Otro', 'Mensaje');
emisor.emit('eventoUnico'); // Ejecuta el listener
emisor.emit('eventoUnico'); // No hace nada, el listener ya fue removido

// Remover listeners específicos
function miListener() {
  console.log('Listener específico');
}
emisor.on('otroEvento', miListener);
emisor.removeListener('otroEvento', miListener);

// Obtener información sobre listeners
console.log('Cantidad de listeners:', emisor.listenerCount('evento'));
console.log('Nombres de eventos:', emisor.eventNames());
```

#### util (Utilidades)

```javascript
const util = require('util');
const fs = require('fs');

// Convertir funciones de callback a promesas
const readFilePromise = util.promisify(fs.readFile);

// Ahora podemos usar async/await
async function leerArchivo() {
  try {
    const contenido = await readFilePromise('archivo.txt', 'utf8');
    console.log(contenido);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Inspeccionar objetos
const objetoComplejo = {
  datos: [1, 2, 3],
  fecha: new Date(),
  funcion: function() { return 'hola'; },
  subObjeto: { a: 1, b: 2 }
};

console.log(util.inspect(objetoComplejo, { depth: null, colors: true }));

// Formatear texto
console.log(util.format('Hola %s, tienes %d años', 'Juan', 30));

// Verificar tipos
console.log(util.types.isDate(new Date())); // true
console.log(util.types.isPromise(Promise.resolve())); // true
```

#### buffer (Manejo de datos binarios)

```javascript
// Crear buffers
const buffer1 = Buffer.from('Hola Mundo', 'utf8');
const buffer2 = Buffer.alloc(10); // Buffer vacío de 10 bytes
const buffer3 = Buffer.from([0x48, 0x6F, 0x6C, 0x61]); // Desde valores hexadecimales

// Convertir buffer a string
console.log(buffer1.toString()); // 'Hola Mundo'
console.log(buffer3.toString()); // 'Hola'

// Manipular buffers
buffer2.write('Node.js');
console.log(buffer2.toString()); // 'Node.js'

// Concatenar buffers
const bufferConcatenado = Buffer.concat([buffer1, buffer2]);
console.log(bufferConcatenado.toString()); // 'Hola MundoNode.js'

// Propiedades y métodos
console.log('Longitud:', buffer1.length);
console.log('Byte en posición 0:', buffer1[0]); // Código ASCII de 'H'
console.log('¿Incluye?:', buffer1.includes('Mundo')); // true
console.log('Índice de "Mundo":', buffer1.indexOf('Mundo')); // 5
```

#### stream (Manejo de flujos de datos)

```javascript
const fs = require('fs');

// Streams de lectura
const readStream = fs.createReadStream('archivo-grande.txt', { 
  encoding: 'utf8',
  highWaterMark: 64 * 1024 // Tamaño del buffer (64KB)
});

// Eventos de stream
readStream.on('data', (chunk) => {
  console.log(`Recibidos ${chunk.length} bytes de datos`);
});

readStream.on('end', () => {
  console.log('Fin de los datos');
});

readStream.on('error', (err) => {
  console.error('Error:', err);
});

// Streams de escritura
const writeStream = fs.createWriteStream('salida.txt');

// Escribir datos
writeStream.write('Línea 1\n');
writeStream.write('Línea 2\n');
writeStream.end('Última línea\n');

writeStream.on('finish', () => {
  console.log('Escritura completada');
});

// Tuberías (pipes) - forma eficiente de copiar datos
const readStream2 = fs.createReadStream('archivo-grande.txt');
const writeStream2 = fs.createWriteStream('copia.txt');

readStream2.pipe(writeStream2);

// Encadenamiento de pipes con transform streams
const { Transform } = require('stream');
const zlib = require('zlib');

// Stream de transformación para convertir a mayúsculas
const mayusculas = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

// Leer -> transformar -> comprimir -> escribir
fs.createReadStream('entrada.txt')
  .pipe(mayusculas)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('salida.txt.gz'));
```

### Otros Módulos Core Importantes

| Módulo | Descripción | Ejemplo básico |
|--------|-------------|----------------|
| `crypto` | Criptografía | `crypto.createHash('sha256').update('texto').digest('hex')` |
| `os` | Sistema operativo | `os.platform()`, `os.cpus()`, `os.totalmem()` |
| `child_process` | Procesos hijos | `child_process.exec('ls -la', callback)` |
| `cluster` | Multi-proceso | `cluster.fork()` para crear workers |
| `readline` | Leer líneas | `readline.createInterface({ input: process.stdin })` |
| `zlib` | Compresión | `zlib.gzip(buffer, callback)` |
| `querystring` | Manipular query strings | `querystring.parse('foo=bar&baz=qux')` |
| `assert` | Aserciones para pruebas | `assert.strictEqual(actual, expected)` |
| `dns` | Resolución DNS | `dns.lookup('ejemplo.com', callback)` |
| `net` | Sockets TCP | `net.createServer(socket => {...})` |
| `dgram` | Sockets UDP | `dgram.createSocket('udp4')` |
| `http2` | Protocolo HTTP/2 | `http2.createServer(options)` |
| `perf_hooks` | Medición de rendimiento | `performance.now()` |
| `timers` | Temporizadores | `setTimeout()`, `setInterval()`, `setImmediate()` |

## NPM y Gestión de Paquetes

NPM (Node Package Manager) es el ecosistema de paquetes más grande del mundo. Permite instalar, compartir y gestionar dependencias en proyectos Node.js.

### Conceptos básicos de NPM

- **Paquete**: Código reutilizable publicado en el registro de NPM
- **Dependencia**: Un paquete requerido por otro paquete
- **Registro**: Repositorio público de paquetes (npmjs.com)
- **Scope**: Namespaces para organizar paquetes (ej: @angular/core)
- **Semver**: Versionado semántico (MAJOR.MINOR.PATCH)

### Comandos NPM Esenciales

**Inicialización:**

```bash
# Crear un nuevo package.json interactivo
npm init

# Crear package.json con valores predeterminados
npm init -y
```

**Instalación de paquetes:**

```bash
# Instalar un paquete como dependencia de producción
npm install express

# Forma abreviada
npm i express

# Instalar múltiples paquetes
npm install express mongoose dotenv

# Instalar una versión específica
npm install express@4.17.1

# Instalar como dependencia de desarrollo
npm install --save-dev jest
npm i -D jest

# Instalar globalmente (disponible en todo el sistema)
npm install --global nodemon
npm i -g nodemon

# Instalar desde un repositorio Git
npm install git+https://github.com/usuario/proyecto.git

# Instalar todas las dependencias del package.json
npm install
npm i
```

**Desinstalación:**

```bash
# Eliminar un paquete
npm uninstall express

# Eliminar un paquete global
npm uninstall -g nodemon
```

**Actualización:**

```bash
# Ver paquetes desactualizados
npm outdated

# Actualizar paquetes
npm update

# Actualizar a la última versión (incluso major)
npm install express@latest
```

**Listado de paquetes:**

```bash
# Listar paquetes instalados
npm list

# Listar solo dependencias de primer nivel
npm list --depth=0

# Listar paquetes globales
npm list -g --depth=0
```

**Ejecución de scripts:**

```bash
# Ejecutar un script definido en package.json
npm run test
npm run dev

# Accesos directos para scripts comunes
npm test      # equivalente a npm run test
npm start     # equivalente a npm run start
```

**Publicación de paquetes:**

```bash
# Registrarse en npm (solo la primera vez)
npm login

# Publicar el paquete actual
npm publish

# Publicar un paquete con scope
npm publish --access=public
```

### Definición de Versiones en package.json

NPM usa el estándar de Versionado Semántico (SemVer):

- **MAJOR**: Cambios incompatibles con versiones anteriores
- **MINOR**: Nuevas funcionalidades compatibles con versiones anteriores
- **PATCH**: Correcciones de errores compatibles con versiones anteriores

**Especificadores de versión:**

```
"dependencies": {
  "exacta": "1.2.3",           // Exactamente la versión 1.2.3
  "mayor-o-igual": ">=1.2.3",  // Versión 1.2.3 o mayor
  "compatible": "^1.2.3",      // Actualizaciones compatibles (1.x.x)
  "menor": "~1.2.3",           // Actualizaciones de parche (1.2.x)
  "rango": "1.2.3 - 1.5.0",    // Rango de versiones
  "o": "1.2.3 || 2.0.0",       // Una u otra versión
  "beta": "1.0.0-beta.3",      // Versión beta específica
  "etiqueta": "latest",        // Etiqueta (latest, next, etc.)
  "git": "git+https://github.com/user/project.git#v1.0.0"
}
```

El más común es `^` (caret), que permite actualizaciones compatibles.

### Instalaciones Locales vs Globales

**Instalación Local:**
- Se instala en `node_modules/` del proyecto actual
- No accesible globalmente en el sistema
- Se incluye en `package.json`
- Mejor para dependencias de proyecto

**Instalación Global:**
- Se instala en una ubicación global del sistema
- Accesible desde cualquier terminal
- No se incluye en `package.json`
- Mejor para herramientas CLI como nodemon, npm, yarn, etc.

## Package.json y Package-lock.json

### Package.json

El archivo `package.json` es el corazón de un proyecto Node.js. Define metadatos, dependencias, scripts y configuración.

**Ejemplo completo de package.json:**

```json
{
  "name": "mi-aplicacion",
  "version": "1.2.3",
  "description": "Una descripción de mi aplicación",
  "main": "index.js",
  "type": "module",
  "private": true,
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "lint": "eslint .",
    "build": "webpack --mode production",
    "preinstall": "echo 'Ejecutando antes de instalar'",
    "postinstall": "echo 'Ejecutando después de instalar'"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.3",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {
    "eslint": "^8.38.0",
    "jest": "^29.5.0",
    "nodemon": "^2.0.22",
    "webpack": "^5.80.0"
  },
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11"
  ],
  "bin": {
    "mi-cli": "./bin/cli.js"
  },
  "keywords": ["node", "api", "ejemplo"],
  "author": "Tu Nombre <tu@email.com> (https://tuwebsite.com)",
  "contributors": [
    "Otro Contribuyente <otro@email.com>"
  ],
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/usuario/repositorio.git"
  },
  "bugs": {
    "url": "https://github.com/usuario/repositorio/issues"
  },
  "homepage": "https://github.com/usuario/repositorio#readme"
}
```

**Campos principales:**

- **name**: Nombre del paquete (obligatorio)
- **version**: Versión SemVer (obligatorio)
- **description**: Descripción breve
- **main**: Punto de entrada principal
- **type**: Sistema de módulos (commonjs o module)
- **private**: Evita publicación accidental
- **scripts**: Comandos ejecutables
- **dependencies**: Dependencias de producción
- **devDependencies**: Dependencias de desarrollo
- **peerDependencies**: Dependencias que debe proveer el host
- **engines**: Versiones de Node.js/npm requeridas
- **bin**: Ejecutables para instalación global
- **author/contributors**: Creadores del paquete
- **license**: Licencia del código
- **repository/bugs/homepage**: Enlaces del proyecto

### Scripts NPM

Los scripts permiten definir comandos reutilizables para tareas comunes.

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js",
  "test": "jest",
  "lint": "eslint .",
  "build": "webpack --mode production",
  "custom": "echo 'Script personalizado'",
  "preinstall": "echo 'Se ejecuta antes de npm install'",
  "postinstall": "echo 'Se ejecuta después de npm install'"
}
```

Ejecución:
```bash
npm run dev       # Ejecuta nodemon index.js
npm test          # Ejecuta jest (acceso directo)
npm run custom    # Ejecuta el script personalizado
```

### Package-lock.json

El archivo `package-lock.json` garantiza instalaciones consistentes entre entornos. Se genera automáticamente y no debe modificarse manualmente.

**Beneficios:**
- Garantiza las mismas versiones exactas de dependencias
- Bloquea todo el árbol de dependencias (directas e indirectas)
- Mejora la seguridad al verificar la integridad con hashes
- Acelera instalaciones (`npm ci`)

**Ejemplo simplificado:**

```json
{
  "name": "mi-aplicacion",
  "version": "1.0.0",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "mi-aplicacion",
      "version": "1.0.0",
      "dependencies": {
        "express": "^4.18.2"
      }
    },
    "node_modules/express": {
      "version": "4.18.2",
      "resolved": "https://registry.npmjs.org/