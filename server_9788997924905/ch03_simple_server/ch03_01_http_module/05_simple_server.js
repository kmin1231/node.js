const http = require('http');
// imports built-in 'http' module

http.createServer((req, res) => {
}).listen(8080, () => {
    console.log('Connecting to server on port 8080...')
});

/*
    create a HTTP server, using 'createServer' method
    -> argument: (req, res)
        -- callback function
        'req' (request object), 'res' (response object)
    starts the server on port '8080'
*/