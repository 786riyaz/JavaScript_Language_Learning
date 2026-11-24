# JavaScript Revision Notes – Phase 20
# JavaScript Mastery Through Projects & Interview Preparation

This is the final phase of our JavaScript roadmap.

In the previous 19 phases, we covered JavaScript from fundamentals to advanced concepts and real-world application development.

Now we will focus on applying that knowledge to practical coding problems, machine coding rounds, debugging, performance optimization, and technical interviews.

By the end of this phase, you should be able to approach JavaScript interview questions systematically and build small applications independently.

---

# 1. JavaScript Problem-Solving Approach

Before solving coding problems, understand how to approach them.

Use this process:

```text
1. Understand the problem
        |
2. Identify input and output
        |
3. Identify constraints
        |
4. Think of a simple solution
        |
5. Optimize the solution
        |
6. Write JavaScript code
        |
7. Test edge cases
        |
8. Analyze time and space complexity
```

### Example Problem

Find the second-largest number in an array.

Input:

```javascript
[10, 20, 30, 40, 50]
```

Output:

```text
40
```

### Approach 1: Sorting

```javascript
function secondLargest(numbers) {

    const uniqueNumbers = [...new Set(numbers)];

    uniqueNumbers.sort((a, b) => b - a);

    return uniqueNumbers[1] ?? null;

}

console.log(secondLargest([10, 20, 30, 40, 50]));
```

Time complexity: O(n log n).

### Approach 2: Single Loop

```javascript
function secondLargest(numbers) {

    let largest = -Infinity;

    let secondLargest = -Infinity;

    for (const number of numbers) {

        if (number > largest) {

            secondLargest = largest;

            largest = number;

        } else if (
            number < largest &&
            number > secondLargest
        ) {

            secondLargest = number;

        }

    }

    return secondLargest === -Infinity
        ? null
        : secondLargest;

}

console.log(secondLargest([10, 20, 30, 40, 50]));
```

Time complexity: O(n).

The second approach is more efficient because it only traverses the array once.

**Interview tip:** Always discuss the simple solution first, then explain how you can optimize it.

---

# 2. Important JavaScript Coding Problems

These problems are frequently useful for JavaScript interviews.

## 2.1 Reverse a String

```javascript
function reverseString(str) {

    return str.split("").reverse().join("");

}

console.log(reverseString("javascript"));
```

Output:

```text
tpircsavaj
```

### Without built-in methods

```javascript
function reverseString(str) {

    let result = "";

    for (let i = str.length - 1; i >= 0; i--) {

        result += str[i];

    }

    return result;

}

console.log(reverseString("hello"));
```

Output:

```text
olleh
```

Note: These examples operate on UTF-16 code units. For Unicode code points, use `Array.from(str)` or another Unicode-aware approach.

## 2.2 Check Palindrome

A palindrome reads the same forward and backward.

Examples:

```text
madam
level
racecar
```

Solution:

```javascript
function isPalindrome(str) {

    const reversed = str.split("").reverse().join("");

    return str === reversed;

}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false
```

## 2.3 Find Duplicate Elements

```javascript
function findDuplicates(numbers) {

    const seen = new Set();

    const duplicates = new Set();

    for (const number of numbers) {

        if (seen.has(number)) {

            duplicates.add(number);

        } else {

            seen.add(number);

        }

    }

    return [...duplicates];

}

console.log(
    findDuplicates([1, 2, 3, 2, 4, 1, 5])
);
```

Output:

```javascript
[2, 1]
```

Time complexity: O(n) average.

## 2.4 Find Missing Number

An array contains numbers from 1 to n, but one number is missing.

```javascript
function findMissingNumber(numbers, n) {

    const expectedSum = n * (n + 1) / 2;

    const actualSum = numbers.reduce(
        (sum, number) => sum + number,
        0
    );

    return expectedSum - actualSum;

}

console.log(findMissingNumber([1, 2, 4, 5], 5));
```

Output:

```text
3
```

## 2.5 Count Character Frequency

```javascript
function countCharacters(str) {

    const frequency = {};

    for (const char of str) {

        frequency[char] = (frequency[char] || 0) + 1;

    }

    return frequency;

}

console.log(countCharacters("javascript"));
```

## 2.6 Check Anagrams

Two strings are anagrams if they contain the same characters with the same frequencies.

Examples:

```text
listen
silent
```

Solution:

