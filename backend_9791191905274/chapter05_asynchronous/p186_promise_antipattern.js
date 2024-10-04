// p186_promise_antipattern.js

function myWork(work) {
    return new Promise((resolve, reject) => {
        if (work === 'done') {
            resolve('Possible!');
        } else {
            reject(new Error("Impossible!!"));
        }
    })
}

myWork('done').then(
    function (value) { console.log(value) },
    function (err) { console.error(err) }
);

// [case] cause an error
// myWork('doing')
//     .then(function (value) { console.log(value) })
//     .catch(function (err) { console.error(err) });