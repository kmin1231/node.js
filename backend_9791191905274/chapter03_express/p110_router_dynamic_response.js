const http = require("http");
const url = require("url");

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html");

    if (path === "/user") {
        user(req, res);
    } else if (path === "/feed") {
        feed(req, res);
    } else {
        notFound(req, res);
    }
}).listen("3000", () => console.log("ROUTER for dynamic response!"));

// defines distinct functions for paths
// defines each function with 'const' -> cannot be reassigned
const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    /* parses the requested URL
    -> extracts the query OBJECT, which contains 'key-value' pairs from the query string
    -- in this case: two properties 'name' & 'age'  */

    res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`);
    // without query string: both name & age -> 'undefined'
    /* ex. localhost:3000/user?name=michelle&age=25
        {
        pathname: '/user',
        query: {
            name: 'michelle',
            age: '25'
        }
        }
    */
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