```javascript
function areAnagrams(str1, str2) {

    if (str1.length !== str2.length) {
        return false;
    }

    const count = new Map();

    for (const char of str1) {

        count.set(
            char,
            (count.get(char) || 0) + 1
        );

    }

    for (const char of str2) {

        if (!count.has(char)) {
            return false;
        }

        count.set(
            char,
            count.get(char) - 1
        );

        if (count.get(char) < 0) {
            return false;
        }

    }

    return true;

}

console.log(areAnagrams("listen", "silent")); // true
console.log(areAnagrams("hello", "world"));   // false
```

## 2.7 Flatten a Nested Array

Input:

```javascript
[1, [2, [3, 4]], 5]
```

Output:

```javascript
[1, 2, 3, 4, 5]
```

Using built-in method:

```javascript
const numbers = [1, [2, [3, 4]], 5];

console.log(numbers.flat(Infinity));
```

Without built-in method:

```javascript
function flattenArray(array) {

    const result = [];

    for (const item of array) {

        if (Array.isArray(item)) {

            result.push(...flattenArray(item));

        } else {

            result.push(item);

        }

    }

    return result;

}

console.log(
    flattenArray([1, [2, [3, 4]], 5])
);
```

## 2.8 Find the First Non-Repeating Character

```javascript
function firstNonRepeating(str) {

    const frequency = new Map();

    for (const char of str) {

        frequency.set(
            char,
            (frequency.get(char) || 0) + 1
        );

    }

    for (const char of str) {

        if (frequency.get(char) === 1) {
            return char;
        }

    }

    return null;

}

console.log(firstNonRepeating("javascript"));
```

Output:

```text
j
```

## 2.9 Remove Duplicates from an Array

```javascript
function removeDuplicates(numbers) {

    return [...new Set(numbers)];

}

console.log(removeDuplicates([1, 2, 2, 3, 3, 4]));
```

Output:

```javascript
[1, 2, 3, 4]
```

## 2.10 Find the Most Frequent Element

```javascript
function mostFrequent(numbers) {

    const frequency = new Map();

    let maxCount = 0;

    let result = null;

    for (const number of numbers) {

        const count = (frequency.get(number) || 0) + 1;

        frequency.set(number, count);

        if (count > maxCount) {

            maxCount = count;

            result = number;

        }

    }

    return result;

}

console.log(
    mostFrequent([1, 2, 2, 3, 3, 3, 4])
);
```

Output:

```text
3
```

---

# 3. Advanced Array Coding Problems

These are especially useful for frontend and full-stack JavaScript interviews.

## 3.1 Group Objects by Property

Input:

```javascript
const users = [

    { name: "Riyaz", role: "Developer" },

    { name: "Ahmed", role: "Designer" },

    { name: "Ali", role: "Developer" },

    { name: "John", role: "Designer" }

];
```

Expected output:

```javascript
{
    Developer: [
        { name: "Riyaz", role: "Developer" },
        { name: "Ali", role: "Developer" }
    ],

    Designer: [
        { name: "Ahmed", role: "Designer" },
        { name: "John", role: "Designer" }
    ]
}
```

Solution:

```javascript
function groupBy(array, property) {

    return array.reduce((result, item) => {

        const key = item[property];

        if (!result[key]) {
            result[key] = [];
        }

        result[key].push(item);

        return result;

    }, {});

}

console.log(groupBy(users, "role"));
```

JavaScript also provides `Object.groupBy()` in modern environments.

## 3.2 Find Intersection of Two Arrays

Find common elements between two arrays.

```javascript
function intersection(arr1, arr2) {

    const set = new Set(arr2);

    return [...new Set(arr1.filter(item => set.has(item)))];

}

console.log(
    intersection([1, 2, 3, 4], [3, 4, 5, 6])
);
```

Output:

```javascript
[3, 4]
```

## 3.3 Chunk an Array

Divide an array into smaller arrays of a specified size.

```javascript
function chunkArray(array, size) {

    const result = [];

    for (let i = 0; i < array.length; i += size) {

        result.push(array.slice(i, i + size));

    }

    return result;

}

console.log(
    chunkArray([1, 2, 3, 4, 5, 6, 7], 3)
);
```

Output:

```javascript
[
    [1, 2, 3],
    [4, 5, 6],
    [7]
]
```

In production code, also validate that `size` is a positive integer.

## 3.4 Sort Objects by Multiple Properties

