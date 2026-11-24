# JavaScript – Phase 3: Functions

Functions are one of the most important concepts in JavaScript. Almost everything in modern JavaScript development, including React, Node.js, Express.js and Next.js, relies heavily on functions.

This phase covers functions from basic concepts to advanced functional programming techniques.

# Topics Covered

| No. | Topic | Description |
|---|---|---|
| 1 | What are Functions? | Introduction to functions |
| 2 | Function Declaration | Defining a function |
| 3 | Function Expression | Assigning a function to a variable |
| 4 | Parameters and Arguments | Passing data to functions |
| 5 | Return Statement | Returning values |
| 6 | Default Parameters | Default argument values |
| 7 | Arrow Functions | ES6 arrow function syntax |
| 8 | Anonymous Functions | Functions without names |
| 9 | Callback Functions | Passing functions as arguments |
| 10 | Higher-Order Functions | Functions accepting or returning functions |
| 11 | First-Class Functions | Functions treated as values |
| 12 | IIFE | Immediately Invoked Function Expression |
| 13 | Rest Parameters | Handling multiple arguments |
| 14 | Spread Syntax | Expanding iterable values |
| 15 | Recursion | Function calling itself |
| 16 | Pure and Impure Functions | Understanding function behaviour |
| 17 | Function Scope | Variables inside functions |
| 18 | Function Hoisting | Function declaration hoisting |
| 19 | Function Methods | call(), apply(), bind() |
| 20 | Function Composition | Combining multiple functions |

---

# 1. What are Functions?

### Definition

A function is a reusable block of code designed to perform a specific task.

Functions allow developers to organize code into smaller, reusable and manageable units.

### Why Do We Need Functions?

Without functions:

```javascript
console.log(10 + 20);
console.log(10 + 20);
console.log(10 + 20);
```

With functions:

```javascript
function addNumbers() {
    console.log(10 + 20);
}

addNumbers();
addNumbers();
addNumbers();
```

Instead of writing the same logic multiple times, we define it once and execute it whenever required.

### Benefits of Functions

1. Code reusability.
2. Reduced code duplication.
3. Better code organization.
4. Improved readability.
5. Easier debugging and maintenance.
6. Supports modular programming.

---

# 2. Function Declaration

### What is a Function Declaration?

A function declaration is a way of defining a named function using the `function` keyword.

### Syntax

```javascript
function functionName() {
    // Code to execute
}
```

### Example

```javascript
function greet() {
    console.log("Hello World!");
}

greet();
```

Output:

```text
Hello World!
```

### Function Execution

Defining a function does not execute its code.

To execute a function, we need to call it using its name followed by parentheses.

```javascript
function greet() {
    console.log("Hello");
}

// Function call
greet();
```

**Important:** A function can be called multiple times after its declaration.

---

# 3. Function Expression

### What is a Function Expression?

A function expression is a way of creating a function and assigning it to a variable.

Unlike a function declaration, a function expression does not need to have a function name.

### Syntax

```javascript
const functionName = function () {
    // Code
};
```

### Example

```javascript
const greet = function () {
    console.log("Hello World!");
};

greet();
```

Output:

```text
Hello World!
```

### Named Function Expression

A function expression can also have a name.

```javascript
const greet = function sayHello() {
    console.log("Hello World!");
};

greet();
```

The function name `sayHello` is available inside the function itself, but it is not available as an outer variable.

### Function Declaration vs Function Expression

| Function Declaration | Function Expression |
|---|---|
| Defined using a function declaration. | Created as an expression and assigned to a variable. |
| Must have a function name. | Can be anonymous or named. |
| Fully hoisted with its function body initialized. | Variable follows its declaration's hoisting rules. |
| Can generally be called before its declaration. | Cannot be accessed before initialization when assigned to `let` or `const`. |

Example:

```javascript
// Function Declaration
sayHello();

function sayHello() {
    console.log("Hello");
}
```

