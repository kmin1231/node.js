// p116_hello_express.js

const express = require("express"); // imports 'express' module
const app = express();  // creates an instance -> assigns to the variable 'app'
const port = 3000;  // specifies the port number to a constant variable

app.get("/", (req, res) => {
    // route handler function
    // when a 'GET' request is made to the root URL ("/"), the callback function will be executed
    res.set({ "Content-Type": "text/html; charset=utf-8" });    // HTML content (utf-8 encoded) 
    res.end("Hello, express!");
});

app.listen(port, () => {
    console.log(`START SERVER: using port ${port}`);   // template literals with backticks
});