// p092_hell.js

const http = require("http");
let count = 0;  // initializes 'count' to track the number of requests received

const server = http.createServer((req, res) => {
    // creates an HTTP server
    count++;
    console.log(count);  // logs the incremented count to the console (defined below)
    res.statusCode = 200;  // success!
    res.setHeader("Content-Type", "text/plain");  // response in plain text
    res.write("hello\n");  // written to the response body
    setTimeout(() => {
        res.end("Node.js");
    }, 2000);  // sets the delay for the callback to 2 seconds (= 2000 milliseconds)
});

// function log(count) {
//     console.log((count += 1));
// }

server.listen(8000, () => console.log("Hello Node.js"));