# JavaScript Revision Notes – Phase 18
# Advanced JavaScript Concepts & Problem Solving

In this phase, we will explore advanced JavaScript concepts that help you write **efficient, reusable, predictable, and maintainable code**.

These concepts are especially useful when working with React, Next.js, Node.js, Express, and large-scale applications.

---

# 1. Referential Equality

Referential equality means checking whether two variables refer to the same object in memory.

JavaScript compares primitive values by value, but objects and functions by reference identity.

### Primitive comparison

```javascript
let a = 10;
let b = 10;

console.log(a === b); // true
```

Both variables contain the same primitive value.

### Object comparison

```javascript
let obj1 = { name: "Riyaz" };
let obj2 = { name: "Riyaz" };

console.log(obj1 === obj2); // false
```

Why?

Because both objects are separately created objects.

Even though their properties are identical, they have different references.

### Same reference

```javascript
let obj1 = { name: "Riyaz" };

let obj2 = obj1;

console.log(obj1 === obj2); // true
```

Both variables refer to the same object.

### Important difference: `===` vs `Object.is()`

```javascript
console.log(NaN === NaN);          // false
console.log(Object.is(NaN, NaN));  // true

console.log(+0 === -0);            // true
console.log(Object.is(+0, -0));    // false
```

`Object.is()` handles these two special cases differently.

**Remember:** Two objects with identical properties are not necessarily equal.

---

# 2. Object References

When you assign an object to another variable, JavaScript copies the reference, not the entire object.

```javascript
const user1 = {
    name: "Riyaz",
    age: 25
};

const user2 = user1;

user2.age = 26;

console.log(user1.age); // 26
console.log(user2.age); // 26
```

Both variables point to the same object.

### What happens when you reassign a variable?

```javascript
let user1 = {
    name: "Riyaz"
};

let user2 = user1;

user2 = {
    name: "Ahmed"
};

console.log(user1.name); // Riyaz
console.log(user2.name); // Ahmed
```

Now `user2` refers to a different object.

Reassigning `user2` does not change `user1`.

### Visual representation

Initially:

```text
user1 ──┐
        ├──> { name: "Riyaz" }
user2 ──┘
```

After reassignment:

```text
user1 ─────> { name: "Riyaz" }

user2 ─────> { name: "Ahmed" }
```

---

# 3. Shallow Copy vs Deep Copy

This is one of the most important JavaScript concepts.

## Shallow Copy

A shallow copy creates a new object, but nested objects are still shared.

### Example using spread operator

```javascript
const user1 = {
    name: "Riyaz",
    address: {
        city: "Ahmedabad",
        country: "India"
    }
};

const user2 = { ...user1 };

user2.name = "Ahmed";

user2.address.city = "Delhi";

console.log(user1.name);         // Riyaz
console.log(user1.address.city); // Delhi
```

Why did the city change in `user1`?

Because the nested `address` object is shared.

### Visual representation

```text
user1 ──> {
            name: "Riyaz",
            address ──┐
          }          │
                     ├──> { city: "Ahmedabad" }
user2 ──> {          │
            name: "Ahmed",
            address ──┘
          }
```

### Common ways to create shallow copies

```javascript
// Object
const copy1 = { ...original };
const copy2 = Object.assign({}, original);

// Array
const copy3 = [...originalArray];
const copy4 = originalArray.slice();
```

## Deep Copy

A deep copy creates a separate copy of nested objects as well.

```javascript
const user1 = {
    name: "Riyaz",
    address: {
        city: "Ahmedabad"
    }
};

const user2 = structuredClone(user1);

user2.address.city = "Delhi";

console.log(user1.address.city); // Ahmedabad
console.log(user2.address.city); // Delhi
```

Now nested objects are independent.

### Comparison

| Feature | Shallow Copy | Deep Copy |
|---|---|---|
| Creates new outer object | Yes | Yes |
| Copies nested objects independently | No | Yes |
| Memory usage | Usually lower | Usually higher |
| Performance | Usually faster | Usually slower |
| Nested mutation affects original | Can | No, for successfully cloned data |

**Important:** Deep copying is not always necessary. Copy only the levels that your application needs to change.

---

# 4. `structuredClone()`

`structuredClone()` is a built-in JavaScript method used to create deep copies of supported values.

```javascript
const original = {
    name: "Riyaz",
    skills: ["React", "Node.js"],
    address: {
        city: "Ahmedabad"
    }
};

const cloned = structuredClone(original);

cloned.skills.push("MongoDB");
cloned.address.city = "Delhi";

console.log(original);
console.log(cloned);
```

The original object remains unchanged.

### It supports values such as:

- Objects
- Arrays
- Date
- Map
- Set
- ArrayBuffer
- Circular references

### Example with Date

```javascript
const original = {
    createdAt: new Date()
};

const cloned = structuredClone(original);

console.log(cloned.createdAt instanceof Date); // true
```

### Circular references

```javascript
const user = {
    name: "Riyaz"
};

user.self = user;

const cloned = structuredClone(user);

console.log(cloned.self === cloned); // true
```

### Limitations

`structuredClone()` cannot clone every JavaScript value.

For example:

```javascript
const obj = {
    greet: function () {
        console.log("Hello");
    }
};

const cloned = structuredClone(obj); // DataCloneError
```

Functions cannot be cloned.

It also does not preserve custom prototypes, property descriptors, or accessor behavior.

**Documentation:** [MDN – structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone?utm_source=chatgpt.com)

---

# 5. Object.freeze() and Deep Freeze

`Object.freeze()` prevents modifications to an object's own properties.

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

Object.freeze(user);

user.age = 30;

console.log(user.age); // 25
```

The object is frozen.

### What does freeze prevent?

- Adding new properties.
- Removing existing properties.
- Changing existing property values.
- Changing property descriptors.

However, `Object.freeze()` is shallow.

```javascript
const user = {
    name: "Riyaz",
    address: {
        city: "Ahmedabad"
    }
};