This works because function declarations are hoisted.

But:

```javascript
// Function Expression
greet();

const greet = function () {
    console.log("Hello");
};
```

This produces a `ReferenceError` because `greet` is in the Temporal Dead Zone before initialization.

---

# 4. Parameters and Arguments

### What are Parameters?

Parameters are variables defined in a function declaration or function expression to receive values.

### What are Arguments?

Arguments are the actual values passed to a function when it is called.

### Example

```javascript
function add(a, b) {
    console.log(a + b);
}

add(10, 20);
```

Here:

- `a` and `b` are parameters.
- `10` and `20` are arguments.

Output:

```text
30
```

### Multiple Parameters

```javascript
function introduce(name, age, city) {
    console.log(`My name is ${name}`);
    console.log(`My age is ${age}`);
    console.log(`I live in ${city}`);
}

introduce("Riyaz", 25, "Ahmedabad");
```

### What Happens When Arguments Are Missing?

If an argument is not provided, its corresponding parameter gets the value `undefined`, unless a default parameter is specified.

```javascript
function greet(name) {
    console.log(name);
}

greet();
```

Output:

```text
undefined
```

### What Happens When Extra Arguments Are Passed?

Extra arguments are ignored unless the function accesses them through the `arguments` object or rest parameters.

```javascript
function add(a, b) {
    console.log(a + b);
}

add(10, 20, 30);
```

Output:

```text
30
```

---

# 5. Return Statement

### What is the return Statement?

The `return` statement terminates the execution of a function and specifies the value that the function should return to its caller.

### Example

```javascript
function add(a, b) {
    return a + b;
}

let result = add(10, 20);

console.log(result);
```

Output:

```text
30
```

Here, the function returns `30`, which is stored in the `result` variable.

### console.log() vs return

These two concepts are different.

**Using console.log():**

```javascript
function add(a, b) {
    console.log(a + b);
}

let result = add(10, 20);

console.log(result);
```

Output:

```text
30
undefined
```

**Using return:**

```javascript
function add(a, b) {
    return a + b;
}

let result = add(10, 20);

console.log(result);
```

Output:

```text
30
```

| console.log() | return |
|---|---|
| Displays a value in the console. | Sends a value back to the caller. |
| Does not return the displayed value. | Returns the specified value. |
| Used mainly for debugging and logging. | Used to provide function results. |

### Code After return

Statements after a return statement are not executed within that function.

```javascript
function greet() {
    return "Hello";

    console.log("World");
}

console.log(greet());
```

Output:

```text
Hello
```

### Default Return Value

If a function does not explicitly return a value, it returns `undefined`.

```javascript
function greet() {
    console.log("Hello");
}

let result = greet();

console.log(result);
```

Output:

```text
Hello
undefined
```

---

# 6. Default Parameters

### What are Default Parameters?

Default parameters allow developers to assign default values to function parameters.

These values are used when an argument is missing or explicitly passed as `undefined`.

### Syntax

```javascript
function functionName(parameter = defaultValue) {
    // Code
}
```

### Example

```javascript
function greet(name = "Guest") {
    console.log(`Hello ${name}`);
}

greet("Riyaz");
greet();
```

Output:

```text
Hello Riyaz
Hello Guest
```

### Passing undefined vs null

```javascript
function greet(name = "Guest") {
    console.log(name);
}

greet(undefined); // Guest

greet(null);      // null

greet("");        // Empty string
```

**Important:** Default parameters are used for missing arguments or arguments explicitly passed as `undefined`, not for `null`, `false`, `0`, or empty strings.

### Multiple Default Parameters

```javascript
function calculate(a = 10, b = 20) {
    return a + b;
}

console.log(calculate());      // 30
console.log(calculate(5));     // 25
console.log(calculate(5, 10)); // 15
```

---

# 7. Arrow Functions

### What are Arrow Functions?

Arrow functions are a shorter syntax for writing function expressions, introduced in ECMAScript 2015 (ES6).

