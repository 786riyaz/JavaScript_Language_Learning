# JavaScript Revision Notes – Phase 17
# JavaScript Runtime & Internals

In this phase, we will understand **how JavaScript actually works internally**.

Until now, we have learned JavaScript syntax, functions, objects, asynchronous programming, closures, promises, event loops, and other concepts.

Now we will understand what happens behind the scenes when JavaScript code executes.

This phase is particularly important for understanding:

- How JavaScript executes code.
- How variables are stored in memory.
- How functions are called.
- How closures work internally.
- How the Call Stack operates.
- How the Event Loop handles asynchronous operations.
- How JavaScript manages memory.
- How Node.js handles asynchronous I/O.

---

# 1. How Does JavaScript Execute?

JavaScript is commonly described as a single-threaded programming language.

This means JavaScript code in a particular execution agent generally runs one piece of JavaScript at a time on its main thread.

But JavaScript can still handle asynchronous operations.

For example:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 2000);

console.log("End");
```

Output:

```text
Start
End
Timeout
```

Why?

Because JavaScript doesn't need to block the main thread while waiting for the timer.

The JavaScript runtime provides additional mechanisms to manage asynchronous operations.

### High-Level Execution Architecture

```text
       JavaScript Runtime
    _________________________
   |                         |
   |    JavaScript Engine    |
   |                         |
   |  - Call Stack           |
   |  - Memory Heap          |
   |  - Execution Context    |
   |_________________________|
              |
              |
   _________________________
  |                         |
  |    Runtime APIs         |
  |                         |
  |  - Timers               |
  |  - Network Operations   |
  |  - File Operations      |
  |  - Event Handling       |
  |_________________________|
              |
              v
       Event Loop
              |
       __________________
      |                  |
      v                  v
  Task Queue        Microtask Queue
```

This is a simplified conceptual diagram. Browser and Node.js runtimes have different internal architectures.

---

# 2. What Is a JavaScript Engine?

A JavaScript Engine is a program that parses, compiles, and executes JavaScript code.

It converts JavaScript source code into instructions that the computer can execute.

Popular JavaScript engines include:

| Engine | Used In |
|---|---|
| V8 | Google Chrome, Node.js, Edge |
| SpiderMonkey | Firefox |
| JavaScriptCore | Safari |
| Hermes | React Native |

### Example

When you execute:

```javascript
const a = 10;
const b = 20;

console.log(a + b);
```

The JavaScript engine processes this code and executes the required operations.

### What Does a JavaScript Engine Do?

1. Reads JavaScript source code.
2. Parses the source code.
3. Generates an internal representation.
4. Compiles and optimizes code.
5. Executes the code.
6. Manages memory.

---

# 3. What Is the V8 Engine?

V8 is Google's open-source JavaScript and WebAssembly engine.

It is used by:

- Google Chrome.
- Node.js.
- Microsoft Edge.
- Other applications built around V8.

### V8 Architecture

A simplified V8 execution pipeline:

```text
       JavaScript Source
              |
              v
            Parser
              |
              v
          AST (Syntax Tree)
              |
              v
        Ignition Interpreter
              |
              v
         Bytecode Execution
              |
              v
        Hot Code Detection
              |
              v
        TurboFan Compiler
              |
              v
       Optimized Machine Code
```

Let's understand these components.

### 1. Parser

The parser analyzes JavaScript syntax and creates an Abstract Syntax Tree.

### 2. AST

AST stands for Abstract Syntax Tree.

It represents the structure of the JavaScript program.

For example:

```javascript
const total = 10 + 20;
```

The AST represents concepts such as:

- Variable declaration.
- Variable name.
- Assignment.
- Addition operation.
- Numeric literals.

### 3. Ignition

Ignition is V8's interpreter.

It generates and executes bytecode.

Bytecode is an intermediate representation of instructions rather than ordinary JavaScript source code.

### 4. TurboFan

TurboFan is V8's optimizing compiler.

It optimizes frequently executed code using runtime information.

### Why Does V8 Use Both Interpreter and Compiler?

Because executing every instruction through an optimizing compiler would not always be efficient.

A practical approach is:

1. Start executing code quickly.
2. Observe how the code behaves.
3. Identify frequently executed code.
4. Optimize suitable code paths.

**Important:** V8's internal implementation changes over time. This diagram describes the broad architecture, not every detail of the current engine.

---

# 4. What Is a JavaScript Runtime Environment?

A JavaScript Runtime Environment provides everything required to execute JavaScript code.

A runtime generally includes:

1. JavaScript Engine.
2. Runtime APIs.
3. Event Loop mechanisms.
4. Task scheduling.
5. Memory management.

### Browser Runtime

When JavaScript executes inside a browser, it can access browser-provided APIs.

Examples:

- `setTimeout()`
- `fetch()`
- `document`
- `window`
- DOM events
- Web Storage

### Node.js Runtime

When JavaScript executes inside Node.js, it can access Node.js APIs.

Examples:

- `fs`
- `http`
- `path`
- `crypto`
- `process`
- `Buffer`

### Browser vs Node.js

| Feature | Browser | Node.js |
|---|---|---|
| JavaScript Engine | V8, SpiderMonkey, JavaScriptCore, etc. | V8 |
| DOM | Yes, when supported by the browser | No built-in browser DOM |
| `window` | Browser global object | Not available as the browser global |
| `document` | Browser DOM | Not available by default |
| `globalThis` | Yes | Yes |
| File System API | Browser-specific APIs with permissions | Node.js `fs` APIs |
| Event Loop | Browser-defined processing model | Node.js/libuv event-loop integration |

**Important:** JavaScript is the language. V8 is an engine. Node.js is a runtime environment.

---

# 5. What Is the Call Stack?

The Call Stack is a data structure used by JavaScript to keep track of function execution.

It follows the **LIFO principle**.

LIFO means:

**Last In, First Out.**

The last function added to the stack is the first one removed.

### Example

```javascript
function first() {
    console.log("First");
}

