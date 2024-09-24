// 04_B2.js

const A = require('./03_A2');
const B = 'variable B from 04_B2.js';

console.log(A + ' in 04_B2.js');

module.exports = B;

/*
    "Circular Reference" example
    node 04_B2.js
    -> execution result:
        [object Object] in 03_A2.js
        variable A from 03_A2.js in 04_B2.js
*/