// Exportación sistema tradicional COMMONJS

function capitalize(str){
    if (!str) throw new Error('Empty string');

    const text = str.split(' ');
    const capitalizedText = text.map(word => word[0].toUpperCase() + word.slice(1));

    return capitalizedText.join(' ');
}

function str_reverse(str){
    if (!str) throw new Error('Empty string');

    const splitedText = str.split(' ');
    const reversedText = splitedText.map(word => {
      // Convertir la palabra en array de caracteres, invertir y unir
      return word.split('').reverse().join('')
    });
  
    return reversedText.join(' ');            
} 


// Ejemplo básico de exportación
module.exports = {
    capitalize,
    str_reverse
};