function second() {
    first();
    console.log("Second");
}

function third() {
    second();
    console.log("Third");
}

third();
```

Output:

```text
First
Second
Third
```

### How Does the Call Stack Work?

Initially:

```text
Call Stack

|          |
|__________|
```

When `third()` executes:

```text
| third()  |
|__________|
```

When `third()` calls `second()`:

```text
| second() |
| third()  |
|__________|
```

When `second()` calls `first()`:

```text
| first()  |
| second() |
| third()  |
|__________|
```

When `first()` completes:

```text
| second() |
| third()  |
|__________|
```

When `second()` completes:

```text
| third()  |
|__________|
```

Finally, `third()` completes:

```text
|          |
|__________|
```

The stack becomes empty.

### Important

JavaScript function calls are generally synchronous unless asynchronous behavior is introduced through runtime mechanisms.

---

# 6. What Is Memory Heap?

The Memory Heap is a region of memory used for dynamically allocated data.

Objects, arrays, functions, and other dynamically allocated values are generally represented using heap-managed memory.

### Example

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

const numbers = [10, 20, 30];

function greet() {
    console.log("Hello");
}
```

Conceptually:

```text
         Memory

    __________________
   |                  |
   |    Call Stack    |
   |__________________|
   |                  |
   |   Memory Heap    |
   |                  |
   |  User Object     |
   |  Numbers Array   |
   |  Function Data   |
   |__________________|
```

### Stack vs Heap

| Call Stack | Memory Heap |
|---|---|
| Manages active function execution | Stores dynamically allocated data |
| Uses LIFO behavior for function calls | Managed through memory allocation and garbage collection |
| Tracks execution contexts | Holds objects and other allocated data |
| Supports function execution | Supports object and data storage |

**Important:** This is a conceptual model. Actual JavaScript engines use more complex memory representations and optimizations.

---

# 7. What Is an Execution Context?

An Execution Context is the environment in which JavaScript code is evaluated and executed.

Whenever JavaScript executes code, it does so within an execution context.

There are several types of execution contexts.

1. Global Execution Context.
2. Function Execution Context.
3. Eval Execution Context.

The `eval()` execution context is associated with direct `eval()` execution and is generally best avoided.

---

# 8. Global Execution Context (GEC)

The Global Execution Context is created when JavaScript begins evaluating a script or module.

It provides the environment for top-level code.

### Example

```javascript
var name = "Riyaz";

let age = 25;

function greet() {
    console.log("Hello");
}

console.log(name);

console.log(age);

greet();
```

Before the code executes, JavaScript prepares the global execution environment.

Conceptually, it handles:

- Global declarations.
- Global lexical bindings.
- Global function declarations.
- The global `this` value, depending on the execution environment.

### Important: Global `this`

In a classic browser script:

```javascript
console.log(this === window);
```

Output:

```text
true
```

In a Node.js CommonJS module, top-level `this` is generally the module's `exports` object, not `globalThis`.

In an ES module, top-level `this` is `undefined`.

Therefore, global `this` behavior depends on the environment and module type.

---

# 9. Function Execution Context (FEC)

Whenever a function is called, a new Function Execution Context is created.

### Example

```javascript
const globalValue = 100;

function calculate(a, b) {

    const result = a + b;

    console.log(result);

}

calculate(10, 20);
```

When `calculate()` is called, JavaScript creates a new execution context for it.

Conceptually, it contains:

- Function parameters.
- Local variables.
- Function declarations.
- Lexical environment.
- `this` binding, depending on how the function is called.

After the function finishes, its execution context is removed from the Call Stack.

However, objects or variables associated with that function may remain reachable through closures or other references.

---

# 10. Creation Phase and Execution Phase

JavaScript execution is often explained using two conceptual phases.

1. Creation Phase.
2. Execution Phase.

This model is useful for understanding hoisting and variable initialization.

### Example

```javascript
console.log(name);

var name = "Riyaz";

function greet() {
    console.log("Hello");
}

greet();
```

Output:

```text
undefined
Hello
```

Why?

Because JavaScript prepares declarations before executing statements.

## Creation Phase

During environment setup:

- Function declarations are initialized.
- `var` bindings are created and initialized to `undefined`.
- `let` and `const` bindings are created but remain uninitialized.
- Other environment information is established.

## Execution Phase

JavaScript executes statements in order.

```javascript
console.log(name);

var name = "Riyaz";
```

Conceptually, the `var` declaration is initialized before the execution reaches the logging statement.

The assignment to `"Riyaz"` happens when the declaration statement executes.

### Important

Creation Phase and Execution Phase are teaching models. ECMAScript specifies environment and binding behavior more precisely rather than requiring every engine to implement exactly two physical phases.

---

# 11. What Is Hoisting Internally?

Hoisting describes JavaScript's behavior of processing declarations before their apparent position in source code.

It does not literally mean JavaScript moves source-code lines to the top.

### 1. var Hoisting

```javascript
console.log(name);

var name = "Riyaz";
```

Output:

```text
undefined
```

Conceptually:

```javascript
var name;

console.log(name);

name = "Riyaz";
```

### 2. Function Declaration Hoisting

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

Function declarations are available before their textual declaration.

### 3. let and const Hoisting

```javascript
console.log(age);

let age = 25;
```

Result:

```text
ReferenceError
```

`let` and `const` declarations are registered in their lexical environment but cannot be accessed before initialization.

### Hoisting Comparison

| Declaration | Binding Created Before Execution? | Initial State |
|---|---|---|
| `var` | Yes | `undefined` |
| `let` | Yes | Uninitialized |
| `const` | Yes | Uninitialized |
| Function declaration | Yes | Function available |

---

# 12. Temporal Dead Zone (TDZ)

The Temporal Dead Zone is the period between entering a scope and initializing a `let` or `const` binding.

