// p107_router.js

const http = require("http");
const url = require("url"); // node.js built-in module 'url'
http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    // method 'url.parse': parses URL string -> converts to an 'object'
    // 'true': argument to parse the query string into an object
    // 'pathname': 'property' of URL object; retrieves the requested path

    res.setHeader("Content-Type", "text/html");

    // ===: [JavaScript] 'strict' equality comparison operator -> boolean
    // returns 'true' only if BOTH (values are equal) AND (of the same TYPE)
    if (path === "/user") { // checks the requested path
        res.end("[user] name: andy, age: 30");
        // sends user info to the client as a response for "/user" path
    } else if (path === "/feed") {  // sends HTML unordered list for "/feed" path
        res.end(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
    `);
    } else {    // case where the requested path is neither "/user" nor "/feed"
        res.statusCode = 404;
        res.end("404 page not found");  // sends message to the client & ends the response
    }
}).listen("3000", () => console.log("creating a ROUTER!"));
// with 'listen' method, ready to receive incoming client requests on a specified port
/* important to specify a VALID port
    'undefined' (by default) -> server may NOT be able to receive requests
    'EADDRINUSE(Error Address in Use)' <- when a specified is already IN USE
*/