Understood. We will prepare **complete JavaScript Phase 1 notes in English**, in a structured revision-friendly format.

The notes will include:
- Clear definitions.
- Detailed explanations.
- Syntax and code examples.
- Differences between related concepts.
- Practical examples.
- Important interview points.

# JavaScript – Phase 1: Fundamentals

## 1. Introduction to JavaScript

### 1.1 What is JavaScript?

JavaScript is a high-level, dynamically typed, multi-paradigm programming language primarily used to develop interactive and dynamic web applications.

It allows developers to implement functionality such as:
- Handling user interactions.
- Updating website content dynamically.
- Validating forms.
- Communicating with APIs.
- Creating animations.
- Developing frontend and backend applications.

### 1.2 HTML vs CSS vs JavaScript

| Technology | Purpose | Description |
|---|---|---|
| HTML | Structure | Defines the structure and content of a webpage. |
| CSS | Presentation | Controls the layout, styling, and appearance. |
| JavaScript | Behaviour | Adds functionality and interactivity. |

**Example:**

```html
<button id="btn">Click Me</button>

<script>
    document.getElementById("btn").addEventListener("click", () => {
        alert("Button Clicked!");
    });
</script>
```

Here:
- HTML creates the button.
- CSS can style the button.
- JavaScript handles the click event.

### 1.3 Characteristics of JavaScript

| Characteristic | Description |
|---|---|
| High-Level Language | Developers do not need to manage low-level hardware operations directly. |
| Dynamically Typed | Variable types are determined at runtime. |
| Single-Threaded Execution | JavaScript's main execution thread executes one task at a time. |
| Multi-Paradigm | Supports procedural, object-oriented, and functional programming. |
| Prototype-Based | Objects can inherit properties and methods from other objects. |
| Garbage Collected | Automatically manages memory allocation and reclamation. |
| First-Class Functions | Functions can be assigned to variables, passed as arguments, and returned from other functions. |
| Event-Driven | Can execute functions in response to events such as clicks and keyboard input. |

### 1.4 Where is JavaScript Used?

| Area | Technology | Purpose |
|---|---|---|
| Frontend Development | React, Angular, Vue | Building user interfaces. |
| Backend Development | Node.js, Express.js | Building server-side applications. |
| Full-Stack Development | Next.js | Developing complete web applications. |
| Mobile Development | React Native | Building Android and iOS applications. |
| Desktop Development | Electron | Building desktop applications. |
| Browser Automation | Playwright, Puppeteer | Automating browser operations. |
| Game Development | Phaser | Developing browser-based games. |

---

## 2. History of JavaScript

### 2.1 Who Created JavaScript?

JavaScript was created by **Brendan Eich in 1995** while working at Netscape Communications.

Important historical events:

| Year | Event |
|---|---|
| 1995 | Brendan Eich created JavaScript. |
| 1995 | Initially introduced as Mocha. |
| 1995 | Renamed LiveScript. |
| 1995 | Renamed JavaScript. |
| 1996 | Microsoft introduced JScript. |
| 1997 | JavaScript was standardized as ECMAScript. |
| 2009 | ECMAScript 5 (ES5) was released. |
| 2015 | ECMAScript 2015 (ES6) was released. |
| 2016 onwards | Annual ECMAScript releases became the standard. |

### 2.2 Why Was JavaScript Created?

JavaScript was originally developed to make webpages interactive.

Before JavaScript, webpages were primarily static and offered limited client-side interaction.

JavaScript enabled developers to:
- Respond to user actions.
- Validate forms without server requests.
- Modify webpage content dynamically.
- Create interactive user experiences.

### 2.3 JavaScript vs Java

JavaScript and Java are two completely different programming languages.

| JavaScript | Java |
|---|---|
| Dynamically typed | Statically typed |
| Prototype-based object model | Class-based object model |
| Commonly executed using JavaScript engines | Commonly executed using JVM |
| File extension: `.js` | File extension: `.java` |
| Used in frontend and backend development | Used in backend, enterprise, Android-related ecosystems, etc. |

