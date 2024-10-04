// p189_async_await.js

async function myName() {
    return "Andy";
}

console.log(myName());

// [console] Promise { 'Andy' }


async function showName() {
    const name = await myName();
    console.log(name);
}

console.log(showName());

/* [console]
    Promise { <pending> }
    Andy
*/