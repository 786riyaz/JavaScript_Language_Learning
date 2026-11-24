# JavaScript Complete Revision Notes
# Phase 9 – Advanced JavaScript

Phase 9 focuses on advanced JavaScript concepts that are frequently used in professional development, technical interviews, React, Node.js, and other JavaScript frameworks.

You will learn how JavaScript works internally and how to write reusable, optimized, and maintainable code.

### Topics Covered

1. Execution Context – Advanced Revision.
2. Lexical Environment.
3. Scope Chain.
4. Closures – Advanced Applications.
5. `this` Keyword – Advanced Behavior.
6. Call, Apply, and Bind.
7. Prototype and Prototype Chain.
8. Prototypal Inheritance.
9. Constructor Functions.
10. Classes and Inheritance.
11. Property Descriptors.
12. Getters and Setters.
13. Encapsulation.
14. Abstraction.
15. Polymorphism.
16. Object Immutability.
17. Shallow Copy vs Deep Copy.
18. Garbage Collection.
19. Memory Leaks.
20. Debouncing.
21. Throttling.
22. Currying.
23. Memoization.
24. Composition.
25. Recursion – Advanced Applications.
26. Polyfills.
27. Custom Implementation of `map()`, `filter()`, and `reduce()`.

---

# 1. Execution Context – Advanced Revision

An **Execution Context** is the environment in which JavaScript code is evaluated and executed.

Whenever JavaScript executes code, it creates an execution context.

There are three commonly discussed types:

1. Global Execution Context.
2. Function Execution Context.
3. Eval Execution Context.

### 1.1 Global Execution Context

The Global Execution Context is created when JavaScript starts executing a script.

Example:

```javascript
var name = "Riyaz";

let age = 25;

function greet() {
    console.log("Hello");
}

greet();
```

The global execution context manages global declarations and execution.

### 1.2 Function Execution Context

Whenever a function is called, a new function execution context is created.

```javascript
function calculate(a, b) {

    const result = a + b;

    return result;

}

calculate(10, 20);
```

When `calculate()` is called, JavaScript creates a new execution context containing information such as:
- Function parameters.
- Local variables.
- Function declarations.
- Lexical environment.
- The value of `this`.

### 1.3 Creation Phase and Execution Phase

JavaScript execution contexts are commonly explained using two phases.

**Creation Phase:**

JavaScript prepares the execution environment.

It establishes:
- Variable bindings.
- Function declarations.
- Scope-related information.
- The value of `this`, depending on the execution context.

**Execution Phase:**

JavaScript executes the statements in the code.

### Example

```javascript
console.log(a);

var a = 10;

function greet() {
    console.log("Hello");
}
```

Output:

```text
undefined
```

During the creation phase, the `var` binding is initialized with `undefined`.

During the execution phase, `a` is assigned the value `10`.

### Important: Call Stack

The call stack manages execution contexts.

```javascript
function first() {
    second();
}

function second() {
    third();
}

function third() {
    console.log("Hello");
}

first();
```

Simplified execution:

```text
Step 1:
first()

Step 2:
second()
first()

Step 3:
third()
second()
first()

Step 4:
second()
first()

Step 5:
first()

Step 6:
Empty
```

**Remember:**

- Execution Context = Environment where code executes.
- Call Stack = Tracks active function execution contexts.

---

# 2. Lexical Environment

A **Lexical Environment** is an internal structure that stores variable and function bindings and maintains a reference to its outer lexical environment.

It is created according to the lexical structure of the code.

In simple terms, JavaScript determines where variables belong based on where functions and blocks are written in the source code.

### Example

```javascript
const name = "Riyaz";

function outer() {

    const age = 25;

    function inner() {

        const city = "Ahmedabad";

        console.log(name);
        console.log(age);
        console.log(city);

    }

    inner();

}

outer();
```

Output:

```text
Riyaz
25
Ahmedabad
```

Why can `inner()` access `name` and `age`?

Because its lexical environment has access to its own bindings and the bindings in its outer lexical environments.

### Simplified Lexical Environment

```text
Global Lexical Environment
|
|-- name = "Riyaz"
|
|-- outer()
     |
     |-- age = 25
     |
     |-- inner()
          |
          |-- city = "Ahmedabad"
```

### Important Points

- Lexical environments store variable and function bindings.
- They maintain references to outer environments.
- They are fundamental to scope and closures.
- Lexical scope depends on where code is written, not where a function is called.

---

# 3. Scope Chain

The **Scope Chain** is the process JavaScript uses to resolve variable references.

When JavaScript cannot find a variable in the current scope, it looks in the outer scope.

It continues searching until it finds the variable or reaches the global scope.

### Example

```javascript
const a = 10;

function outer() {

    const b = 20;

    function inner() {

        const c = 30;

        console.log(a);
        console.log(b);
        console.log(c);

    }

    inner();

}

outer();
```

Output:

```text
10
20
30
```

### Scope Chain Diagram

```text
inner()
  |
  |-- c = 30
  |
  v
outer()
  |
  |-- b = 20
  |
  v
Global Scope
  |
  |-- a = 10
```

### Example: Variable Not Found

```javascript
function outer() {

    const message = "Hello";

    function inner() {

        console.log(message);

    }

    inner();

}

outer();
```

JavaScript searches:

1. Inner scope.
2. Outer function scope.
3. Global scope.

It finds `message` in the outer scope.

### Important

JavaScript searches outward, not inward.

```javascript
function outer() {

    function inner() {
        const message = "Hello";
    }

    console.log(message);

}

outer();
```

This produces a `ReferenceError` because the outer function cannot access a variable declared inside the inner function.

---

# 4. Closures – Advanced Applications

A **Closure** is created when a function retains access to variables from its outer lexical environment, even after that outer function has finished executing.

Closures allow functions to remember their surrounding state.

### Basic Example

```javascript
function outer() {

    const message = "Hello";

    function inner() {
        console.log(message);
    }

    return inner;

}

const result = outer();

result();
```

Output:

```text
Hello
```

Even though `outer()` has finished executing, `inner()` can still access `message`.

### How Does It Work?

```text
outer()
  |
  |-- message = "Hello"
  |
  |-- returns inner()
          |
          |-- Remembers outer lexical environment
```

The returned function retains access to the necessary lexical environment.

### 4.1 Data Privacy Using Closures

Closures can be used to create private variables.

```javascript
function createCounter() {

    let count = 0;

    return function () {

        count++;

        console.log(count);

    };

}

const counter = createCounter();

counter(); // 1
counter(); // 2
counter(); // 3
```

Here, `count` cannot be accessed directly from outside.

```javascript
console.log(counter.count); // undefined
```