Object.freeze(user);

user.name = "Ahmed"; // Not changed

user.address.city = "Delhi"; // Changed!

console.log(user);
```

The nested object is not frozen.

## Deep Freeze

A deep freeze recursively freezes nested objects.

```javascript
function deepFreeze(obj, visited = new WeakSet()) {

    if (
        obj === null ||
        typeof obj !== "object" ||
        visited.has(obj)
    ) {
        return obj;
    }

    visited.add(obj);

    Reflect.ownKeys(obj).forEach((key) => {
        deepFreeze(obj[key], visited);
    });

    return Object.freeze(obj);
}
```

Usage:

```javascript
const user = {
    name: "Riyaz",
    address: {
        city: "Ahmedabad"
    }
};

deepFreeze(user);

user.address.city = "Delhi";

console.log(user.address.city); // Ahmedabad
```

**Important limitations:**

- `Object.freeze()` does not prevent mutation of a `Map` or `Set`'s internal entries.
- Freezing is not a security boundary.
- Some typed arrays containing elements cannot be frozen successfully.
- The example above handles ordinary nested objects, but it is not a universal immutability solution.

Documentation: [MDN – Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze?utm_source=chatgpt.com)

---

# 6. Immutability

Immutability means not modifying existing data after it has been created.

Instead, you create a new object or array with the required changes.

### Mutable approach

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

user.age = 26;

console.log(user);
```

The original object is modified.

### Immutable approach

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

const updatedUser = {
    ...user,
    age: 26
};

console.log(user.age);        // 25
console.log(updatedUser.age); // 26
```

A new object is created.

### Immutability with arrays

```javascript
const numbers = [10, 20, 30];

// Mutable
numbers.push(40);

// Immutable
const updatedNumbers = [...numbers, 50];
```

### Why is immutability important?

1. Prevents unexpected changes.
2. Makes debugging easier.
3. Helps with predictable application behavior.
4. Makes state management easier.
5. Helps React detect state changes through reference comparison.

### React example

Avoid:

```javascript
user.name = "Ahmed";

setUser(user);
```

Prefer:

```javascript
setUser({
    ...user,
    name: "Ahmed"
});
```

**Important:** Spread syntax creates only a shallow copy. For nested state, copy the relevant nested objects too.

---

# 7. Pure Functions

A pure function has two main characteristics:

1. It returns the same output for the same inputs.
2. It does not produce observable side effects.

### Pure function

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(10, 20)); // 30
console.log(add(10, 20)); // 30
```

The result depends only on the inputs.

### Impure function

```javascript
let total = 0;

function addToTotal(value) {
    total += value;

    return total;
}

console.log(addToTotal(10)); // 10
console.log(addToTotal(10)); // 20
```

The result depends on external state.

### Another impure example

```javascript
function getRandomNumber() {
    return Math.random();
}
```

The output can change even when the inputs are identical.

### Real-world example

Pure:

```javascript
function calculateDiscount(price, discount) {
    return price - (price * discount / 100);
}
```

Impure:

```javascript
function updateUser(user) {
    user.name = "Ahmed";

    return user;
}
```

The second function modifies the original object.

### Benefits

- Easier testing.
- Predictable results.
- Easier debugging.
- Better code reuse.
- Easier reasoning about application behavior.

---

# 8. Side Effects

A side effect occurs when a function interacts with or changes something outside its local computation.

Common side effects include:

- Modifying global variables.
- Updating the DOM.
- Making HTTP requests.
- Writing to files.
- Updating a database.
- Logging to the console.
- Reading the current time.
- Generating random values.
- Mutating an object received from outside.

Example:

```javascript
function getUser() {
    return fetch("/api/users");
}
```

This function performs a network operation.

It is not a pure function.

### Pure logic with side effects separated

```javascript
function calculateTotal(price, tax) {
    return price + tax;
}

async function saveOrder(order) {
    const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });

    return response.json();
}
```

Here, calculation and network communication are separated.

This makes the business logic easier to test.

---

# 9. Higher-Order Functions (HOF)

A higher-order function is a function that:

1. Accepts another function as an argument, or
2. Returns another function.

### Example 1: Function as an argument

```javascript
function greet(name) {
    return `Hello ${name}`;
}

function processUser(callback) {
    return callback("Riyaz");
}

console.log(processUser(greet));
```

Output:

```text
Hello Riyaz
```

Here, `processUser()` accepts another function.

### Example 2: Function returning another function

```javascript
function multiplier(number) {

    return function (value) {
        return number * value;
    };

}

const double = multiplier(2);

console.log(double(10)); // 20
console.log(double(20)); // 40
```

### Common JavaScript HOF methods

| Method | Purpose |
|---|---|
| `map()` | Transform array elements |
| `filter()` | Select matching elements |
| `reduce()` | Accumulate values |
| `forEach()` | Execute a function for each element |
| `sort()` | Sort using a comparison function |
| `find()` | Find the first matching element |

Example:

```javascript
const numbers = [1, 2, 3, 4, 5];

const result = numbers
    .filter(num => num > 2)
    .map(num => num * 2);

console.log(result); // [6, 8, 10]
```

---

# 10. Currying

Currying transforms a function that accepts multiple arguments into a sequence of functions, each accepting one argument.

### Normal function

```javascript
function add(a, b, c) {
    return a + b + c;
}

console.log(add(10, 20, 30)); // 60
```

### Curried function

```javascript
function add(a) {

    return function (b) {

        return function (c) {

            return a + b + c;

        };

    };

}

console.log(add(10)(20)(30)); // 60
```

### Arrow function version

```javascript
const add = a => b => c => a + b + c;

console.log(add(10)(20)(30)); // 60
```

### Why use currying?

It allows you to create specialized functions.

```javascript
const multiply = a => b => a * b;

const double = multiply(2);
const triple = multiply(3);

console.log(double(10)); // 20
console.log(triple(10)); // 30
```

---

# 11. Partial Application