During this period, accessing the variable causes a ReferenceError.

### Example

```javascript
{
    console.log(age);

    let age = 25;
}
```

Error:

```text
ReferenceError: Cannot access 'age' before initialization
```

### Another Example

```javascript
{
    let age = 25;

    console.log(age);
}
```

Output:

```text
25
```

### TDZ with const

```javascript
{
    console.log(name);

    const name = "Riyaz";
}
```

This also throws a ReferenceError.

### Important

The TDZ is not a separate physical memory area.

It describes the period during which a lexical binding exists but is not initialized.

---

# 13. What Is a Lexical Environment?

A Lexical Environment is a specification-level structure used by JavaScript to manage identifiers and their values.

It is associated with the location where code is written.

It helps JavaScript determine:

- Which variable is being accessed.
- Where that variable is declared.
- Whether a variable exists in the current scope.
- Which outer scope should be searched.

### Example

```javascript
const globalName = "Riyaz";

function outer() {

    const outerName = "Ahmed";

    function inner() {

        const innerName = "John";

        console.log(globalName);

        console.log(outerName);

        console.log(innerName);

    }

    inner();

}

outer();
```

Output:

```text
Riyaz
Ahmed
John
```

Why can `inner()` access `outerName` and `globalName`?

Because of the Lexical Environment and its outer environment relationship.

---

# 14. Environment Records

An Environment Record stores identifier bindings for a particular environment.

In simple terms, it keeps track of variables and declarations associated with a scope.

The ECMAScript specification defines different types of Environment Records.

Some important ones include:

| Environment Record | Purpose |
|---|---|
| Declarative Environment Record | Stores declarations such as `let`, `const`, and function bindings |
| Object Environment Record | Uses an object to provide bindings, such as certain global environment bindings |
| Function Environment Record | Provides function-specific bindings, including parameters and `this` |
| Global Environment Record | Represents the global environment and combines relevant global binding mechanisms |
| Module Environment Record | Handles module-level bindings |

### Example

```javascript
let name = "Riyaz";

function greet() {

    let message = "Hello";

    console.log(name);

    console.log(message);

}
```

Conceptually:

```text
Global Environment
       |
       |-- name = "Riyaz"
       |
       v
Function Environment
       |
       |-- message = "Hello"
```

This is a conceptual representation, not a literal diagram of engine memory.

---

# 15. Lexical Scope

Lexical Scope means variable accessibility is determined by where code is written.

### Example

```javascript
const name = "Riyaz";

function outer() {

    const age = 25;

    function inner() {

        console.log(name);

        console.log(age);

    }

    inner();

}

outer();
```

Output:

```text
Riyaz
25
```

The `inner()` function can access variables from its outer lexical scopes.

### Important

Lexical scope is determined by source-code structure, not by the location from which a function is called.

Consider:

```javascript
const name = "Global";

function outer() {

    const name = "Outer";

    return function inner() {
        console.log(name);
    };

}

const result = outer();

function another() {

    const name = "Another";

    result();

}

another();
```

Output:

```text
Outer
```

Why?

Because `inner()` was defined inside `outer()`.

It uses its lexical environment, not the caller's local variables.

---

# 16. Scope Chain

When JavaScript searches for a variable, it first looks in the current environment.

If the variable is not found, it searches the outer environment.

This process continues until it reaches the outermost environment.

This is called the Scope Chain.

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
       Global Scope
       a = 10
           |
           v
       Outer Scope
       b = 20
           |
           v
       Inner Scope
       c = 30
```

When `inner()` accesses `a`:

1. Search inner scope.
2. `a` not found.
3. Search outer scope.
4. `a` not found.
5. Search global scope.
6. `a` found.

---

# 17. Variable Environment vs Lexical Environment

These terms appear in JavaScript execution-context explanations.

### Lexical Environment

It represents identifier bindings and their outer environment relationship.

### Variable Environment

In the ECMAScript execution-context model, the Variable Environment is a component associated with variable and function declarations.

The exact relationship between Variable Environment and Lexical Environment is more detailed than a simple "one stores `var`, the other stores `let`" rule.

For learning purposes, remember:

- Lexical Environment is central to scope and identifier resolution.
- Variable Environment is part of the execution-context model for variable declarations.
- Function and block scopes influence where bindings are created.

Do not assume that these are two independent physical memory regions.

---

# 18. How Closures Work Internally

A Closure occurs when a function retains access to variables from its lexical environment even after the outer function has finished executing.

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

### What Happens Internally?

Step 1: `outer()` executes.

```javascript
let count = 0;
```

Step 2: `inner()` is created.

It has access to `count` through its lexical environment.

Step 3: `outer()` returns `inner`.

Step 4: The execution context of `outer()` finishes.

Step 5: `counter` still references the returned function.

Step 6: The returned function continues accessing `count`.

### Closure Diagram

```text
       outer()
          |
          v
      count = 0
          |
          v
        inner()
          |
          | Returns
          v
       counter
          |
          v
   Retained Lexical Data
       count = 0
```

The important point is that the function retains access to the lexical bindings it needs.

The engine does not necessarily retain every local variable from the outer function. It can optimize storage based on actual usage.

### Practical Uses of Closures

1. Data privacy.
2. Function factories.
3. Counters.
4. Event handlers.
5. Callbacks.
6. Memoization.
7. Maintaining state between function calls.

---

# 19. Closure Example: Data Privacy

```javascript
function createBankAccount(initialBalance) {

    let balance = initialBalance;

    return {

        deposit(amount) {
            balance += amount;
        },

        withdraw(amount) {

            if (amount > balance) {
                throw new Error("Insufficient balance");
            }

            balance -= amount;
        },

        getBalance() {
            return balance;
        }

    };

}

const account = createBankAccount(1000);

account.deposit(500);

account.withdraw(200);

