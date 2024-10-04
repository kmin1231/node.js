// p086_event_loop.js
// [JavaScript] event-driven architecture; event loop

console.log("1");  // '1' is printed to the console immediately
setTimeout(() => console.log(2), 1000);  // schedules 'console.log(2)' to run AFTER 1 second (1000 milliseconds)
console.log("3");  // '3' is printed to the console immediately
// after 1 second, delayed 'console.log(2)' is executed -> '2' is printed to the console
// [order] string '1' -> string '3' -> (one second) -> number '2'


/*
    "setTimeout(callback, delay)"
    -- Node.js built-in API
    -- a function that schedules a function to be executed AFTER a specified delay (in milliseconds)
    =>  enables 'asynchronous' programming
    
    cf. "asynchronous programming"
    -- allows code execution to proceed WITHOUT blocking the execution of the main program [thread]

    * asynchronous functions (ex. setTimeout) complete -> their callback functions are placed in the TASK QUEUE
    * the EVENT LOOP checks TASK QUEUE after the CALL STACK is empty
    -> moves next task in the TASK QUEUE to the CALL STACK for execution
*/