They provide a concise way to define functions.

### Syntax

```javascript
const functionName = (parameters) => {
    // Code
};
```

### Example

Traditional function:

```javascript
const greet = function () {
    console.log("Hello");
};
```

Arrow function:

```javascript
const greet = () => {
    console.log("Hello");
};

greet();
```

### Arrow Function with Parameters

```javascript
const add = (a, b) => {
    return a + b;
};

console.log(add(10, 20));
```

Output:

```text
30
```

### Implicit Return

When an arrow function contains a single expression, braces and the `return` keyword can be omitted.

```javascript
const add = (a, b) => a + b;

console.log(add(10, 20));
```

Output:

```text
30
```

### Single Parameter

Parentheses can be omitted when there is exactly one simple parameter.

```javascript
const square = number => number * number;

console.log(square(5));
```

Output:

```text
25
```

### Returning an Object

When returning an object implicitly, wrap the object literal in parentheses.

```javascript
const getUser = () => ({
    name: "Riyaz",
    age: 25
});

console.log(getUser());
```

### Arrow Function vs Normal Function

| Normal Function | Arrow Function |
|---|---|
| Uses `function` keyword. | Uses `=>` syntax. |
| Has its own `this` binding. | Inherits `this` from the surrounding lexical scope. |
| Has its own `arguments` object. | Does not have its own `arguments` object. |
| Can be used as a constructor with `new` if constructible. | Cannot be used as a constructor. |
| Can be used as generator functions with `function*`. | Cannot be used as generator functions. |
| Can be named or anonymous. | Usually assigned as a function expression or used inline. |

**Important:** Arrow functions do not simply replace normal functions. Both have different use cases, especially when working with `this`.

---

# 8. Anonymous Functions

### What is an Anonymous Function?

An anonymous function is a function that does not have an explicit name.

### Example

```javascript
const greet = function () {
    console.log("Hello World");
};

greet();
```

Here, the function itself has no name. It is assigned to the `greet` variable.

### Anonymous Function as Callback

```javascript
setTimeout(function () {
    console.log("Hello after 2 seconds");
}, 2000);
```

The anonymous function is passed as an argument to `setTimeout()`.

### Common Uses

- Callback functions.
- Event handlers.
- Array methods.
- Immediately Invoked Function Expressions.

---

# 9. Callback Functions

### What is a Callback Function?

A callback function is a function passed as an argument to another function so that it can be invoked by that function.

Callbacks are commonly used for event handling, asynchronous operations, and reusable function logic.

### Example

```javascript
function greet(name, callback) {
    console.log(`Hello ${name}`);

    callback();
}

function sayGoodbye() {
    console.log("Goodbye!");
}

greet("Riyaz", sayGoodbye);
```

Output:

```text
Hello Riyaz
Goodbye!
```

Here:

- `sayGoodbye` is passed as an argument.
- `callback` receives the function.
- `callback()` executes the passed function.

### Callback Using Anonymous Function

```javascript
function calculate(a, b, callback) {
    callback(a, b);
}

calculate(10, 20, function (x, y) {
    console.log(x + y);
});
```

Output:

```text
30
```

### Callback Using Arrow Function

```javascript
function calculate(a, b, callback) {
    callback(a, b);
}

calculate(10, 20, (x, y) => {
    console.log(x + y);
});
```

### Synchronous Callback

A synchronous callback executes immediately during the execution of the function that receives it.

```javascript
function process(callback) {
    console.log("Start");

    callback();

    console.log("End");
}

process(() => {
    console.log("Callback executed");
});
```

Output:

```text
Start
Callback executed
End
```

### Asynchronous Callback

An asynchronous callback executes later, after an asynchronous operation completes or an event occurs.

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Callback executed");
}, 2000);

