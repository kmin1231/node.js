// p083_call_stack.js
// [JavaScript] single thread; call stack (LIFO)

function func1() {
    console.log("1");
    func2();
    return;
}

function func2() {
    console.log("2");
    return;
}

func1();

/* Execution Flow
    : [func1] '1' is printed to the console -> 'func2' is called within 'func1' -> execution moves to 'func2'
    -> [func2] '2' is printed to the console -> 'func2' returns (without explicit return value)
    -> control returns to 'func1' -> [func1] 'func1' returns
*/