Partial application means fixing some arguments of a function in advance and creating a new function with the remaining arguments.

### Example

```javascript
function multiply(a, b, c) {
    return a * b * c;
}

function partialMultiply(a) {
    return function (b, c) {
        return multiply(a, b, c);
    };
}

const multiplyByTwo = partialMultiply(2);

console.log(multiplyByTwo(3, 4)); // 24
```

### Currying vs Partial Application

| Currying | Partial Application |
|---|---|
| Converts a multi-argument function into nested functions | Pre-fills some arguments |
| Usually accepts one argument at a time | Can accept multiple remaining arguments |
| `add(a)(b)(c)` | `addWith10(b, c)` |
| Changes the function's structure | Creates a specialized function |

---

# 12. Function Composition

Function composition means combining multiple functions to create a new function.

The output of one function becomes the input of another.

Mathematically:

```text
compose(f, g)(x) = f(g(x))
```

### Example

```javascript
function double(value) {
    return value * 2;
}

function addTen(value) {
    return value + 10;
}

function compose(f, g) {
    return function (value) {
        return f(g(value));
    };
}

const result = compose(double, addTen);

console.log(result(5)); // 30
```

Execution:

```text
5
|
addTen(5) = 15
|
double(15) = 30
|
Output: 30
```

### Pipe

Composition can also work from left to right.

```javascript
function pipe(...functions) {

    return function (value) {

        return functions.reduce(
            (result, fn) => fn(result),
            value
        );

    };

}
```

Usage:

```javascript
const result = pipe(
    value => value + 10,
    value => value * 2,
    value => value - 5
);

console.log(result(5)); // 25
```

Execution:

```text
5 + 10 = 15
15 * 2 = 30
30 - 5 = 25
```

---

# 13. Memoization

Memoization is an optimization technique in which a function stores previously calculated results.

When the same input appears again, the function returns the cached result instead of recalculating it.

### Without memoization

```javascript
function square(number) {

    console.log("Calculating...");

    return number * number;

}

console.log(square(5));
console.log(square(5));
console.log(square(5));
```

The calculation happens every time.

### With memoization

```javascript
function memoize(fn) {

    const cache = new Map();

    return function (number) {

        if (cache.has(number)) {
            console.log("Fetching from cache");

            return cache.get(number);
        }

        console.log("Calculating...");

        const result = fn(number);

        cache.set(number, result);

        return result;
    };
}

function square(number) {
    return number * number;
}

const memoizedSquare = memoize(square);

console.log(memoizedSquare(5)); // Calculates
console.log(memoizedSquare(5)); // Cache
console.log(memoizedSquare(5)); // Cache
```

### Real-world applications

- Expensive calculations.
- Repeated API-derived computations.
- Dynamic programming.
- Recursive algorithms.
- Caching deterministic results.

**Important:** Memoization works best with pure, deterministic functions. Cache invalidation and memory usage must also be considered.

---

# 14. Recursion

Recursion occurs when a function calls itself.

Every recursive function should have:

1. Base condition.
2. Recursive condition.

### Example: Countdown

```javascript
function countdown(number) {

    if (number <= 0) {
        console.log("Finished");
        return;
    }

    console.log(number);

    countdown(number - 1);

}

countdown(5);
```

Output:

```text
5
4
3
2
1
Finished
```

### Example: Factorial

Factorial formula:

```text
5! = 5 × 4 × 3 × 2 × 1 = 120
```

JavaScript:

```javascript
function factorial(number) {

    if (number <= 1) {
        return 1;
    }

    return number * factorial(number - 1);

}

console.log(factorial(5)); // 120
```

### How recursion works

```text
factorial(5)
    |
5 * factorial(4)
        |
        4 * factorial(3)
                |
                3 * factorial(2)
                        |
                        2 * factorial(1)
                                |
                                1
```

The calls return in reverse order.

### Important limitation

JavaScript uses the call stack to execute recursive calls.

Deep recursion can cause:

```text
RangeError: Maximum call stack size exceeded
```

---

# 15. Tail Recursion

Tail recursion is a form of recursion where the recursive function call is the final operation.

### Normal recursion

```javascript
function factorial(number) {

    if (number <= 1) {
        return 1;
    }

    return number * factorial(number - 1);

}
```

The multiplication happens after the recursive call returns.

### Tail-recursive version

```javascript
function factorial(number, accumulator = 1) {

    if (number <= 1) {
        return accumulator;
    }

    return factorial(number - 1, number * accumulator);

}

console.log(factorial(5)); // 120
```

Here, the recursive call is the final operation.

**Important:** Do not assume JavaScript will optimize tail recursion. Tail-call optimization is not generally available across JavaScript engines, so deep recursion can still overflow the call stack.

---

# 16. Debouncing

Debouncing ensures that a function executes only after a specified period has passed without another call.

In simple terms:

**Wait until the user stops triggering the event.**

### Example: Search input

Imagine a search box.

A user types:

```text
J → Ja → Jav → Java → Javascript
```

Without debouncing, you might make five API requests.

With debouncing, you wait until the user stops typing.

### Implementation

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

Usage:

```javascript
function search(value) {
    console.log("Searching:", value);
}

const debouncedSearch = debounce(search, 500);
```

Now:

```javascript
debouncedSearch("J");
debouncedSearch("Ja");
debouncedSearch("Java");
debouncedSearch("Javascript");
```

Only the last call executes if no new call occurs within 500 milliseconds.

### Common use cases

- Search inputs.
- Autocomplete.
- Form validation.
- Window resize handling.
- API request optimization.

---

# 17. Throttling

Throttling ensures that a function executes at most once during a specified time interval.

Unlike debouncing, it does not wait for the user to stop triggering events.

### Example

Imagine a user scrolling continuously.

Without throttling, a scroll handler might execute hundreds of times.

Throttling limits how frequently it executes.

### Implementation

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

Usage:

