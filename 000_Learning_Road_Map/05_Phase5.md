# JavaScript – Phase 5: JavaScript Core Concepts

This is one of the most important phases in the entire JavaScript roadmap.

In previous phases, we learned JavaScript syntax, functions, arrays, and objects. Now we will understand **how JavaScript actually works internally**.

These concepts are particularly important for:
- JavaScript technical interviews.
- React and Next.js development.
- Node.js backend development.
- Debugging complex applications.
- Understanding asynchronous JavaScript.
- Writing efficient and maintainable code.

# Topics Covered

| No. | Topic | Description |
|---|---|---|
| 1 | JavaScript Engine | How JavaScript code executes |
| 2 | Execution Context | Environment in which code executes |
| 3 | Global Execution Context | Global code execution |
| 4 | Function Execution Context | Function execution |
| 5 | Call Stack | Managing function execution |
| 6 | Hoisting | Declaration processing |
| 7 | Scope | Variable accessibility |
| 8 | Scope Chain | Resolving variable references |
| 9 | Lexical Scope | Scope determined by code structure |
| 10 | Lexical Environment | Internal environment for identifiers |
| 11 | Closures | Functions retaining access to outer variables |
| 12 | this Keyword | Understanding execution context |
| 13 | call(), apply(), bind() | Explicit this binding |
| 14 | Prototype | JavaScript inheritance mechanism |
| 15 | Prototype Chain | Property lookup mechanism |
| 16 | Prototypal Inheritance | Inheriting object properties |
| 17 | Constructor Functions | Creating objects |
| 18 | Classes | ES6 class syntax |
| 19 | Inheritance | extends and super |
| 20 | Encapsulation | Data hiding and protection |
| 21 | Pass by Value | Understanding value passing |
| 22 | Object References | Understanding reference sharing |
| 23 | Shallow Copy | Copying top-level properties |
| 24 | Deep Copy | Copying nested structures |
| 25 | Garbage Collection | Automatic memory management |
| 26 | Memory Management | Stack and heap concepts |
| 27 | Equality Comparison | ==, === and Object.is() |
| 28 | NaN | Understanding Not-a-Number |

---

# 1. JavaScript Engine

### What is a JavaScript Engine?

A JavaScript engine is a program that reads, processes, and executes JavaScript code.

It converts JavaScript source code into instructions that the computer can execute.

JavaScript engines are commonly embedded inside browsers and other runtime environments.

### Popular JavaScript Engines

| Engine | Used In |
|---|---|
| V8 | Google Chrome, Node.js, Microsoft Edge |
| SpiderMonkey | Mozilla Firefox |
| JavaScriptCore | Safari |
| Hermes | React Native |

### How Does a JavaScript Engine Work?

A simplified JavaScript engine execution process:

```text
JavaScript Source Code
         |
         v
      Parsing
         |
         v
   Abstract Syntax Tree
         |
         v
   Bytecode Generation
         |
         v
   Interpreter Execution
         |
         v
   JIT Compilation
         |
         v
 Optimized Machine Code
```

### Important Components

**1. Parser**

The parser checks JavaScript syntax and converts the source code into an Abstract Syntax Tree (AST).

**2. Abstract Syntax Tree (AST)**

AST is a tree representation of the structure of the JavaScript source code.

**3. Interpreter**

An interpreter executes bytecode.

In V8, Ignition is the interpreter.

**4. JIT Compiler**

JIT stands for Just-In-Time Compiler.

It optimizes frequently executed code by compiling it into machine code.

In V8, TurboFan is an optimizing compiler.

**5. Garbage Collector**

It automatically identifies and reclaims memory that is no longer reachable.

### Important Note

JavaScript is often described as an interpreted language, but modern JavaScript engines use a combination of interpretation and compilation techniques.

---

# 2. Execution Context

### What is Execution Context?

An Execution Context is the internal environment in which JavaScript code is evaluated and executed.

It contains the information required to execute code, such as:
- Variables.
- Functions.
- Scope information.
- The value of `this`.
- Other execution-related state.

Whenever JavaScript code runs, it executes inside an execution context.

### Types of Execution Context

JavaScript commonly involves three categories:

| Type | Description |
|---|---|
| Global Execution Context | Created when the JavaScript script starts executing. |
| Function Execution Context | Created whenever a function is invoked. |
| Eval Execution Context | Associated with code executed using eval(). |

### 2.1 Global Execution Context (GEC)

The Global Execution Context is created when JavaScript starts executing a script.

Example:

```javascript
var name = "Riyaz";

let age = 25;

function greet() {
    console.log("Hello");
}

console.log(name);
console.log(age);
```

When this script executes, JavaScript creates a Global Execution Context.

It includes:
- Global environment information.
- Global declarations.
- Global `this` binding.

**Important:** Top-level `let` and `const` declarations are stored in the global lexical environment, not as properties of the global object.

### 2.2 Function Execution Context (FEC)

A new Function Execution Context is created whenever a function is called.

Example:

```javascript
let name = "Riyaz";

function greet() {
    let message = "Hello " + name;

    console.log(message);
}

greet();
```

Execution flow:

```text
Global Execution Context
          |
          | greet()
          v
Function Execution Context
          |
          | Execute function
          v
Print "Hello Riyaz"
          |
          v
Function Execution Context Removed
```

Each function invocation gets its own execution context.

### 2.3 Creation Phase and Execution Phase

JavaScript execution contexts are prepared and then executed.

A simplified explanation divides this process into two phases.

**Creation Phase**

During this phase:
- The execution environment is prepared.
- Variable and function bindings are established.
- Scope relationships are established.
- The `this` binding is determined.

**Execution Phase**