### 4.2 Counter with Multiple Methods

```javascript
function createCounter() {

    let count = 0;

    return {

        increment() {
            count++;
            return count;
        },

        decrement() {
            count--;
            return count;
        },

        getCount() {
            return count;
        }

    };

}

const counter = createCounter();

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1
```

The variable `count` is private to the returned methods.

### 4.3 Function Factory

A function factory returns another function configured with particular values.

```javascript
function multiplyBy(number) {

    return function (value) {
        return value * number;
    };

}

const double = multiplyBy(2);

const triple = multiplyBy(3);

console.log(double(10)); // 20

console.log(triple(10)); // 30
```

### 4.4 Closure with setTimeout

```javascript
function greet(name) {

    setTimeout(() => {

        console.log(`Hello ${name}`);

    }, 2000);

}

greet("Riyaz");
```

The callback retains access to the `name` variable.

### 4.5 Closure in Loops

Consider:

```javascript
for (var i = 1; i <= 3; i++) {

    setTimeout(() => {
        console.log(i);
    }, 1000);

}
```

Output:

```text
4
4
4
```

Why?

- `var` is function-scoped.
- All callbacks share the same `i` binding.
- By the time callbacks execute, the loop has finished and `i` is `4`.

Using `let`:

```javascript
for (let i = 1; i <= 3; i++) {

    setTimeout(() => {
        console.log(i);
    }, 1000);

}
```

Output:

```text
1
2
3
```

`let` creates a separate binding for each loop iteration.

### Practical Uses of Closures

- Data privacy.
- Function factories.
- Event handlers.
- Maintaining state.
- Memoization.
- Debouncing.
- Throttling.

---

# 5. `this` Keyword – Advanced Behavior

The `this` keyword refers to a value determined primarily by how a function is called.

Its value is not always the object in which the function was defined.

### 5.1 Global Context

In a browser's classic script:

```javascript
console.log(this);
```

At the top level, `this` generally refers to the global `window` object.

In ES modules, top-level `this` is `undefined`.

In Node.js, top-level `this` has different behavior depending on the module system.

### 5.2 Object Method

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

Here, `this` refers to the object used to call the method.

### 5.3 Regular Function

```javascript
function show() {
    console.log(this);
}

show();
```

In a non-strict classic browser script, `this` generally refers to the global object.

In strict mode:

```javascript
"use strict";

function show() {
    console.log(this);
}

show();
```

Output:

```text
undefined
```

### 5.4 Nested Function

```javascript
const user = {

    name: "Riyaz",

    greet() {

        function inner() {
            console.log(this);
        }

        inner();

    }

};

user.greet();
```

The nested regular function has its own `this` binding.

It does not automatically inherit `this` from `greet()`.

### Solution: Arrow Function

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

Arrow functions inherit `this` lexically from their surrounding scope.

### 5.5 Constructor Function

```javascript
function User(name) {

    this.name = name;

}

const user = new User("Riyaz");

console.log(user.name);
```

Output:

```text
Riyaz
```

When called with `new`, the constructor function receives the newly created object as `this`.

### 5.6 Event Handler

```javascript
const button = document.querySelector("button");

button.addEventListener("click", function () {

    console.log(this);

});
```

For an ordinary event listener function, `this` generally refers to the element on which the listener is registered.

An arrow function does not receive its own event-handler `this`.

### Summary of `this`

| Situation | Value of `this` |
|---|---|
| Global classic browser script | `window` |
| ES module top level | `undefined` |
| Regular function in strict mode | `undefined` when called directly |
| Object method | Object used to call the method |
| Constructor called with `new` | Newly created object |
| Arrow function | Lexically inherited `this` |
| Ordinary DOM event handler | Element with the listener |

---

# 6. call(), apply(), and bind()

These three methods allow you to control the `this` value when calling a regular function.

They are available on functions through `Function.prototype`.

### 6.1 call()

`call()` invokes a function immediately with a specified `this` value and individual arguments.

Syntax:

```javascript
functionName.call(thisArg, arg1, arg2);
```

Example:

```javascript
function greet(city, country) {

    console.log(
        `Hello ${this.name} from ${city}, ${country}`
    );

}

const user = {
    name: "Riyaz"
};

greet.call(user, "Ahmedabad", "India");
```

Output:

```text
Hello Riyaz from Ahmedabad, India
```

### 6.2 apply()

`apply()` is similar to `call()`, but arguments are passed as an array or array-like object.

```javascript
greet.apply(user, ["Ahmedabad", "India"]);
```

### 6.3 bind()

`bind()` returns a new function with a specified `this` value and optionally pre-filled arguments.

It does not execute the function immediately.

```javascript
const boundGreet = greet.bind(user, "Ahmedabad");

boundGreet("India");
```

### Difference Between call(), apply(), and bind()

| Method | Execution | Arguments |
|---|---|---|
| `call()` | Immediately | Individual arguments |
| `apply()` | Immediately | Array or array-like object |
| `bind()` | Returns a new function | Individual arguments |

### Practical Example

```javascript
const user1 = {
    name: "Riyaz"
};

const user2 = {
    name: "Ahmed"
};

function introduce(city) {

    console.log(`${this.name} lives in ${city}`);

}

introduce.call(user1, "Ahmedabad");

introduce.call(user2, "Delhi");
```

Output:

```text
Riyaz lives in Ahmedabad
Ahmed lives in Delhi
```

### Important: Arrow Functions

`call()`, `apply()`, and `bind()` cannot change the lexical `this` of an arrow function.

```javascript
const greet = () => {
    console.log(this);
};

greet.call({ name: "Riyaz" });
```

The arrow function still uses its surrounding lexical `this`.

---

# 7. Prototype and Prototype Chain

JavaScript uses a prototype-based object model.

A **Prototype** is an object from which another object can inherit properties and methods.

Every ordinary object has an internal prototype reference, accessible through `Object.getPrototypeOf()`.

### Example

```javascript
const user = {
    name: "Riyaz"
};

console.log(Object.getPrototypeOf(user));
```

### Prototype Chain

When JavaScript tries to access a property on an object:

1. It checks the object itself.
2. If the property is not found, it checks the object's prototype.
3. It continues searching through the prototype chain.
4. If no property is found, it returns `undefined`.

### Example

```javascript
const parent = {

    greet() {
        console.log("Hello");
    }

};

const child = Object.create(parent);

child.name = "Riyaz";

child.greet();
```

Output:

```text
Hello
```

The `child` object does not have its own `greet()` method.

JavaScript finds it in the prototype.

### Prototype Chain Diagram

```text
child object
     |
     v
parent object
     |
     v
Object.prototype
     |
     v
null
```