```javascript
function handleScroll() {
    console.log("Scroll event executed");
}

const throttledScroll = throttle(handleScroll, 1000);

window.addEventListener("scroll", throttledScroll);
```

### Debouncing vs Throttling

| Feature | Debouncing | Throttling |
|---|---|---|
| Execution | After events stop | At controlled intervals |
| Main purpose | Reduce repeated calls after activity | Limit execution frequency |
| Search input | Very useful | Less common |
| Scroll handling | Useful for final position | Very useful |
| Resize handling | Useful after resizing stops | Useful during resizing |

---

# 18. Event Delegation

Event delegation is a technique where you attach a single event listener to a parent element instead of attaching separate listeners to every child.

It works because of event bubbling.

### Without event delegation

```html
<ul id="users">
    <li>Riyaz</li>
    <li>Ahmed</li>
    <li>Ali</li>
</ul>
```

```javascript
const items = document.querySelectorAll("#users li");

items.forEach(item => {

    item.addEventListener("click", function () {
        console.log(this.textContent);
    });

});
```

Each child gets its own event listener.

### With event delegation

```javascript
const users = document.querySelector("#users");

users.addEventListener("click", function (event) {

    if (event.target.matches("li")) {

        console.log(event.target.textContent);

    }

});
```

Now only the parent has an event listener.

### Why is this useful?

Suppose you dynamically add new list items:

```javascript
const li = document.createElement("li");

li.textContent = "New User";

users.appendChild(li);
```

The new item automatically works with the existing delegated listener.

No additional event listener is required.

### `event.target` vs `event.currentTarget`

| Property | Meaning |
|---|---|
| `event.target` | Element that originally triggered the event |
| `event.currentTarget` | Element whose event listener is currently executing |

Example:

```javascript
users.addEventListener("click", function (event) {

    console.log("Target:", event.target);

    console.log("Current Target:", event.currentTarget);

});
```

**Important:** Event delegation depends on event propagation. Some events do not bubble normally, and nested elements may require `closest()` rather than a simple `matches()` check.

---

# 19. Prototype Chain Deep Dive

JavaScript uses prototype-based inheritance.

Every ordinary object has an internal `[[Prototype]]` reference, which points to another object or `null`.

When you access a property, JavaScript searches:

1. The object itself.
2. Its prototype.
3. The prototype's prototype.
4. Continues until the property is found or the chain reaches `null`.

This is called the **prototype chain**.

### Example

```javascript
const parent = {
    greet() {
        console.log("Hello");
    }
};

const child = {
    name: "Riyaz"
};

Object.setPrototypeOf(child, parent);

child.greet(); // Hello
```

The `child` object does not own `greet()`.

JavaScript finds it in the parent prototype.

### Checking the prototype

```javascript
console.log(Object.getPrototypeOf(child) === parent);
// true
```

### Constructor function and prototype

```javascript
function User(name) {
    this.name = name;
}

User.prototype.greet = function () {
    console.log(`Hello ${this.name}`);
};

const user1 = new User("Riyaz");

user1.greet(); // Hello Riyaz
```

Here:

- `User.prototype` is an object used as the prototype for instances created with `new User()`.
- `user1` has an internal `[[Prototype]]` reference to `User.prototype`.

### Important distinction

| Term | Meaning |
|---|---|
| `User.prototype` | Property on the constructor function |
| `user1.[[Prototype]]` | Internal prototype reference of the instance |
| `Object.getPrototypeOf(user1)` | Reads the instance's prototype |

Avoid using `__proto__` in new code. Prefer `Object.getPrototypeOf()` and `Object.setPrototypeOf()` where appropriate.

---

# 20. Property Descriptors

JavaScript properties have internal attributes called property descriptors.

The important attributes are:

| Attribute | Meaning |
|---|---|
| `value` | Property value |
| `writable` | Whether the value can be changed |
| `enumerable` | Whether it appears in normal enumeration |
| `configurable` | Whether the property can be deleted or reconfigured |

### Example

```javascript
const user = {
    name: "Riyaz"
};

console.log(
    Object.getOwnPropertyDescriptor(user, "name")
);
```

Output:

```javascript
{
    value: "Riyaz",
    writable: true,
    enumerable: true,
    configurable: true
}
```

### Define a property

```javascript
const user = {};

Object.defineProperty(user, "name", {

    value: "Riyaz",

    writable: false,

    enumerable: true,

    configurable: false

});

user.name = "Ahmed";

console.log(user.name); // Riyaz
```

The property cannot be changed.

**Important:** When using `Object.defineProperty()`, descriptor flags default to `false` if omitted. Properties created through normal object literal syntax generally have all three flags set to `true`.

Documentation: [MDN – Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty?utm_source=chatgpt.com)

---

# 21. Getters and Setters

Getters and setters allow you to define custom behavior when accessing or modifying an object property.

### Getter

A getter executes when you read a property.

```javascript
const user = {

    firstName: "Riyaz",

    lastName: "Khan",

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

};

console.log(user.fullName); // Riyaz Khan
```

Notice that we access it like a property, not a function.

### Setter

A setter executes when you assign a value to a property.

```javascript
const user = {

    firstName: "Riyaz",

    lastName: "Khan",

    set fullName(value) {

        const parts = value.split(" ");

        this.firstName = parts[0];

        this.lastName = parts[1];

    }

};

user.fullName = "Ahmed Ali";

console.log(user.firstName); // Ahmed
console.log(user.lastName);  // Ali
```

### Use cases

- Data validation.
- Computed properties.
- Controlling access to properties.
- Formatting values.

Avoid getters and setters with unexpected side effects or recursive property access.

---

# 22. Symbols

`Symbol` is a primitive data type introduced in ES6.

Every newly created symbol is unique.

```javascript
const id1 = Symbol("id");

const id2 = Symbol("id");

console.log(id1 === id2); // false
```

Even though both have the same description, they are different symbols.

### Why use Symbols?

Symbols are often used as unique property keys.