```javascript
const employees = [

    { name: "Riyaz", age: 25, salary: 50000 },

    { name: "Ahmed", age: 25, salary: 60000 },

    { name: "Ali", age: 30, salary: 40000 }

];

employees.sort((a, b) => {

    if (a.age !== b.age) {
        return a.age - b.age;
    }

    return b.salary - a.salary;

});

console.log(employees);
```

Sorting priority:

1. Age ascending.
2. Salary descending when ages are equal.

---

# 4. JavaScript Output-Based Interview Questions

These questions test your understanding of execution context, scope, closures, coercion, promises, and the event loop.

Try predicting the output before reading the explanation.

## Question 1 – Hoisting

```javascript
console.log(a);

var a = 10;
```

Output:

```text
undefined
```

Explanation:

The `var` declaration is initialized to `undefined` during declaration instantiation.

## Question 2 – let and Temporal Dead Zone

```javascript
console.log(a);

let a = 10;
```

Output:

```text
ReferenceError
```

Explanation:

The variable exists in its scope but cannot be accessed before initialization.

## Question 3 – Closure

```javascript
function outer() {

    let count = 0;

    return function inner() {

        count++;

        console.log(count);

    };

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

Explanation:

The inner function retains access to the lexical environment where it was created.

## Question 4 – this

```javascript
const user = {

    name: "Riyaz",

    greet() {

        console.log(this.name);

    }

};

const greet = user.greet;

user.greet();

greet();
```

Output in a typical non-strict classic script:

```text
Riyaz
undefined
```

In strict mode and ES modules, the second call has `this === undefined`, so accessing `this.name` throws a `TypeError`.

Explanation:

The value of `this` depends on how a function is called, not simply where it was defined.

## Question 5 – Type Coercion

```javascript
console.log("5" + 2);

console.log("5" - 2);

console.log(true + 1);
```

Output:

```text
52
3
2
```

Explanation:

- String concatenation with `+`.
- Numeric conversion with `-`.
- `true` converts to `1` in numeric arithmetic.

## Question 6 – Array Reference

```javascript
const arr1 = [1, 2, 3];

const arr2 = arr1;

arr2.push(4);

console.log(arr1);
```

Output:

```javascript
[1, 2, 3, 4]
```

Explanation:

Both variables reference the same array.

## Question 7 – Promise and setTimeout

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");
```

Output:

```text
A
D
C
B
```

Explanation:

Synchronous code runs first, followed by Promise microtasks, then the timer task.

## Question 8 – Promise.all

```javascript
const p1 = Promise.resolve(10);

const p2 = Promise.resolve(20);

Promise.all([p1, p2])
    .then(result => console.log(result));

console.log("Done");
```

Output:

```text
Done
[10, 20]
```

Explanation:

The `.then()` callback executes asynchronously as a Promise reaction.

## Question 9 – Object.freeze

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

Explanation:

`Object.freeze()` is shallow.

## Question 10 – Event Loop

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

queueMicrotask(() => {
    console.log("Microtask 1");
});

Promise.resolve().then(() => {
    console.log("Microtask 2");
});

console.log("End");
```

Output:

```text
Start
End
Microtask 1
Microtask 2
Timer
```

Explanation:

Synchronous execution completes first. Microtasks then run in queue order before the timer task.

---

# 5. JavaScript DOM Machine Coding Challenges

Machine coding rounds evaluate whether you can build functional applications within a limited time.

Here are some common challenges.

## Challenge 1: Counter Application

Requirements:

- Increment.
- Decrement.
- Reset.
- Display current value.

HTML:

```html
<div>
    <h2 id="count">0</h2>

    <button id="increment">+</button>

    <button id="decrement">-</button>

    <button id="reset">Reset</button>
</div>
```

JavaScript:

```javascript
let count = 0;

const countElement = document.querySelector("#count");

function updateCount() {

    countElement.textContent = count;

}

document
    .querySelector("#increment")
    .addEventListener("click", () => {

        count++;

        updateCount();

    });

document
    .querySelector("#decrement")
    .addEventListener("click", () => {

        count--;

        updateCount();

    });

document
    .querySelector("#reset")
    .addEventListener("click", () => {

        count = 0;

        updateCount();

    });
