const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>Server with Node.js</h1>');
    res.end('<p>http module practice</p>')
}).listen(8080, () => {
    console.log('Connecting to server on port 8080...');
});

/*
    HTTP response code '200' (success)
    content type specified: text/html with UTF-8 character encoding
    write -> sent back to the client (HTTP response)
    end -> HTTP response to be finalized
*/