```javascript
const userId = Symbol("userId");

const user = {
    name: "Riyaz",

    [userId]: 101
};

console.log(user.name);     // Riyaz
console.log(user[userId]);  // 101
```

### Symbols and Object.keys()

```javascript
const id = Symbol("id");

const user = {
    name: "Riyaz",
    [id]: 101
};

console.log(Object.keys(user));
// ["name"]
```

`Object.keys()` does not return symbol properties.

To retrieve them:

```javascript
console.log(Object.getOwnPropertySymbols(user));
```

Or:

```javascript
console.log(Reflect.ownKeys(user));
```

### Well-known Symbols

JavaScript provides built-in symbols for special behaviors.

Examples:

- `Symbol.iterator`
- `Symbol.asyncIterator`
- `Symbol.toPrimitive`
- `Symbol.toStringTag`

Symbols are not a security or privacy mechanism. They make property-key collisions less likely and allow special language protocols to be customized.

Documentation: [MDN – Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol?utm_source=chatgpt.com)

---

# 23. Iterators

An iterator is an object that provides a sequence of values.

An iterator must implement a `next()` method.

That method returns an object containing:

```javascript
{
    value: "Some value",
    done: false
}
```

### Custom iterator

```javascript
const numbers = {

    current: 1,

    last: 3,

    next() {

        if (this.current <= this.last) {

            return {
                value: this.current++,
                done: false
            };

        }

        return {
            value: undefined,
            done: true
        };

    }

};

console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
console.log(numbers.next());
```

Output:

```javascript
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: undefined, done: true }
```

### Iterable vs Iterator

These terms are different.

| Iterable | Iterator |
|---|---|
| Provides `Symbol.iterator` | Provides `next()` |
| Can produce an iterator | Produces values |
| Used by `for...of` | Tracks iteration progress |

Arrays, strings, Maps, and Sets are built-in iterables.

---

# 24. Generators

Generators are special functions that can pause and resume execution.

They are declared using `function*`.

The `yield` keyword pauses execution and produces a value.

### Example

```javascript
function* generateNumbers() {

    yield 1;

    yield 2;

    yield 3;

}

const generator = generateNumbers();

console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
```

Output:

```javascript
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: false }
{ value: undefined, done: true }
```

### Using for...of

```javascript
function* numbers() {

    yield 10;

    yield 20;

    yield 30;

}

for (const number of numbers()) {

    console.log(number);

}
```

### Lazy execution

Generators execute only when values are requested.

```javascript
function* test() {

    console.log("First");

    yield 1;

    console.log("Second");

    yield 2;

}

const generator = test();

console.log("Generator created");

console.log(generator.next());

console.log(generator.next());
```

Output:

```text
Generator created
First
{ value: 1, done: false }
Second
{ value: 2, done: false }
```

The function body does not execute when the generator is created.

### Use cases

- Lazy data processing.
- Large data sequences.
- Custom iteration.
- Managing step-by-step workflows.

---

# 25. Custom Iterables

An object becomes iterable when it implements the `Symbol.iterator` method.

### Example

```javascript
const numbers = {

    values: [10, 20, 30],

    [Symbol.iterator]() {

        let index = 0;

        const values = this.values;

        return {

            next() {

                if (index < values.length) {

                    return {
                        value: values[index++],
                        done: false
                    };

                }

                return {
                    value: undefined,
                    done: true
                };

            }

        };

    }

};
```

Now:

```javascript
for (const number of numbers) {

    console.log(number);

}
```

Output:

```text
10
20
30
```

We created our own iterable object.

---

# 26. WeakMap

`WeakMap` is similar to `Map`, but its keys must be weakly held objects.

This means a WeakMap does not prevent its object keys from being garbage-collected when there are no other strong references to those objects.

### Example

```javascript
const weakMap = new WeakMap();

let user = {
    name: "Riyaz"
};

weakMap.set(user, {
    role: "Developer"
});

console.log(weakMap.get(user));
```

Output:

```javascript
{ role: "Developer" }
```

### Map vs WeakMap

| Feature | Map | WeakMap |
|---|---|---|
| Keys | Any value | Objects |
| Iterable | Yes | No |
| Size property | Yes | No |
| Prevents key object from being garbage-collected | Yes | No |
| Common use | General key-value storage | Object-related metadata |

### Use case

Store private metadata associated with objects without keeping those objects alive solely because of the metadata.

**Important:** WeakMap is not iterable because its keys can disappear through garbage collection.

---

# 27. WeakSet

`WeakSet` is similar to `Set`, but it stores weakly held object references.

```javascript
const weakSet = new WeakSet();

let user1 = {
    name: "Riyaz"
};

let user2 = {
    name: "Ahmed"
};

weakSet.add(user1);

weakSet.add(user2);

console.log(weakSet.has(user1)); // true
```

### Set vs WeakSet

| Feature | Set | WeakSet |
|---|---|---|
| Values | Any value | Objects |
| Iterable | Yes | No |
| Size property | Yes | No |
| Weak references | No | Yes |

### Use case

Tracking whether an object has already been processed.

```javascript
const processedUsers = new WeakSet();

function processUser(user) {

    if (processedUsers.has(user)) {
        console.log("Already processed");
        return;
    }

    processedUsers.add(user);

    console.log("Processing user");

}
```

---

# 28. Map and Set Internals

## Map

A Map stores key-value pairs.

Unlike ordinary objects, Map allows keys of any type.

```javascript
const map = new Map();

map.set("name", "Riyaz");

map.set(101, "User ID");

map.set(true, "Active");

console.log(map.get("name")); // Riyaz
console.log(map.get(101));   // User ID
```

### Important methods

```javascript
map.set("age", 25);

map.get("age");

map.has("age");

map.delete("age");

map.clear();

map.size;
```

### Map iteration

```javascript
const users = new Map();

users.set(1, "Riyaz");

users.set(2, "Ahmed");

for (const [id, name] of users) {

    console.log(id, name);

}
```

## Set

A Set stores unique values.