During this phase:
- JavaScript executes statements.
- Values are assigned.
- Expressions are evaluated.
- Functions are called.

Example:

```javascript
console.log(name);

var name = "Riyaz";

console.log(name);
```

Output:

```text
undefined
Riyaz
```

During the creation phase, the `var` binding is initialized with `undefined`.

During the execution phase, it is assigned `"Riyaz"`.

---

# 3. Call Stack

### What is Call Stack?

The Call Stack is a data structure used by JavaScript to keep track of function execution.

It follows the **LIFO (Last In, First Out)** principle.

This means the last function added to the stack is the first one to finish and be removed.

### Example

```javascript
function first() {
    console.log("First");

    second();
}

function second() {
    console.log("Second");

    third();
}

function third() {
    console.log("Third");
}

first();
```

Output:

```text
First
Second
Third
```

### Call Stack Execution

Initially:

```text
|             |
|             |
|             |
|_____________|
```

When `first()` is called:

```text
|             |
|             |
|  first()    |
|_____________|
```

When `second()` is called:

```text
|             |
|  second()   |
|  first()    |
|_____________|
```

When `third()` is called:

```text
|  third()    |
|  second()   |
|  first()    |
|_____________|
```

After `third()` completes:

```text
|             |
|  second()   |
|  first()    |
|_____________|
```

After `second()` completes:

```text
|             |
|             |
|  first()    |
|_____________|
```

After `first()` completes, the stack becomes empty.

### Stack Overflow

A stack overflow occurs when the call stack exceeds its available capacity.

Example:

```javascript
function greet() {
    greet();
}

greet();
```

This function calls itself indefinitely without a base condition.

Eventually, JavaScript throws:

```text
RangeError: Maximum call stack size exceeded
```

**Important:** The Call Stack and Execution Context are closely related but not identical.

- Execution Context represents the environment in which code executes.
- Call Stack tracks active execution contexts.

---

# 4. Hoisting

### What is Hoisting?

Hoisting is JavaScript's behaviour of processing declarations before executing the code in their scope.

It does not mean JavaScript physically moves declarations to the top of the source code.

### 4.1 Hoisting with var

```javascript
console.log(name);

var name = "Riyaz";

console.log(name);
```

Output:

```text
undefined
Riyaz
```

Conceptually, the code behaves like:

```javascript
var name;

console.log(name);

name = "Riyaz";

console.log(name);
```

### 4.2 Hoisting with let and const

```javascript
console.log(age);

let age = 25;
```

Output:

```text
ReferenceError
```

`let` and `const` declarations are hoisted, but they remain uninitialized until their declaration is evaluated.

The period between entering their scope and initialization is called the **Temporal Dead Zone (TDZ)**.

### 4.3 Function Declaration Hoisting

```javascript
greet();

function greet() {
    console.log("Hello Riyaz");
}
```

Output:

```text
Hello Riyaz
```

Function declarations are initialized with their function definitions during environment setup.

### 4.4 Function Expression Hoisting

```javascript
greet();

var greet = function () {
    console.log("Hello");
};
```

Output:

```text
TypeError: greet is not a function
```

Why?

Because `var greet` is initialized with `undefined`.

JavaScript effectively sees:

```javascript
var greet;

greet();

greet = function () {
    console.log("Hello");
};
```

Calling `undefined` as a function causes a TypeError.

### Hoisting Comparison

| Declaration | Hoisted | Initial State |
|---|---|---|
| var | Yes | undefined |
| let | Yes | Uninitialized |
| const | Yes | Uninitialized |
| Function Declaration | Yes | Function definition available |
| Function Expression with var | Variable is hoisted | undefined |
| Arrow Function with const | Variable is hoisted | Uninitialized |

---

# 5. Scope

### What is Scope?

Scope determines where variables and functions can be accessed in a JavaScript program.

In other words, scope defines the accessibility of identifiers.

### Types of Scope

| Scope | Description |
|---|---|
| Global Scope | Accessible throughout the relevant global script environment. |
| Function Scope | Accessible within the function in which it is declared. |
| Block Scope | Accessible within the block in which it is declared. |
| Module Scope | Accessible within the module where it is declared, unless exported. |

### 5.1 Global Scope

A variable declared outside functions and blocks can be accessible throughout its relevant scope.

```javascript
let name = "Riyaz";

function greet() {
    console.log(name);
}

greet();

console.log(name);
```

### 5.2 Function Scope

Variables declared inside a function are accessible within that function and its nested scopes.

```javascript
function greet() {
    let message = "Hello";

    console.log(message);
}

greet();

console.log(message); // ReferenceError
```

### 5.3 Block Scope

A block is a section of code enclosed within `{}`.

Variables declared with `let` and `const` are block-scoped.

```javascript
if (true) {
    let age = 25;
    const name = "Riyaz";
}

console.log(age);  // ReferenceError
console.log(name); // ReferenceError
```

### var vs let vs const Scope

```javascript
if (true) {
    var a = 10;
    let b = 20;
    const c = 30;
}

console.log(a); // 10
console.log(b); // ReferenceError
console.log(c); // ReferenceError
```

### 5.4 Module Scope

Variables declared at the top level of an ES module belong to that module's scope.

They are not automatically added to the global object.

Example:

```javascript
// user.js

const username = "Riyaz";

export default username;
```

Another file can import the exported value:

```javascript
// app.js

import username from "./user.js";

console.log(username);
```

---

# 6. Scope Chain

### What is Scope Chain?

The Scope Chain is the mechanism JavaScript uses to resolve variable references by searching the current lexical environment and then its outer environments.

If a variable is not found in the current scope, JavaScript searches the outer scope.

It continues searching until the variable is found or the outermost environment is reached.

