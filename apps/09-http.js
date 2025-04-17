const http = require('node:http'); // protocolo HTTP

// Creamos el servidor
const server = http.createServer((req, res) => {
    console.log('Recived request');
    res.end('Hello world');
});

// escucha del server
// server.listen(3000, () => {
//     console.log('Server listen on port 3000');
// });

// truco para utilizar puertos disponibles - ojo, modo desarrollo, producción no
server.listen(0, () => {
    console.log(`Server listening on port http://localhost:${server.address().port}` );
});