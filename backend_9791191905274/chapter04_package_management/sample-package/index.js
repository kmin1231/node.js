// p137_index.js

console.log("to load module, use 'require'");

module.exports = {
    // defines methods for the object to be exported, with arrow function syntax
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    multi: (a, b) => a * b,
    div: (a, b) => a / b
}