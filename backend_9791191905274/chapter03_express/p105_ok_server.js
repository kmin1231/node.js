const http = require("http"); // 'http' module (node.js built-in)
const server = http.createServer((req, res) => { // callback
    res.setHeader("Content-Type", "text/html"); // response in 'HTML' format
    res.end("OK"); // ends the response
});

server.listen("3000", () => console.log("Start running OK server!")); // port 3000