console.log("End");
```

Output:

```text
Start
End
Callback executed
```

### Callback Hell

Callback Hell occurs when multiple nested callbacks make code difficult to read, understand, and maintain.

Example:

```javascript
getUser(function (user) {

    getOrders(user.id, function (orders) {

        getPayment(orders[0].id, function (payment) {

            console.log(payment);

        });

    });

});
```

**Solution:** Promises and async/await help manage asynchronous code more cleanly. We will cover them in Phase 7.

---

# 10. Higher-Order Functions (HOF)

### What is a Higher-Order Function?

A Higher-Order Function is a function that does at least one of the following:

1. Accepts another function as an argument.
2. Returns another function as its result.

### Example 1: Accepting a Function

```javascript
function calculate(a, b, operation) {
    return operation(a, b);
}

function add(x, y) {
    return x + y;
}

function multiply(x, y) {
    return x * y;
}

console.log(calculate(10, 20, add));      // 30
console.log(calculate(10, 20, multiply)); // 200
```

Here, `calculate()` is a higher-order function because it accepts another function as an argument.

### Example 2: Returning a Function

```javascript
function multiplier(factor) {

    return function (number) {
        return number * factor;
    };

}

const double = multiplier(2);

console.log(double(5)); // 10
```

Here, `multiplier()` returns another function.

### Common Higher-Order Functions

JavaScript provides several built-in higher-order functions:

| Method | Purpose |
|---|---|
| `map()` | Transforms array elements. |
| `filter()` | Filters array elements. |
| `reduce()` | Reduces array elements into a single result. |
| `forEach()` | Executes a callback for each array element. |
| `find()` | Finds the first matching element. |
| `some()` | Checks whether at least one element matches. |
| `every()` | Checks whether all elements match. |
| `sort()` | Sorts array elements using an optional comparator. |

Example:

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(number => number * 2);

console.log(doubled);
```

Output:

```text
[2, 4, 6, 8, 10]
```

These array methods will be covered in detail in Phase 4.

---

# 11. First-Class Functions

### What are First-Class Functions?

JavaScript treats functions as first-class citizens.

This means functions can be:

1. Assigned to variables.
2. Passed as arguments to other functions.
3. Returned from other functions.
4. Stored inside objects and arrays.
5. Created dynamically at runtime.

### Example 1: Assigning a Function to a Variable

```javascript
const greet = function () {
    console.log("Hello");
};

greet();
```

### Example 2: Passing a Function as an Argument

```javascript
function execute(callback) {
    callback();
}

execute(() => {
    console.log("Function executed");
});
```

### Example 3: Returning a Function

```javascript
function outer() {

    return function () {
        console.log("Inner function");
    };

}

const result = outer();

result();
```

### Example 4: Storing Functions in an Array

```javascript
const operations = [
    () => console.log("Addition"),
    () => console.log("Subtraction"),
    () => console.log("Multiplication")
];

operations[0]();
operations[1]();
```

**Important:** First-class functions are a language capability. Higher-order functions are functions that use this capability by accepting or returning functions.

---

# 12. IIFE (Immediately Invoked Function Expression)

### What is IIFE?

IIFE stands for Immediately Invoked Function Expression.

It is a function expression that is executed immediately after it is created.

### Syntax

```javascript
(function () {
    // Code
})();
```

### Example

```javascript
(function () {
    console.log("IIFE Executed");
})();
```

Output:

```text
IIFE Executed
```

### IIFE with Parameters

```javascript
(function (name) {
    console.log(`Hello ${name}`);
})("Riyaz");
```

Output:

```text
Hello Riyaz
```

### Arrow Function IIFE

```javascript
(() => {
    console.log("Arrow IIFE");
})();
```

### Why Do We Use IIFE?

Traditionally, IIFEs were commonly used to create private scopes and avoid polluting the global scope.

Example:

```javascript
(function () {

    let username = "Riyaz";

    console.log(username);

})();

console.log(username); // ReferenceError
```

The variable `username` cannot be accessed outside the function.

