//! 'process' es el objeto global que proporciona información y control sobre el proceso actual de ejecución

// podemos controlar los argumentos de entrada mediante línea de comandos
console.log(process.argv);

// controlar el proceso y su salida
    // 0 - EL proceso ha ido correctamente
    // 1 - Algo ha fallado
process.exit(1);