**Important:** JavaScript is not a version or subset of Java. Their similar names were largely a marketing decision.

---

## 3. JavaScript vs ECMAScript

### 3.1 What is ECMAScript?

ECMAScript is a standardized language specification that defines the core features, syntax, and behaviour of JavaScript.

In simple terms:

- ECMAScript defines the language standard.
- JavaScript is an implementation of that standard.

JavaScript engines follow the ECMAScript specification to implement the language.

### 3.2 Difference Between JavaScript and ECMAScript

| JavaScript | ECMAScript |
|---|---|
| A programming language. | A language specification. |
| Used to develop applications. | Defines how the language should behave. |
| Implemented by JavaScript engines. | Maintained and standardized by ECMA International. |
| Includes language features and host APIs depending on the environment. | Defines the core language specification. |

### 3.3 What is ES6?

ES6 stands for ECMAScript 2015.

It introduced several important features:

1. `let` and `const`
2. Arrow Functions
3. Template Literals
4. Destructuring
5. Spread Operator
6. Rest Parameters
7. Classes
8. Promises
9. Modules
10. Default Parameters

**Note:** ES6 is one particular ECMAScript version, not another programming language.

---

## 4. JavaScript Execution Environments

JavaScript needs an execution environment to run.

The two commonly used environments are:

1. Browser
2. Node.js

### 4.1 JavaScript in Browser

Web browsers provide JavaScript engines that execute JavaScript code.

Examples:

| Browser | JavaScript Engine |
|---|---|
| Google Chrome | V8 |
| Microsoft Edge | V8 |
| Mozilla Firefox | SpiderMonkey |
| Safari | JavaScriptCore |

Browsers also provide Web APIs such as:

- DOM API
- Fetch API
- Local Storage API
- Geolocation API
- Timer APIs

Example:

```javascript
console.log("Hello Browser");

document.title = "JavaScript Learning";
```

The `document` object is provided by the browser environment.

### 4.2 What is Node.js?

Node.js is an open-source, cross-platform JavaScript runtime environment that allows JavaScript to execute outside a web browser.

It uses the V8 JavaScript engine.

Node.js provides additional APIs and modules such as:

- File System (`fs`)
- Path (`path`)
- HTTP (`http`)
- Operating System (`os`)
- Process (`process`)

Example:

```javascript
console.log("Hello Node.js");

const os = require("os");

console.log(os.platform());
```

### 4.3 Browser vs Node.js

| Browser | Node.js |
|---|---|
| Executes JavaScript inside a browser. | Executes JavaScript outside the browser. |
| Provides `window` object. | Does not provide `window` by default. |
| Provides `document` object. | Does not provide `document` by default. |
| Provides DOM APIs. | Provides Node.js APIs. |
| Commonly used for frontend development. | Commonly used for backend development and automation. |
| Provides browser storage APIs. | Provides filesystem and server-side APIs. |

**Important:** JavaScript is the language. Node.js is a runtime environment, not a programming language.

---

## 5. Variables in JavaScript

### 5.1 What is a Variable?

A variable is a named storage location used to store and access data in a program.

Example:

```javascript
let username = "Riyaz";
let age = 25;

console.log(username);
console.log(age);
```

Here:
- `username` is a variable.
- `age` is a variable.
- `"Riyaz"` and `25` are their respective values.

### 5.2 Types of Variable Declarations

JavaScript provides three keywords for declaring variables:

1. `var`
2. `let`
3. `const`

#### A. var

`var` is the traditional way of declaring variables in JavaScript.

Characteristics:
- Function-scoped.
- Can be redeclared.
- Can be reassigned.
- Can be accessed before its declaration due to hoisting, with an initial value of `undefined`.

Example:

```javascript
var name = "Riyaz";

var name = "Ahmed";

name = "Ali";

console.log(name); // Ali
```

#### B. let

`let` was introduced in ES6.

Characteristics:
- Block-scoped.
- Cannot be redeclared in the same scope.
- Can be reassigned.
- Cannot be accessed before initialization because of the Temporal Dead Zone (TDZ).

