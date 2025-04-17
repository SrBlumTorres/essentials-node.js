//! 'process' es el objeto global que proporciona información y control sobre el proceso actual de ejecución

// podemos controlar los argumentos de entrada mediante línea de comandos, ej: node fichero argumento1 arg2
console.log(process.argv);

// controlar el proceso y su salida
    // 0 - EL proceso ha ido correctamente
    // 1 - Algo ha fallado
//process.exit(1);

// podemos controlar eventos del proceso
process.on('exit', () => {
    // limpiar los recursos por ejemplo
});

// current working directory (desde dónde estamos ejecutando el proceso)
console.log(process.cwd());