### Important Methods

| Method | Description |
|---|---|
| `Object.getPrototypeOf()` | Returns an object's prototype |
| `Object.setPrototypeOf()` | Changes an object's prototype |
| `Object.create()` | Creates an object with a specified prototype |
| `hasOwnProperty()` | Checks whether a property belongs directly to the object |

### Example: Own vs Inherited Property

```javascript
const parent = {
    city: "Ahmedabad"
};

const child = Object.create(parent);

child.name = "Riyaz";

console.log(child.name);

console.log(child.city);

console.log(Object.hasOwn(child, "name"));

console.log(Object.hasOwn(child, "city"));
```

Output:

```text
Riyaz
Ahmedabad
true
false
```

---

# 8. Prototypal Inheritance

Prototypal inheritance means one object can inherit properties and methods from another object through its prototype chain.

### Example

```javascript
const animal = {

    eat() {
        console.log("Animal is eating");
    }

};

const dog = {

    bark() {
        console.log("Dog is barking");
    }

};

Object.setPrototypeOf(dog, animal);

dog.eat();

dog.bark();
```

Output:

```text
Animal is eating
Dog is barking
```

Here:
- `dog` has its own `bark()` method.
- `dog` inherits `eat()` from `animal`.

### Better Approach: Object.create()

```javascript
const animal = {

    eat() {
        console.log("Eating");
    }

};

const dog = Object.create(animal);

dog.bark = function () {
    console.log("Barking");
};

dog.eat();

dog.bark();
```

### Important

Changing prototypes using `Object.setPrototypeOf()` repeatedly can negatively affect performance.

Prefer establishing the desired prototype when creating objects, where practical.

---

# 9. Constructor Functions

A constructor function is a regular function designed to create and initialize objects when called with the `new` keyword.

### Example

```javascript
function User(name, age) {

    this.name = name;

    this.age = age;

}

const user1 = new User("Riyaz", 25);

const user2 = new User("Ahmed", 26);

console.log(user1);

console.log(user2);
```

Output:

```javascript
User { name: "Riyaz", age: 25 }

User { name: "Ahmed", age: 26 }
```

### What Happens When We Use new?

When JavaScript executes:

```javascript
const user = new User("Riyaz", 25);
```

Conceptually, it performs these operations:

1. Creates a new object.
2. Links the object's internal prototype to `User.prototype`.
3. Calls `User` with the new object as `this`.
4. Returns the new object, unless the constructor explicitly returns another object.

### Adding Methods to Prototype

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

Both objects share the same prototype method rather than each having a separate copy.

### Important

A function's `prototype` property is different from the internal prototype of the function object itself.

For a constructor function:

- `User.prototype` is the object used as the prototype for instances created with `new User()`.
- `Object.getPrototypeOf(user1)` returns that object's prototype.

---

# 10. Classes and Inheritance

ES6 introduced the `class` syntax to provide a cleaner way to work with JavaScript's prototype-based inheritance.

Classes are not a separate inheritance system. JavaScript classes use prototypes internally.

### 10.1 Creating a Class

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

const user = new User("Riyaz", 25);

user.greet();
```

### 10.2 Constructor

The `constructor()` method initializes newly created class instances.

```javascript
class User {

    constructor(name) {
        this.name = name;
    }

}
```

### 10.3 Instance Methods

```javascript
class User {

    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log(`Hello ${this.name}`);
    }

}
```

### 10.4 Static Methods

Static methods belong to the class itself rather than its instances.

```javascript
class MathHelper {

    static add(a, b) {
        return a + b;
    }

}

console.log(MathHelper.add(10, 20));
```

Output:

```text
30
```

You cannot call the static method directly on an instance.

```javascript
const helper = new MathHelper();

helper.add(10, 20); // TypeError
```

### 10.5 Inheritance Using extends

```javascript
class Animal {

    eat() {
        console.log("Eating");
    }

}

class Dog extends Animal {

    bark() {
        console.log("Barking");
    }

}

const dog = new Dog();

dog.eat();

dog.bark();
```

### 10.6 super Keyword

The `super` keyword allows a subclass to access superclass functionality.

Example:

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

    constructor(name, breed) {

        super(name);

        this.breed = breed;

    }

    bark() {
        console.log(`${this.name} is barking`);
    }

}

const dog = new Dog("Tommy", "Labrador");

dog.eat();

dog.bark();
```

**Important:** In a derived class constructor, you must call `super()` before accessing `this`.

### Constructor Functions vs Classes

| Constructor Functions | Classes |
|---|---|
| Traditional object creation pattern | Modern class syntax |
| Uses `prototype` directly | Uses prototypes internally |
| Methods often added to prototype manually | Methods are defined in class body |
| Can be called without `new`, depending on implementation | Must be called with `new` |
| Function declarations are hoisted | Classes have a temporal dead zone |

---

# 11. Property Descriptors

JavaScript object properties have internal attributes that control how they behave.

These attributes are called **Property Descriptors**.

There are two main types:

1. Data descriptors.
2. Accessor descriptors.

### Data Descriptor Properties

| Property | Description |
|---|---|
| `value` | Property value |
| `writable` | Whether the property value can be changed |
| `enumerable` | Whether it appears in normal enumeration |
| `configurable` | Whether the property can be deleted or reconfigured |

### Example: Object.defineProperty()

```javascript
const user = {};

Object.defineProperty(user, "name", {

    value: "Riyaz",

    writable: false,

    enumerable: true,

    configurable: false

});

console.log(user.name);
```

### Testing Property Behavior

```javascript
user.name = "Ahmed";

console.log(user.name);
```

In non-strict mode, the assignment is ignored.

In strict mode, attempting to change a non-writable property throws a TypeError.

### Getting Property Descriptor

```javascript
console.log(
    Object.getOwnPropertyDescriptor(user, "name")
);
```

Output:

```javascript
{
    value: "Riyaz",
    writable: false,
    enumerable: true,
    configurable: false
}
```

### Enumerable Property

If `enumerable` is false, the property is excluded from common enumeration methods such as `Object.keys()`.

### Configurable Property

If `configurable` is false:
- The property cannot be deleted.
- Its descriptor cannot generally be changed.
- Certain descriptor changes are restricted.

### Important Methods

```javascript
Object.defineProperty();

Object.defineProperties();

Object.getOwnPropertyDescriptor();

Object.getOwnPropertyDescriptors();
```

---

# 12. Getters and Setters

Getters and setters allow you to define methods that are accessed like object properties.

### Getter

A getter allows you to retrieve a calculated or controlled property value.

### Setter

A setter allows you to control what happens when a property is assigned a value.

