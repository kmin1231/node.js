// p138_index.js

const calc = require("chapter04_package_management");
// const calc = require("sample-package");

const a = 17;
const b = 3;

console.log("a + b = ", calc.add(a, b));
console.log("a - b = ", calc.sub(a, b));
console.log("a * b = ", calc.multi(a, b));
console.log("a / b = ", calc.div(a, b));