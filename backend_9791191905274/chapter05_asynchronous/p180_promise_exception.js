// p180_promise_exception.js

const DB = [];

function saveDB(user) {
    const oldDBSize = DB.length;
    // const oldDBSize = DB.length + 1;  // causing an error
    DB.push(user);
    console.log(`saving '${user.name}' to DB`);
    return new Promise((resolve, reject) => {
        if (DB.length > oldDBSize) {
            resolve(user); 
        } else {
            reject(new Error("Error saving the data!"));
        }
    });
}

function sendEmail(user) {
    console.log(`email to: ${user.email}`);
    return new Promise((resolve) => {
        resolve(user);
    });
}

function getResult(user) {
    return new Promise((resolve, reject) => {
        resolve(`user '${user.name}' successfully registered`);
    });
}

// function to handle user registration by chaining 'saveDB' -> 'sendEmail' -> getResult' -> exception handling -> 'finally'
function registerByPromise(user) {  // modified
    const result = saveDB(user)
                    .then(sendEmail)
                    .then(getResult)
                    .catch(error => new Error(error))  // returns 'Error' object
                    .finally(() => console.log("COMPLETE!"));  // always executed
    console.log(result);
    return result;
}


const myUser = { email: "andy@test.com", password: "1234", name: "andy" };
const result = registerByPromise(myUser);
result.then(console.log);

// allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
// allResult.then(console.log);