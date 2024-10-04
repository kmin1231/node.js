// p182_promise_example.js

function goodPromise(val) {  // takes a paramter 'val'
    return new Promise((resolve, reject) => {
        resolve(val);
    });
}

// concatenates string sequentially, using 'then' method
goodPromise("This is")
    .then((val) => {
        return val + " perfectly";
    })
    .then((val) => {
        return val + " clean";
    })
    .then((val) => {
        return val + " code!!";
    })
    .then((val) => {
        console.log(val);  // outputs the final result 'val' to the console
    })
    .catch((err) => {  // defines an error callback function to handle rejections
        console.log(err);
    });

// [console] This is perfectly clean code!!