Example:

```javascript
let age = 25;

age = 26;

console.log(age); // 26
```

#### C. const

`const` was introduced in ES6.

Characteristics:
- Block-scoped.
- Cannot be redeclared in the same scope.
- Cannot be reassigned.
- Must be initialized during declaration.

Example:

```javascript
const country = "India";

console.log(country);
```

This will produce an error:

```javascript
const age = 25;

age = 26; // TypeError
```

### 5.3 Difference Between var, let and const

| Feature | var | let | const |
|---|---|---|---|
| Scope | Function | Block | Block |
| Redeclaration | Yes | No (same scope) | No (same scope) |
| Reassignment | Yes | Yes | No |
| Hoisting | Yes | Yes | Yes |
| Initial Value During Hoisting | undefined | Uninitialized | Uninitialized |
| Must Initialize During Declaration | No | No | Yes |

### 5.4 What is Block Scope?

A block is a section of code enclosed within curly braces `{}`.

Example:

```javascript
{
    let age = 25;
    const name = "Riyaz";
}

console.log(age);  // ReferenceError
console.log(name); // ReferenceError
```

`let` and `const` cannot be accessed outside their block.

However:

```javascript
{
    var city = "Ahmedabad";
}

console.log(city); // Ahmedabad
```

`var` is not block-scoped.

### 5.5 Can We Modify a const Object?

Yes. `const` prevents reassignment of the variable binding, not modification of the object itself.

Example:

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

user.age = 26; // Allowed

user.city = "Ahmedabad"; // Allowed

console.log(user);
```

But this is not allowed:

```javascript
user = {}; // TypeError
```

The same principle applies to arrays.

---

## 6. Data Types in JavaScript

### 6.1 What is a Data Type?

A data type defines the kind of value that a variable can hold and the operations that can be performed on that value.

JavaScript has two main categories of data types:

1. Primitive Data Types
2. Non-Primitive (Reference) Data Types

### 6.2 Primitive Data Types

JavaScript has seven primitive data types.

| No. | Data Type | Description | Example |
|---|---|---|---|
| 1 | String | Represents text. | `"Hello"` |
| 2 | Number | Represents integers and floating-point numbers. | `10`, `10.5` |
| 3 | Boolean | Represents true or false. | `true` |
| 4 | Undefined | A declared variable without an assigned value. | `undefined` |
| 5 | Null | Represents an intentional absence of value. | `null` |
| 6 | BigInt | Represents integers larger than the Number safe integer range. | `123n` |
| 7 | Symbol | Represents a unique identifier. | `Symbol("id")` |

Examples:

```javascript
let name = "Riyaz";          // String
let age = 25;                // Number
let isDeveloper = true;      // Boolean
let address;                 // Undefined
let salary = null;           // Null
let bigNumber = 123456789n;  // BigInt
let id = Symbol("userId");   // Symbol
```

### 6.3 Non-Primitive Data Types

Non-primitive values are objects.

Common examples include:

- Object
- Array
- Function
- Date
- Map
- Set
- RegExp

Example:

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

### 6.4 Primitive vs Non-Primitive

| Primitive | Non-Primitive |
|---|---|
| Stores primitive values. | Stores object references. |
| Immutable values. | Objects can be modified. |
| Copied by value. | Object references are copied by value. |
| Seven primitive types. | Object-based types. |
| Examples: String, Number, Boolean. | Examples: Object, Array, Function. |

### 6.5 What is typeof?

`typeof` is an operator that returns a string representing the type of a value.

Example:

```javascript
console.log(typeof "Hello");     // string
console.log(typeof 100);         // number
console.log(typeof true);        // boolean
console.log(typeof undefined);   // undefined
console.log(typeof 100n);        // bigint
console.log(typeof Symbol());    // symbol
console.log(typeof {});          // object
console.log(typeof []);          // object
console.log(typeof function(){}); // function
```

**Important JavaScript Interview Facts:**

```javascript
console.log(typeof null);       // object
console.log(typeof []);         // object
console.log(typeof NaN);        // number
```

`typeof null` returning `"object"` is a historical behaviour of JavaScript.

To check arrays:

```javascript
console.log(Array.isArray([])); // true
```

---

## 7. JavaScript Operators

### 7.1 What are Operators?

Operators are special symbols or keywords used to perform operations on values and variables.

### 7.2 Arithmetic Operators

Used to perform mathematical calculations.

| Operator | Name | Example | Result |
|---|---|---|---|
| `+` | Addition | `10 + 5` | 15 |
| `-` | Subtraction | `10 - 5` | 5 |
| `*` | Multiplication | `10 * 5` | 50 |
| `/` | Division | `10 / 5` | 2 |
| `%` | Modulus | `10 % 3` | 1 |
| `**` | Exponentiation | `2 ** 3` | 8 |
| `++` | Increment | `a++` | Increases by 1 |
| `--` | Decrement | `a--` | Decreases by 1 |

### 7.3 Assignment Operators

Used to assign or update variable values.

| Operator | Example | Equivalent |
|---|---|---|
| `=` | `a = 10` | Assign 10 |
| `+=` | `a += 5` | `a = a + 5` |
| `-=` | `a -= 5` | `a = a - 5` |
| `*=` | `a *= 5` | `a = a * 5` |
| `/=` | `a /= 5` | `a = a / 5` |
| `%=` | `a %= 5` | `a = a % 5` |
| `**=` | `a **= 2` | `a = a ** 2` |

### 7.4 Comparison Operators

Used to compare two values.

| Operator | Meaning | Example |
|---|---|---|
| `==` | Equal (with type conversion) | `5 == "5"` → true |
| `===` | Strictly equal | `5 === "5"` → false |
| `!=` | Not equal | `5 != 3` → true |
| `!==` | Strictly not equal | `5 !== "5"` → true |
| `>` | Greater than | `10 > 5` → true |
| `<` | Less than | `5 < 10` → true |
| `>=` | Greater than or equal | `10 >= 10` → true |
| `<=` | Less than or equal | `5 <= 10` → true |

**Important:** Prefer `===` and `!==` in most JavaScript applications because they avoid unexpected type coercion.

### 7.5 Increment and Decrement Operators

There are two forms:

**Post-increment:**

```javascript
let a = 10;