console.log(account.getBalance());
```

Output:

```text
1300
```

Try:

```javascript
console.log(account.balance);
```

Output:

```text
undefined
```

The balance variable is private because it is accessible through the closure rather than through the returned object.

---

# 20. What Is Garbage Collection?

Garbage Collection is the process of automatically reclaiming memory that is no longer needed.

JavaScript engines manage memory automatically.

You generally don't manually allocate and free memory like you might in languages such as C.

### Example

```javascript
let user = {
    name: "Riyaz"
};

user = null;
```

Initially:

```text
user ───────> Object
              name: "Riyaz"
```

After:

```javascript
user = null;
```

The object no longer has a reference from `user`.

If nothing else can reach that object, it becomes eligible for garbage collection.

**Important:** Eligible for collection does not mean the engine must collect it immediately.

---

# 21. Mark-and-Sweep Algorithm

Mark-and-Sweep is a common garbage collection technique.

It is useful for understanding how JavaScript engines identify unreachable objects.

### Two Main Steps

**Step 1: Mark**

The garbage collector starts from known roots and identifies reachable objects.

Common roots include:

- Active execution state.
- Global references.
- Other engine-maintained references.

**Step 2: Sweep**

Objects that are not reachable are identified as garbage and their memory can be reclaimed.

### Diagram

Before garbage collection:

```text
       Root
        |
        v
      Object A
        |
        v
      Object B


      Object C
        |
        v
      Object D
```

Suppose Object C and Object D cannot be reached from any root.

After marking:

```text
       Root
        |
        v
      Object A
        |
        v
      Object B


      Object C  -> Unreachable
        |
        v
      Object D  -> Unreachable
```

After sweeping:

```text
       Root
        |
        v
      Object A
        |
        v
      Object B
```

Memory occupied by unreachable objects can be reclaimed.

### Important

Modern engines such as V8 use more sophisticated garbage collection strategies, including generational and incremental techniques. Mark-and-Sweep is a foundational concept, not a complete description of V8's current collector.

---

# 22. What Is a Memory Leak?

A Memory Leak happens when an application retains references to data that it no longer needs.

Because the data remains reachable, garbage collection cannot reclaim it.

### Example: Unnecessary Global Reference

```javascript
const users = [];

function addUsers() {

    for (let i = 0; i < 100000; i++) {

        users.push({
            id: i,
            name: `User ${i}`
        });

    }

}
```

If `addUsers()` keeps running and the array continues growing without a reason, memory consumption can increase.

### Example: Event Listener Leak

```javascript
function attachListener() {

    const largeData = new Array(1000000).fill("Data");

    window.addEventListener("resize", function () {

        console.log(largeData.length);

    });

}
```

Every call creates a new listener that retains access to `largeData`.

If listeners are never removed, memory may remain occupied unnecessarily.

### Better Approach

```javascript
function attachListener() {

    const largeData = new Array(1000000).fill("Data");

    function handleResize() {
        console.log(largeData.length);
    }

    window.addEventListener("resize", handleResize);

    return function cleanup() {
        window.removeEventListener("resize", handleResize);
    };

}
```

Usage:

```javascript
const cleanup = attachListener();

// When no longer needed:
cleanup();
```

### Common Causes of Memory Leaks

1. Unnecessary global variables.
2. Event listeners not removed.
3. Timers not cleared.
4. Unbounded caches.
5. Detached DOM elements retained through references.
6. Closures retaining unnecessary data.
7. Unclosed resources.

---

# 23. What Is the Event Loop?

The Event Loop is a runtime mechanism that coordinates JavaScript execution with asynchronous tasks.

It helps JavaScript handle asynchronous operations without blocking the main JavaScript thread while those operations are waiting.

### Example

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

console.log("End");
```

Output:

```text
Start
End
Timeout
```

Why?

1. `console.log("Start")` executes.
2. The timer is registered with the runtime.
3. `console.log("End")` executes.
4. The timer callback becomes eligible for execution after the timer expires and scheduling conditions are met.
5. The callback runs when JavaScript can process the relevant task.

### Event Loop Diagram

```text
          Call Stack
              |
              v
       Execute JavaScript
              |
              v
       Runtime APIs
              |
              v
       Task Scheduling
              |
              v
          Event Loop
              |
       __________________
      |                  |
      v                  v
  Task Queue        Microtask Queue
      |                  |
      |__________________|
              |
              v
          Call Stack
```

This is a simplified model. Actual browser event-loop processing includes multiple task sources, rendering opportunities, and microtask checkpoints.

---

# 24. What Are Web APIs?

Web APIs are interfaces provided by the browser environment.

They are not part of the core JavaScript language itself.

Examples:

| Web API | Purpose |
|---|---|
| DOM API | Manipulates HTML elements |
| Fetch API | Makes network requests |
| Timer APIs | Schedules callbacks |
| Storage API | Stores browser data |
| Geolocation API | Accesses location with permission |
| Canvas API | Draws graphics |
| WebSocket API | Supports real-time communication |

### Example

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 1000);

console.log("End");
```

`setTimeout()` is provided by the runtime environment.

The JavaScript engine executes the callback when the runtime schedules it and JavaScript can process it.

### Important

The exact mechanism used to implement timers and network operations is runtime-specific.

In browsers, these are browser-provided APIs.

In Node.js, corresponding functionality is provided by Node.js and its underlying libraries.

---

# 25. What Is the Task Queue?

A Task Queue is a conceptual queue of tasks waiting to be processed by the event loop.

Tasks are also commonly called macrotasks, although the HTML specification generally uses the term task.

Examples of operations that can schedule tasks include:

- `setTimeout()`.
- `setInterval()`.
- DOM events.
- Some message-channel operations.

### Example

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");
```

Output:

```text
A
C
B
```

The timer callback runs later as a task.

**Important:** A zero-millisecond timer does not mean immediate execution. It means the callback becomes eligible after the timer's minimum delay and scheduling conditions are met.

---

# 26. What Is the Microtask Queue?