```javascript
const numbers = new Set();

numbers.add(10);

numbers.add(20);

numbers.add(10);

console.log(numbers); // Set(2) {10, 20}
```

### Removing duplicate array values

```javascript
const numbers = [10, 20, 20, 30, 30, 40];

const uniqueNumbers = [...new Set(numbers)];

console.log(uniqueNumbers);
// [10, 20, 30, 40]
```

### Map vs Object

| Feature | Map | Object |
|---|---|---|
| Keys | Any value | String or Symbol |
| Size | `.size` | Manual calculation |
| Iteration | Directly iterable | Use object iteration methods |
| Insertion order | Preserved | Property ordering follows specific rules |
| Key identity | Uses key identity | Property keys are strings or symbols |

### Set vs Array

| Feature | Set | Array |
|---|---|---|
| Duplicate values | Not stored | Allowed |
| Index access | No | Yes |
| Membership | `has()` | `includes()` |
| Iteration | Yes | Yes |

The ECMAScript specification requires average sublinear access for Map and Set operations, but it does not guarantee that every implementation uses a particular internal data structure or exact O(1) complexity.

Documentation: [MDN – Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map?utm_source=chatgpt.com)

---

# 29. Proxy

A Proxy allows you to intercept and customize operations performed on an object.

For example:

- Reading properties.
- Writing properties.
- Checking properties.
- Deleting properties.
- Calling functions.

### Basic example

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

const proxy = new Proxy(user, {

    get(target, property) {

        console.log(`Reading: ${property}`);

        return target[property];

    },

    set(target, property, value) {

        console.log(`Updating: ${property}`);

        target[property] = value;

        return true;

    }

});

console.log(proxy.name);

proxy.age = 26;
```

Output:

```text
Reading: name
Riyaz

Updating: age
```

### Validation using Proxy

```javascript
const user = {
    age: 25
};

const proxy = new Proxy(user, {

    set(target, property, value) {

        if (property === "age" && value < 0) {

            throw new Error("Age cannot be negative");

        }

        target[property] = value;

        return true;

    }

});

proxy.age = 30; // Valid

// proxy.age = -10; // Error
```

### Real-world applications

- Data validation.
- Logging.
- Reactive systems.
- Framework internals.
- Property access control.

---

# 30. Reflect

`Reflect` provides methods for performing JavaScript object operations.

It is commonly used with Proxy.

### Example

```javascript
const user = {
    name: "Riyaz"
};

console.log(Reflect.get(user, "name"));

Reflect.set(user, "name", "Ahmed");

console.log(user.name);
```

Output:

```text
Riyaz
Ahmed
```

### Proxy with Reflect

```javascript
const user = {
    name: "Riyaz"
};

const proxy = new Proxy(user, {

    get(target, property, receiver) {

        console.log("Property accessed:", property);

        return Reflect.get(target, property, receiver);

    },

    set(target, property, value, receiver) {

        console.log("Property updated:", property);

        return Reflect.set(target, property, value, receiver);

    }

});

proxy.name;

proxy.name = "Ahmed";
```

### Proxy vs Reflect

| Proxy | Reflect |
|---|---|
| Intercepts object operations | Performs object operations |
| Customizes behavior | Provides standard operation methods |
| Uses traps | Provides methods corresponding to many traps |
| Commonly used for interception | Commonly used inside Proxy traps |

Documentation: [MDN – Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy?utm_source=chatgpt.com)

---

# 31. Advanced Promise Patterns

JavaScript provides several methods to work with multiple promises.

The four important methods are:

1. `Promise.all()`
2. `Promise.allSettled()`
3. `Promise.race()`
4. `Promise.any()`

## Promise.all()

Waits until all promises fulfill.

If any promise rejects, the returned promise rejects.

```javascript
const p1 = Promise.resolve("User");

const p2 = Promise.resolve("Products");

const p3 = Promise.resolve("Orders");

Promise.all([p1, p2, p3])
    .then(result => {
        console.log(result);
    });
```

Output:

```javascript
["User", "Products", "Orders"]
```

## Promise.allSettled()

Waits for every promise to settle, regardless of whether it fulfills or rejects.

```javascript
const p1 = Promise.resolve("Success");

const p2 = Promise.reject("Failed");

Promise.allSettled([p1, p2])
    .then(result => {
        console.log(result);
    });
```

Output:

```javascript
[
    { status: "fulfilled", value: "Success" },
    { status: "rejected", reason: "Failed" }
]
```

## Promise.race()

Returns the result of the first promise that settles.

```javascript
const p1 = new Promise(resolve => {
    setTimeout(() => resolve("First"), 1000);
});

const p2 = new Promise(resolve => {
    setTimeout(() => resolve("Second"), 500);
});

Promise.race([p1, p2])
    .then(result => {
        console.log(result);
    });
```

Output:

```text
Second
```

## Promise.any()

Returns the first fulfilled promise.

Rejected promises are ignored unless every promise rejects.

```javascript
const p1 = Promise.reject("Error 1");

const p2 = Promise.resolve("Success");

const p3 = Promise.reject("Error 2");

Promise.any([p1, p2, p3])
    .then(result => {
        console.log(result);
    });
```

Output:

```text
Success
```

If all promises reject, `Promise.any()` rejects with an `AggregateError`.

### Comparison

| Method | Behavior |
|---|---|
| `Promise.all()` | Fulfills when all fulfill; rejects when one rejects |
| `Promise.allSettled()` | Waits for all promises to settle |
| `Promise.race()` | Settles with the first settled promise |
| `Promise.any()` | Fulfills with the first fulfilled promise |

**Important:** `Promise.all()` rejecting does not automatically cancel the remaining operations.

Documentation: [MDN – Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise?utm_source=chatgpt.com)

---

# 32. Async Iterators

An async iterator allows you to retrieve values asynchronously.

It uses:

```javascript
Symbol.asyncIterator
```

Unlike a normal iterator, its `next()` method returns a Promise.

### Example

```javascript
const numbers = {

    async *[Symbol.asyncIterator]() {

        yield 10;

        await new Promise(resolve => {
            setTimeout(resolve, 1000);
        });

        yield 20;

        await new Promise(resolve => {
            setTimeout(resolve, 1000);
        });

        yield 30;

    }

};
```

Usage:

```javascript
async function displayNumbers() {

    for await (const number of numbers) {

        console.log(number);

    }

}

