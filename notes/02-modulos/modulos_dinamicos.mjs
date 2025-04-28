async function cargarModulo() {
    const str = 'sistema de módulos - eCMAScript modules';

    try {
        // El módulo se carga solo cuando se ejecuta esta función
        const modulo = await import('./utils.mjs');
        const result = await modulo.capitalize(str);
        return result;
    } catch (error) {
        console.error('Error al cargar el módulo:', error);
    }
}

//! A diferencia de import estático (que carga el módulo al inicio del programa), import() dinámico carga el módulo 'solo' cuando se ejecuta esta línea.

//? Esto es útil para lazy loading (cargar módulos bajo demanda).

cargarModulo()
    .then((result) => {
        console.log(result);
    });