**Note:** Modern JavaScript also provides block scope, modules, and other mechanisms for managing scope. Therefore, IIFEs are less necessary for this purpose today.

---

# 13. Rest Parameters

### What are Rest Parameters?

Rest parameters allow a function to accept any number of arguments and collect them into a single array.

They are represented using three dots (`...`) before the parameter name.

### Syntax

```javascript
function functionName(...parameters) {
    // Code
}
```

### Example

```javascript
function sum(...numbers) {

    let total = 0;

    for (let number of numbers) {
        total += number;
    }

    return total;
}

console.log(sum(10, 20));          // 30
console.log(sum(10, 20, 30));      // 60
console.log(sum(10, 20, 30, 40)); // 100
```

Here, all arguments are collected into the `numbers` array.

### Rest Parameters with Normal Parameters

```javascript
function calculate(name, ...marks) {

    console.log(name);
    console.log(marks);

}

calculate("Riyaz", 80, 90, 85);
```

Output:

```text
Riyaz
[80, 90, 85]
```

### Important Rules

- Only one rest parameter is allowed.
- The rest parameter must be the last parameter.
- Rest parameters are actual arrays.

Invalid:

```javascript
function calculate(...numbers, name) {
    // SyntaxError
}
```

---

# 14. Spread Syntax

### What is Spread Syntax?

Spread syntax allows an iterable or object to be expanded into individual elements or properties.

It also uses three dots (`...`), but its purpose differs from rest parameters.

### Example 1: Expanding an Array

```javascript
const numbers = [10, 20, 30];

console.log(...numbers);
```

Output:

```text
10 20 30
```

### Example 2: Copying an Array

```javascript
const original = [10, 20, 30];

const copy = [...original];

console.log(copy);
```

### Example 3: Merging Arrays

```javascript
const arr1 = [1, 2, 3];

const arr2 = [4, 5, 6];

const result = [...arr1, ...arr2];

console.log(result);
```

Output:

```text
[1, 2, 3, 4, 5, 6]
```

### Example 4: Passing Array Elements as Arguments

```javascript
function add(a, b, c) {
    return a + b + c;
}

const numbers = [10, 20, 30];

console.log(add(...numbers));
```

Output:

```text
60
```

### Example 5: Copying Objects

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

const updatedUser = {
    ...user,
    city: "Ahmedabad"
};

console.log(updatedUser);
```

### Rest vs Spread

| Rest Parameters | Spread Syntax |
|---|---|
| Collects multiple arguments into an array. | Expands iterable values into individual elements. |
| Used in function parameters. | Used in function calls, array literals and object literals. |
| Groups values. | Expands values. |

Example:

```javascript
// Rest
function sum(...numbers) {
    return numbers.reduce((total, number) => total + number, 0);
}

// Spread
const values = [10, 20, 30];

console.log(sum(...values));
```

Output:

```text
60
```

---

# 15. Recursion

### What is Recursion?

Recursion is a programming technique in which a function calls itself to solve a problem.

A recursive function generally has two important components:

1. Base Case: The condition that stops recursion.
2. Recursive Case: The part where the function calls itself.

### Example: Basic Recursion

```javascript
function count(number) {

    if (number === 0) {
        return;
    }

    console.log(number);

    count(number - 1);
}

count(5);
```

Output:

```text
5
4
3
2
1
```

### Example: Factorial Using Recursion

Factorial of a number is the product of all positive integers from 1 to that number.

Formula:

`5! = 5 × 4 × 3 × 2 × 1 = 120`

JavaScript:

```javascript
function factorial(number) {

    if (number === 0 || number === 1) {
        return 1;
    }

    return number * factorial(number - 1);
}

console.log(factorial(5));
```

Output:

```text
120
```

### How Recursion Works

For `factorial(5)`:

```text
factorial(5)
    5 * factorial(4)
        4 * factorial(3)
            3 * factorial(2)
                2 * factorial(1)
                    1
