// 03_A2.js

const A = 'variable A from 03_A2.js';
const B = require('./04_B2');

console.log(B + ' in 03_A2.js');

module.exports = A;

/*
    "Circular Reference" example
    node 03_A2.js
    -> execution result:
        [object Object] in 04_B2.js
        variable B from 04_B2.js in 03_A2.js
*/