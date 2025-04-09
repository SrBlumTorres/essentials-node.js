//! CommonJS

function sum(a, b) {
    return a + b;
}

//? CommonJS Module Export
    // Una mejor manera de exportarlo, obligando a mantener la misma nomenclatura
module.exports = {
    sum
};

// Exportamos el módulo sum
//? module.exports = sum;