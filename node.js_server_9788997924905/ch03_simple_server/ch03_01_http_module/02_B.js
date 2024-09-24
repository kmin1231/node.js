// 02_B.js

const A = require('./01_A');
/*
    'require': function to import the exported value from other modules
    './01_A': path (in the same directory as '02_B.js')
    imported value to be assigned to (constant variable) 'A' in '02_B.js'
*/

console.log(A + ' in 02_B.js');
/*
    log message in the console
    concatenates strings
*/

/*
    node 02_B.js
    -> execution result:
        variable A from 01_A.js in 02_B.js
*/