Microtasks are a special category of jobs/tasks processed at microtask checkpoints.

In browsers, microtasks are processed after the current task finishes and before the browser proceeds to its next task or rendering opportunity.

Common microtask sources include:

- Promise callbacks (`then`, `catch`, `finally`).
- `queueMicrotask()`.
- MutationObserver callbacks.

### Example

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");
```

Output:

```text
Start
End
Promise
Timeout
```

Why?

1. Synchronous code executes first.
2. Promise callback is scheduled as a microtask.
3. Timer callback is scheduled as a task.
4. Current synchronous execution finishes.
5. Microtasks are processed.
6. The timer task runs when selected by the event loop.

### Task vs Microtask

| Task | Microtask |
|---|---|
| Often called macrotask | Microtask |
| Examples: timers and user events | Examples: Promise callbacks and `queueMicrotask()` |
| Scheduled through task sources | Scheduled through the microtask mechanism |
| Processed according to event-loop task selection | Processed at microtask checkpoints |

**Important:** Microtasks can enqueue additional microtasks. If they keep doing so indefinitely, they can delay rendering and other tasks.

---

# 27. Understanding Event Loop Execution Order

Let's analyze a more interesting example.

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

Promise.resolve().then(() => {
    console.log("3");
});

queueMicrotask(() => {
    console.log("4");
});

console.log("5");
```

Output:

```text
1
5
3
4
2
```

### Step-by-Step Explanation

**Step 1**

```javascript
console.log("1");
```

Output:

```text
1
```

**Step 2**

```javascript
setTimeout(() => {
    console.log("2");
}, 0);
```

The timer callback is scheduled as a task.

**Step 3**

```javascript
Promise.resolve().then(() => {
    console.log("3");
});
```

The Promise callback is scheduled as a microtask.

**Step 4**

```javascript
queueMicrotask(() => {
    console.log("4");
});
```

Another microtask is scheduled.

**Step 5**

```javascript
console.log("5");
```

Output:

```text
5
```

**Step 6**

Synchronous execution finishes.

Microtasks execute in queue order:

```text
3
4
```

**Step 7**

The timer callback runs:

```text
2
```

Final output:

```text
1
5
3
4
2
```

---

# 28. Promise Microtasks and Nested Microtasks

Consider:

```javascript
console.log("Start");

Promise.resolve().then(() => {

    console.log("Promise 1");

    Promise.resolve().then(() => {
        console.log("Promise 2");
    });

});

Promise.resolve().then(() => {
    console.log("Promise 3");
});

console.log("End");
```

Output:

```text
Start
End
Promise 1
Promise 3
Promise 2
```

Why?

Initially, the microtask queue is:

```text
Promise 1
Promise 3
```

When `Promise 1` executes, it schedules another microtask.

The queue becomes:

```text
Promise 3
Promise 2
```

Therefore, `Promise 3` executes before `Promise 2`.

This is important for understanding asynchronous JavaScript execution order.

---

# 29. Rendering and the Event Loop

Browsers also need to render the user interface.

Rendering includes:

- Style calculation.
- Layout.
- Paint.
- Compositing.

The browser coordinates JavaScript execution and rendering opportunities.

### Simplified Browser Cycle

```text
       Execute Task
            |
            v
    Process Microtasks
            |
            v
    Rendering Opportunity
            |
            v
      Browser Paint
            |
            v
       Next Task
```

This is a simplified model, not a guarantee that the browser paints after every task.

### Example: Blocking the Main Thread

```javascript
console.log("Start");

const start = Date.now();

while (Date.now() - start < 5000) {
    // Blocking JavaScript execution
}

console.log("End");
```

What happens?

For approximately five seconds:

- JavaScript keeps executing synchronously.
- The main thread cannot process other JavaScript tasks.
- User interactions may become unresponsive.
- Rendering may be delayed.

### Better Approach

For expensive computations, consider:

- Breaking work into smaller chunks.
- Using `setTimeout()` or `scheduler.yield()` where appropriate.
- Using Web Workers for CPU-intensive work.
- Optimizing the algorithm.

---

# 30. What Is Node.js Runtime Architecture?

Node.js is a JavaScript runtime built around V8 and additional native components.

It allows JavaScript to run outside browsers.

Major components include:

1. V8 Engine.
2. Node.js APIs.
3. Node.js bindings.
4. libuv.
5. Event Loop.
6. Thread Pool.
7. Operating System APIs.

### Simplified Architecture

```text
          JavaScript Code
                 |
                 v
              Node.js
                 |
       _____________________
      |                     |
      v                     v
   V8 Engine            Node APIs
      |                     |
      |                     v
      |                   libuv
      |                     |
      |          _____________________
      |         |                     |
      |         v                     v
      |     Event Loop           Thread Pool
      |         |                     |
      |_________|_____________________|
                 |
                 v
           Operating System
```

This is a conceptual view. Some operations use operating-system asynchronous facilities, while others use libuv's thread pool or execute synchronously.

---

# 31. What Is libuv?

libuv is a cross-platform library used by Node.js to support asynchronous I/O.

It provides mechanisms for:

- Event Loop.
- Asynchronous I/O.
- Thread Pool.
- Timers.
- File-system operations.
- Networking support.

### Why Does Node.js Use libuv?

JavaScript execution alone does not provide all the operating-system-level capabilities needed by a server runtime.

libuv helps Node.js manage asynchronous operations efficiently.

### Example

```javascript
const fs = require("fs");

console.log("Start");

fs.readFile("data.txt", "utf8", (error, data) => {

    if (error) {
        console.error(error);
        return;
    }

    console.log(data);

});

console.log("End");
```

Possible output:

```text
Start
End
File contents...
```

Why?

The file read is requested, but JavaScript doesn't synchronously wait for the entire operation to finish.

The callback executes when the operation completes and is scheduled for JavaScript execution.

---

# 32. What Is the Node.js Event Loop?