console.log(a++); // 10
console.log(a);   // 11
```

The current value is used first, then incremented.

**Pre-increment:**

```javascript
let a = 10;

console.log(++a); // 11
console.log(a);   // 11
```

The value is incremented first, then used.

The same concept applies to `--`.

### 7.6 Ternary Operator

The ternary operator is a shorthand for conditional expressions.

Syntax:

```javascript
condition ? expressionIfTrue : expressionIfFalse;
```

Example:

```javascript
let age = 20;

let result = age >= 18 ? "Adult" : "Minor";

console.log(result); // Adult
```

### 7.7 Other Operators

| Operator | Name | Example |
|---|---|---|
| `typeof` | Type operator | `typeof 10` |
| `instanceof` | Instance operator | `[] instanceof Array` |
| `in` | Property existence | `"name" in user` |
| `delete` | Delete property | `delete user.age` |
| `?.` | Optional chaining | `user?.address` |
| `??` | Nullish coalescing | `value ?? "Default"` |
| `...` | Spread/Rest | `...arr` |

---

## 8. Logical Operators

Logical operators are used to combine or reverse Boolean expressions.

### 8.1 AND Operator (&&)

Returns true when both conditions are truthy.

```javascript
let age = 25;
let hasLicense = true;

console.log(age >= 18 && hasLicense); // true
```

| Condition 1 | Condition 2 | Result |
|---|---|---|
| true | true | true |
| true | false | false |
| false | true | false |
| false | false | false |

### 8.2 OR Operator (||)

Returns true when at least one operand is truthy.

```javascript
let isAdmin = false;
let isManager = true;

console.log(isAdmin || isManager); // true
```

| Condition 1 | Condition 2 | Result |
|---|---|---|
| true | true | true |
| true | false | true |
| false | true | true |
| false | false | false |

### 8.3 NOT Operator (!)

Reverses the Boolean value of an expression.

```javascript
let isLoggedIn = true;

