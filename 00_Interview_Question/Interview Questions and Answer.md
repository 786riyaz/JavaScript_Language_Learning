# Complete JavaScript Interview Roadmap (Basic → Advanced)

# 1. JavaScript Fundamentals

### Introduction

* What is JavaScript?
* Why is JavaScript called a Loosely Typed Language?
* What are Primitive and Non-Primitive (Reference) Data Types?
* What is the difference between Mutable and Immutable data?
* What are Variables?
* What is the difference between `var`, `let`, and `const`?
* When should we use `let`, `const`, or `var`?

---

# 2. Execution Context & Memory

* What is an Execution Context?
* Types of Execution Context

  * Global Execution Context
  * Function Execution Context
  * Eval Execution Context
* What is the Creation Phase?
* What is the Execution Phase?
* What is Hoisting?
* What is the Temporal Dead Zone (TDZ)?
* What is Scope?

  * Global Scope
  * Local Scope
  * Block Scope
* What is Lexical Environment?
* What is Scope Chain?
* What is Variable Shadowing?

---

# 3. Errors

* What is a Syntax Error?
* What is a Reference Error?
* What is a Type Error?
* What is `try...catch`?
* What is `throw`?
* What is `finally`?

---

# 4. Operators

* Arithmetic Operators
* Comparison Operators
* Logical Operators
* Assignment Operators
* Ternary Operator
* Bit Manipulation

  * AND (`&`)
  * OR (`|`)
  * XOR (`^`)
  * NOT (`~`)
  * Left Shift (`<<`)
  * Right Shift (`>>`)

---

# 5. Conditional Statements

* if
* else
* else if
* switch
* ternary operator

---

# 6. Loops

* `for`
* `while`
* `do...while`
* `for...of`
* `for...in`
* `break`
* `continue`

---

# 7. Functions

* What is a Function?
* Function Declaration
* Function Expression
* Difference between Function Declaration and Function Expression
* Arrow Functions
* Anonymous Functions
* IIFE (Immediately Invoked Function Expression)
* Parameters vs Arguments
* Default Parameters
* Rest Parameters
* Spread Operator
* Recursion

---

# 8. Strings

* What are Immutable Strings?
* String Methods

  * `charAt()`
  * `split()`
  * `join()`
  * `slice()`
  * `substring()`
  * `replace()`
  * `replaceAll()`
  * `toUpperCase()`
  * `toLowerCase()`
  * `trim()`
  * `includes()`

---

# 9. Arrays

* What is an Array?
* What is a Dynamic Array?
* How are Arrays stored in JavaScript?
* If arrays are sequential in memory, how does JavaScript support dynamic arrays?
* What is a Subarray?
* What is a 2D Array?
* What is a 3D Array?

### Basic Array Methods

* `push()`
* `pop()`
* `shift()`
* `unshift()`
* `concat()`
* `slice()`
* `splice()`
* `toSpliced()`
* `sort()`
* `reverse()`
* `includes()`
* `indexOf()`

---

# 10. Objects

* What is an Object?
* Object Properties
* Object Methods
* Object Destructuring
* Nested Objects

### Object Methods

* `Object.keys()`
* `Object.values()`
* `Object.entries()`
* `Object.assign()`

---

# 11. ES6+ Features

* `let` and `const`
* Arrow Functions
* Template Literals
* Destructuring
* Default Parameters
* Rest Operator
* Spread Operator
* Optional Chaining (`?.`)
* Nullish Coalescing (`??`)
* Modules (`import` / `export`)

---

# 12. Collections

* What is a Set?
* What is a Map?
* What is a WeakSet?
* What is a WeakMap?
* What is a HashMap?
* Difference between Object and Map
* Difference between Array and Set

---

# 13. Higher Order Array Methods

* `forEach()`
* `map()`
* `filter()`
* `reduce()`
* `find()`
* `findIndex()`
* `some()`
* `every()`
* `flat()`
* `flatMap()`

---

# 14. Functions (Advanced)

* What is a First-Class Function?
* What is a Higher-Order Function?
* What is a Callback Function?
* What is Callback Hell (Pyramid of Doom)?
* What is a Closure?
* How does Closure work with Lexical Environment?
* What is Currying?
* What is Memoization?

---

# 15. `this` Keyword

* What is the Window Object?
* What is the Global Object?
* How does `this` work in JavaScript?
* `this` in Global Scope
* `this` inside Normal Functions
* `this` inside Arrow Functions
* `this` inside Object Methods
* `this` inside Classes
* Explicit Binding

---

# 16. Call, Apply & Bind

