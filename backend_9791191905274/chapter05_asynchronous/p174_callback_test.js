// p174_callback_test.js

const DB = [];  // empty array to store user information

// triple-nested callback function
function register(user) {
    return saveDB(user, function (user) {
        return sendEmail(user, function (user) {
            return getResult(user);
        });
    });
}

function saveDB(user, callback) {
    DB.push(user);
    console.log(`saving '${user.name}' to DB`);
    return callback(user);  // calls 'callback' function, passing the 'user' object
}

function sendEmail(user, callback) {
    console.log(`email to: ${user.email}`);
    return callback(user);  // calls 'callback' function, passing the 'user' object
}

function getResult(user) {
    return `user '${user.name}' successfully registered`;  // returns success message with user's name
}

const result = register({ email: "andy@test.com", password: "1234", name: "andy" });
// calls 'register' function -> registers a user -> stores the result in the variable 'result'

console.log(result);