console.log(!isLoggedIn); // false
```

### 8.4 Short-Circuit Evaluation

JavaScript evaluates logical expressions from left to right and may stop when the result is already determined.

Example:

```javascript
console.log(false && "Hello"); // false

console.log(true || "Hello");  // true
```

The second operand is not evaluated in either example.

**Important:** Logical operators do not always return Boolean values. They return one of their operands.

```javascript
console.log("Hello" && "World"); // World

console.log("" || "Default");    // Default
```

---

## 9. Type Conversion

### 9.1 What is Type Conversion?

Type conversion is the process of converting a value from one data type to another.

JavaScript supports two types:

1. Explicit Type Conversion
2. Implicit Type Conversion

### 9.2 Explicit Type Conversion

When a developer manually converts a value into another data type.

**String Conversion:**

```javascript
let num = 100;

let result = String(num);

console.log(result);        // "100"
console.log(typeof result); // string
```

**Number Conversion:**

```javascript
let value = "100";

let result = Number(value);

console.log(result);        // 100
console.log(typeof result); // number
```

**Boolean Conversion:**

```javascript
console.log(Boolean(1));      // true
console.log(Boolean(0));      // false
console.log(Boolean("Hello"));// true
console.log(Boolean(""));     // false
```

Other commonly used conversion methods:

| Method | Purpose |
|---|---|
| `Number()` | Converts to Number |
| `String()` | Converts to String |
| `Boolean()` | Converts to Boolean |
| `parseInt()` | Parses an integer |
| `parseFloat()` | Parses a floating-point number |

### 9.3 Implicit Type Conversion

When JavaScript automatically converts a value from one type to another during an operation.

Example:

```javascript
console.log("10" + 5); // "105"

console.log("10" - 5); // 5

console.log("10" * 5); // 50

console.log("10" / 5); // 2
```

Explanation:

- With `+`, JavaScript performs string concatenation when one operand is a string.
- With `-`, `*`, and `/`, JavaScript generally converts numeric strings into numbers.

---

## 10. Type Coercion

### 10.1 What is Type Coercion?

Type coercion is the automatic conversion of one data type into another by JavaScript during expression evaluation.

Example:

```javascript
console.log(5 + "5"); // "55"
console.log(5 - "5"); // 0
console.log(5 == "5"); // true
console.log(5 === "5"); // false
```

### 10.2 Type Conversion vs Type Coercion

| Type Conversion | Type Coercion |
|---|---|
| Usually performed explicitly by the developer. | Performed automatically by JavaScript. |
| Developer controls the conversion. | JavaScript determines the conversion rules. |
| Example: `Number("10")` | Example: `"10" - 5` |

### 10.3 Important Type Coercion Examples

```javascript
console.log(1 + true);       // 2

console.log(1 + false);      // 1

console.log("5" + 2);        // "52"

console.log("5" - 2);        // 3

console.log(null + 1);       // 1

console.log(undefined + 1);  // NaN

console.log(null == undefined);  // true

console.log(null === undefined); // false
```

### 10.4 What are Truthy and Falsy Values?

JavaScript converts values into Boolean values when evaluating conditions.

**Falsy values:**

There are exactly seven falsy values in JavaScript:

| Value | Boolean Conversion |
|---|---|
| `false` | false |
| `0` | false |
| `-0` | false |
| `0n` | false |
| `""` | false |
| `null` | false |
| `undefined` | false |
| `NaN` | false |

**Truthy values:**

All other values are truthy.

Examples:

```javascript
Boolean("Hello"); // true

Boolean("0");     // true

Boolean([]);      // true

Boolean({});      // true

Boolean(" ");     // true

Boolean(-1);      // true
```

**Important:** Empty arrays and empty objects are truthy in JavaScript.

---

## 11. Strict Mode

### 11.1 What is Strict Mode?

Strict Mode is a feature introduced in ECMAScript 5 that enables stricter parsing and error handling in JavaScript.

It helps developers avoid certain common programming mistakes.

### 11.2 How to Enable Strict Mode?

Add `"use strict"` at the beginning of a script or function.

Example:

```javascript
"use strict";