### Example

```javascript
let globalName = "Riyaz";

function outer() {

    let outerName = "Ahmed";

    function inner() {

        let innerName = "Ali";

        console.log(innerName);
        console.log(outerName);
        console.log(globalName);

    }

    inner();
}

outer();
```

Output:

```text
Ali
Ahmed
Riyaz
```

### Scope Chain Diagram

```text
Global Scope
    |
    | globalName
    |
    v
Outer Function Scope
    |
    | outerName
    |
    v
Inner Function Scope
    |
    | innerName
    |
    v
```

When `inner()` tries to access `globalName`, JavaScript:

1. Checks inner function scope.
2. Checks outer function scope.
3. Checks global scope.
4. Finds the variable.

### Important Rule: Scope Is Lexical

JavaScript determines scope based on where a function is defined, not where it is called.

Example:

```javascript
let name = "Global";

function outer() {
    let name = "Outer";

    function inner() {
        console.log(name);
    }

    return inner;
}

const result = outer();

result();
```

Output:

```text
Outer
```

Even though `inner()` executes after `outer()` has completed, it still accesses the outer variable.

This behaviour leads us to closures.

---

# 7. Lexical Scope

### What is Lexical Scope?

Lexical scope means that variable accessibility is determined by the physical location of code in the source program.

A function can access variables from the scope in which it was defined.

### Example

```javascript
let name = "Global";

function outer() {

    let name = "Outer";

    function inner() {
        console.log(name);
    }

    inner();
}

outer();
```

Output:

```text
Outer
```

The `inner()` function was defined inside `outer()`, so it can access the variables declared in `outer()`.

### Lexical Scope vs Dynamic Scope

| Lexical Scope | Dynamic Scope |
|---|---|
| Scope depends on where a function is defined. | Scope depends on the calling environment. |
| Used by JavaScript. | Not used by standard JavaScript variable resolution. |
| Determined by source-code structure. | Determined by the call sequence. |

**Important:** JavaScript uses lexical scoping, not dynamic scoping.

---

# 8. Lexical Environment

### What is a Lexical Environment?

A Lexical Environment is an internal specification mechanism that associates identifiers with their values and maintains a reference to an outer lexical environment.

It helps JavaScript resolve variable references.

A simplified lexical environment contains:

1. Environment Record.
2. Reference to the outer Lexical Environment.

### Example

```javascript
let name = "Riyaz";

function greet() {

    let message = "Hello";

    console.log(message);
    console.log(name);

}

greet();
```

Conceptually:

```text
Global Lexical Environment
|
|-- name: "Riyaz"
|
|-- greet: Function
       |
       |
       Function Lexical Environment
       |
       |-- message: "Hello"
       |
       |-- Outer Reference
               |
               v
       Global Lexical Environment
```

When `greet()` accesses `name`, JavaScript cannot find it in the function's local environment, so it searches the outer environment.

### Lexical Environment vs Scope Chain

| Lexical Environment | Scope Chain |
|---|---|
| Internal environment containing identifier bindings. | The chain of environments used for identifier resolution. |
| Contains an outer environment reference. | Represents the lookup path through those environments. |
| Created as part of execution and environment management. | Used when resolving identifiers. |

---

# 9. Closures

### What is a Closure?

A closure is created when a function retains access to variables from its lexical environment, even after the outer function has finished executing.

Closures allow inner functions to remember and access variables from their surrounding scope.

### Example

```javascript
function outer() {

    let count = 0;

    function inner() {
        count++;

        console.log(count);
    }

    return inner;
}

const counter = outer();

counter();
counter();
counter();
```

Output:

```text
1
2
3
```

### How Does It Work?

1. `outer()` is called.
2. A local variable `count` is created.
3. `inner()` is defined inside `outer()`.
4. `outer()` returns `inner`.
5. The returned function is stored in `counter`.
6. `outer()` finishes execution.
7. `counter()` still has access to `count`.

This happens because the returned function retains access to its lexical environment.

### Practical Use Cases of Closures

**1. Data Privacy**

```javascript
function createBankAccount(initialBalance) {

    let balance = initialBalance;

    return {
        deposit(amount) {
            balance += amount;
        },

        getBalance() {
            return balance;
        }
    };
}

const account = createBankAccount(1000);

account.deposit(500);

console.log(account.getBalance()); // 1500

console.log(account.balance); // undefined
```

The `balance` variable cannot be directly accessed through the returned object.

**2. Function Factory**

```javascript
function multiplier(factor) {

    return function (number) {
        return number * factor;
    };

}

const double = multiplier(2);

const triple = multiplier(3);

console.log(double(5)); // 10

console.log(triple(5)); // 15
```

**3. Maintaining State**

```javascript
function createCounter() {

    let count = 0;

    return function () {
        return ++count;
    };

}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
```

### Closure with setTimeout()

```javascript
function greet(name) {

    setTimeout(() => {
        console.log(`Hello ${name}`);
    }, 2000);

}

greet("Riyaz");
```

The callback retains access to the `name` parameter even though `greet()` has already returned.

### Important Points

- Closures preserve access to lexical environments.
- Closures are useful for data privacy.
- Closures help maintain state.
- Closures are commonly used in callbacks.
- Closures are extensively used in React hooks and JavaScript libraries.

---

# 10. this Keyword

### What is this?

The `this` keyword refers to a value determined by how a function is invoked.

In JavaScript, the value of `this` depends on the function's calling context, except for arrow functions, which inherit it lexically.

### 10.1 Global Context

In a classic browser script:

```javascript
console.log(this);
```

At the top level, `this` refers to the global `window` object.

In Node.js CommonJS modules, top-level `this` refers to `module.exports`, not the global object.