Node.js uses an event loop that coordinates asynchronous callbacks.

The event loop is implemented with help from libuv.

Node.js documents several event-loop phases.

### Major Phases

| Phase | Purpose |
|---|---|
| Timers | Executes eligible timer callbacks |
| Pending Callbacks | Executes certain deferred system-level callbacks |
| Idle, Prepare | Internal libuv operations |
| Poll | Retrieves and processes I/O events |
| Check | Executes `setImmediate()` callbacks |
| Close Callbacks | Executes certain close-event callbacks |

### Simplified Diagram

```text
        Timers
           |
           v
   Pending Callbacks
           |
           v
      Idle / Prepare
           |
           v
          Poll
           |
           v
         Check
           |
           v
    Close Callbacks
           |
           v
        Repeat
```

**Important:** This is a simplified phase diagram. Node.js also has Promise microtask processing and the special `process.nextTick()` queue, which affect callback ordering.

---

# 33. setTimeout vs setImmediate in Node.js

Both schedule callbacks, but they behave differently.

### setTimeout()

Schedules a callback after a specified minimum delay.

```javascript
setTimeout(() => {
    console.log("Timeout");
}, 0);
```

### setImmediate()

Schedules a callback to execute in the Check phase.

```javascript
setImmediate(() => {
    console.log("Immediate");
});
```

### Example

```javascript
const fs = require("fs");

fs.readFile(__filename, () => {

    setTimeout(() => {
        console.log("Timeout");
    }, 0);

    setImmediate(() => {
        console.log("Immediate");
    });

});
```

Expected output in this I/O callback context:

```text
Immediate
Timeout
```

Why?

The I/O callback runs during event-loop processing. The `setImmediate()` callback is scheduled for the Check phase, which follows Poll.

The zero-delay timer generally becomes eligible for the Timers phase of a subsequent loop iteration.

### Important

At top level, the relative order of `setTimeout(fn, 0)` and `setImmediate(fn)` is not guaranteed in every situation.

Do not write code that depends on a fixed ordering between them at top level.

---

# 34. What Is the Node.js Thread Pool?

Node.js uses a thread pool through libuv for certain operations.

By default, the libuv thread pool has four worker threads.

Some operations that can use it include:

- Many file-system operations.
- Certain DNS operations, such as `dns.lookup()`.
- Some cryptographic operations.
- Some compression operations.

### Example

```javascript
const fs = require("fs");

console.log("Start");

fs.readFile("data.txt", "utf8", (error, data) => {

    if (error) {
        console.error(error);
        return;
    }

    console.log("File Read Completed");

});

console.log("End");
```

The file operation can be handled through libuv's asynchronous mechanisms, including its thread pool for typical file-system operations.

### Important

Not every asynchronous operation uses the thread pool.

For example:

- Network sockets generally use operating-system asynchronous I/O facilities.
- JavaScript callbacks execute on the event-loop thread.
- Some operations are synchronous and block the calling thread.

### Changing Thread Pool Size

You can configure the libuv thread pool size through:

```bash
UV_THREADPOOL_SIZE=8 node app.js
```

On Windows Command Prompt:

```cmd
set UV_THREADPOOL_SIZE=8 && node app.js
```

Configure it before the thread pool is initialized.

Increasing the pool size does not automatically improve performance. It depends on workload and available system resources.

---

# 35. Event-Driven and Non-Blocking I/O

Node.js is designed around event-driven, non-blocking I/O.

### Blocking Example

```javascript
const fs = require("fs");

console.log("Start");

const data = fs.readFileSync("data.txt", "utf8");

console.log(data);

console.log("End");
```

Execution waits for the file read to complete.

Output order:

```text
Start
File contents...
End
```

### Non-Blocking Example

```javascript
const fs = require("fs");

console.log("Start");

fs.readFile("data.txt", "utf8", (error, data) => {

    if (error) {
        console.error(error);
        return;
    }

    console.log(data);

});

console.log("End");
```

Output:

```text
Start
End
File contents...
```

### Blocking vs Non-Blocking

| Blocking I/O | Non-Blocking I/O |
|---|---|
| Waits for the operation to finish | Allows execution to continue |
| Can block the event-loop thread | Can keep the event loop available |
| Often simpler for small scripts | Useful for concurrent I/O workloads |
| Example: `readFileSync()` | Example: `readFile()` |

**Important:** Non-blocking I/O does not mean the operation itself executes on the JavaScript thread. It means the calling JavaScript code does not need to wait synchronously for completion.

---

# 36. Why Is Node.js Good for APIs?

Node.js is useful for building APIs because it handles many I/O-bound operations efficiently.

Consider an API server receiving multiple requests.

```text
Request 1 ----\
Request 2 -----\
Request 3 ------> Node.js Server
Request 4 -----/        |
Request 5 ----/         v
                    Async I/O
                        |
                        v
                    Database
                        |
                        v
                 Process Callbacks
```

While one request is waiting for a database or network operation, Node.js can continue processing other work.

### Important

Node.js is not automatically ideal for every workload.

CPU-intensive JavaScript running on the main thread can block the event loop.

For CPU-heavy work, consider:

- Worker Threads.
- Child Processes.
- Separate worker services.
- External job-processing systems.

---

# 37. Worker Threads in Node.js

Worker Threads allow JavaScript to execute CPU-intensive tasks on separate threads.

They are useful when heavy computation would otherwise block the main event loop.

### Main File: `main.js`

```javascript
const { Worker } = require("worker_threads");

const worker = new Worker("./worker.js");

worker.on("message", (result) => {
    console.log("Result:", result);
});

worker.on("error", (error) => {
    console.error(error);
});

worker.on("exit", (code) => {
    console.log("Worker exited:", code);
});
```

### Worker File: `worker.js`

```javascript
const { parentPort } = require("worker_threads");

let total = 0;

for (let i = 0; i < 100000000; i++) {
    total += i;
}

parentPort.postMessage(total);
```