### Example

```javascript
const user = {

    firstName: "Riyaz",

    lastName: "Khan",

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

};

console.log(user.fullName);
```

Output:

```text
Riyaz Khan
```

Notice that we access `fullName` like a property, not like a method.

### Setter Example

```javascript
const user = {

    firstName: "Riyaz",

    lastName: "Khan",

    set fullName(value) {

        const parts = value.split(" ");

        this.firstName = parts[0];

        this.lastName = parts[1];

    },

    get fullName() {

        return `${this.firstName} ${this.lastName}`;

    }

};

user.fullName = "Ahmed Patel";

console.log(user.fullName);
```

Output:

```text
Ahmed Patel
```

### Getters and Setters in Classes

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

### Important

The underscore in `_name` is a naming convention. It does not make the property private.

JavaScript private fields use the `#` syntax, which we will cover under encapsulation.

---

# 13. Encapsulation

Encapsulation means keeping data and the methods that operate on that data together while controlling access to internal state.

It helps protect object state from uncontrolled modification.

### Example Using Closures

```javascript
function BankAccount(initialBalance) {

    let balance = initialBalance;

    return {

        deposit(amount) {

            if (amount <= 0) {
                throw new Error("Invalid amount");
            }

            balance += amount;

        },

        getBalance() {
            return balance;
        }

    };

}

const account = BankAccount(1000);

account.deposit(500);

console.log(account.getBalance());
```

Output:

```text
1500
```

The `balance` variable cannot be accessed directly.

### Encapsulation Using Private Fields

Modern JavaScript classes support private fields using `#`.

```javascript
class BankAccount {

    #balance = 0;

    constructor(initialBalance) {
        this.#balance = initialBalance;
    }

    deposit(amount) {

        if (amount <= 0) {
            throw new Error("Invalid amount");
        }

        this.#balance += amount;

    }

    getBalance() {
        return this.#balance;
    }

}

const account = new BankAccount(1000);

account.deposit(500);

console.log(account.getBalance());
```

Output:

```text
1500
```

Direct access is not allowed:

```javascript
console.log(account.#balance);
```

This causes a syntax error outside the class.

### Advantages

- Protects internal state.
- Controls data modification.
- Reduces accidental misuse.
- Makes code easier to maintain.

---

# 14. Abstraction

Abstraction means exposing essential functionality while hiding unnecessary implementation details.

It focuses on **what an object does**, rather than how it performs the operation internally.

### Real-World Example

When you use an ATM:

- You enter your PIN.
- You select withdrawal.
- You enter an amount.
- The ATM processes the request.

You do not need to understand all the internal banking operations.

### JavaScript Example

```javascript
class Payment {

    pay(amount) {

        this.validateAmount(amount);

        this.processPayment(amount);

        console.log("Payment Successful");

    }

    validateAmount(amount) {

        if (amount <= 0) {
            throw new Error("Invalid amount");
        }

    }

    processPayment(amount) {

        console.log(`Processing payment of ${amount}`);

    }

}

const payment = new Payment();

payment.pay(1000);
```

The user interacts with the simple `pay()` method without needing to manage every internal step.

### Important

JavaScript does not have a dedicated `abstract` class keyword like some other languages.

You can implement abstraction using:
- Classes.
- Private methods.
- Public methods.
- Closures.
- Well-designed interfaces and APIs.

---

# 15. Polymorphism

Polymorphism means "many forms."

In object-oriented programming, polymorphism allows different objects to respond to the same method call in different ways.

### Example

```javascript
class Animal {

    makeSound() {
        console.log("Animal makes a sound");
    }

}

class Dog extends Animal {

    makeSound() {
        console.log("Dog barks");
    }

}

class Cat extends Animal {

    makeSound() {
        console.log("Cat meows");
    }

}

const animals = [
    new Dog(),
    new Cat(),
    new Animal()
];

animals.forEach((animal) => {
    animal.makeSound();
});
```

Output:

```text
Dog barks
Cat meows
Animal makes a sound
```

Each object implements the same method differently.

### Types of Polymorphism

| Type | Description |
|---|---|
| Runtime Polymorphism | Method behavior depends on the actual object |
| Method Overriding | Subclass provides its own implementation of an inherited method |
| Duck Typing | Objects are used based on their capabilities rather than their declared type |

### JavaScript and Method Overloading

JavaScript does not support traditional method overloading based on parameter types or signatures.

However, similar behavior can be implemented using optional parameters or argument checks.

Example:

```javascript
function calculate(a, b, c) {

    if (c !== undefined) {
        return a + b + c;
    }

    if (b !== undefined) {
        return a + b;
    }

    return a;

}

console.log(calculate(10));

console.log(calculate(10, 20));

console.log(calculate(10, 20, 30));
```

---

# 16. Object Immutability

Immutability means an existing value or data structure is not modified directly.

Instead, a new value or object is created with the desired changes.

### Example: Mutable Approach

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

user.age = 26;

console.log(user);
```

The original object is modified.

### Immutable Approach

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

const updatedUser = {
    ...user,
    age: 26
};

console.log(user);

console.log(updatedUser);
```

The original object remains unchanged.

### Object.freeze()

Prevents modification of an object's own properties.

```javascript
const user = {
    name: "Riyaz"
};

Object.freeze(user);

user.name = "Ahmed";
```

The original value remains unchanged.

### Object.seal()

Prevents adding and removing properties, but existing writable properties can still be modified.

### Important: Shallow Immutability

`Object.freeze()` is shallow.

```javascript
const user = {

    name: "Riyaz",

    address: {
        city: "Ahmedabad"
    }

};

Object.freeze(user);

user.address.city = "Delhi";

console.log(user.address.city);
```

Output:

```text
Delhi
```

The nested object was not frozen.

### Why Immutability Is Useful

- Predictable state updates.
- Easier debugging.
- Reduced accidental mutations.
- Useful in React state management.
- Easier comparison of old and new state.

---

# 17. Shallow Copy vs Deep Copy

Copying an object can be done in two major ways.

1. Shallow Copy.
2. Deep Copy.

### 17.1 Shallow Copy

A shallow copy creates a new outer object, but nested objects are still shared by reference.

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

copy.address.city = "Delhi";

console.log(original);
```

Output:

```javascript
{
    name: "Riyaz",
    address: {
        city: "Delhi"
    }
}
```

Why?

The nested `address` object is shared.

### Common Shallow Copy Methods

```javascript
const copy1 = { ...original };

const copy2 = Object.assign({}, original);
```

For arrays:

```javascript
const copy1 = [...originalArray];