### 10.2 Object Method

When a function is called as a method of an object, `this` generally refers to the object before the dot.

```javascript
const user = {
    name: "Riyaz",

    greet() {
        console.log(this.name);
    }
};

user.greet();
```

Output:

```text
Riyaz
```

### 10.3 Regular Function

In a regular function, `this` depends on how the function is called.

```javascript
function greet() {
    console.log(this);
}

greet();
```

In a non-strict classic browser script, `this` generally refers to `window`.

In strict mode, `this` is `undefined` for a plain function call.

### 10.4 Arrow Function

Arrow functions do not have their own `this`.

They inherit `this` from their surrounding lexical environment.

Example:

```javascript
const user = {
    name: "Riyaz",

    greet: () => {
        console.log(this.name);
    }
};

user.greet();
```

This does not refer to the `user` object.

The arrow function inherits `this` from its surrounding scope.

### 10.5 this Inside Nested Functions

```javascript
const user = {
    name: "Riyaz",

    greet() {

        console.log(this.name);

        function inner() {
            console.log(this);
        }

        inner();

    }
};

user.greet();
```

The first `this` refers to `user`.

The second `this` depends on the plain function call. In strict mode, it is `undefined`.

A common solution is to use an arrow function:

```javascript
const user = {
    name: "Riyaz",

    greet() {

        const inner = () => {
            console.log(this.name);
        };

        inner();

    }
};

user.greet();
```

Output:

```text
Riyaz
```

### 10.6 this in Classes

```javascript
class User {

    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(this.name);
    }

}

const user = new User("Riyaz");

user.greet();
```

Output:

```text
Riyaz
```

### this Binding Summary

| Situation | Value of this |
|---|---|
| Global classic browser script | window |
| Object method call | Object before the dot |
| Regular function in strict mode | undefined |
| Regular function in non-strict browser script | window |
| Arrow function | Inherited lexical this |
| Constructor called with new | Newly created instance |
| call(), apply(), bind() | Explicitly supplied this for regular functions |

---

# 11. call(), apply(), bind()

These methods belong to `Function.prototype`.

They allow regular functions to be invoked with a specific `this` value.

### 11.1 call()

Invokes a function immediately with a specified `this` value and individual arguments.

```javascript
const user = {
    name: "Riyaz"
};

function greet(city, country) {
    console.log(`${this.name} lives in ${city}, ${country}`);
}

greet.call(user, "Ahmedabad", "India");
```

Output:

```text
Riyaz lives in Ahmedabad, India
```

### 11.2 apply()

Similar to `call()`, but accepts arguments as an array or array-like object.

```javascript
greet.apply(user, ["Ahmedabad", "India"]);
```

### 11.3 bind()

Returns a new function with a specified `this` value and optionally preset arguments.

```javascript
const newGreet = greet.bind(user, "Ahmedabad", "India");

newGreet();
```

### Comparison

| call() | apply() | bind() |
|---|---|---|
| Individual arguments | Array or array-like arguments | Individual arguments |
| Executes immediately | Executes immediately | Returns a new function |
| Sets this for invocation | Sets this for invocation | Sets this for future invocation |

**Important:** Arrow functions do not have their own `this`, so these methods cannot change their lexical `this`.

---

# 12. Prototype

### What is a Prototype?

A prototype is an object from which another object can inherit properties and methods.

JavaScript uses prototype-based inheritance.

Almost all ordinary objects have an internal `[[Prototype]]` reference.

### Example

```javascript
const user = {
    name: "Riyaz",

    greet() {
        console.log("Hello");
    }
};

console.log(user.name);

user.greet();
```

The `name` property and `greet()` method are directly defined on the object.

But JavaScript objects can also access inherited properties and methods.

Example:

```javascript
const numbers = [10, 20, 30];

console.log(numbers.length);

console.log(numbers.map(number => number * 2));
```

The `map()` method is not individually created on this array. It is inherited through `Array.prototype`.

### Understanding Prototype

```javascript
const user = {
    name: "Riyaz"
};

console.log(Object.getPrototypeOf(user));
```

For an ordinary object literal, its prototype is generally `Object.prototype`.

### Prototype Property vs [[Prototype]]

These are not the same thing.

| prototype | [[Prototype]] |
|---|---|
| An ordinary property on certain functions. | Internal object reference. |
| Used when a function is called with `new` to establish the new object's prototype. | Represents an object's actual prototype. |
| Available on constructor functions. | Available on objects internally. |

Example:

```javascript
function User(name) {
    this.name = name;
}

const user = new User("Riyaz");

console.log(User.prototype);

console.log(Object.getPrototypeOf(user) === User.prototype);
// true
```

---

# 13. Prototype Chain

### What is Prototype Chain?

The prototype chain is the sequence of objects JavaScript searches when trying to access a property or method.

If the property is not found on the current object, JavaScript searches its prototype.

This continues until the property is found or the chain reaches `null`.

### Example

```javascript
const animal = {
    eat() {
        console.log("Eating");
    }
};

const dog = {
    bark() {
        console.log("Barking");
    }
};

Object.setPrototypeOf(dog, animal);

dog.bark();

dog.eat();
```

Output:

```text
Barking
Eating
```

`dog` does not directly contain `eat()`.

JavaScript finds it in the prototype object `animal`.

### Prototype Chain Diagram

```text
dog
 |
 | Own Properties
 | bark()
 |
 v
animal
 |
 | Own Properties
 | eat()
 |
 v
Object.prototype
 |
 | toString()
 | hasOwnProperty()
 |
 v
null
```

### Important Methods

```javascript
Object.getPrototypeOf(object);
```

Returns an object's prototype.