```

## Challenge 2: Todo Application

Requirements:

- Add a task.
- Delete a task.
- Mark a task completed.
- Display all tasks.
- Store tasks in localStorage.

Suggested data structure:

```javascript
const todos = [

    {
        id: 1,
        title: "Learn JavaScript",
        completed: false
    },

    {
        id: 2,
        title: "Practice React",
        completed: true
    }

];
```

Suggested functions:

```javascript
function addTodo() {}

function deleteTodo(id) {}

function toggleTodo(id) {}

function renderTodos() {}

function saveTodos() {}

function loadTodos() {}
```

## Challenge 3: Searchable Product List

Requirements:

- Display products.
- Search by product name.
- Filter by category.
- Sort by price.
- Display total product count.

Suggested data:

```javascript
const products = [

    {
        id: 1,
        name: "Laptop",
        price: 50000,
        category: "Electronics"
    },

    {
        id: 2,
        name: "Mobile",
        price: 20000,
        category: "Electronics"
    },

    {
        id: 3,
        name: "Chair",
        price: 5000,
        category: "Furniture"
    }

];
```

Suggested functions:

```javascript
function searchProducts() {}

function filterProducts() {}

function sortProducts() {}

function renderProducts() {}
```

## Challenge 4: Modal

Requirements:

- Open modal.
- Close modal.
- Close using Escape.
- Close when clicking outside.
- Prevent background scrolling if appropriate.

Important concepts:

- DOM manipulation.
- Event listeners.
- Keyboard events.
- Event propagation.
- CSS classes.

## Challenge 5: Accordion

Requirements:

- Click to expand.
- Click again to collapse.
- Optionally allow only one open section.
- Support keyboard accessibility.

---

# 6. Advanced JavaScript Coding Challenges

These questions are particularly useful for understanding JavaScript functions and internals.

## 6.1 Implement Your Own map()

```javascript
Array.prototype.myMap = function (callback) {

    const result = [];

    for (let i = 0; i < this.length; i++) {

        if (i in this) {

            result[i] = callback(
                this[i],
                i,
                this
            );

        }

    }

    return result;

};

const numbers = [1, 2, 3];

console.log(
    numbers.myMap(number => number * 2)
);
```

Output:

```javascript
[2, 4, 6]
```

This is a simplified implementation. The native method also handles callback validation, `thisArg`, and array-like behavior according to its specification.

## 6.2 Implement Your Own filter()

```javascript
Array.prototype.myFilter = function (callback) {

    const result = [];

    for (let i = 0; i < this.length; i++) {

        if (
            i in this &&
            callback(this[i], i, this)
        ) {

            result.push(this[i]);

        }

    }

    return result;

};

const numbers = [1, 2, 3, 4, 5];