```

Result:

```text
5 × 4 × 3 × 2 × 1 = 120
```

### Recursion vs Loop

| Recursion | Loop |
|---|---|
| Function calls itself. | Repeats code using loop statements. |
| Uses function call stack. | Does not require a new function call for each iteration. |
| Can be easier for recursive structures. | Often simpler for straightforward repetition. |
| Can cause stack overflow if too deep. | Can be more memory-efficient for simple iteration. |

**Important:** JavaScript does not guarantee tail-call optimization in common engines, so deep recursion can result in a stack overflow.

---

# 16. Pure and Impure Functions

### What is a Pure Function?

A pure function is a function that:

1. Always produces the same output for the same input.
2. Does not cause observable side effects.

### Example: Pure Function

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(10, 20)); // 30
console.log(add(10, 20)); // 30
```

For the same inputs, the function always returns the same result.

### What is an Impure Function?

An impure function is a function that depends on or modifies external state, performs side effects, or produces different results for the same inputs.

Example:

```javascript
let total = 10;

function add(number) {
    total += number;

    return total;
}

console.log(add(5)); // 15
console.log(add(5)); // 20
```

The function modifies an external variable.

### Pure vs Impure Functions

| Pure Function | Impure Function |
|---|---|
| Same input produces the same output. | Output may depend on external state. |
| No observable side effects. | Can cause side effects. |
| Easier to test. | May require more complex testing. |
| More predictable. | Can be less predictable. |

### Common Side Effects

- Modifying global variables.
- Updating DOM elements.
- Making API requests.
- Writing to files.
- Modifying external objects.
- Logging to the console.

**Note:** Pure functions are particularly important in functional programming and React application design.

---

# 17. Function Scope

### What is Function Scope?

Function scope means variables declared inside a function are accessible within that function and its nested functions, but not outside it.

### Example

```javascript
function greet() {

    let name = "Riyaz";

    console.log(name);
}

greet();

console.log(name); // ReferenceError
```

The `name` variable is accessible only inside the function.

### Function Scope vs Block Scope

```javascript
function example() {

    var a = 10;
    let b = 20;
    const c = 30;

    if (true) {

        var x = 100;
        let y = 200;
        const z = 300;

    }

    console.log(a); // 10
    console.log(b); // 20
    console.log(c); // 30

    console.log(x); // 100

    console.log(y); // ReferenceError
    console.log(z); // ReferenceError
}
```

Explanation:

- `var` is function-scoped.
- `let` and `const` are block-scoped.

### Lexical Scope (Introduction)

Lexical scope means a function can access variables from its surrounding scope based on where it is defined in the source code.

Example:

```javascript
let name = "Riyaz";

function outer() {

    function inner() {
        console.log(name);
    }

    inner();
}

outer();
```

Output:

```text
Riyaz
```

We will study lexical environments and closures in detail in Phase 5.

---

# 18. Function Hoisting

### What is Function Hoisting?

Function hoisting refers to JavaScript's behaviour of making function declarations available before their actual position in the source code during the creation of the execution context.

### Example: Function Declaration

```javascript
greet();

function greet() {
    console.log("Hello World");
}
```

Output:

```text
Hello World
```

This works because function declarations are hoisted with their function bodies initialized.

### Function Expression Hoisting

```javascript
greet();

const greet = function () {
    console.log("Hello World");
};
```

Output:

```text
ReferenceError
```

The `greet` variable is in the Temporal Dead Zone until its initialization.

### Arrow Function Hoisting

```javascript
greet();

const greet = () => {
    console.log("Hello World");
};
```

This also produces a `ReferenceError`.

### Summary

| Function Type | Can Be Called Before Declaration? |
|---|---|
| Function Declaration | Yes |
| Function Expression with const | No |
| Function Expression with let | No |
| Function Expression with var | No; initially undefined |
| Arrow Function with const | No |

**Important:** Function expressions and arrow functions follow the hoisting behaviour of the variables to which they are assigned.