```javascript
Object.setPrototypeOf(object, prototype);
```

Sets an object's prototype.

```javascript
Object.hasOwn(object, property);
```

Checks whether a property belongs directly to an object.

**Best Practice:** Avoid frequently changing prototypes of existing objects because it can negatively affect performance. Prefer defining the correct prototype during object creation.

---

# 14. Prototypal Inheritance

### What is Prototypal Inheritance?

Prototypal inheritance is a mechanism in which one object inherits properties and methods from another object through the prototype chain.

### Example

```javascript
const person = {
    greet() {
        console.log("Hello");
    }
};

const employee = {
    work() {
        console.log("Working");
    }
};

Object.setPrototypeOf(employee, person);

employee.greet();

employee.work();
```

Output:

```text
Hello
Working
```

The `employee` object inherits the `greet()` method from `person`.

### Why Do We Need Inheritance?

- Code reuse.
- Shared behaviour.
- Reduced duplication.
- Better object organization.
- Easier maintenance.

### Important

JavaScript inheritance is prototype-based internally.

Even when using ES6 classes, JavaScript uses prototypes for method inheritance.

---

# 15. Constructor Functions

### What is a Constructor Function?

A constructor function is a regular function designed to create and initialize objects when called with the `new` operator.

By convention, constructor function names begin with a capital letter.

### Example

```javascript
function User(name, age) {
    this.name = name;
    this.age = age;
}

const user1 = new User("Riyaz", 25);

const user2 = new User("Ahmed", 22);

console.log(user1);

console.log(user2);
```

### What Does the new Operator Do?

When `new User()` is executed, JavaScript approximately performs these steps:

1. Creates a new empty object.
2. Sets the new object's prototype to `User.prototype`.
3. Executes the constructor with `this` referring to the new object.
4. Returns the new object, unless the constructor explicitly returns another object.

### Example with Prototype Methods

```javascript
function User(name) {
    this.name = name;
}

User.prototype.greet = function () {
    console.log(`Hello ${this.name}`);
};

const user1 = new User("Riyaz");

const user2 = new User("Ahmed");

user1.greet();

user2.greet();
```

Output:

```text
Hello Riyaz
Hello Ahmed
```

Both objects share the same `greet()` method through their prototype.

This is more memory-efficient than creating a separate method inside every instance.

---

# 16. Classes in JavaScript

### What are Classes?

Classes were introduced in ES6 as a cleaner syntax for creating objects and implementing inheritance.

JavaScript classes are built on top of the prototype-based inheritance system.

### Syntax

```javascript
class ClassName {

    constructor(parameters) {
        // Initialize properties
    }

    methodName() {
        // Method
    }

}
```

### Example

```javascript
class User {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }

}

const user1 = new User("Riyaz", 25);

user1.greet();
```

Output:

```text
Hello Riyaz
```

### What is a Constructor?

A constructor is a special method used to initialize class instances.

It is automatically called when an object is created using `new`.

```javascript
class User {

    constructor(name) {
        this.name = name;
    }

}
```

### What are Instance Methods?

Methods defined inside a class body are generally placed on the class prototype.

```javascript
class Calculator {

    add(a, b) {
        return a + b;
    }

}

const calc = new Calculator();

console.log(calc.add(10, 20));
```

### What are Static Methods?

Static methods belong to the class itself rather than its instances.

```javascript
class Calculator {

    static add(a, b) {
        return a + b;
    }

}

console.log(Calculator.add(10, 20));
```

Output:

```text
30
```

You cannot call this method directly on an instance:

```javascript
const calc = new Calculator();

calc.add(10, 20); // TypeError
```

---

# 17. Inheritance in Classes

### What is Inheritance?

Inheritance allows one class to acquire properties and methods from another class.

JavaScript uses the `extends` keyword to implement class inheritance.

### Example

```javascript
class Animal {

    constructor(name) {
        this.name = name;
    }

    eat() {
        console.log(`${this.name} is eating`);
    }

}

class Dog extends Animal {

    bark() {
        console.log(`${this.name} is barking`);
    }

}

const dog = new Dog("Tommy");

dog.eat();

dog.bark();
```

Output:

```text
Tommy is eating
Tommy is barking
```

### What is super?

The `super` keyword is used to access parent class functionality.

It is commonly used to call the parent constructor or parent methods.

Example:

```javascript
class Animal {

    constructor(name) {
        this.name = name;
    }

}

class Dog extends Animal {

    constructor(name, breed) {

        super(name);

        this.breed = breed;

    }

}

const dog = new Dog("Tommy", "German Shepherd");

console.log(dog);
```

### Important Rules

- `extends` establishes inheritance.
- `super()` calls the parent constructor.
- In a derived constructor, `super()` must be called before accessing `this`.
- A class can override inherited methods.
- JavaScript classes support single class inheritance, but multiple interfaces or behaviours can be composed using other techniques.

---

# 18. Encapsulation

### What is Encapsulation?

Encapsulation is an object-oriented programming principle that combines data and related methods while controlling direct access to internal state.

JavaScript supports encapsulation through closures, private class fields and methods, and controlled accessors.

### Example Using Private Fields

Private fields were introduced in modern JavaScript using the `#` syntax.

```javascript
class BankAccount {

    #balance = 0;

    deposit(amount) {

        if (amount > 0) {
            this.#balance += amount;
        }

    }

    getBalance() {
        return this.#balance;
    }

}

const account = new BankAccount();

account.deposit(1000);

console.log(account.getBalance());
```

Output:

```text
1000
```

Trying to access the private field externally:

```javascript
console.log(account.#balance);
```

This produces a SyntaxError.

### Benefits of Encapsulation

