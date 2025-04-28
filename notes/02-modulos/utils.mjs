//! El sistema de módulos ESM (ECMAScript Modules) es el estándar oficial para JavaScript, adoptado también por Node.js a partir de versiones recientes.

export function capitalize(str){
    if (!str) throw new Error('Empty string');

    const text = str.split(' ');
    const capitalizedText = text.map(word => word[0].toUpperCase() + word.slice(1));

    return capitalizedText.join(' ');
}

export function str_reverse(str){
    if (!str) throw new Error('Empty string');

    const splitedText = str.split(' ');
    const reversedText = splitedText.map(word => {
      // Convertir la palabra en array de caracteres, invertir y unir
      return word.split('').reverse().join('')
    });
  
    return reversedText.join(' ');            
} 