---

# 19. Function Methods: call(), apply(), bind()

These methods are used to explicitly control the value of `this` when invoking a regular function.

We will explore the `this` keyword in depth in Phase 5.

### 19.1 call()

The `call()` method invokes a function immediately with a specified `this` value and arguments passed individually.

Example:

```javascript
const user = {
    name: "Riyaz"
};

function greet(city) {
    console.log(`Hello ${this.name} from ${city}`);
}

greet.call(user, "Ahmedabad");
```

Output:

```text
Hello Riyaz from Ahmedabad
```

### 19.2 apply()

The `apply()` method works similarly to `call()`, but accepts arguments as an array or array-like object.

Example:

```javascript
const user = {
    name: "Riyaz"
};

function greet(city, country) {
    console.log(`${this.name} lives in ${city}, ${country}`);
}

greet.apply(user, ["Ahmedabad", "India"]);
```

Output:

```text
Riyaz lives in Ahmedabad, India
```

### 19.3 bind()

The `bind()` method creates a new function with a specified `this` value and optionally some preset arguments.

Unlike `call()` and `apply()`, it does not immediately execute the function.

Example:

```javascript
const user = {
    name: "Riyaz"
};

function greet(city) {
    console.log(`Hello ${this.name} from ${city}`);
}

const newFunction = greet.bind(user, "Ahmedabad");

newFunction();
```

Output:

```text
Hello Riyaz from Ahmedabad
```

### call vs apply vs bind

| Method | Arguments | Execution |
|---|---|---|
| call() | Individual arguments | Immediately |
| apply() | Array or array-like arguments | Immediately |
| bind() | Individual arguments | Returns a new function |

**Important:** These methods do not provide the same `this` control for arrow functions because arrow functions inherit `this` lexically.

---

# 20. Function Composition

### What is Function Composition?

Function composition is a programming technique in which the output of one function becomes the input of another function.

It allows developers to combine small functions into a larger operation.

### Example

```javascript
function double(number) {
    return number * 2;
}

function addTen(number) {
    return number + 10;
}

let result = addTen(double(5));

console.log(result);
```

Output:

```text
20
```

Execution:

```text
5
 |
double()
 |
10
 |
addTen()
 |
20
```

### Creating a Composition Function

```javascript
const compose = (f, g) => {
    return (value) => f(g(value));
};

const double = number => number * 2;

const addTen = number => number + 10;

const result = compose(addTen, double);

console.log(result(5));
```

Output:

```text
20
```

Execution order:

1. `double(5)` returns `10`.
2. `addTen(10)` returns `20`.

**Real-world usage:**
- Functional programming.
- Data transformation.
- Middleware pipelines.
- Reusable business logic.

---

# Phase 3 – Important Interview Questions

| No. | Interview Question |
|---|---|
| 1 | What is a function in JavaScript? |
| 2 | What is the difference between function declaration and expression? |
| 3 | What is the difference between parameters and arguments? |
| 4 | What is the difference between console.log() and return? |
| 5 | What happens when a function does not return anything? |
| 6 | What are default parameters? |
| 7 | What are arrow functions? |
| 8 | What is the difference between arrow and normal functions? |
| 9 | What is an anonymous function? |
| 10 | What is a callback function? |
| 11 | What is callback hell? |
| 12 | What is a higher-order function? |
| 13 | What are first-class functions? |
| 14 | What is an IIFE? |
| 15 | What are rest parameters? |
| 16 | What is spread syntax? |
| 17 | What is the difference between rest and spread? |
| 18 | What is recursion? |
| 19 | What is the difference between pure and impure functions? |
| 20 | What is function scope? |
| 21 | What is function hoisting? |
| 22 | What is the difference between call(), apply(), and bind()? |
| 23 | What is function composition? |
| 24 | Can an arrow function be used as a constructor? |
| 25 | Can a function return another function? |

---

# Phase 3 – Practical Exercises

