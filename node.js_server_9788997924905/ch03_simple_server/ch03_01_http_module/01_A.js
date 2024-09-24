// 01_A.js

const A = 'variable A from 01_A.js';
/*
    declares a constant variable 'A'
    assigns the string value
    -- 'A' is scoped to the '01_A.js'
*/

module.exports = A;
/*
    exports the variable 'A' from '01_A.js'
    -> 'A' can be imported and used by other modules

    (format1) module.exports = property
    (format2) exports.property

    in order to export multiple values:
    module.exports = { A, B }; 
*/