//! Pequeña app que nos dará los puertos disponibles

const net = require('node:net');

function findAvailablePort(desiredPort){
    return new Promise((resolve, reject) => {
        const server = net.createServer();

        server.listen(desiredPort, () => {
            // desestructuramos
            const { port } = server.address();
            server.close(() => {
                resolve(port);
            })
        });

        // recuerda que no es orientado a eventos
        //? manejo de error
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                // recursividad
                findAvailablePort(0).then(port => resolve(port));
            } else {
                reject(err);
            }
        }) 
    });
}

module.exports = { findAvailablePort };