

const url = require("url");
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log("ROUTER with express");
});

/* imports 'express' module -> more convenient way of route handling
    -- can associate each route with its handler function directly */

app.get("/", (_, res) => res.end("HOME"));  // underscore: in place of 'req' (request object)
app.get("/user", user); // defines a GET route for "/user" path -> uses 'user' function as route handler
app.get("/feed", feed); // defines a GET route for "/feed" path -> uses 'feed' function as route handler

function user(req, res) {
    // parses the query string from the request URL -> query object (with extracted user info)
    // the server responds with a JSON string containing the user's name and age

    const user = url.parse(req.url, true).query;
    res.json(`[user] name: ${user.name}, age: ${user.age}`);    // 'res.json' -> 'charset=utf-8' automatically applied
}

function feed(_, res) {
    // not 'const' but 'function' -> will be HOISTED
    res.json(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
    `);
}