displayNumbers();
```

Output:

```text
10
20
30
```

The values are produced asynchronously.

### Real-world use cases

- Reading data streams.
- Processing paginated APIs.
- Handling asynchronous data sources.
- Streaming large datasets.

### Normal vs Async Iterators

| Normal Iterator | Async Iterator |
|---|---|
| Uses `Symbol.iterator` | Uses `Symbol.asyncIterator` |
| `next()` returns an object | `next()` returns a Promise |
| Used with `for...of` | Used with `for await...of` |

---

# 33. JavaScript Problem-Solving Patterns

Understanding algorithms and problem-solving patterns is essential for writing efficient JavaScript code.

Let's cover the most useful patterns.

## 33.1 Frequency Counter

Used when you need to count how many times values occur.

### Problem

Count the frequency of each character.

```javascript
const text = "javascript";

function frequencyCounter(str) {

    const frequency = {};

    for (const char of str) {

        frequency[char] = (frequency[char] || 0) + 1;

    }

    return frequency;

}

console.log(frequencyCounter(text));
```

Output:

```javascript
{
    j: 1,
    a: 2,
    v: 1,
    s: 1,
    c: 1,
    r: 1,
    i: 1,
    p: 1,
    t: 1
}
```

Common use cases:

- Anagram checking.
- Duplicate detection.
- Character frequency.
- Comparing two arrays.

## 33.2 Two Pointers

Two pointers use two indexes to solve a problem efficiently.

### Problem

Find whether a sorted array contains two numbers whose sum equals the target.

```javascript
function twoSum(numbers, target) {

    let left = 0;

    let right = numbers.length - 1;

    while (left < right) {

        const sum = numbers[left] + numbers[right];

        if (sum === target) {
            return [numbers[left], numbers[right]];
        }

        if (sum < target) {
            left++;
        } else {
            right--;
        }

    }

    return null;

}

console.log(twoSum([1, 2, 4, 6, 8, 9], 10));
```

Output:

```javascript
[2, 8]
```

Time complexity: O(n).

## 33.3 Sliding Window

Sliding window is useful for problems involving continuous subarrays or substrings.

### Problem

Find the maximum sum of three consecutive numbers.

```javascript
function maxSubarraySum(numbers, k) {

    let windowSum = 0;

    for (let i = 0; i < k; i++) {

        windowSum += numbers[i];

    }

    let maxSum = windowSum;

    for (let i = k; i < numbers.length; i++) {

        windowSum += numbers[i];

        windowSum -= numbers[i - k];

        maxSum = Math.max(maxSum, windowSum);

    }

    return maxSum;

}

console.log(maxSubarraySum([2, 1, 5, 1, 3, 2], 3));
```

Output:

```text
9
```

Explanation:

```text
[2, 1, 5] = 8
[1, 5, 1] = 7
[5, 1, 3] = 9
[1, 3, 2] = 6
```

Maximum sum = 9.

## 33.4 Stack

A stack follows LIFO:

**Last In, First Out.**

The last inserted element is removed first.

### Example

```javascript
const stack = [];

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.pop()); // 30
console.log(stack.pop()); // 20
console.log(stack.pop()); // 10
```

Common use cases:

- Undo functionality.
- Browser history concepts.
- Balanced parentheses.
- Expression evaluation.
- Depth-first search.

## 33.5 Queue

A queue follows FIFO:

**First In, First Out.**

The first inserted element is removed first.

```javascript
const queue = [];

queue.push(10);
queue.push(20);
queue.push(30);

console.log(queue.shift()); // 10
console.log(queue.shift()); // 20
console.log(queue.shift()); // 30
```

For large queues, repeatedly using `shift()` can be inefficient because remaining elements may need to be reindexed. A head index or a dedicated queue implementation is often better.

Common use cases:

- Task scheduling.
- Message processing.
- Request handling.
- Breadth-first search.

## 33.6 Hash Map

A hash map provides key-value storage and is useful for fast lookups.

JavaScript's `Map` is commonly used for this pattern.

### Problem

Find the first repeated number.

```javascript
function firstRepeated(numbers) {

    const seen = new Set();

    for (const number of numbers) {

        if (seen.has(number)) {
            return number;
        }

        seen.add(number);

    }

    return null;

}