const copy2 = originalArray.slice();
```

### 17.2 Deep Copy

A deep copy creates a separate copy of nested data as well.

Modern JavaScript provides `structuredClone()` for many supported data types.

```javascript
const original = {

    name: "Riyaz",

    address: {
        city: "Ahmedabad"
    }

};

const copy = structuredClone(original);

copy.address.city = "Delhi";

console.log(original.address.city);

console.log(copy.address.city);
```

Output:

```text
Ahmedabad
Delhi
```

### JSON Deep Copy Technique

```javascript
const copy = JSON.parse(JSON.stringify(original));
```

However, this method has limitations.

It does not preserve:
- Functions.
- `undefined` values in objects.
- Symbol properties.
- BigInt values.
- Circular references.
- Special object types such as Date in their original form.

### Comparison

| Shallow Copy | Deep Copy |
|---|---|
| Copies outer structure | Copies nested structures too |
| Nested objects remain shared | Nested objects are independent |
| Usually faster | Can require more processing |
| Spread and Object.assign() are common methods | `structuredClone()` supports many data types |
| Suitable for flat objects | Useful when nested data must be independent |

**Important:** `structuredClone()` cannot clone every possible JavaScript value. For example, functions and DOM nodes are not supported.

---

# 18. Garbage Collection

Garbage collection is the process of automatically identifying and reclaiming memory that is no longer reachable or needed by a JavaScript program.

JavaScript engines generally use automatic memory management.

### How It Works

Modern JavaScript engines commonly use algorithms based on **Mark-and-Sweep**.

Simplified process:

1. Start from known roots, such as global references and active execution contexts.
2. Identify reachable objects.
3. Mark those objects as reachable.
4. Objects that are no longer reachable can be reclaimed.

### Example

```javascript
let user = {
    name: "Riyaz"
};

user = null;
```

The original object is no longer reachable through `user`.

If there are no other references to it, it becomes eligible for garbage collection.

### Important

Garbage collection does not necessarily happen immediately.

JavaScript engines decide when to reclaim memory.

### Common Memory Problems

- Unnecessary global variables.
- Forgotten event listeners.
- Uncontrolled timers.
- Detached DOM elements still referenced by JavaScript.
- Closures retaining large objects unnecessarily.
- Unbounded caches.

---

# 19. Memory Leaks

A memory leak occurs when a program unintentionally retains references to data that is no longer needed.

As a result, memory cannot be reclaimed by the garbage collector.

### 19.1 Accidental Global Variables

Avoid creating unnecessary global variables.

```javascript
function test() {
    // Avoid accidental global assignments.
}
```

Use `let` or `const` for local variables.

### 19.2 Unremoved Event Listeners

```javascript
const button = document.querySelector("button");

function handleClick() {
    console.log("Clicked");
}

button.addEventListener("click", handleClick);
```

When the listener is no longer needed, remove it:

```javascript
button.removeEventListener("click", handleClick);
```

The same function reference and compatible event-listener options must be used.

### 19.3 Uncontrolled Timers

```javascript
const interval = setInterval(() => {
    console.log("Running");
}, 1000);
```

If the interval is no longer required:

```javascript
clearInterval(interval);
```

### 19.4 Detached DOM Elements

```javascript
let element = document.createElement("div");

document.body.appendChild(element);

document.body.removeChild(element);
```

If JavaScript still references `element`, the object may remain in memory.

To release that reference:

```javascript
element = null;
```

### Preventing Memory Leaks

- Remove unnecessary event listeners.
- Clear unused intervals and timeouts.
- Avoid unnecessary global references.
- Release references to unused objects.
- Keep caches under control.
- Use browser developer tools to inspect memory usage.

---

# 20. Debouncing

Debouncing is a technique that delays the execution of a function until a specified period has passed without another triggering event.

It is useful when you want to execute a function only after the user stops performing an action.

### Real-World Examples

- Search input.
- Auto-save.
- Window resizing.
- Form validation.

### Without Debouncing

Imagine a user types:

```text
JavaScript
```

An input event can fire for every character.

Without debouncing, an API request might be triggered many times.

### Debounce Implementation

```javascript
function debounce(callback, delay) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback.apply(this, args);

        }, delay);

    };

}
```

### Usage

```javascript
function search(value) {
    console.log("Searching:", value);
}

const debouncedSearch = debounce(search, 500);

debouncedSearch("J");

debouncedSearch("Ja");

debouncedSearch("Java");

debouncedSearch("JavaScript");
```

Only the last call executes if no new call happens within 500 milliseconds.

### How It Works

1. A function is called.
2. A timer is scheduled.
3. If the function is called again, the previous timer is cancelled.
4. A new timer is created.
5. The callback executes only after the calls stop for the specified delay.

### Practical Search Example

```javascript
const input = document.querySelector("#search");

const searchAPI = debounce(async function (event) {

    const value = event.target.value.trim();

    if (!value) return;

    console.log("API Request:", value);

}, 500);

input.addEventListener("input", searchAPI);
```

**Important:** Debouncing reduces how frequently a function executes. It does not automatically cancel an API request that has already started.

---

# 21. Throttling

Throttling is a technique that limits how frequently a function can execute within a specified time interval.

Unlike debouncing, throttling does not wait for the user to stop performing an action.

### Real-World Examples

- Scroll events.
- Mouse movement.
- Window resizing.
- Repeated button actions.

### Throttle Implementation

```javascript
function throttle(callback, delay) {

    let lastExecution = 0;

    return function (...args) {

        const now = Date.now();

        if (now - lastExecution >= delay) {

            lastExecution = now;

            callback.apply(this, args);

        }

    };

}
```

### Usage

```javascript
function handleScroll() {
    console.log("Scroll Event");
}

const throttledScroll = throttle(handleScroll, 1000);

window.addEventListener("scroll", throttledScroll);
```

The function executes at most once per approximately one-second interval while events continue.

### How It Works

1. The first call executes.
2. The current execution time is stored.
3. Further calls within the delay are ignored.
4. Once the delay has passed, the next call can execute.

### Debouncing vs Throttling

| Debouncing | Throttling |
|---|---|
| Executes after events stop for a specified period | Limits execution frequency |
| Resets the timer after each call | Uses a time interval |
| Useful for search input | Useful for scroll events |
| Executes after inactivity | Executes periodically while events continue |

**Remember:**

- Debounce = Wait until activity stops.
- Throttle = Limit how frequently activity is processed.

---

# 22. Currying

Currying is a technique in which a function taking multiple arguments is transformed into a sequence of functions, each accepting one argument.

### Normal Function

```javascript
function add(a, b, c) {
    return a + b + c;
}