console.log(
    numbers.myFilter(number => number > 2)
);
```

Output:

```javascript
[3, 4, 5]
```

## 6.3 Implement Your Own reduce()

```javascript
Array.prototype.myReduce = function (
    callback,
    initialValue
) {

    let accumulator = initialValue;

    let startIndex = 0;

    if (arguments.length < 2) {

        while (
            startIndex < this.length &&
            !(startIndex in this)
        ) {
            startIndex++;
        }

        if (startIndex >= this.length) {
            throw new TypeError("Reduce of empty array");
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

const numbers = [1, 2, 3, 4];

console.log(
    numbers.myReduce((sum, number) => sum + number, 0)
);
```

Output:

```text
10
```

These implementations are simplified educational versions, not complete replacements for native methods.

## 6.4 Implement Debounce

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

## 6.5 Implement Throttle

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

## 6.6 Implement a Once Function

A function that executes only once.

```javascript
function once(callback) {

    let executed = false;

    let result;

    return function (...args) {

        if (!executed) {

            executed = true;

            result = callback.apply(this, args);

        }

        return result;

    };

}

const initialize = once(() => {

    console.log("Initialized");

    return true;

});

console.log(initialize());
console.log(initialize());
console.log(initialize());
```

Output:

```text
Initialized
true
true
true
```

The original function executes only once.

---

# 7. JavaScript Performance Optimization

Writing working code is not enough. You should also understand how to make it efficient.

## 7.1 Avoid Unnecessary DOM Manipulation

Less efficient:

```javascript
const list = document.querySelector("#list");

for (let i = 0; i < 1000; i++) {

    list.innerHTML += `<li>Item ${i}</li>`;

}
```

This repeatedly reads and writes HTML.

Better:

```javascript
const list = document.querySelector("#list");

const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {

    const li = document.createElement("li");

    li.textContent = `Item ${i}`;

    fragment.appendChild(li);

}

list.appendChild(fragment);
```

This builds the nodes separately and appends them together.

## 7.2 Avoid Unnecessary Loops

Less efficient:

```javascript
const users = [1, 2, 3, 4, 5];

for (let i = 0; i < users.length; i++) {

    for (let j = 0; j < users.length; j++) {

        if (users[i] === users[j]) {

            console.log(users[i]);

        }

    }

}
```

The nested loops take O(n²) time.

When the problem permits it, use a Set or Map for efficient lookups.

```javascript
const users = [1, 2, 3, 4, 5];

const userSet = new Set(users);

console.log(userSet.has(3));
```

## 7.3 Lazy Loading

Lazy loading means loading resources only when needed.

Example:

```html
<img
    src="product.jpg"
    loading="lazy"
    alt="Product"
>
```

This can reduce unnecessary initial image loading.

## 7.4 Code Splitting

Code splitting divides application JavaScript into smaller chunks.

In modern frontend frameworks, it can reduce the amount of JavaScript required for the initial page load.

Example in JavaScript:

```javascript
async function loadModule() {

    const module = await import("./heavyModule.js");

    module.run();

}

loadModule();
```

The module is loaded dynamically when needed.

## 7.5 Avoid Memory Leaks

Common causes:

- Unremoved event listeners.
- Unclosed timers.
- Unnecessary global references.
- Retained DOM nodes.
- Unmanaged subscriptions.

Example:

```javascript
const button = document.querySelector("#button");

function handleClick() {
    console.log("Clicked");
}

button.addEventListener("click", handleClick);

// Later, when no longer needed:
button.removeEventListener("click", handleClick);
```

---

# 8. Debugging JavaScript Applications

Debugging means finding and fixing errors in an application.

Modern browsers provide powerful debugging tools.

## 8.1 Console Methods

```javascript
console.log("Normal message");

console.error("Error message");

console.warn("Warning message");

console.table([
    { name: "Riyaz", age: 25 },
    { name: "Ahmed", age: 26 }
]);

console.time("Loop");

for (let i = 0; i < 100000; i++) {

    // Processing

}

console.timeEnd("Loop");
```

## 8.2 Debugger Statement

```javascript
function calculateTotal(price, quantity) {

    debugger;

    return price * quantity;

}

console.log(calculateTotal(100, 5));
```

When DevTools are open, execution pauses at the debugger statement.

## 8.3 Breakpoints

A breakpoint allows you to pause execution at a specific line.

You can then inspect:

- Variables.
- Call stack.
- Scope.
- Current execution context.
- Function arguments.
- Network activity.

## 8.4 Network Tab

The Network tab helps debug API-related problems.

You can inspect:

- Request URL.
- HTTP method.
- Request headers.
- Request payload.
- Response body.
- Status code.
- Request duration.
- Failed requests.

## 8.5 Sources Tab

The Sources tab helps debug JavaScript execution.

Useful features:

- Breakpoints.
- Conditional breakpoints.
- Step into.
- Step over.
- Step out.
- Watch expressions.
- Call stack inspection.

---

# 9. JavaScript Testing

Testing ensures that your application behaves as expected.

There are three important testing levels.

| Testing Type | Purpose |
|---|---|
| Unit Testing | Test individual functions |
| Integration Testing | Test multiple components working together |
| End-to-End Testing | Test complete user workflows |

### Example function

```javascript
function add(a, b) {

    return a + b;

}
```

### Basic test

```javascript
console.assert(add(2, 3) === 5, "Test failed");

console.assert(add(0, 0) === 0, "Test failed");

console.assert(add(-2, 2) === 0, "Test failed");
```

For real applications, use testing frameworks.

Common choices:

- Jest
- Vitest
- Mocha
- Playwright
- Cypress

Official documentation:

- [Jest](https://jestjs.io/?utm_source=chatgpt.com)
- [Vitest](https://vitest.dev/?utm_source=chatgpt.com)
- [Playwright](https://playwright.dev/?utm_source=chatgpt.com)
- [Cypress](https://www.cypress.io/?utm_source=chatgpt.com)

---

# 10. JavaScript Interview Questions – Conceptual Revision

These questions cover concepts from the entire roadmap.

| No. | Question |
|---|---|
| 1 | What is JavaScript? |
| 2 | Is JavaScript single-threaded? |
| 3 | What is the difference between `var`, `let`, and `const`? |
| 4 | What is hoisting? |
| 5 | What is the Temporal Dead Zone? |
| 6 | What is lexical scope? |
| 7 | What is a closure? |
| 8 | What is the difference between `==` and `===`? |
| 9 | What is the difference between null and undefined? |
| 10 | What is the difference between primitive and reference types? |
| 11 | What is the difference between map and forEach? |
| 12 | What is the difference between filter and find? |
| 13 | What is reduce? |
| 14 | What is destructuring? |
| 15 | What is the spread operator? |
| 16 | What is the rest parameter? |
| 17 | What is the difference between normal and arrow functions? |
| 18 | How does `this` work? |
| 19 | What are call, apply, and bind? |
| 20 | What is a higher-order function? |
| 21 | What is currying? |
| 22 | What is memoization? |
| 23 | What is the prototype chain? |
| 24 | What is inheritance? |
| 25 | What is a Promise? |
| 26 | What is async/await? |
| 27 | What is the Event Loop? |
| 28 | What is the difference between microtasks and tasks? |
| 29 | What is Promise.all()? |
| 30 | What is Promise.allSettled()? |
| 31 | What is debouncing? |
| 32 | What is throttling? |
| 33 | What is event delegation? |
| 34 | What is event bubbling? |
| 35 | What is event capturing? |
| 36 | What is localStorage? |
| 37 | What is sessionStorage? |
| 38 | What is the difference between cookies and localStorage? |
| 39 | What is structuredClone()? |
| 40 | What is immutability? |
| 41 | What is a pure function? |
| 42 | What is a generator? |
| 43 | What is an iterator? |
| 44 | What is a Proxy? |
| 45 | What is Reflect? |
| 46 | What is the difference between Map and WeakMap? |
| 47 | What is garbage collection? |
| 48 | What causes memory leaks? |
| 49 | What is the difference between shallow and deep copy? |
| 50 | What is the difference between authentication and authorization? |

---

# 11. Important JavaScript Complexity Revision

You should understand time complexity when solving coding problems.

| Operation | Typical Complexity |
|---|---:|
| Access array by index | O(1) |
| Search array using `find()` | O(n) |
| Search array using `includes()` | O(n) |
| Array `push()` | O(1) amortized |
| Array `pop()` | O(1) |
| Array `shift()` | O(n) |
| Array `unshift()` | O(n) |
| Array `map()` | O(n) |
| Array `filter()` | O(n) |
| Array `reduce()` | O(n) |
| Array `sort()` | Depends on implementation; no universal complexity guarantee |
| Map lookup | Average sublinear; commonly near O(1) |
| Set lookup | Average sublinear; commonly near O(1) |

### Common time complexities

| Complexity | Name | Example |
|---|---|---|
| O(1) | Constant | Array index access |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Single loop |
| O(n log n) | Linearithmic | Efficient comparison sorting |
| O(n²) | Quadratic | Nested loops |
| O(2ⁿ) | Exponential | Some recursive subset algorithms |
| O(n!) | Factorial | Brute-force permutations |

---

# 12. Final Practical Project Challenges

To verify your JavaScript knowledge, build these applications independently.

| No. | Project | Important Concepts |
|---|---|---|
| 1 | Calculator | Functions, DOM, events |
| 2 | Todo Application | CRUD, arrays, localStorage |
| 3 | Expense Tracker | State, forms, validation |
| 4 | Weather Application | Fetch, async/await, APIs |
| 5 | Movie Search Application | API, search, debounce |
| 6 | Quiz Application | State, timers, events |
| 7 | Notes Application | CRUD, storage, filtering |
| 8 | Shopping Cart | Array methods, state, calculations |
| 9 | Pagination System | APIs, array methods |
| 10 | User Management Dashboard | CRUD, search, sorting, filtering |

### Recommended implementation order

Start with:

1. Calculator.
2. Todo Application.
3. Expense Tracker.
4. Weather Application.
5. Shopping Cart.
6. User Management Dashboard.

Do not simply copy existing code. First implement the application yourself, then compare your solution with a reference implementation.

---

# 13. Final JavaScript Assessment

This assessment will help you determine how well you understand JavaScript.

### Section A – Fundamentals

1. Explain the difference between `let`, `const`, and `var`.
2. Explain hoisting with an example.
3. What is the difference between primitive and reference types?
4. Explain closures with a practical example.
5. Explain the difference between `==` and `===`.

### Section B – Functions and Objects

6. What is a higher-order function?
7. What is currying?
8. What is the difference between call, apply, and bind?
9. Explain prototype inheritance.
10. What is the difference between shallow and deep copy?

### Section C – Asynchronous JavaScript

11. What is a Promise?
12. Explain async/await.
13. Explain the Event Loop.
14. What is the difference between microtasks and tasks?
15. Explain Promise.all() and Promise.race().

### Section D – Browser JavaScript

16. What is the DOM?
17. What is event delegation?
18. What is event bubbling?
19. What is the difference between localStorage and sessionStorage?
20. What is the difference between debounce and throttle?

### Section E – Advanced JavaScript

21. What is memoization?
22. What is a generator?
23. What is an iterator?
24. What is a Proxy?
25. What is garbage collection?

### Section F – Coding

26. Reverse a string.
27. Find the second-largest number.
28. Remove duplicate array elements.
29. Find the first non-repeating character.
30. Flatten a nested array.
31. Implement your own map().
32. Implement debounce().
33. Implement throttle().
34. Group objects by a property.
35. Implement a simple Promise-based API request.

---

# 14. Official JavaScript Learning Resources

Use these resources for continued learning.

### JavaScript Documentation

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide?utm_source=chatgpt.com)
- [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference?utm_source=chatgpt.com)
- [ECMAScript Specification](https://tc39.es/ecma262/?utm_source=chatgpt.com)

### Practice Platforms

- [LeetCode](https://leetcode.com/?utm_source=chatgpt.com)
- [HackerRank](https://www.hackerrank.com/?utm_source=chatgpt.com)
- [Codewars](https://www.codewars.com/?utm_source=chatgpt.com)
- [Exercism JavaScript Track](https://exercism.org/tracks/javascript?utm_source=chatgpt.com)

### Learning Resources

- [JavaScript.info](https://javascript.info/?utm_source=chatgpt.com)
- [You Don't Know JS Yet](https://github.com/getify/You-Dont-Know-JS?utm_source=chatgpt.com)

---

# JavaScript Roadmap – Final Progress

| Phase | Topic | Status |
|---|---|---|
| 1 | JavaScript Fundamentals | Completed |
| 2 | Control Flow & Loops | Completed |
| 3 | Functions | Completed |
| 4 | Arrays & Objects | Completed |
| 5 | JavaScript Core Concepts | Completed |
| 6 | DOM & Browser APIs | Completed |
| 7 | Asynchronous JavaScript | Completed |
| 8 | Modern JavaScript (ES6+) | Completed |
| 9 | Advanced JavaScript | Completed |
| 10 | JavaScript Modules & Tooling | Completed |
| 11 | Browser APIs & Web Storage | Completed |
| 12 | Networking & HTTP Fundamentals | Completed |
| 13 | JavaScript Security & Performance | Completed |
| 14 | JavaScript Design Patterns & Architecture | Completed |
| 15 | Testing & Debugging | Completed |
| 16 | TypeScript | Completed |
| 17 | JavaScript Runtime & Internals | Completed |
| 18 | Advanced Concepts & Problem Solving | Completed |
| 19 | Real-World Application Development | Completed |
| **20** | **Projects & Interview Preparation** | **Completed** |

---

# What Comes After JavaScript?

You have now completed the complete JavaScript roadmap.

Considering your existing React, Next.js, Node.js, and Express experience, the logical next step is to strengthen your practical full-stack engineering skills.

I recommend this learning sequence:

| Order | Technology / Subject | Focus |
|---|---|---|
| 1 | Advanced Node.js | Runtime, streams, buffers, worker threads |
| 2 | Advanced Express.js | Middleware, architecture, authentication |
| 3 | Advanced React.js | Hooks, rendering, performance, state |
| 4 | Advanced Next.js | Server Components, caching, routing |
| 5 | Database Engineering | MongoDB, MySQL, indexing, transactions |
| 6 | System Design | Scalability, caching, queues, architecture |
| 7 | Testing | Unit, integration, and E2E testing |
| 8 | Deployment & DevOps | Docker, CI/CD, AWS, Nginx |

**JavaScript roadmap: 20/20 phases completed.**

My recommendation is to move next to **Advanced Node.js – Phase 1: Node.js Architecture, Runtime, and Internals**, building on the Node.js roadmap you have already started.