Practice these problems after studying the concepts.

### Beginner Level

| No. | Exercise |
|---|---|
| 1 | Create a function to add two numbers. |
| 2 | Create a function to find the square of a number. |
| 3 | Create a function to check whether a number is even or odd. |
| 4 | Create a function to find the maximum of two numbers. |
| 5 | Create a function to convert Celsius to Fahrenheit. |
| 6 | Create a function to calculate the factorial of a number. |
| 7 | Create a function to reverse a string. |

### Intermediate Level

| No. | Exercise |
|---|---|
| 8 | Create a calculator using callback functions. |
| 9 | Create a function that accepts any number of arguments and returns their sum. |
| 10 | Create a function that returns another function. |
| 11 | Implement a recursive Fibonacci function. |
| 12 | Create a function to check whether a string is a palindrome. |
| 13 | Create a function to calculate the average of multiple numbers. |
| 14 | Create a function to remove duplicate values from an array. |
| 15 | Create a function to sort an array of numbers. |

### Advanced Level

| No. | Exercise |
|---|---|
| 16 | Implement your own map() function. |
| 17 | Implement your own filter() function. |
| 18 | Implement your own reduce() function. |
| 19 | Create a custom debounce function. |
| 20 | Create a custom throttle function. |
| 21 | Create a memoization function. |
| 22 | Create a function composition utility. |
| 23 | Implement a custom bind() method. |
| 24 | Create a function that supports currying. |
| 25 | Create a custom event emitter. |

---

# Phase 3 – Quick Revision

| Concept | Key Point |
|---|---|
| Function Declaration | Defines a named function. |
| Function Expression | Assigns a function to a variable. |
| Parameters | Variables defined in function definitions. |
| Arguments | Actual values passed during function calls. |
| Return | Returns a value and terminates function execution. |
| Default Parameters | Provides default values for missing or undefined arguments. |
| Arrow Function | Shorter function expression syntax. |
| Anonymous Function | Function without an explicit name. |
| Callback | Function passed as an argument. |
| Higher-Order Function | Accepts or returns another function. |
| First-Class Function | Functions are treated as values. |
| IIFE | Function expression executed immediately. |
| Rest | Collects multiple arguments into an array. |
| Spread | Expands iterable values or object properties. |
| Recursion | Function calls itself. |
| Pure Function | Same input, same output, no side effects. |
| Function Scope | Variables accessible within their function scope. |
| Hoisting | Function declarations are initialized before execution. |
| call() | Invokes a function with specified `this`. |
| apply() | Invokes a function with arguments as an array-like object. |
| bind() | Returns a new function with bound `this`. |
| Composition | Combines functions by passing outputs between them. |

---

# Recommended Documentation

1. [MDN – Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions?utm_source=chatgpt.com)
2. [JavaScript.info – Functions](https://javascript.info/function-basics?utm_source=chatgpt.com)
3. [JavaScript.info – Arrow Functions](https://javascript.info/arrow-functions-basics?utm_source=chatgpt.com)
4. [MDN – Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind?utm_source=chatgpt.com)

---

# JavaScript Learning Progress

| Phase | Topic | Status |
|---|---|---|
| Phase 1 | JavaScript Fundamentals | Completed |
| Phase 2 | Control Flow & Loops | Completed |
| Phase 3 | Functions | Completed |
| Phase 4 | Arrays & Objects | Upcoming |
| Phase 5 | JavaScript Core Concepts | Pending |
| Phase 6 | DOM & Browser APIs | Pending |
| Phase 7 | Asynchronous JavaScript | Pending |
| Phase 8 | Modern JavaScript | Pending |
| Phase 9 | Advanced JavaScript | Pending |
| Phase 10 | Professional Development | Pending |

**Next Phase: Arrays & Objects**

Phase 4 will cover array methods, object manipulation, destructuring, nested structures, shallow vs deep copying, optional chaining, property descriptors, and practical data manipulation techniques.