// p109_router_distinct_functions.js

const http = require("http");
const url = require("url");

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html");

    // NOT directly handling 'user info' and 'feed' content
    // but separated into distinct functions: user, feed, notFound
    if (path === "/user") {
        user(req, res);
    } else if (path === "/feed") {
        feed(req, res);
    } else {
        notFound(req, res);
    }
}).listen("3000", () => console.log("ROUTER with distinct functions!"));

// defines distinct functions for paths
// advantage: better readability, maintainability, extensibility (module)
const user = (req, res) => {
    res.end(`[user] name: andy, age: 30`);
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