* What is `call()`?
* What is `apply()`?
* What is `bind()`?
* Difference between Call, Apply and Bind
* Context Binding

---

# 17. Object-Oriented JavaScript

### Constructor Functions

* What is a Constructor Function?
* How does the `new` keyword work?
* Constructor Function vs Class

### Prototype

* What is Prototype?
* What is Prototype Chain?
* Prototype Methods
* How does JavaScript Inheritance work internally?

### ES6 Classes

* What is an ES6 Class?
* Constructor
* Static Methods
* Static Properties
* Inheritance
* `extends`
* `super`

### OOP Principles

* Encapsulation
* Abstraction
* Inheritance
* Polymorphism

---

# 18. DOM Manipulation

* What is the DOM?
* How to Select Elements

  * `getElementById()`
  * `getElementsByClassName()`
  * `getElementsByTagName()`
  * `querySelector()`
  * `querySelectorAll()`
* Creating Elements
* Removing Elements
* Updating Elements
* Styling Elements
* `classList`
* `innerHTML`
* `textContent`
* `innerText`

---

# 19. Events

* What is an Event?
* What is `addEventListener()`?
* Event Object
* Event Propagation
* Event Bubbling
* Event Capturing
* Event Delegation
* `preventDefault()`
* `stopPropagation()`

---

# 20. Browser Storage

* What is Local Storage?
* What is Session Storage?
* What are Cookies?
* Difference between Local Storage, Session Storage and Cookies

---

# 21. Asynchronous JavaScript

* Synchronous vs Asynchronous JavaScript
* What is the Call Stack?
* What are Web APIs?
* What is the Callback Queue?
* What is the Microtask Queue?
* What is the Macrotask Queue?
* What is the Event Loop?
* Execution Order of Microtasks vs Macrotasks
* `setTimeout()`
* `setInterval()`

---

# 22. Promises

* What is a Promise?
* Promise States
* Promise Chaining
* Error Handling in Promises
* Promise APIs

  * `Promise.all()`
  * `Promise.race()`
  * `Promise.any()`
  * `Promise.allSettled()`
* Dependent Promises
* Independent Promises

---

# 23. Async / Await

* What is `async`?
* What is `await`?
* Error Handling with `try...catch`
* Callback vs Promise vs Async/Await

---

# 24. API Calls

* What is CRUD?
* HTTP Methods

  * GET
  * POST
  * PUT
  * PATCH
  * DELETE
* HTTP Status Codes
* What is Fetch API?
* What is Axios?
* Difference between Fetch and Axios
* Axios Interceptors

---

# 25. Advanced JavaScript

* Generator Functions
* Iterators
* Polyfills
* Debouncing
* Throttling

---

# 26. Most Important Interview Questions (Must Know)

* Explain JavaScript Execution Context.
* Explain Hoisting with examples.
* Explain the Temporal Dead Zone.
* Explain Closures with real-world examples.
* Explain Lexical Scope.
* Explain the Event Loop.
* Explain Microtask Queue vs Macrotask Queue.
* Explain Callback Hell.
* Explain Promises and Promise Chaining.
* Explain Async/Await.
* Explain `this` keyword in different contexts.
* Explain Call, Apply and Bind.
* Explain Prototype and Prototype Chain.
* Explain Constructor Functions vs Classes.
* Explain Event Bubbling, Capturing and Delegation.
* Explain Debouncing vs Throttling.
* Explain Currying.
* Explain Memoization.
* Explain Polyfills.
* Explain First-Class Functions, Higher-Order Functions and Callback Functions.
* Explain Map vs Object.
* Explain Set vs Array.
* Explain Local Storage vs Session Storage vs Cookies.
* Explain Fetch vs Axios.
* Explain HTTP Methods and Status Codes.

---

# Recommended Study Plan

1. JavaScript Fundamentals
2. Execution Context & Hoisting
3. Scope & Closures
4. Functions
5. Arrays & Strings
6. Objects
7. ES6 Features
8. Collections (Map/Set)
9. Higher-Order Array Methods
10. `this` Keyword
11. Call / Apply / Bind
12. Constructor Functions & Prototypes
13. ES6 Classes & OOP
14. DOM Manipulation
15. Events
16. Browser Storage
17. Event Loop & Asynchronous JavaScript
18. Promises
19. Async/Await
20. Fetch & Axios
21. Advanced Concepts (Currying, Memoization, Debouncing, Throttling, Polyfills, Generators)

This roadmap covers essentially every JavaScript topic commonly asked in frontend, full-stack, and Node.js interviews, progressing from beginner concepts to advanced interview discussions without duplicate topics.
