// p176_promise_test.js
// use 'Promise' object, instead of 'callback' function 

const DB = [];

function saveDB(user) {
    const oldDBSize = DB.length;  // stores the size of the database before saving a new user's info
    DB.push(user);
    console.log(`saving '${user.name}' to DB`);
    return new Promise((resolve, reject) => {  // returns a 'Promise' object
        if (DB.length > oldDBSize) {
            resolve(user);  // RESOLVE: 'Promise' has been successfully completed 
        } else {
            reject(new Error("Error saving the data!"));  // REJECT: 'Promise' has been failed
        }
    });
}

function sendEmail(user) {
    console.log(`email to: ${user.email}`);
    return new Promise((resolve) => {  // returns a 'Promise' object that resolves with user info
        resolve(user);
    });
}

function getResult(user) {
    return new Promise((resolve, reject) => {
        resolve(`user '${user.name}' successfully registered`);
    });
}

// function to handle user registration by chaining 'saveDB' -> 'sendEmail' -> getResult'
function registerByPromise(user) {
    const result = saveDB(user).then(sendEmail).then(getResult);
    console.log(result);
    return result;
}

/* 'then' method
    -- multiple asynchronous operations can be performed sequentially (chaining)
    -- the return value of each 'then' is passed to the next 'then'
*/
    // then(onFulfilled)
    // then(onFulfilled, onRejected)
    
    // then(
    //     (value) => { /* fulfillment handler */ },
    //     (reason) => { /* rejection handler */ },
    // )

/* error handling example ('catch')
    : saveDB(user).then(sendEmail).then(getResult).catch(error => new Error(error))
*/

const myUser = { email: "andy@test.com", password: "1234", name: "andy" };  // defines 'myUser' object
// const result = registerByPromise(myUser);  // calls 'registerByPromise' function in order to register a user
// result.then(console.log);  // logs the final result to the console

// [console] Promise { <pending> }
// -- neither 'fulfilled' nor 'rejected'

allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
allResult.then(console.log);