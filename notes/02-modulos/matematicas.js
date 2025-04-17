function capitalize(str){
    if (!str) throw new Error('Empty string');

    const text = str.split(' ');
    const capitalizedText = text.map(word => word[0].toUpperCase() + word.slice(1));

    return capitalizedText.join(' ');
}

module.exports = capitalize;
// Ejemplo básico de exportación
