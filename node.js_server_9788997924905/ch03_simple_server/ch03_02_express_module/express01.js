const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.send('Hello Wolrd!');
});

app.listen(8080, () =>
console.log('Connecting to server on port 8080...'));