x = 10; // ReferenceError

console.log(x);
```

Without strict mode, assigning to an undeclared variable may create a global property in classic non-module scripts.

With strict mode, it throws an error.

### 11.3 Benefits of Strict Mode

- Prevents accidental creation of global variables.
- Prevents certain unsafe operations.
- Makes some silent errors throw exceptions.
- Disallows duplicate parameter names in ordinary functions.
- Changes certain `this` binding behaviours.

**Note:** JavaScript ES modules and class bodies are automatically in strict mode.

---

## 12. Comments in JavaScript

Comments are used to explain code. They are ignored during program execution.

### 12.1 Single-Line Comments

Use `//`.

```javascript
// This is a single-line comment

let age = 25;
```

### 12.2 Multi-Line Comments

Use `/* */`.

```javascript
/*
 This is a
 multi-line comment
*/

let name = "Riyaz";
```

### 12.3 Why Are Comments Used?

- Explain complex logic.
- Improve code readability.
- Document functionality.
- Temporarily disable code during development.

---

## 13. JavaScript Output Methods

JavaScript provides different ways to display information.

### 13.1 console.log()

Used to print output in the browser console or Node.js terminal.

```javascript
console.log("Hello World");
```

### 13.2 console.error()

Used to display error messages.

```javascript
console.error("Something went wrong!");
```

### 13.3 console.warn()

Used to display warning messages.

```javascript
console.warn("This is a warning!");
```

### 13.4 alert()

Displays a browser alert dialog.

```javascript
alert("Welcome!");
```

### 13.5 prompt()

Displays a dialog that asks the user to enter information.

```javascript
let name = prompt("Enter your name:");

console.log(name);
```

### 13.6 confirm()

Displays a dialog with OK and Cancel buttons.

```javascript
let result = confirm("Are you sure?");

console.log(result);
```

Returns:
- `true` if the user clicks OK.
- `false` if the user clicks Cancel.

### 13.7 document.write()

Writes content directly into the document.

```javascript
document.write("Hello World");
```

**Note:** `document.write()` is generally discouraged in modern development because it can overwrite the document when used after loading.

### 13.8 Output Methods Comparison

| Method | Purpose | Environment |
|---|---|---|
| `console.log()` | Display normal output | Browser / Node.js |
| `console.error()` | Display errors | Browser / Node.js |
| `console.warn()` | Display warnings | Browser / Node.js |
| `alert()` | Display alert dialog | Browser |
| `prompt()` | Get user input | Browser |
| `confirm()` | Get confirmation | Browser |
| `document.write()` | Write into document | Browser |

---

# Phase 1 – Final Revision Checklist

After completing this phase, you should understand:

- [ ] What JavaScript is and why it is used.
- [ ] History of JavaScript.
- [ ] Difference between JavaScript and ECMAScript.
- [ ] What ES6 is.
- [ ] Browser and Node.js execution environments.
- [ ] JavaScript variables and their scopes.
- [ ] Difference between var, let and const.
- [ ] Primitive and non-primitive data types.
- [ ] typeof operator.
- [ ] Arithmetic, assignment and comparison operators.
- [ ] Logical operators and short-circuit evaluation.
- [ ] Explicit and implicit type conversion.
- [ ] Type coercion.
- [ ] Truthy and falsy values.
- [ ] Strict mode.
- [ ] JavaScript comments.
- [ ] JavaScript output methods.

### Recommended Documentation

- [JavaScript.info – JavaScript Fundamentals](https://javascript.info/first-steps?utm_source=chatgpt.com)
- [MDN – JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide?utm_source=chatgpt.com)
- [ECMAScript Specifications](https://tc39.es/ecma262/?utm_source=chatgpt.com)

**Phase 1 complete.**

Next: Phase 2 – Control Flow & Loops.

You can use these notes as your JavaScript revision material.