console.log(add(10, 20, 30));
```

### Curried Function

```javascript
function add(a) {

    return function (b) {

        return function (c) {

            return a + b + c;

        };

    };

}

console.log(add(10)(20)(30));
```

Output:

```text
60
```

### Arrow Function Version

```javascript
const add = a => b => c => a + b + c;

console.log(add(10)(20)(30));
```

### Partial Application

Currying allows you to create specialized functions.

```javascript
const multiply = a => b => a * b;

const double = multiply(2);

const triple = multiply(3);

console.log(double(10));

console.log(triple(10));
```

Output:

```text
20
30
```

### Practical Uses

- Reusable function configuration.
- Functional programming.
- Creating specialized functions.
- Reducing repeated arguments.

---

# 23. Memoization

Memoization is an optimization technique in which a function stores previously calculated results and reuses them when the same inputs occur again.

It is useful for expensive calculations.

### Without Memoization

```javascript
function square(number) {

    console.log("Calculating...");

    return number * number;

}

console.log(square(5));

console.log(square(5));
```

The calculation happens twice.

### With Memoization

```javascript
function memoize(callback) {

    const cache = new Map();

    return function (...args) {

        const key = JSON.stringify(args);

        if (cache.has(key)) {
            console.log("Returning Cached Result");

            return cache.get(key);
        }

        console.log("Calculating...");

        const result = callback.apply(this, args);

        cache.set(key, result);

        return result;

    };

}
```

Usage:

```javascript
function square(number) {
    return number * number;
}

const memoizedSquare = memoize(square);

console.log(memoizedSquare(5));

console.log(memoizedSquare(5));
```

Output:

```text
Calculating...
25
Returning Cached Result
25
```

### How It Works

1. Check whether the input exists in the cache.
2. If it exists, return the cached result.
3. Otherwise, execute the function.
4. Store the result.
5. Return the result.

### Important Limitations

The simple implementation above is suitable only for certain types of arguments.

`JSON.stringify()` can produce incorrect or colliding cache keys for some inputs, such as:
- Different object structures with equivalent serialized forms.
- Functions.
- Symbols.
- Circular references.
- Some special values.

For production use, design the cache key based on the function's actual input requirements.

### Practical Uses

- Expensive calculations.
- Recursive algorithms.
- Repeated data transformations.
- Caching API-derived computations.

---

# 24. Function Composition

Function composition means combining multiple functions so that the output of one function becomes the input of another.

It is a common functional programming technique.

### Example

```javascript
function double(number) {
    return number * 2;
}

function addTen(number) {
    return number + 10;
}

function square(number) {
    return number * number;
}

const result = square(addTen(double(5)));

console.log(result);
```

Execution:

```text
5
|
v
double(5) = 10
|
v
addTen(10) = 20
|
v
square(20) = 400
```

Output:

```text
400
```

### Creating a Compose Function

```javascript
function compose(...functions) {

    return function (value) {

        return functions.reduceRight(
            (result, fn) => fn(result),
            value
        );

    };

}
```

Usage:

```javascript
const calculate = compose(
    square,
    addTen,
    double
);

console.log(calculate(5));
```

Output:

```text
400
```

### Important

In this example, functions execute from right to left.

```javascript
compose(square, addTen, double)
```

Means:

```javascript
square(addTen(double(value)))
```

### Compose vs Pipe

| Compose | Pipe |
|---|---|
| Executes functions right to left | Executes functions left to right |
| Common in functional programming | Common in functional programming |
| Uses right-to-left composition | Uses left-to-right composition |

---

# 25. Recursion – Advanced Applications

Recursion is a programming technique in which a function calls itself to solve a problem.

A recursive function needs:

1. Base Case.
2. Recursive Case.

### 25.1 Factorial

Factorial of 5:

```text
5! = 5 × 4 × 3 × 2 × 1
```

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

### 25.2 Fibonacci

```javascript
function fibonacci(number) {

    if (number <= 1) {
        return number;
    }

    return fibonacci(number - 1) + fibonacci(number - 2);

}

console.log(fibonacci(6));
```

Output:

```text
8
```

This basic implementation repeats many calculations and becomes inefficient for larger inputs.

### 25.3 Recursive Array Sum

```javascript
function sumArray(numbers) {

    if (numbers.length === 0) {
        return 0;
    }

    return numbers[0] + sumArray(numbers.slice(1));

}

console.log(sumArray([10, 20, 30, 40]));
```

Output:

```text
100
```

### 25.4 Recursive Object Traversal

```javascript
const user = {

    name: "Riyaz",

    address: {

        city: "Ahmedabad",

        country: "India"

    }

};

function printObject(object) {

    for (const key in object) {

        if (
            object[key] !== null &&
            typeof object[key] === "object"
        ) {

            printObject(object[key]);

        } else {

            console.log(key, object[key]);

        }

    }

}

printObject(user);
```

Output:

```text
name Riyaz
city Ahmedabad
country India
```

### Important: Stack Overflow

If recursion continues without reaching a base case, JavaScript eventually throws a stack overflow error.

Example:

```javascript
function test() {
    test();
}

test();
```

This causes a `RangeError: Maximum call stack size exceeded` in typical JavaScript engines.

### Recursion vs Iteration

| Recursion | Iteration |
|---|---|
| Function calls itself | Uses loops |
| Uses call stack | Usually uses loop control |
| Can make tree problems easier | Often more memory-efficient |
| Can cause stack overflow | Avoids recursive call-stack growth |

---

# 26. Polyfills

A **Polyfill** is JavaScript code that provides functionality for a feature that may not be available in an older environment.

It allows developers to use certain modern APIs in environments that do not support them natively.

### Example: Array.prototype.includes()

Suppose an environment does not support `includes()`.

A simplified polyfill could look like this:

```javascript
if (!Array.prototype.myIncludes) {

    Array.prototype.myIncludes = function (searchElement) {

        for (let i = 0; i < this.length; i++) {

            if (Object.is(this[i], searchElement)) {
                return true;
            }

        }

        return false;

    };

}
```

Usage:

```javascript
const numbers = [10, 20, 30];

console.log(numbers.myIncludes(20));
```

Output:

```text
true
```

**Important:** This is an educational implementation, not a complete specification-compatible polyfill for `Array.prototype.includes()`.

A production polyfill must handle sparse arrays, `NaN`, negative indices, and other specification details.

### Why Polyfills Are Used

- Browser compatibility.
- Supporting older JavaScript environments.
- Providing missing functionality.
- Maintaining consistent application behavior.

### Polyfill vs Transpiler

| Polyfill | Transpiler |
|---|---|
| Provides missing runtime functionality | Converts newer syntax into older syntax |
| Adds or implements APIs | Transforms source code |
| Example: Missing API implementation | Example: Babel |
| Runs as JavaScript code | Runs during the build or transformation process |

---

# 27. Custom Implementation of map()

The `map()` method creates a new array by applying a callback to each element.

Let's implement a simplified custom version.

### Native map()

```javascript
const numbers = [1, 2, 3];

