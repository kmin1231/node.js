// p120_board_api.js

const express = require("express");
const app = express();

let posts = []; // empty array to store the list of posts (with id, title, name, text, createdDt)
// 'let' -> need to be reassigned: updated when posts are added or deleted
// not allow 're-declaration' within the same scope

/*
    "FUNCTION scope" (var)
    -- variables declared with 'var' are accessible anywhere INSIDE that function, but NOT outside of it
    -- (Attention) even if declared inside a BLOCK (ex. if, for), they are available throughout the entire FUNCTION

    "BLOCK scope" (let, const)
    -- variables declared with 'let' or 'const' are only accessible within the block {} where they are defined
    -- 'block scope' applies to any block wrapped in curly braces
    => can ensure variables do NOT accidentally leak outside of the intended scope
*/


/* "app.use"
    -- used for middleware functions which run for every route (e.g., parsing request bodies, logging, handling static files).
    -- can handle HTTP methods such as GET, POST, PUT, DELETE (unless restricted by specific conditions)
*/

app.use(express.json());
    /* activates JSON parsing middleware in Express.js
    -> automatically parses JSON data sent in the request body from the client & adds to 'req.body'
    -- without this, 'req.body' will be 'undefined' */

app.use(express.urlencoded({ extended: true }));  // [URL encoding] spaces -> '%20'

app.get("/", (req, res) => {  // [testing] curl -X GET http://localhost:3000
    res.json(posts);
})

app.post("/posts", (req, res) => {
    const { title, name, text } = req.body;  // extracts title, name, text from the request body (req.body)
    /*
        'req.body': object in Express.js that contains the body data sent in the client's request
        -> if a client sends a 'POST' request with JSON data, the data can be accessed on the server via 'req.body'
        -- parses the request body -> converts it into an 'object'
        -- extracts title, name, text from req.body using "destructuring assignment"
    */

    posts.push({ id: posts.length + 1, title, name, text, createdDt: Date()});  // adds a new post object to 'posts' (array)
    res.json({ title, name, text });  // sends a response back in JSON format
});

    /*
        [testing-ex.] curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -d "title=nodejs&name=javascript&text=express" http://localhost:3000/posts 
        
        * 'application/x-www-form-urlencoded'
        -- default content type used for sending data from HTML forms
        -- the data is encoded in a query string format
        -- cf. 'application/json': used for sending data in JSON format -> can handle more complex data structures
    */


app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;  // extracts 'id' from URL parameters
    const filteredPosts = posts.filter((post) => post.id !== +id);  // filters out the post with the matching id from the array 'posts'
    /* 'unary +' operator: converts operand to a number
        cf. 'parseInt': parses a string -> converts it to 'integer'
    */

    /* 'filter' method
        : returns a NEW array containing elements that meet the specified condition
        -- NOT modifies the original array (non-destructive)
        cf. 'splice' (destructive): modifies the original array by adding or removing elements
    */

    const isLengthChanged = posts.length !== filteredPosts.length;  // checks if a post was successfully deleted
    posts = filteredPosts;  // reassigns 'filteredPosts' consisting of posts that 'exclude' the specified 'id' -> deleted
    if (isLengthChanged) {  // if 'true' -> successfully deleted
        res.json("OK");  // the server sends the string "OK" (single value) back to the client in JSON (without a key)
        return;
    }
    res.json("NOT CHANGED");  // when it is 'false'
});

// [testing-ex.] curl -X DELETE localhost:3000/posts/2


app.listen(3000, () => {
    console.log("welcome posts START!");
});