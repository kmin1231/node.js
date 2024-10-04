// p190_async_await.js

function waitOneSecond(msg) {
    return new Promise((resolve, _) => {  // not using 'reject'
        setTimeout(() => resolve(`${msg}`), 1000);  // passes 'msg' string after 1 second
    });
}

// defines asynchronous function
async function countOneToTen() {
    for (let x of [...Array(10).keys()]) {
        // creates a loop that iterates from 0 to 9
        // using 'Array' constructor & 'keys()' method
        // [...Array(10).keys()] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

        let result = await waitOneSecond(`waiting for ${x + 1} seconds...`);
        // calls 'waitOneSecond' function with a message
        // using 'await' to PAUSE the loop until the promise is resolved
        // stores the result in the 'result' variable

        console.log(result);
    }
    console.log("-- Task Completed!");
}

countOneToTen();  // async function
// 'await waitOneSecond(...)' pauses the execution of the function, until 'waitOneSecond' resolves after 1 second