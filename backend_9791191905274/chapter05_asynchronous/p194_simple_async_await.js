// p194_simple_async_await.js

async function a() { return "OK" }

// function b() {
//     const result = a();
//     console.log(result);
// }

// b();

/* without 'async - await'
    [console] Promise { 'OK' }
*/

async function b() {
    const result = await a();
    console.log(result);
}

b();

/* with 'async - await'
    [console] OK
*/