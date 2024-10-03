const http = require("http");
const url = require("url");

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html");

    if (path in urlMap) {   // 'in' operator -> returns boolean (true/false)
        urlMap[path](req, res);
    /* checks if the requested path exists in the 'urlMap' object
        - (if exists) corresponding function is called
        - (otherwise) 'notFound' function -> invokes 'HTTP 404 Not Found' error */
    } else {
        notFound(req, res);
    }
}).listen("3000", () => console.log("ROUTER with urlMap!"));

// ref. [Python] True / False; [C++/Java/JS/etc.] true / false


// defines distinct functions for paths
const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
    // without query string: both name & age -> 'undefined'
    // ex. localhost:3000/user?name=michelle&age=25
};

const feed = (req, res) => {
    res.end(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
    `);
};

const notFound = (req, res) => {
    res.statusCode = 404;
    res.end("404 page not found");
};

/* [JavaScript] "HOISTING" mechanism for variables & functions & classes
    : 'declarations' are moved to the 'TOP' of their containing scope before the code is executed
    -> can 'reference' variables or functions before they are 'physically' defined in the code
    
    (Attention) NOT the 'initialization'
    ex. var x = 3;
    -> declaration of 'var x;' is hoisted to the TOP;
        but it will have the value 'undefined' until the line (assignment) is executed

    (Attention) let, const, function expressions, class expressions: NOT HOISTED!

    [Ex1] function declaration hoisted
    hoisting1();
    function hoisting1() { console.log("OK"); }

    [Ex2] function expression NOT hoisted
    hoisting2();
    const hoisting2 = () => console.log("NO");
    // function expression assgined to constant variable 'hoisting2'
    // Uncaught ReferenceError: hoisting2 is not defined
*/


/* [JavaScript] function as "FIRST-CLASS OBJECT"
    : functions are treated like any other value or object
    (1) can be 'assigned' to variables
    (2) can be passed as 'arguments' (to other functions)
    (3) can be 'returned' (from other functions)
    (4) can have 'properties' (like objects)
*/

const urlMap = {
    /* each value in 'urlMap' object is a function that handles requests for a specific path
    ex. urlMap["/user"] points to the 'user' function, which handles requests to the '/user' path */

    "/": (req, res) => res.end("HOME"),
    "/user": user,
    "/feed": feed,
};