- Protects internal data.
- Controls how data is modified.
- Reduces accidental changes.
- Improves code maintainability.
- Supports abstraction.

### Getter and Setter

Getters and setters provide controlled property access.

```javascript
class User {

    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(value) {

        if (value.length < 3) {
            throw new Error("Name is too short");
        }

        this._name = value;
    }

}

const user = new User("Riyaz");

console.log(user.name);

user.name = "Ahmed";
```

Note: `_name` is only a naming convention. It is not truly private. Use `#name` when actual private-field access control is required.

---

# 19. Pass by Value

### What is Pass by Value?

JavaScript uses pass-by-value semantics when passing arguments to functions.

A function receives a value derived from the argument expression.

For objects, the copied value is an object reference.

### Example with Primitive Values

```javascript
let number = 10;

function update(value) {
    value = 50;
}

update(number);

console.log(number);
```

Output:

```text
10
```

Why?

The function receives a copy of the primitive value.

Changing the local parameter does not change the original variable.

### Example with Objects

```javascript
const user = {
    name: "Riyaz"
};

function update(obj) {
    obj.name = "Ahmed";
}

update(user);

console.log(user.name);
```

Output:

```text
Ahmed
```

Why?

The parameter receives a copy of the object reference.

Both the original variable and the parameter refer to the same object.

### Important: Reassigning an Object Parameter

```javascript
const user = {
    name: "Riyaz"
};

function update(obj) {
    obj = {
        name: "Ahmed"
    };
}

update(user);

console.log(user.name);
```

Output:

```text
Riyaz
```

Reassigning the local parameter does not change the original variable's reference.

### Summary

| Primitive Argument | Object Argument |
|---|---|
| Function receives a copy of the primitive value. | Function receives a copy of the object reference. |
| Local reassignment does not affect the original variable. | Property modifications can affect the shared object. |
| Original primitive remains unchanged. | Original object can be modified through the reference. |

**Important:** JavaScript is not pass-by-reference. It is pass-by-value, including when the value being copied is an object reference.

---

# 20. Object References

### What is an Object Reference?

When an object is assigned to a variable, the variable stores a reference to that object rather than containing an independent copy of the object.

### Example

```javascript
const user1 = {
    name: "Riyaz"
};

const user2 = user1;

user2.name = "Ahmed";

console.log(user1.name);
```

Output:

```text
Ahmed
```

Both variables refer to the same object.

### Reference Equality

```javascript
const obj1 = {
    name: "Riyaz"
};

const obj2 = {
    name: "Riyaz"
};

console.log(obj1 === obj2);
```

Output:

```text
false
```

Although the objects have identical properties, they are two different objects.

But:

```javascript
const obj1 = {
    name: "Riyaz"
};

const obj2 = obj1;

console.log(obj1 === obj2);
```

Output:

```text
true
```

Both variables refer to the same object.

---

# 21. Shallow Copy

### What is Shallow Copy?

A shallow copy creates a new outer object or array but retains references to nested objects.

Example:

```javascript
const original = {
    name: "Riyaz",

    address: {
        city: "Ahmedabad"
    }
};

const copy = { ...original };

copy.name = "Ahmed";

copy.address.city = "Mumbai";

console.log(original);
```

Output:

```javascript
{
    name: "Riyaz",
    address: {
        city: "Mumbai"
    }
}
```

The nested `address` object is shared.

### Common Shallow Copy Methods

Arrays:

```javascript
const copy = [...originalArray];

const copy2 = originalArray.slice();
```

Objects:

```javascript
const copy = { ...originalObject };

const copy2 = Object.assign({}, originalObject);
```

---

# 22. Deep Copy

### What is Deep Copy?

A deep copy creates a new object or array with independently copied nested objects and arrays.

Example:

```javascript
const original = {
    name: "Riyaz",

    address: {
        city: "Ahmedabad"
    }
};

const copy = structuredClone(original);

copy.address.city = "Mumbai";

console.log(original.address.city);
console.log(copy.address.city);
```

Output:

```text
Ahmedabad
Mumbai
```

### structuredClone()

`structuredClone()` is a built-in JavaScript method for creating deep copies of supported values.

```javascript
const original = {
    name: "Riyaz",
    skills: ["JavaScript", "React"]
};

const copy = structuredClone(original);

copy.skills.push("Node.js");

console.log(original.skills);
console.log(copy.skills);
```

Output:

```text
["JavaScript", "React"]

["JavaScript", "React", "Node.js"]
```

### JSON Deep Copy

```javascript
const copy = JSON.parse(JSON.stringify(original));
```

This method has limitations, especially with functions, undefined values, BigInt, Date objects and circular references.

### Shallow vs Deep Copy

| Shallow Copy | Deep Copy |
|---|---|
| Creates a new outer object. | Creates independent nested structures. |
| Nested references are shared. | Nested references are independent. |
| Generally faster. | Generally more expensive. |
| Spread syntax and Object.assign(). | structuredClone() or suitable deep-copy logic. |

---

# 23. Garbage Collection

### What is Garbage Collection?

Garbage Collection is an automatic memory management process in which JavaScript engines identify and reclaim memory that is no longer reachable by the program.

Developers generally do not need to manually allocate and free memory.

### What is Memory Leak?

A memory leak occurs when memory that is no longer needed remains reachable, preventing the garbage collector from reclaiming it.

### Example

```javascript
let user = {
    name: "Riyaz"
};

user = null;
```

Initially, `user` references an object.

After assigning `null`, the object may become eligible for garbage collection if no other references exist.

### Mark-and-Sweep Algorithm

Modern JavaScript engines commonly use tracing garbage collection techniques.

A simplified explanation:

**1. Mark**

The garbage collector starts from root references and identifies reachable objects.