console.log(firstRepeated([1, 2, 3, 4, 2, 5]));
```

Output:

```text
2
```

Time complexity: O(n) average.

---

# 34. Important Interview Questions

### Q1. What is referential equality?

It means checking whether two object references point to the same object.

### Q2. What is the difference between shallow copy and deep copy?

A shallow copy creates a new outer object but shares nested references. A deep copy independently copies supported nested data.

### Q3. What is the difference between `Object.freeze()` and `Object.seal()`?

- `freeze()` prevents adding, deleting, and changing own properties.
- `seal()` prevents adding and deleting properties but allows changing writable properties.

Both are shallow.

### Q4. What is a pure function?

A function that returns the same result for the same inputs and does not produce observable side effects.

### Q5. What is a higher-order function?

A function that accepts another function or returns a function.

### Q6. What is currying?

Transforming a multi-argument function into a sequence of single-argument functions.

### Q7. What is memoization?

Caching previously calculated results to avoid repeating expensive calculations.

### Q8. What is recursion?

A technique in which a function calls itself to solve a problem.

### Q9. What is the difference between debouncing and throttling?

Debouncing executes after events stop for a specified duration. Throttling limits how frequently a function executes.

### Q10. What is event delegation?

Attaching a listener to a parent element to handle events originating from its descendants.

### Q11. What is the prototype chain?

The mechanism JavaScript uses to search for inherited properties and methods.

### Q12. What is a Symbol?

A unique primitive value commonly used as a property key.

### Q13. What is the difference between an iterator and an iterable?

An iterable provides `Symbol.iterator`; an iterator provides `next()`.

### Q14. What is a generator?

A special function that can pause and resume execution using `yield`.

### Q15. What is the difference between Map and WeakMap?

Map supports arbitrary keys and iteration. WeakMap uses weakly held object keys and is not iterable.

### Q16. What is a Proxy?

An object that intercepts and customizes operations performed on another object.

### Q17. What is Reflect?

An API that provides methods for performing standard object operations, often used with Proxy.

### Q18. What is the difference between Promise.all() and Promise.allSettled()?

`Promise.all()` rejects if one input promise rejects. `Promise.allSettled()` waits for every input promise to settle.

### Q19. What is an async iterator?

An iterator whose `next()` method returns a Promise.

### Q20. What is a sliding window?

An algorithmic technique that maintains a moving range of elements to solve subarray or substring problems efficiently.

---

# 35. Practical Exercises

Try solving these without looking at the solutions.

| No. | Exercise | Concept |
|---|---|---|
| 1 | Create a deep copy of a nested object | Deep Copy |
| 2 | Implement your own `deepFreeze()` | Immutability |
| 3 | Create a function that returns another function | Higher-Order Functions |
| 4 | Convert a normal add function into a curried function | Currying |
| 5 | Implement a `compose()` function | Composition |
| 6 | Implement a memoization function | Memoization |
| 7 | Find factorial using recursion | Recursion |
| 8 | Create a debounced search function | Debouncing |
| 9 | Create a throttled scroll handler | Throttling |
| 10 | Implement event delegation for a dynamic list | DOM |
| 11 | Create an object using `Object.create()` | Prototype |
| 12 | Create a property using `Object.defineProperty()` | Descriptors |
| 13 | Create a custom iterable object | Iterators |
| 14 | Create a generator for even numbers | Generators |
| 15 | Store object metadata using WeakMap | WeakMap |
| 16 | Validate object properties using Proxy | Proxy |
| 17 | Fetch three APIs using Promise.all() | Promises |
| 18 | Implement a queue using JavaScript | Data Structures |
| 19 | Find two numbers whose sum equals a target | Two Pointers |
| 20 | Find the maximum sum of a subarray of size K | Sliding Window |

---

# 36. Output-Based Questions

Try predicting the output before running each example.

### Question 1

```javascript
const obj1 = { name: "Riyaz" };

const obj2 = obj1;

obj2.name = "Ahmed";

console.log(obj1.name);
```

### Question 2

```javascript
const user1 = {
    address: {
        city: "Ahmedabad"
    }
};

const user2 = { ...user1 };

user2.address.city = "Delhi";

console.log(user1.address.city);
```

### Question 3

```javascript
function test() {

    let count = 0;

    return function () {

        count++;

        return count;

    };

}

const counter = test();

console.log(counter());
console.log(counter());
console.log(counter());
```

### Question 4

```javascript
console.log(Object.is(NaN, NaN));

console.log(NaN === NaN);
```

### Question 5

```javascript
function* test() {

    yield 10;

    yield 20;

}

const generator = test();

console.log(generator.next().value);

console.log(generator.next().value);

console.log(generator.next().done);
```

### Question 6

```javascript
const numbers = [1, 2, 3];

const result = numbers.map(num => num * 2);

console.log(result);

console.log(numbers);
```

### Question 7

```javascript
const promise1 = Promise.resolve("A");

const promise2 = Promise.reject("B");

Promise.allSettled([promise1, promise2])
    .then(console.log);
```

---

# 37. Important Documentation

These are useful references for revising this phase:

1. [MDN – JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects?utm_source=chatgpt.com)
2. [MDN – Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures?utm_source=chatgpt.com)
3. [MDN – Iterators and Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators?utm_source=chatgpt.com)
4. [MDN – Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map?utm_source=chatgpt.com)
5. [MDN – WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap?utm_source=chatgpt.com)
6. [MDN – Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy?utm_source=chatgpt.com)
7. [MDN – Reflect](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect?utm_source=chatgpt.com)
8. [MDN – Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise?utm_source=chatgpt.com)

---

# Phase 18 – Completion Checklist

After completing this phase, you should be able to:

- [ ] Explain object references and referential equality.
- [ ] Differentiate shallow copy and deep copy.
- [ ] Use `structuredClone()`.
- [ ] Understand `Object.freeze()` and immutability.
- [ ] Write pure functions.
- [ ] Identify side effects.
- [ ] Implement currying and partial application.
- [ ] Implement function composition.
- [ ] Understand memoization and recursion.
- [ ] Implement debouncing and throttling.
- [ ] Explain event delegation.
- [ ] Understand prototypes and property descriptors.
- [ ] Work with Symbols, iterators, and generators.
- [ ] Understand Map, Set, WeakMap, and WeakSet.
- [ ] Use Proxy and Reflect.
- [ ] Work with advanced Promise methods.
- [ ] Implement common algorithmic patterns.

## JavaScript Roadmap Progress

| Phase | Topic | Status |
|---|---|---|
| 1–17 | Fundamentals to Runtime & Internals | Completed |
| **18** | **Advanced Concepts & Problem Solving** | **Completed** |
| 19 | JavaScript Real-World Application Development | Next |

### Next Phase Preview

**Phase 19 – JavaScript Real-World Application Development**

We will focus on applying JavaScript concepts in practical applications:

1. Working with APIs in real projects.
2. Handling application state.
3. Form handling and validation.
4. Error handling strategies.
5. File handling.
6. Authentication flow.
7. Pagination and filtering.
8. Reusable utility functions.
9. Application architecture.
10. Building a practical JavaScript project.

This phase will connect the JavaScript concepts you've learned with the kind of applications you build using React, Next.js, and Node.js.