The worker performs the calculation separately from the main JavaScript thread.

### Worker Threads vs Thread Pool

| Worker Threads | libuv Thread Pool |
|---|---|
| Execute JavaScript in separate worker threads | Used internally for supported native operations |
| Useful for CPU-intensive JavaScript | Useful for certain I/O and native operations |
| Created and managed through Node.js APIs | Managed by libuv |
| Can communicate through messages | Not a general-purpose JavaScript worker API |

---

# 38. JavaScript Memory Management

Let's summarize how JavaScript manages memory.

Memory management involves three broad activities:

1. Allocation.
2. Usage.
3. Release.

### 1. Allocation

Memory is allocated when values and objects are created.

```javascript
const user = {
    name: "Riyaz"
};
```

### 2. Usage

The program reads and modifies values.

```javascript
console.log(user.name);
```

### 3. Release

When an object is no longer reachable, the garbage collector may reclaim its memory.

```javascript
let user = {
    name: "Riyaz"
};

user = null;
```

### Important Memory Concepts

| Concept | Meaning |
|---|---|
| Memory Allocation | Reserving memory for values |
| Reachability | Whether an object can be accessed from known roots |
| Garbage Collection | Reclaiming unreachable memory |
| Memory Leak | Unnecessary references keep memory alive |
| Heap | Memory used for dynamically allocated data |
| Stack | Execution-related call management |

---

# 39. JavaScript Execution: Complete Example

Let's combine several concepts.

```javascript
console.log("Global Start");

const globalValue = 100;

function outer() {

    const outerValue = 200;

    function inner() {

        const innerValue = 300;

        console.log(globalValue);

        console.log(outerValue);

        console.log(innerValue);

    }

    return inner;

}

const result = outer();

result();

console.log("Global End");
```

Output:

```text
Global Start
100
200
300
Global End
```

### What Happens Internally?

**Step 1:** Global Execution Context is created.

**Step 2:** Global declarations are prepared.

**Step 3:** JavaScript executes:

```javascript
console.log("Global Start");
```

**Step 4:** `outer()` is called.

A Function Execution Context is created.

**Step 5:** `inner()` is created inside `outer()`.

It has access to the outer lexical environment.

**Step 6:** `outer()` returns `inner`.

**Step 7:** `outer()` finishes.

**Step 8:** `result()` executes.

The returned function can still access the variables from its lexical environment.

**Step 9:** The remaining global code executes.

This example demonstrates:

- Global Execution Context.
- Function Execution Context.
- Call Stack.
- Lexical Scope.
- Scope Chain.
- Closures.

---

# 40. Common JavaScript Runtime Misconceptions

| Misconception | Correct Explanation |
|---|---|
| JavaScript is entirely single-threaded | JavaScript execution agents generally execute one piece of JS at a time, but runtimes provide additional threads and asynchronous facilities |
| Async code runs in the background automatically | Runtime mechanisms perform or coordinate asynchronous operations |
| `setTimeout(fn, 0)` executes immediately | It schedules a callback for later |
| Promises execute before synchronous code finishes | Promise callbacks execute as microtasks after the current synchronous execution |
| Every object is always stored in the heap in one fixed way | Engines use optimized and implementation-specific memory representations |
| Hoisting moves code to the top | Declarations are processed according to language rules; source code is not literally rearranged |
| Closures keep every outer variable forever | Engines can retain only the data needed by reachable closures |
| Garbage collection happens immediately | Collection timing is controlled by the engine |
| Node.js uses the thread pool for everything asynchronous | Different operations use different mechanisms |
| More threads always mean better performance | Thread overhead and workload characteristics matter |

---

# 41. Important Interview Questions

### Basic Questions

1. What is a JavaScript Engine?
2. What is a JavaScript Runtime Environment?
3. What is V8?
4. What is the Call Stack?
5. What is Memory Heap?
6. What is an Execution Context?
7. What is Global Execution Context?
8. What is Function Execution Context?
9. What is Hoisting?
10. What is Temporal Dead Zone?

### Intermediate Questions

11. What is a Lexical Environment?
12. What are Environment Records?
13. What is Lexical Scope?
14. What is Scope Chain?
15. How do Closures work internally?
16. What is Garbage Collection?
17. What is Mark-and-Sweep?
18. What is a Memory Leak?
19. What is the Event Loop?
20. What is the difference between Task Queue and Microtask Queue?

### Advanced Questions

21. Explain the V8 Engine architecture.
22. What is the difference between an interpreter and a compiler?
23. How does JavaScript execute asynchronous operations?
24. What is the difference between a JavaScript Engine and Runtime?
25. How does the browser Event Loop work?
26. How does Node.js Event Loop work?
27. What are the phases of the Node.js Event Loop?
28. What is libuv?
29. What is the libuv Thread Pool?
30. What is the difference between `setImmediate()` and `setTimeout()`?
31. What are Worker Threads?
32. Why can CPU-intensive tasks block Node.js?
33. How does garbage collection identify unreachable objects?
34. How can closures contribute to memory leaks?
35. How would you investigate a memory leak in Node.js?

---

# 42. Practical Exercises

Try these exercises yourself.

### Exercise 1: Call Stack

Create three nested functions:

```javascript
first()
second()
third()
```

Call them in a nested sequence and predict the Call Stack at every step.

### Exercise 2: Hoisting

Predict the output:

```javascript
console.log(a);

var a = 10;

function test() {
    console.log(b);

    var b = 20;
}

test();
```

### Exercise 3: Temporal Dead Zone

Explain why this code throws an error:

```javascript
{
    console.log(name);

    let name = "Riyaz";
}
```

### Exercise 4: Closure

Create a counter using closures.

Requirements:

- Increment.
- Decrement.
- Reset.
- Get current value.

Keep the counter variable private.

### Exercise 5: Event Loop

Predict the output:

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