**2. Sweep**

Objects that are not reachable are considered garbage and their memory can be reclaimed.

### Common Causes of Memory Leaks

1. Unnecessary global variables.
2. Event listeners that are never removed.
3. Unreleased timers.
4. Unnecessary references to large objects.
5. Closures retaining data that is no longer needed.
6. Unbounded caches.

### Example: Event Listener Cleanup

```javascript
function handleClick() {
    console.log("Clicked");
}

const button = document.querySelector("button");

button.addEventListener("click", handleClick);

// Later, when no longer needed:
button.removeEventListener("click", handleClick);
```

Removing unnecessary event listeners helps prevent memory retention.

---

# 24. Memory Management

### What is Memory Management?

Memory management refers to the process of allocating, using, and reclaiming memory required by a program.

JavaScript engines manage memory automatically.

### Main Memory Areas

A simplified model commonly discusses:

**1. Stack**

The call stack tracks active function calls and their execution contexts.

**2. Heap**

The heap is used for dynamically allocated objects and other data structures.

Example:

```javascript
let age = 25;

const user = {
    name: "Riyaz"
};
```

Conceptually:

```text
STACK
----------------
age: 25
user: reference
----------------

HEAP
----------------
{
    name: "Riyaz"
}
----------------
```

This is a simplified conceptual model, not a guaranteed physical memory layout for every JavaScript engine.

### Stack vs Heap

| Stack | Heap |
|---|---|
| Tracks function execution. | Stores dynamically allocated objects and data. |
| Manages active execution contexts. | Manages object memory. |
| Function calls are pushed and popped. | Memory is reclaimed through garbage collection. |
| Has implementation-dependent limits. | Has implementation-dependent limits. |

---

# 25. Equality Comparison

JavaScript provides different ways to compare values.

### 25.1 Loose Equality (==)

The `==` operator compares values after performing type conversion when necessary.

```javascript
console.log(5 == "5"); // true

console.log(0 == false); // true

console.log(null == undefined); // true
```

### 25.2 Strict Equality (===)

The `===` operator compares values without performing type conversion.

```javascript
console.log(5 === "5"); // false

console.log(5 === 5); // true

console.log(0 === false); // false
```

### 25.3 Object.is()

`Object.is()` compares two values using SameValue semantics.

It behaves similarly to strict equality, with two important differences:

- `Object.is(NaN, NaN)` returns `true`.
- `Object.is(+0, -0)` returns `false`.

Example:

```javascript
console.log(Object.is(5, 5));       // true

console.log(Object.is(NaN, NaN));   // true

console.log(Object.is(+0, -0));     // false
```

### Comparison

| Comparison | 5 and "5" | NaN and NaN | +0 and -0 |
|---|---|---|---|
| `==` | true | false | true |
| `===` | false | false | true |
| `Object.is()` | false | true | false |

**Recommendation:** Prefer `===` for normal equality comparisons unless you specifically need another comparison behaviour.

---

# 26. NaN (Not-a-Number)

### What is NaN?

NaN stands for Not-a-Number.

It is a special numeric value that represents an invalid or undefined numerical result.

Interestingly, its JavaScript data type is `number`.

### Example

```javascript
let result = "Hello" / 2;

console.log(result); // NaN

console.log(typeof result); // number
```

### NaN Comparisons

```javascript
console.log(NaN === NaN); // false

console.log(NaN == NaN);  // false
```

NaN is not equal to itself.

### Number.isNaN()

Use `Number.isNaN()` to check whether a value is actually NaN.

```javascript
console.log(Number.isNaN(NaN)); // true

console.log(Number.isNaN("Hello")); // false
```

### isNaN() vs Number.isNaN()

| isNaN() | Number.isNaN() |
|---|---|
| Performs type conversion. | Does not perform type conversion. |
| Can return true for non-numeric strings. | Returns true only for the actual NaN value. |
| More permissive. | More reliable for checking NaN. |

Example:

```javascript
console.log(isNaN("Hello")); // true

console.log(Number.isNaN("Hello")); // false
```

---

# Phase 5 – Important Interview Questions

| No. | Interview Question |
|---|---|
| 1 | What is a JavaScript Engine? |
| 2 | How does the V8 engine execute JavaScript? |
| 3 | What is an Execution Context? |
| 4 | What are the different types of Execution Context? |
| 5 | What happens during the creation and execution phases? |
| 6 | What is the Call Stack? |
| 7 | What is LIFO? |
| 8 | What is Stack Overflow? |
| 9 | What is Hoisting? |
| 10 | What is the Temporal Dead Zone? |
| 11 | What is the difference between var, let and const hoisting? |
| 12 | What is Scope? |
| 13 | What is the difference between function scope and block scope? |
| 14 | What is Scope Chain? |
| 15 | What is Lexical Scope? |
| 16 | What is a Lexical Environment? |
| 17 | What is a Closure? |
| 18 | What are the practical uses of closures? |
| 19 | What is the this keyword? |
| 20 | How does this behave in arrow functions? |
| 21 | What is the difference between call(), apply() and bind()? |
| 22 | What is a Prototype? |
| 23 | What is Prototype Chain? |
| 24 | What is Prototypal Inheritance? |
| 25 | What is the difference between prototype and [[Prototype]]? |
| 26 | What is a Constructor Function? |
| 27 | What happens when we use the new keyword? |
| 28 | What are JavaScript Classes? |
| 29 | What is the difference between classes and constructor functions? |
| 30 | What are static methods? |
| 31 | What are extends and super? |
| 32 | What is Encapsulation? |
| 33 | What are private class fields? |
| 34 | Is JavaScript pass-by-value or pass-by-reference? |
| 35 | What is an Object Reference? |
| 36 | What is the difference between shallow and deep copy? |
| 37 | What is Garbage Collection? |
| 38 | What is a Memory Leak? |
| 39 | What is the difference between Stack and Heap? |
| 40 | What is the difference between == and ===? |
| 41 | What is Object.is()? |
| 42 | What is NaN? |
| 43 | Why is NaN not equal to itself? |
| 44 | What is the difference between isNaN() and Number.isNaN()? |