const result = numbers.map((num) => num * 2);

console.log(result);
```

Output:

```javascript
[2, 4, 6]
```

### Custom map()

```javascript
Array.prototype.myMap = function (callback) {

    const result = [];

    for (let i = 0; i < this.length; i++) {

        if (i in this) {

            result.push(callback(this[i], i, this));

        }

    }

    return result;

};
```

Usage:

```javascript
const numbers = [1, 2, 3];

const result = numbers.myMap((num) => num * 2);

console.log(result);
```

Output:

```javascript
[2, 4, 6]
```

### Callback Parameters

```javascript
callback(currentValue, index, array)
```

| Parameter | Description |
|---|---|
| `currentValue` | Current element |
| `index` | Current element index |
| `array` | Original array |

---

# 28. Custom Implementation of filter()

The `filter()` method creates a new array containing elements that satisfy a condition.

### Native filter()

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers.filter((num) => num % 2 === 0);

console.log(result);
```

Output:

```javascript
[2, 4, 6]
```

### Custom filter()

```javascript
Array.prototype.myFilter = function (callback) {

    const result = [];

    for (let i = 0; i < this.length; i++) {

        if (i in this) {

            if (callback(this[i], i, this)) {

                result.push(this[i]);

            }

        }

    }

    return result;

};
```

Usage:

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers.myFilter((num) => num > 3);

console.log(result);
```

Output:

```javascript
[4, 5, 6]
```

---

# 29. Custom Implementation of reduce()

The `reduce()` method executes a callback for each element and accumulates a single result.

### Native reduce()

```javascript
const numbers = [10, 20, 30];

const total = numbers.reduce((acc, current) => {
    return acc + current;
}, 0);

console.log(total);
```

Output:

```text
60
```

### Custom reduce()

```javascript
Array.prototype.myReduce = function (callback, initialValue) {

    let accumulator;

    let startIndex = 0;

    if (arguments.length >= 2) {

        accumulator = initialValue;

    } else {

        while (
            startIndex < this.length &&
            !(startIndex in this)
        ) {
            startIndex++;
        }

        if (startIndex >= this.length) {
            throw new TypeError("Reduce of empty array with no initial value");
        }

        accumulator = this[startIndex];

        startIndex++;

    }

    for (let i = startIndex; i < this.length; i++) {

        if (i in this) {

            accumulator = callback(
                accumulator,
                this[i],
                i,
                this
            );

        }

    }

    return accumulator;

};
```

Usage:

```javascript
const numbers = [10, 20, 30];

const total = numbers.myReduce((acc, current) => {
    return acc + current;
}, 0);

console.log(total);
```

Output:

```text
60
```

### Important

These custom implementations demonstrate how array methods work internally.

They are not complete replacements for the native methods in every edge case.

Also, in real projects, avoid modifying built-in prototypes unnecessarily.

---

# 30. Important Advanced JavaScript Comparisons

| Concept A | Concept B | Main Difference |
|---|---|---|
| Lexical Environment | Scope Chain | Environment stores bindings; scope chain describes variable lookup |
| Closure | Normal Function | Closure retains access to its lexical environment |
| call() | apply() | Individual arguments vs array-like arguments |
| bind() | call() | Returns a new function vs executes immediately |
| Prototype | `prototype` property | Internal object relationship vs constructor function property |
| Class | Constructor Function | Different syntax and semantics built on prototypes |
| Getter | Setter | Reads a property vs controls property assignment |
| Encapsulation | Abstraction | Controls access to data vs hides implementation details |
| Shallow Copy | Deep Copy | Nested references remain shared vs nested data is copied |
| Debouncing | Throttling | Executes after inactivity vs limits execution frequency |
| Currying | Partial Application | Converts multi-argument function into nested functions vs pre-fills some arguments |
| Memoization | Caching | Memoization specifically caches function results |
| Compose | Pipe | Right-to-left vs left-to-right function execution |
| Recursion | Iteration | Function calls itself vs uses loops |
| Polyfill | Transpiler | Adds missing runtime functionality vs transforms source syntax |

---

# 31. Interview Questions

### Basic Questions

1. What is an execution context?
2. What is the difference between execution context and call stack?
3. What is a lexical environment?
4. What is the scope chain?
5. What is a closure?
6. What are the practical uses of closures?
7. How can closures be used to create private variables?
8. What is the `this` keyword?
9. How does `this` behave in an arrow function?
10. What is the difference between call(), apply(), and bind()?

### Intermediate Questions

11. What is a prototype?
12. What is the prototype chain?
13. What is prototypal inheritance?
14. What is the difference between `Object.getPrototypeOf()` and `prototype`?
15. What happens when we use the `new` keyword?
16. What is the difference between constructor functions and classes?
17. What is the purpose of `super()`?
18. What are static methods?
19. What are property descriptors?
20. What is the difference between writable, enumerable, and configurable?
21. What are getters and setters?
22. What is encapsulation?
23. What is abstraction?
24. What is polymorphism?

### Advanced Questions

25. What is object immutability?
26. What is the difference between Object.freeze() and Object.seal()?
27. What is the difference between shallow copy and deep copy?
28. What is structuredClone()?
29. What is garbage collection?
30. What is the Mark-and-Sweep algorithm?
31. What is a memory leak?
32. How can event listeners cause memory leaks?
33. What is debouncing?
34. What is throttling?
35. What is the difference between debouncing and throttling?
36. What is currying?
37. What is partial application?
38. What is memoization?
39. What is function composition?
40. What is the difference between compose and pipe?
41. What is recursion?
42. What is a base case?
43. What is a stack overflow?
44. What is a polyfill?
45. What is the difference between a polyfill and a transpiler?
46. How would you implement your own map() method?
47. How would you implement your own filter() method?
48. How would you implement your own reduce() method?

---

# 32. Practical Exercises

Practice these tasks without looking at the solutions.

| No. | Exercise | Concepts |
|---|---|---|
| 1 | Create a private counter using closures | Closures |
| 2 | Create a function factory for discount calculations | Closures |
| 3 | Create a bank account using private variables | Encapsulation |
| 4 | Create a function that uses call(), apply(), and bind() | `this` |
| 5 | Create objects that inherit methods using Object.create() | Prototypes |
| 6 | Create a User constructor with shared prototype methods | Constructor Functions |
| 7 | Create an Animal class and Dog subclass | Inheritance |
| 8 | Create a class with private fields | Encapsulation |
| 9 | Create getters and setters with validation | Accessors |
| 10 | Create a read-only object using Object.freeze() | Immutability |
| 11 | Demonstrate shallow and deep copying | Object References |
| 12 | Create a debounce function | Debouncing |
| 13 | Create a throttle function | Throttling |
| 14 | Create a curried multiplication function | Currying |
| 15 | Create a memoized Fibonacci function | Memoization |
| 16 | Build a compose() utility | Function Composition |
| 17 | Calculate factorial using recursion | Recursion |
| 18 | Traverse nested objects recursively | Recursion |
| 19 | Implement a custom map() method | Polyfills |
| 20 | Implement a custom filter() method | Polyfills |
| 21 | Implement a custom reduce() method | Polyfills |

---

# 33. Important Output-Based Questions

These are particularly useful for technical interviews.

### Question 1 – Closure

```javascript
function outer() {

    let count = 0;

    return function () {

        count++;

        console.log(count);

    };

}