queueMicrotask(() => {
    console.log("D");
});

console.log("E");
```

### Exercise 6: Memory Leak

Create a browser application that attaches an event listener.

Then:

1. Create a function to attach the listener.
2. Call the function multiple times.
3. Observe the number of listeners.
4. Implement cleanup.
5. Verify that unnecessary listeners are removed.

### Exercise 7: Node.js Event Loop

Create a Node.js program using:

- `setTimeout()`
- `setImmediate()`
- `process.nextTick()`
- `Promise.then()`
- `fs.readFile()`

Predict the execution order and then verify it experimentally.

---

# 43. Output-Based Questions

Try to solve these without executing the code.

### Question 1: Hoisting

```javascript
console.log(a);

var a = 10;

function test() {
    console.log(a);
    var a = 20;
}

test();
```

What is the output?

### Question 2: Closure

```javascript
function outer() {

    let count = 0;

    return function () {
        count++;
        console.log(count);
    };

}

const counter1 = outer();

counter1();
counter1();

const counter2 = outer();

counter2();
```

What is the output?

### Question 3: Event Loop

```javascript
console.log("1");

setTimeout(() => {
    console.log("2");
}, 0);

Promise.resolve().then(() => {
    console.log("3");
});

console.log("4");
```

What is the output?

### Question 4: Nested Microtasks

```javascript
Promise.resolve().then(() => {

    console.log("A");

    queueMicrotask(() => {
        console.log("B");
    });

});

Promise.resolve().then(() => {
    console.log("C");
});
```

What is the output?

### Question 5: Call Stack

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

What is the Call Stack when `third()` begins executing?

### Question 6: Scope Chain

```javascript
const value = "Global";

function outer() {

    const value = "Outer";

    function inner() {

        console.log(value);

    }

    return inner;

}

const fn = outer();

fn();
```

What is the output, and why?

---

# 44. Official Documentation & Learning Resources

1. [MDN JavaScript Execution Model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model?utm_source=chatgpt.com)
2. [MDN Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop?utm_source=chatgpt.com)
3. [V8 Documentation](https://v8.dev/docs?utm_source=chatgpt.com)
4. [V8 Blog](https://v8.dev/blog?utm_source=chatgpt.com)
5. [Node.js Event Loop Guide](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick?utm_source=chatgpt.com)
6. [Node.js Worker Threads](https://nodejs.org/api/worker_threads.html?utm_source=chatgpt.com)
7. [Node.js Performance Hooks](https://nodejs.org/api/perf_hooks.html?utm_source=chatgpt.com)
8. [ECMAScript Specification](https://tc39.es/ecma262/?utm_source=chatgpt.com)

---

# 45. Phase 17 – Revision Checklist

Before moving to the next phase, make sure you understand:

- [ ] How JavaScript Executes.
- [ ] JavaScript Engine.
- [ ] V8 Engine.
- [ ] AST.
- [ ] Interpreter and Compiler.
- [ ] JavaScript Runtime Environment.
- [ ] Browser Runtime vs Node.js Runtime.
- [ ] Call Stack.
- [ ] Memory Heap.
- [ ] Execution Context.
- [ ] Global Execution Context.
- [ ] Function Execution Context.
- [ ] Creation Phase and Execution Phase.
- [ ] Hoisting Internals.
- [ ] Temporal Dead Zone.
- [ ] Lexical Environment.
- [ ] Environment Records.
- [ ] Lexical Scope.
- [ ] Scope Chain.
- [ ] Variable Environment.
- [ ] Closures Internals.
- [ ] Garbage Collection.
- [ ] Mark-and-Sweep.
- [ ] Memory Leaks.
- [ ] Event Loop.
- [ ] Web APIs.
- [ ] Task Queue.
- [ ] Microtask Queue.
- [ ] Promise Execution Order.
- [ ] Browser Rendering and Event Loop.
- [ ] Node.js Runtime Architecture.
- [ ] libuv.
- [ ] Node.js Event Loop Phases.
- [ ] Thread Pool.
- [ ] Blocking vs Non-Blocking I/O.
- [ ] Worker Threads.
- [ ] JavaScript Memory Management.

---

# JavaScript Roadmap Progress

| Phase | Topic | Status |
|---|---|---|
| 1–5 | Fundamentals to Core Concepts | Completed |
| 6 | DOM & Browser APIs | Completed |
| 7 | Asynchronous JavaScript | Completed |
| 8 | Modern JavaScript (ES6+) | Completed |
| 9 | Advanced JavaScript | Completed |
| 10 | Modules & Tooling | Completed |
| 11 | Browser APIs & Web Storage | Completed |
| 12 | Networking & HTTP | Completed |
| 13 | Security & Performance | Completed |
| 14 | Design Patterns & Architecture | Completed |
| 15 | Testing & Debugging | Completed |
| 16 | TypeScript | Completed |
| **17** | **JavaScript Runtime & Internals** | **Completed** |

## Next Phase – Phase 18: Advanced JavaScript Concepts & Problem Solving

We will cover:

1. Referential Equality.
2. Shallow Copy vs Deep Copy.
3. Object References.
4. Structured Clone.
5. Deep Freeze.
6. Immutability.
7. Pure Functions.
8. Side Effects.
9. Currying.
10. Partial Application.
11. Function Composition.
12. Higher-Order Functions.
13. Memoization.
14. Recursion.
15. Tail Recursion.
16. Debouncing Internals.
17. Throttling Internals.
18. Event Delegation Internals.
19. Prototype Chain Deep Dive.
20. Property Descriptors.
21. Getters and Setters.
22. Symbols.
23. Iterators and Generators.
24. Custom Iterables.
25. WeakMap and WeakSet.
26. Map and Set Internals.
27. Proxy and Reflect.
28. Advanced Promise Patterns.
29. Async Iterators.
30. JavaScript Problem-Solving Patterns.

**Phase 17 is complete.**