---

# Phase 5 – Practical Exercises

These exercises will help you understand JavaScript internals through actual code.

### Beginner Level

| No. | Exercise |
|---|---|
| 1 | Demonstrate var, let and const hoisting. |
| 2 | Create examples of global, function and block scope. |
| 3 | Demonstrate the JavaScript call stack. |
| 4 | Create a function that returns another function. |
| 5 | Create a counter using closures. |
| 6 | Create an object with different this behaviours. |
| 7 | Demonstrate call(), apply() and bind(). |

### Intermediate Level

| No. | Exercise |
|---|---|
| 8 | Create a private counter using closures. |
| 9 | Create a bank account using encapsulation. |
| 10 | Create objects using constructor functions. |
| 11 | Add shared methods using prototypes. |
| 12 | Implement prototypal inheritance. |
| 13 | Create a class with constructor and methods. |
| 14 | Implement inheritance using extends and super. |
| 15 | Create a deep copy of a nested object. |
| 16 | Demonstrate pass-by-value behaviour with objects. |

### Advanced Level

| No. | Exercise |
|---|---|
| 17 | Implement a custom bind() method. |
| 18 | Create a custom inheritance mechanism using prototypes. |
| 19 | Implement a private data store using closures. |
| 20 | Create a memoization function using closures. |
| 21 | Create a custom class-based bank account. |
| 22 | Demonstrate and fix a memory leak. |
| 23 | Build a custom object comparison utility. |
| 24 | Create a function that tracks execution count using closures. |

---

# Phase 5 – Quick Revision

| Concept | Key Point |
|---|---|
| JavaScript Engine | Executes JavaScript code. |
| Execution Context | Environment in which JavaScript executes. |
| Global Execution Context | Created for global script execution. |
| Function Execution Context | Created when a function is called. |
| Call Stack | Tracks active function executions. |
| Hoisting | Declarations are processed before execution. |
| TDZ | Period when let/const bindings are uninitialized. |
| Scope | Determines variable accessibility. |
| Scope Chain | Lookup path for resolving identifiers. |
| Lexical Scope | Scope determined by source-code structure. |
| Lexical Environment | Stores identifier bindings and outer references. |
| Closure | Function retains access to its lexical environment. |
| this | Depends on invocation, except lexical arrow-function this. |
| call() | Invokes a function with specified this and individual arguments. |
| apply() | Invokes a function with specified this and array-like arguments. |
| bind() | Returns a new function with bound this. |
| Prototype | Object used for inheritance. |
| Prototype Chain | Mechanism for inherited property lookup. |
| Constructor | Initializes objects created using new. |
| Class | Syntax for creating constructor/prototype-based structures. |
| Inheritance | Reusing properties and methods from parent structures. |
| Encapsulation | Protecting and controlling access to internal data. |
| Pass by Value | Function arguments are passed as values. |
| Object Reference | Value that refers to an object. |
| Shallow Copy | Nested references are shared. |
| Deep Copy | Nested structures are independently copied. |
| Garbage Collection | Reclaims unreachable memory. |
| Memory Leak | Unnecessary objects remain reachable. |
| == | Loose equality with coercion. |
| === | Strict equality without type coercion. |
| Object.is() | SameValue comparison. |
| NaN | Special numeric value representing invalid numerical results. |

---

# Recommended Documentation

1. [MDN – JavaScript Execution Model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model?utm_source=chatgpt.com)
2. [JavaScript.info – Variables and Scope](https://javascript.info/closure?utm_source=chatgpt.com)
3. [JavaScript.info – Closures](https://javascript.info/closure?utm_source=chatgpt.com)
4. [MDN – this Keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this?utm_source=chatgpt.com)
5. [MDN – Inheritance and the Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain?utm_source=chatgpt.com)
6. [MDN – Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management?utm_source=chatgpt.com)

---

# JavaScript Learning Progress

| Phase | Topic | Status |
|---|---|---|
| Phase 1 | JavaScript Fundamentals | Completed |
| Phase 2 | Control Flow & Loops | Completed |
| Phase 3 | Functions | Completed |
| Phase 4 | Arrays & Objects | Completed |
| Phase 5 | JavaScript Core Concepts | Completed |
| Phase 6 | DOM & Browser APIs | Upcoming |
| Phase 7 | Asynchronous JavaScript | Pending |
| Phase 8 | Modern JavaScript | Pending |
| Phase 9 | Advanced JavaScript | Pending |
| Phase 10 | Professional Development | Pending |

**Next: Phase 6 – DOM & Browser APIs**

In Phase 6, we will cover:

1. What is DOM?
2. DOM Tree, Nodes and Elements.
3. Selecting DOM Elements.
4. Traversing DOM.
5. Creating and Removing Elements.
6. Modifying HTML and CSS.
7. Attributes and Properties.
8. JavaScript Events.
9. Event Bubbling and Capturing.
10. Event Delegation.
11. Event Object.
12. Forms and Validation.
13. Local Storage.
14. Session Storage.
15. Cookies.
16. BOM.
17. Window, Navigator, Location and History objects.

**Important:** Phase 5 is particularly important for technical interviews. Make sure you can explain Execution Context, Closures, `this`, Prototypes and the Call Stack with code examples before moving forward.