const counter = outer();

counter();

counter();

counter();
```

**Output:**

```text
1
2
3
```

Reason: The returned function retains access to the outer variable.

### Question 2 – Closure with Separate Instances

```javascript
function counter() {

    let count = 0;

    return function () {
        return ++count;
    };

}

const a = counter();

const b = counter();

console.log(a());

console.log(a());

console.log(b());
```

**Output:**

```text
1
2
1
```

Reason: Each call to `counter()` creates a separate lexical environment.

### Question 3 – this

```javascript
const user = {

    name: "Riyaz",

    greet() {

        console.log(this.name);

    }

};

const greet = user.greet;

greet();
```

**Output:**

In a typical non-strict browser script:

```text
undefined
```

In strict mode or an ES module, accessing `this.name` throws a TypeError because `this` is `undefined`.

Reason: The function is called without `user` as its receiver.

### Question 4 – call()

```javascript
const user = {
    name: "Riyaz"
};

function greet() {
    console.log(this.name);
}

greet.call(user);
```

**Output:**

```text
Riyaz
```

### Question 5 – Prototype

```javascript
const parent = {
    name: "Riyaz"
};

const child = Object.create(parent);

child.age = 25;

console.log(child.name);

console.log(child.age);
```

**Output:**

```text
Riyaz
25
```

### Question 6 – Debouncing Concept

```javascript
function debounce(callback, delay) {

    let timer;

    return function () {

        clearTimeout(timer);

        timer = setTimeout(callback, delay);

    };

}

const test = debounce(() => {
    console.log("Hello");
}, 1000);

test();

test();

test();
```

**Output after approximately one second from the final call:**

```text
Hello
```

Reason: Previous timers are cancelled whenever another call happens.

### Question 7 – Currying

```javascript
const add = a => b => c => a + b + c;

console.log(add(10)(20)(30));
```

**Output:**

```text
60
```

### Question 8 – Memoization

```javascript
function memoize(callback) {

    const cache = new Map();

    return function (number) {

        if (cache.has(number)) {
            console.log("Cached");
            return cache.get(number);
        }

        console.log("Calculating");

        const result = callback(number);

        cache.set(number, result);

        return result;

    };

}

const square = memoize(num => num * num);

console.log(square(5));

console.log(square(5));
```

**Output:**

```text
Calculating
25
Cached
25
```

### Question 9 – Object.freeze()

```javascript
const user = {
    name: "Riyaz"
};

Object.freeze(user);

user.name = "Ahmed";

console.log(user.name);
```

**Output in non-strict mode:**

```text
Riyaz
```

In strict mode, the attempted assignment throws a TypeError.

### Question 10 – Prototype Chain

```javascript
const animal = {

    eat() {
        console.log("Eating");
    }

};

const dog = Object.create(animal);

dog.bark = function () {
    console.log("Barking");
};

dog.eat();

dog.bark();
```

**Output:**

```text
Eating
Barking
```

---

# 34. Official Documentation

These resources are useful for deeper understanding.

1. [MDN – Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures?utm_source=chatgpt.com)
2. [MDN – this Keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this?utm_source=chatgpt.com)
3. [MDN – call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call?utm_source=chatgpt.com)
4. [MDN – bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind?utm_source=chatgpt.com)
5. [MDN – Inheritance and the Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain?utm_source=chatgpt.com)
6. [MDN – Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes?utm_source=chatgpt.com)
7. [MDN – Property Descriptors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty?utm_source=chatgpt.com)
8. [MDN – structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone?utm_source=chatgpt.com)
9. [MDN – Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management?utm_source=chatgpt.com)
10. [MDN – Recursion](https://developer.mozilla.org/en-US/docs/Glossary/Recursion?utm_source=chatgpt.com)

---

# JavaScript Learning Roadmap – Progress

| Phase | Topic | Status |
|---|---|---|
| Phase 1 | JavaScript Fundamentals | Completed |
| Phase 2 | Control Flow & Loops | Completed |
| Phase 3 | Functions | Completed |
| Phase 4 | Arrays & Objects | Completed |
| Phase 5 | JavaScript Core Concepts | Completed |
| Phase 6 | DOM & Browser APIs | Completed |
| Phase 7 | Asynchronous JavaScript | Completed |
| Phase 8 | Modern JavaScript (ES6+) | Completed |
| Phase 9 | Advanced JavaScript | Completed |
| Phase 10 | JavaScript Modules & Tooling | Next |
| Phase 11 | JavaScript Projects & Interview Preparation | Upcoming |

## Next: Phase 10 – JavaScript Modules & Tooling

Topics will include:

1. What are JavaScript Modules?
2. Why do we need Modules?
3. Module Scope.
4. Named Exports.
5. Default Exports.
6. Named Imports.
7. Default Imports.
8. Import Aliases.
9. Re-exporting Modules.
10. Dynamic Imports.
11. CommonJS Modules.
12. ES Modules vs CommonJS.
13. `require()` vs `import`.
14. `module.exports` vs `export`.
15. package.json.
16. npm and npx.
17. Installing and Removing Packages.
18. package-lock.json.
19. Semantic Versioning.
20. Development Dependencies vs Production Dependencies.
21. Environment Variables.
22. Bundlers.
23. Webpack.
24. Vite.
25. Babel.
26. ESLint.
27. Prettier.
28. Browser Compatibility and Polyfills.

**Recommendation:** Before moving to Phase 10, build a small JavaScript application containing a counter, bank account, search input with debouncing, and memoized calculation. These exercises will reinforce closures, `this`, prototypes, encapsulation, and performance optimization.