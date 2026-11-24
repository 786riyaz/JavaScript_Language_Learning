# JavaScript Complete Revision Notes
# Phase 8 – Modern JavaScript (ES6+)

Modern JavaScript refers to the newer features and improvements introduced to JavaScript through ECMAScript specifications.

**ES6 (ECMAScript 2015)** was a major update that introduced many features still used in modern JavaScript development.

These features make JavaScript code:
- Cleaner.
- More readable.
- Easier to maintain.
- More reusable.
- More powerful.

Let's cover each concept with definitions, examples, comparisons, and practical applications.

---

# 1. What is ECMAScript?

**ECMAScript (ES)** is the standard specification that defines how JavaScript should work.

JavaScript is an implementation of the ECMAScript specification.

In simple terms:

- ECMAScript defines the language standards.
- JavaScript is a programming language based on those standards.
- JavaScript engines implement the ECMAScript specification.

### Example

Features such as:
- `let`
- `const`
- Arrow Functions
- Classes
- Promises
- Modules

were standardized through ECMAScript specifications.

### Important ECMAScript Versions

| Version | Year | Important Features |
|---|---:|---|
| ES5 | 2009 | Strict Mode, JSON, Array Methods |
| ES6 / ES2015 | 2015 | let, const, Arrow Functions, Classes, Promises |
| ES2016 | 2016 | `includes()`, Exponentiation Operator |
| ES2017 | 2017 | async/await, Object.values() |
| ES2018 | 2018 | Rest/Spread Properties, Promise.finally() |
| ES2019 | 2019 | flat(), flatMap(), optional catch binding |
| ES2020 | 2020 | Optional Chaining, Nullish Coalescing, BigInt |
| ES2021 | 2021 | replaceAll(), Logical Assignment Operators |
| ES2022 | 2022 | Top-Level Await, Private Class Fields |
| ES2023 | 2023 | findLast(), findLastIndex() |

**Important:** ES6 is also called ES2015. Modern JavaScript includes features introduced in many later ECMAScript versions.

---

# 2. var vs let vs const

JavaScript provides three main ways to declare variables:

1. `var`
2. `let`
3. `const`

### Example

```javascript
var name = "Riyaz";

let age = 25;

const country = "India";
```

### Difference Between var, let, and const

| Feature | var | let | const |
|---|---|---|---|
| Scope | Function scope | Block scope | Block scope |
| Reassignment | Allowed | Allowed | Not allowed |
| Redeclaration in same scope | Allowed | Not allowed | Not allowed |
| Hoisting | Yes, initialized with `undefined` | Yes, but inaccessible before declaration | Yes, but inaccessible before declaration |
| Must initialize during declaration | No | No | Yes |

### 2.1 var

```javascript
var name = "Riyaz";

var name = "Ahmed";

console.log(name);
```

Output:

```text
Ahmed
```

`var` allows redeclaration and reassignment.

It is function-scoped.

### 2.2 let

```javascript
let age = 25;

age = 26;

console.log(age);
```

Output:

```text
26
```

`let` allows reassignment but does not allow redeclaration in the same scope.

### 2.3 const

```javascript
const country = "India";

console.log(country);
```

You cannot reassign a `const` variable.

```javascript
const country = "India";

country = "USA"; // TypeError
```

### Important: const with Objects

`const` prevents reassignment of the variable, but it does not make the object immutable.

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

user.age = 26;

console.log(user);
```

Output:

```javascript
{
    name: "Riyaz",
    age: 26
}
```

However, this is not allowed:

```javascript
user = {
    name: "Ahmed"
};
```

### Important: Block Scope

```javascript
{
    var a = 10;

    let b = 20;

    const c = 30;
}

console.log(a); // 10

console.log(b); // ReferenceError

console.log(c); // ReferenceError
```

`var` is not restricted by block scope, whereas `let` and `const` are.

**Best Practice:**
- Use `const` by default.
- Use `let` when reassignment is required.
- Avoid `var` in modern JavaScript.

---

# 3. Template Literals

Template literals allow you to create strings using backticks.

They make string interpolation and multiline strings easier.

### Traditional String Concatenation

```javascript
const name = "Riyaz";

const age = 25;

const message = "My name is " + name + " and I am " + age + " years old.";

console.log(message);
```

### Using Template Literals

```javascript
const name = "Riyaz";

const age = 25;

const message = `My name is ${name} and I am ${age} years old.`;

console.log(message);
```

Output:

```text
My name is Riyaz and I am 25 years old.
```

### Multiline Strings

```javascript
const message = `
    Hello Riyaz,
    Welcome to JavaScript.
    Keep Learning!
`;

console.log(message);
```

### Expressions Inside Template Literals

```javascript
const a = 10;

const b = 20;

console.log(`Total: ${a + b}`);
```

Output:

```text
Total: 30
```

### Important Syntax

```javascript
`String ${expression}`
```

The `${}` syntax allows JavaScript expressions inside template literals.

---

# 4. Arrow Functions

Arrow functions provide a shorter syntax for writing functions.

They were introduced in ES6.

### Traditional Function

```javascript
function add(a, b) {
    return a + b;
}
```

### Arrow Function

```javascript
const add = (a, b) => {
    return a + b;
};
```

### Shorter Syntax

If the function contains only one expression, you can omit the curly braces and `return`.

```javascript
const add = (a, b) => a + b;

console.log(add(10, 20));
```

Output:

```text
30
```

### Different Arrow Function Syntaxes

**One parameter:**

```javascript
const greet = name => `Hello ${name}`;
```

Parentheses are optional for a single simple parameter.

**Multiple parameters:**

```javascript
const add = (a, b) => a + b;
```

**No parameters:**

```javascript
const greet = () => "Hello World";
```

**Multiple statements:**

```javascript
const calculate = (a, b) => {
    const sum = a + b;

    const result = sum * 2;

    return result;
};
```

### Returning an Object

When returning an object implicitly, wrap it in parentheses.

```javascript
const getUser = () => ({
    name: "Riyaz",
    age: 25
});

console.log(getUser());
```

### Important: Arrow Function vs Regular Function

| Regular Function | Arrow Function |
|---|---|
| Uses `function` keyword | Uses `=>` |
| Has its own `this` depending on how it is called | Does not have its own `this` |
| Can be used as a constructor with `new` | Cannot be used as a constructor |
| Has an `arguments` object in ordinary functions | Does not have its own `arguments` object |
| Can be used as a method | Usually not suitable for methods needing their own `this` |

### Arrow Function and this

Regular function:

```javascript
const user = {
    name: "Riyaz",

    greet: function () {
        console.log(this.name);
    }
};

user.greet();
```

Output:

```text
Riyaz
```

Arrow function:

```javascript
const user = {
    name: "Riyaz",

    greet: () => {
        console.log(this.name);
    }
};

user.greet();
```

Here, `this` is inherited from the surrounding lexical scope, not from `user`.

Therefore, it does not refer to the `user` object.

**Important:** Arrow functions are not simply shorter regular functions. Their `this`, `arguments`, and constructor behavior are different.

---

# 5. Default Parameters

Default parameters allow you to assign default values to function parameters.

If an argument is missing or explicitly passed as `undefined`, the default value is used.

### Traditional Approach

```javascript
function greet(name) {

    if (name === undefined) {
        name = "Guest";
    }

    console.log(`Hello ${name}`);

}

greet();
```

### Using Default Parameters

```javascript
function greet(name = "Guest") {
    console.log(`Hello ${name}`);
}

greet();
```

Output:

```text
Hello Guest
```

### Example with Multiple Parameters

```javascript
function calculate(a = 10, b = 20) {
    return a + b;
}

console.log(calculate());       // 30
console.log(calculate(5));      // 25
console.log(calculate(5, 10));  // 15
```

### Important

Default parameters are used when:
- The argument is omitted.
- The argument is `undefined`.

They are not used for `null`, `false`, `0`, or an empty string.

```javascript
function greet(name = "Guest") {
    console.log(name);
}

greet(undefined); // Guest
greet(null);      // null
greet("");        // ""
```

---

# 6. Rest Parameters

Rest parameters allow a function to accept any number of arguments and collect them into an array.

They use the `...` syntax.

### Example

```javascript
function sum(...numbers) {
    console.log(numbers);
}

sum(10, 20, 30, 40);
```

Output:

```javascript
[10, 20, 30, 40]
```

### Practical Example

```javascript
function sum(...numbers) {

    let total = 0;

    for (const number of numbers) {
        total += number;
    }

    return total;

}

console.log(sum(10, 20, 30));
```

Output:

```text
60
```

### Rest Parameter with Normal Parameters

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

- Rest parameter must be the last parameter.
- A function can have only one rest parameter.
- Rest parameters collect remaining arguments into an array.

Incorrect:

```javascript
function example(...numbers, name) {
    // SyntaxError
}
```

---

# 7. Spread Operator

The spread operator expands an iterable or object into individual elements or properties.

It also uses the `...` syntax.

### 7.1 Spread with Arrays

```javascript
const numbers = [10, 20, 30];

console.log(...numbers);
```

Output:

```text
10 20 30
```

### 7.2 Copying Arrays

```javascript
const original = [10, 20, 30];

const copy = [...original];

console.log(copy);
```

This creates a new array.

### 7.3 Merging Arrays

```javascript
const arr1 = [10, 20];

const arr2 = [30, 40];

const result = [...arr1, ...arr2];

console.log(result);
```

Output:

```javascript
[10, 20, 30, 40]
```

### 7.4 Spread with Objects

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

Output:

```javascript
{
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
}
```

### 7.5 Updating Object Properties

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

const updatedUser = {
    ...user,
    age: 26
};
```

The later `age` property overrides the earlier one.

### 7.6 Spread in Function Calls

```javascript
const numbers = [10, 20, 30];

console.log(Math.max(...numbers));
```

Output:

```text
30
```

### Important: Spread Creates a Shallow Copy

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

The nested object is still shared between the original and copied objects.

---

# 8. Rest vs Spread Operator

Both use `...`, but their purpose is different.

| Rest Operator | Spread Operator |
|---|---|
| Collects multiple values | Expands multiple values |
| Used in function parameters and destructuring | Used in function calls, arrays, and objects |
| Combines values into an array or object pattern | Expands an iterable or object |
| Used when collecting | Used when spreading |

### Rest Example

```javascript
function sum(...numbers) {
    console.log(numbers);
}

sum(10, 20, 30);
```

### Spread Example

```javascript
const numbers = [10, 20, 30];

console.log(...numbers);
```

**Remember:**

Rest = Collect.

Spread = Expand.

---

# 9. Array Destructuring

Array destructuring allows you to extract values from arrays and assign them to variables.

### Traditional Approach

```javascript
const numbers = [10, 20, 30];

const a = numbers[0];

const b = numbers[1];

const c = numbers[2];
```

### Using Destructuring

```javascript
const numbers = [10, 20, 30];

const [a, b, c] = numbers;

console.log(a);
console.log(b);
console.log(c);
```

Output:

```text
10
20
30
```

### Skipping Elements

```javascript
const numbers = [10, 20, 30, 40];

const [a, , c] = numbers;

console.log(a); // 10
console.log(c); // 30
```

### Default Values

```javascript
const numbers = [10];

const [a, b = 20] = numbers;

console.log(a); // 10
console.log(b); // 20
```

### Swapping Variables

```javascript
let a = 10;

let b = 20;

[a, b] = [b, a];

console.log(a); // 20
console.log(b); // 10
```

### Rest with Array Destructuring

```javascript
const numbers = [10, 20, 30, 40, 50];

const [first, second, ...remaining] = numbers;

console.log(first);
console.log(second);
console.log(remaining);
```

Output:

```javascript
10
20
[30, 40, 50]
```

---

# 10. Object Destructuring

Object destructuring allows you to extract properties from objects and assign them to variables.

### Traditional Approach

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};

const name = user.name;

const age = user.age;
```

### Using Destructuring

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};

const { name, age, city } = user;

console.log(name);
console.log(age);
console.log(city);
```

### Renaming Variables

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

const { name: userName } = user;

console.log(userName);
```

Output:

```text
Riyaz
```

Here:
- `name` is the object property.
- `userName` is the variable.

### Default Values

```javascript
const user = {
    name: "Riyaz"
};

const { name, city = "Ahmedabad" } = user;

console.log(city);
```

Output:

```text
Ahmedabad
```

### Nested Object Destructuring

```javascript
const user = {
    name: "Riyaz",

    address: {
        city: "Ahmedabad",
        state: "Gujarat"
    }
};

const {
    address: {
        city,
        state
    }
} = user;

console.log(city);
console.log(state);
```

### Rest with Object Destructuring

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad",
    country: "India"
};

const { name, ...remaining } = user;

console.log(name);

console.log(remaining);
```

Output:

```javascript
Riyaz

{
    age: 25,
    city: "Ahmedabad",
    country: "India"
}
```

### Important: Destructuring in Function Parameters

This is commonly used in React and Node.js development.

```javascript
function displayUser({ name, age }) {
    console.log(name);
    console.log(age);
}

const user = {
    name: "Riyaz",
    age: 25
};

displayUser(user);
```

---

# 11. Enhanced Object Literals

ES6 introduced improvements to object creation.

### 11.1 Property Shorthand

If the variable name and property name are the same, you can write the property only once.

Traditional:

```javascript
const name = "Riyaz";

const age = 25;

const user = {
    name: name,
    age: age
};
```

Modern:

```javascript
const name = "Riyaz";

const age = 25;

const user = {
    name,
    age
};
```

### 11.2 Method Shorthand

Traditional:

```javascript
const user = {
    greet: function () {
        console.log("Hello");
    }
};
```

Modern:

```javascript
const user = {
    greet() {
        console.log("Hello");
    }
};
```

### 11.3 Computed Property Names

You can use expressions as object property names.

```javascript
const key = "name";

const user = {
    [key]: "Riyaz"
};

console.log(user);
```

Output:

```javascript
{
    name: "Riyaz"
}
```

### Practical Example

```javascript
const field = "email";

const user = {
    name: "Riyaz",
    [field]: "riyaz@example.com"
};
```

---

# 12. Optional Chaining (?.)

Optional chaining allows you to safely access nested object properties without manually checking whether each intermediate property exists.

### Without Optional Chaining

```javascript
const user = {
    name: "Riyaz",
    address: {
        city: "Ahmedabad"
    }
};

console.log(user.address.city);
```

But consider:

```javascript
const user = {
    name: "Riyaz"
};

console.log(user.address.city);
```

This throws a TypeError because `address` is undefined.

### Using Optional Chaining

```javascript
console.log(user.address?.city);
```

Output:

```text
undefined
```

### Nested Optional Chaining

```javascript
const user = {};

console.log(user?.address?.city);
```

### Optional Chaining with Arrays

```javascript
const users = [];

console.log(users[0]?.name);
```

### Optional Chaining with Functions

```javascript
const user = {
    greet() {
        console.log("Hello");
    }
};

user.greet?.();
```

If `greet` does not exist or is nullish, the optional call safely returns `undefined`.

### Important

Optional chaining checks whether the value immediately before `?.` is `null` or `undefined`.

It does not protect against every possible error.

---

# 13. Nullish Coalescing Operator (??)

The nullish coalescing operator returns the right-hand value only when the left-hand value is `null` or `undefined`.

### Example

```javascript
const username = null;

const result = username ?? "Guest";

console.log(result);
```

Output:

```text
Guest
```

### Difference Between || and ??

Logical OR (`||`) uses truthiness.

Nullish coalescing (`??`) checks only `null` and `undefined`.

### Example

```javascript
console.log(0 || 100);  // 100

console.log(0 ?? 100);  // 0
```

```javascript
console.log("" || "Guest"); // Guest

console.log("" ?? "Guest"); // ""
```

### Comparison

| Value | `value || "Default"` | `value ?? "Default"` |
|---|---|---|
| `null` | Default | Default |
| `undefined` | Default | Default |
| `0` | Default | 0 |
| `false` | Default | false |
| `""` | Default | "" |
| `"Hello"` | Hello | Hello |

**When to use:**
- Use `||` when any falsy value should trigger the fallback.
- Use `??` when only `null` or `undefined` should trigger the fallback.

---

# 14. Short-Circuit Evaluation

Short-circuit evaluation means JavaScript stops evaluating an expression as soon as the result is determined.

It is commonly used with:
- `&&`
- `||`
- `??`

### 14.1 Logical AND (&&)

If the first operand is falsy, JavaScript does not evaluate the second operand.

```javascript
const isLoggedIn = true;

isLoggedIn && console.log("Welcome");
```

Output:

```text
Welcome
```

Another example:

```javascript
false && console.log("Hello");
```

The second expression is not executed.

### 14.2 Logical OR (||)

If the first operand is truthy, JavaScript does not evaluate the second operand.

```javascript
const name = "Riyaz";

const result = name || "Guest";

console.log(result);
```

Output:

```text
Riyaz
```

### 14.3 Nullish Coalescing (??)

```javascript
const age = null;

const result = age ?? 18;

console.log(result);
```

Output:

```text
18
```

### Important

These operators return operand values, not necessarily Boolean values.

```javascript
console.log("Hello" && "World"); // World

console.log(0 || 100);           // 100

console.log(null ?? 50);         // 50
```

---

# 15. Array Methods – Modern JavaScript

JavaScript provides many useful methods for working with arrays.

Some were introduced before ES6, while others were added in later ECMAScript versions.

### 15.1 map()

Creates a new array by transforming each element.

```javascript
const numbers = [1, 2, 3, 4];

const result = numbers.map((num) => num * 2);

console.log(result);
```

Output:

```javascript
[2, 4, 6, 8]
```

### 15.2 filter()

Creates a new array containing elements that satisfy a condition.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const result = numbers.filter((num) => num % 2 === 0);

console.log(result);
```

Output:

```javascript
[2, 4, 6]
```

### 15.3 reduce()

Reduces an array to a single accumulated value.

```javascript
const numbers = [10, 20, 30, 40];

const total = numbers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);

console.log(total);
```

Output:

```text
100
```

### 15.4 find()

Returns the first element satisfying a condition.

```javascript
const numbers = [10, 20, 30, 40];

const result = numbers.find((num) => num > 20);

console.log(result);
```

Output:

```text
30
```

### 15.5 findIndex()

Returns the index of the first element satisfying a condition.

```javascript
const numbers = [10, 20, 30, 40];

const index = numbers.findIndex((num) => num > 20);

console.log(index);
```

Output:

```text
2
```

### 15.6 some()

Returns `true` if at least one element satisfies a condition.

```javascript
const numbers = [1, 3, 5, 8];

console.log(numbers.some((num) => num % 2 === 0));
```

Output:

```text
true
```

### 15.7 every()

Returns `true` if all elements satisfy a condition.

```javascript
const numbers = [2, 4, 6, 8];

console.log(numbers.every((num) => num % 2 === 0));
```

Output:

```text
true
```

### 15.8 includes()

Checks whether an array contains a particular value.

```javascript
const fruits = ["Apple", "Banana", "Mango"];

console.log(fruits.includes("Mango"));
```

Output:

```text
true
```

### 15.9 flat()

Flattens nested arrays up to a specified depth.

```javascript
const numbers = [1, 2, [3, 4], [5, 6]];

console.log(numbers.flat());
```

Output:

```javascript
[1, 2, 3, 4, 5, 6]
```

### 15.10 flatMap()

Maps each element and flattens the resulting array by one level.

```javascript
const numbers = [1, 2, 3];

const result = numbers.flatMap((num) => [num, num * 2]);

console.log(result);
```

Output:

```javascript
[1, 2, 2, 4, 3, 6]
```

### Array Methods Comparison

| Method | Purpose | Returns |
|---|---|---|
| `map()` | Transform elements | New array |
| `filter()` | Select matching elements | New array |
| `reduce()` | Accumulate values | Single accumulated value |
| `find()` | Find first matching element | Element or `undefined` |
| `findIndex()` | Find first matching index | Index or `-1` |
| `some()` | Check whether any element matches | Boolean |
| `every()` | Check whether all elements match | Boolean |
| `includes()` | Check whether a value exists | Boolean |
| `flat()` | Flatten nested arrays | New array |
| `flatMap()` | Map and flatten one level | New array |

---

# 16. Object Methods

Modern JavaScript provides useful methods for working with objects.

Consider:

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};
```

### 16.1 Object.keys()

Returns an array of an object's own enumerable property names.

```javascript
console.log(Object.keys(user));
```

Output:

```javascript
["name", "age", "city"]
```

### 16.2 Object.values()

Returns an array of an object's own enumerable property values.

```javascript
console.log(Object.values(user));
```

Output:

```javascript
["Riyaz", 25, "Ahmedabad"]
```

### 16.3 Object.entries()

Returns an array of key-value pairs.

```javascript
console.log(Object.entries(user));
```

Output:

```javascript
[
    ["name", "Riyaz"],
    ["age", 25],
    ["city", "Ahmedabad"]
]
```

### 16.4 Object.fromEntries()

Converts key-value pairs into an object.

```javascript
const entries = [
    ["name", "Riyaz"],
    ["age", 25]
];

const user = Object.fromEntries(entries);

console.log(user);
```

Output:

```javascript
{
    name: "Riyaz",
    age: 25
}
```

### 16.5 Object.assign()

Copies enumerable own properties from source objects to a target object.

```javascript
const user = {
    name: "Riyaz"
};

const details = {
    age: 25,
    city: "Ahmedabad"
};

const result = Object.assign({}, user, details);

console.log(result);
```

### 16.6 Object.freeze()

Prevents changes to an object's own properties.

```javascript
const user = {
    name: "Riyaz"
};

Object.freeze(user);

user.name = "Ahmed"; // Does not change in non-strict mode
```

In strict mode, attempting to modify a frozen property can throw a TypeError.

**Important:** `Object.freeze()` is shallow. Nested objects are not automatically frozen.

### 16.7 Object.seal()

Prevents adding or removing properties, but existing writable properties can still be changed.

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

Object.seal(user);

user.age = 26;       // Allowed

user.city = "Delhi"; // Not allowed

delete user.name;    // Not allowed
```

### freeze() vs seal()

| Object.freeze() | Object.seal() |
|---|---|
| Cannot add properties | Cannot add properties |
| Cannot delete properties | Cannot delete properties |
| Cannot modify existing data properties | Can modify existing writable data properties |
| Shallow operation | Shallow operation |

---

# 17. for...of vs for...in

Both are used for iteration, but they work differently.

### for...of

Used to iterate over values of iterable objects.

Examples:
- Arrays.
- Strings.
- Maps.
- Sets.

```javascript
const numbers = [10, 20, 30];

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

### for...in

Used to iterate over enumerable property keys.

It is commonly used with objects.

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};

for (const key in user) {
    console.log(key, user[key]);
}
```

Output:

```text
name Riyaz
age 25
city Ahmedabad
```

### Difference

| for...of | for...in |
|---|---|
| Iterates over values | Iterates over enumerable keys |
| Works with iterables | Works with enumerable properties |
| Commonly used with arrays | Commonly used with objects |
| Returns array values | Returns property names |

**Important:** Avoid using `for...in` for ordinary array iteration because it iterates over enumerable property keys, not array values.

---

# 18. Map

`Map` is a JavaScript collection that stores key-value pairs.

Unlike ordinary objects, Map allows values of any type as keys.

### Creating a Map

```javascript
const user = new Map();
```

### Adding Values

```javascript
user.set("name", "Riyaz");

user.set("age", 25);

user.set("city", "Ahmedabad");
```

### Getting Values

```javascript
console.log(user.get("name"));
```

Output:

```text
Riyaz
```

### Checking Keys

```javascript
console.log(user.has("age"));
```

Output:

```text
true
```

### Removing Values

```javascript
user.delete("age");
```

### Clearing Map

```javascript
user.clear();
```

### Map Size

```javascript
console.log(user.size);
```

### Map with Different Key Types

```javascript
const map = new Map();

const objKey = {
    id: 1
};

map.set("name", "Riyaz");

map.set(100, "Number Key");

map.set(objKey, "Object Key");

console.log(map.get(objKey));
```

Output:

```text
Object Key
```

### Iterating Map

```javascript
const map = new Map([
    ["name", "Riyaz"],
    ["age", 25]
]);

for (const [key, value] of map) {
    console.log(key, value);
}
```

### Map vs Object

| Map | Object |
|---|---|
| Keys can be any type | Property keys are strings or symbols |
| Has `size` property | No direct size property |
| Designed for key-value collections | General-purpose objects |
| Directly iterable | Not directly iterable by default |
| Provides `set()`, `get()`, `has()`, `delete()` | Uses properties and object methods |

---

# 19. Set

`Set` is a collection that stores unique values.

Duplicate values are automatically removed.

### Creating a Set

```javascript
const numbers = new Set();
```

### Adding Values

```javascript
numbers.add(10);

numbers.add(20);

numbers.add(30);

numbers.add(10);
```

### Output

```javascript
Set(3) { 10, 20, 30 }
```

The duplicate `10` is ignored.

### Checking Values

```javascript
console.log(numbers.has(20));
```

Output:

```text
true
```

### Removing Values

```javascript
numbers.delete(20);
```

### Clearing Set

```javascript
numbers.clear();
```

### Set Size

```javascript
console.log(numbers.size);
```

### Removing Duplicates from an Array

```javascript
const numbers = [10, 20, 10, 30, 20, 40];

const uniqueNumbers = [...new Set(numbers)];

console.log(uniqueNumbers);
```

Output:

```javascript
[10, 20, 30, 40]
```

### Iterating Set

```javascript
const fruits = new Set([
    "Apple",
    "Banana",
    "Mango"
]);

for (const fruit of fruits) {
    console.log(fruit);
}
```

### Map vs Set

| Map | Set |
|---|---|
| Stores key-value pairs | Stores unique values |
| Keys can be any type | Stores values of any type |
| Duplicate keys replace previous values | Duplicate values are ignored |
| Uses `set(key, value)` | Uses `add(value)` |

---

# 20. WeakMap

`WeakMap` is a collection of key-value pairs where keys must be objects or non-registered symbols.

Its keys are held weakly, meaning the WeakMap does not prevent eligible object keys from being garbage-collected when there are no other strong references to them.

### Example

```javascript
const weakMap = new WeakMap();

const user = {
    name: "Riyaz"
};

weakMap.set(user, "User Information");

console.log(weakMap.get(user));
```

Output:

```text
User Information
```

### Important Methods

| Method | Description |
|---|---|
| `set()` | Adds a key-value pair |
| `get()` | Retrieves a value |
| `has()` | Checks whether a key exists |
| `delete()` | Removes a key-value pair |

### Important Characteristics

- Keys must be objects or non-registered symbols.
- Keys are weakly held.
- Not iterable.
- Does not have a `size` property.
- Useful for associating metadata with objects without keeping those objects alive solely because of the collection.

### Map vs WeakMap

| Map | WeakMap |
|---|---|
| Keys can be any type | Keys must be objects or non-registered symbols |
| Strongly holds keys | Weakly holds eligible keys |
| Iterable | Not iterable |
| Has `size` | No `size` |
| Supports `clear()` | No `clear()` method |

---

# 21. WeakSet

`WeakSet` stores unique object references.

Its values are held weakly, so it does not prevent eligible objects from being garbage-collected.

### Example

```javascript
const weakSet = new WeakSet();

const user1 = {
    name: "Riyaz"
};

const user2 = {
    name: "Ahmed"
};

weakSet.add(user1);

weakSet.add(user2);

console.log(weakSet.has(user1));
```

Output:

```text
true
```

### Important Methods

| Method | Description |
|---|---|
| `add()` | Adds an object |
| `has()` | Checks whether an object exists |
| `delete()` | Removes an object |

### Important Characteristics

- Stores objects and non-registered symbols.
- Values are weakly held.
- Does not allow primitive values.
- Not iterable.
- Does not have a `size` property.

### Set vs WeakSet

| Set | WeakSet |
|---|---|
| Stores values of any type | Stores objects and non-registered symbols |
| Strongly holds values | Weakly holds eligible values |
| Iterable | Not iterable |
| Has `size` | No `size` |
| Supports `clear()` | No `clear()` |

---

# 22. Symbols

A Symbol is a primitive data type introduced in ES6.

Every Symbol created using `Symbol()` is unique.

### Creating a Symbol

```javascript
const id1 = Symbol("id");

const id2 = Symbol("id");

console.log(id1 === id2);
```

Output:

```text
false
```

Even though both Symbols have the same description, they are different values.

### Using Symbols as Object Keys

```javascript
const id = Symbol("id");

const user = {
    name: "Riyaz",

    [id]: 101
};

console.log(user[id]);
```

Output:

```text
101
```

### Why Use Symbols?

Symbols are useful when you need unique property keys.

They help avoid accidental property-name collisions.

### Important

Symbol-keyed properties are not returned by:

```javascript
Object.keys(user);

Object.values(user);

Object.entries(user);
```

To retrieve Symbol keys, use:

```javascript
console.log(Object.getOwnPropertySymbols(user));
```

Or:

```javascript
console.log(Reflect.ownKeys(user));
```

**Note:** Symbols are not a security or privacy mechanism. They can still be discovered using reflection APIs.

---

# 23. Iterators

An iterator is an object that provides a way to access values one at a time.

It follows the iterator protocol.

An iterator must have a `next()` method that returns an object containing:

```javascript
{
    value: someValue,
    done: trueOrFalse
}
```

### Example

```javascript
const numbers = [10, 20, 30];

const iterator = numbers[Symbol.iterator]();

console.log(iterator.next());

console.log(iterator.next());

console.log(iterator.next());

console.log(iterator.next());
```

Output:

```javascript
{ value: 10, done: false }

{ value: 20, done: false }

{ value: 30, done: false }

{ value: undefined, done: true }
```

### Important Iterator Concepts

- `Symbol.iterator` is the well-known symbol used to define an object's default iterator.
- `next()` returns the next iteration result.
- `done: false` means more values are available.
- `done: true` means iteration is complete.

### Iterable vs Iterator

| Iterable | Iterator |
|---|---|
| Provides a `[Symbol.iterator]()` method | Provides a `next()` method |
| Can produce an iterator | Produces iteration results |
| Examples: Array, String, Map, Set | The object returned by an iterator method |

---

# 24. Generators

Generators are special functions that can pause execution and resume later.

They are declared using the `function*` syntax.

The `yield` keyword pauses the generator and returns a value.

### Example

```javascript
function* generateNumbers() {

    yield 10;

    yield 20;

    yield 30;

}

const generator = generateNumbers();

console.log(generator.next());

console.log(generator.next());

console.log(generator.next());

console.log(generator.next());
```

Output:

```javascript
{ value: 10, done: false }

{ value: 20, done: false }

{ value: 30, done: false }

{ value: undefined, done: true }
```

### Important Keywords

| Keyword | Description |
|---|---|
| `function*` | Declares a generator function |
| `yield` | Pauses execution and produces a value |
| `next()` | Resumes execution and returns an iteration result |
| `return()` | Terminates the generator |
| `throw()` | Throws an error inside the generator |

### Iterating Generator Values

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

Output:

```text
10
20
30
```

### Generator vs Normal Function

| Normal Function | Generator Function |
|---|---|
| Executes when called | Calling it returns a generator object |
| Normally runs until completion or return | Can pause using `yield` |
| Returns a normal result | Produces iteration results |
| Uses `return` | Uses `yield` to produce intermediate values |

---

# 25. BigInt

`BigInt` is a primitive data type used to represent integers larger than the safe integer range of JavaScript's Number type.

### Example

```javascript
const number = 123456789012345678901234567890n;

console.log(number);
```

The `n` suffix indicates a BigInt literal.

### Using BigInt()

```javascript
const number = BigInt("123456789012345678901234567890");

console.log(number);
```

### Arithmetic Operations

```javascript
const a = 100n;

const b = 200n;

console.log(a + b);
```

Output:

```text
300n
```

### Important Rules

You cannot directly mix BigInt and Number in most arithmetic operations.

Incorrect:

```javascript
const result = 10n + 20;
```

This throws a TypeError.

Correct:

```javascript
const result = 10n + 20n;
```

### Number vs BigInt

| Number | BigInt |
|---|---|
| Supports integers and floating-point numbers | Supports arbitrary-size integers |
| Uses IEEE 754 double precision | Represents integers with arbitrary precision |
| Supports decimal values | Does not support fractional values |
| Cannot safely represent every very large integer | Can represent very large integers |

**Important:** `JSON.stringify()` cannot directly serialize BigInt values. You need to convert them to strings or use a custom serialization approach.

---

# 26. Dynamic Import

Dynamic import allows JavaScript modules to be loaded when needed instead of loading them through a static import declaration.

It uses:

```javascript
import()
```

It returns a Promise.

### Example

Suppose you have a file named `math.js`.

```javascript
export function add(a, b) {
    return a + b;
}
```

You can load it dynamically:

```javascript
async function calculate() {

    const math = await import("./math.js");

    console.log(math.add(10, 20));

}

calculate();
```

Output:

```text
30
```

### Using `.then()`

```javascript
import("./math.js")
    .then((module) => {
        console.log(module.add(10, 20));
    })
    .catch((error) => {
        console.log(error);
    });
```

### Why Use Dynamic Import?

- Load modules only when required.
- Reduce initial JavaScript loading.
- Improve application loading performance.
- Support code splitting.
- Useful for large applications.

**Note:** Dynamic import is part of JavaScript's module system. We will study static imports, exports, and module structure in Phase 10.

---

# 27. Optional Chaining vs Nullish Coalescing

These two operators are frequently used together.

### Optional Chaining

Safely accesses nested properties.

```javascript
const user = {};

console.log(user.address?.city);
```

Output:

```text
undefined
```

### Nullish Coalescing

Provides a fallback when a value is `null` or `undefined`.

```javascript
const city = undefined;

console.log(city ?? "Unknown");
```

Output:

```text
Unknown
```

### Using Both Together

```javascript
const user = {
    name: "Riyaz"
};

const city = user.address?.city ?? "Unknown";

console.log(city);
```

Output:

```text
Unknown
```

---

# 28. Important JavaScript Concepts – Quick Comparison

| Concept | Purpose |
|---|---|
| `let` | Declares a block-scoped variable |
| `const` | Declares a block-scoped variable that cannot be reassigned |
| Template Literals | Supports interpolation and multiline strings |
| Arrow Functions | Provides concise function syntax and lexical `this` |
| Default Parameters | Provides fallback parameter values |
| Rest Operator | Collects remaining values |
| Spread Operator | Expands iterable or object values |
| Array Destructuring | Extracts values from arrays |
| Object Destructuring | Extracts properties from objects |
| Enhanced Object Literals | Simplifies object creation |
| Optional Chaining | Safely accesses nested properties |
| Nullish Coalescing | Provides fallback for nullish values |
| Short-Circuiting | Stops evaluation when the result is determined |
| Map | Stores key-value pairs |
| Set | Stores unique values |
| WeakMap | Stores weakly held keys |
| WeakSet | Stores weakly held values |
| Symbol | Creates unique primitive values |
| Iterator | Provides sequential access to values |
| Generator | Produces values using `yield` |
| BigInt | Represents arbitrarily large integers |
| Dynamic Import | Loads modules dynamically |

---

# 29. Interview Questions

### Basic Questions

1. What is ECMAScript?
2. What is ES6?
3. What is the difference between JavaScript and ECMAScript?
4. What is the difference between `var`, `let`, and `const`?
5. What are template literals?
6. What are arrow functions?
7. What is the difference between arrow functions and regular functions?
8. What are default parameters?
9. What are rest parameters?
10. What is the spread operator?

### Intermediate Questions

11. What is the difference between rest and spread operators?
12. What is array destructuring?
13. What is object destructuring?
14. What are enhanced object literals?
15. What are computed property names?
16. What is optional chaining?
17. What is nullish coalescing?
18. What is the difference between `||` and `??`?
19. What is short-circuit evaluation?
20. What is the difference between `map()` and `filter()`?
21. What is the difference between `find()` and `findIndex()`?
22. What is the difference between `some()` and `every()`?
23. What is the difference between `for...of` and `for...in`?
24. What is the difference between `Object.keys()`, `Object.values()`, and `Object.entries()`?

### Advanced Questions

25. What is the difference between Map and Object?
26. What is the difference between Set and Array?
27. What is WeakMap?
28. What is WeakSet?
29. What is garbage collection, and how do WeakMap and WeakSet relate to it?
30. What is a Symbol?
31. What is an iterator?
32. What is the difference between an iterable and an iterator?
33. What is a generator function?
34. What is the difference between `yield` and `return`?
35. What is BigInt?
36. What is dynamic import?
37. What is the difference between Object.freeze() and Object.seal()?
38. Does the spread operator perform a deep copy?
39. Can arrow functions be used as constructors?
40. Does `const` make objects immutable?

---

# 30. Practical Exercises

Practice these tasks without looking at the solutions.

| No. | Exercise | Concepts |
|---|---|---|
| 1 | Convert normal functions into arrow functions | Arrow Functions |
| 2 | Build a greeting function using template literals | Template Literals |
| 3 | Create a calculator using default parameters | Default Parameters |
| 4 | Create a function that accepts unlimited arguments | Rest Parameters |
| 5 | Merge two arrays using spread | Spread Operator |
| 6 | Remove duplicate values from an array | Set + Spread |
| 7 | Swap two variables using destructuring | Array Destructuring |
| 8 | Extract nested object properties | Object Destructuring |
| 9 | Create a user object using shorthand properties | Enhanced Object Literals |
| 10 | Access nested API response data safely | Optional Chaining |
| 11 | Set default values using `??` | Nullish Coalescing |
| 12 | Find all adults from a user array | filter() |
| 13 | Calculate total product prices | reduce() |
| 14 | Find a product by ID | find() |
| 15 | Group or process data using Map | Map |
| 16 | Remove duplicate names using Set | Set |
| 17 | Create a unique object identifier using Symbol | Symbol |
| 18 | Create a custom iterator | Iterators |
| 19 | Generate a sequence using a generator | Generators |
| 20 | Load a module using dynamic import | Dynamic Import |

---

# 31. Important Output-Based Questions

### Question 1 – const and Objects

```javascript
const user = {
    name: "Riyaz"
};

user.name = "Ahmed";

console.log(user.name);
```

**Output:**

```text
Ahmed
```

Reason: `const` prevents reassignment of the variable, not modification of object properties.

### Question 2 – Arrow Functions

```javascript
const add = (a, b) => a + b;

console.log(add(10, 20));
```

**Output:**

```text
30
```

### Question 3 – Default Parameters

```javascript
function test(a = 10, b = 20) {
    console.log(a, b);
}

test(undefined, 50);
```

**Output:**

```text
10 50
```

### Question 4 – Rest Parameters

```javascript
function test(a, ...b) {
    console.log(a);
    console.log(b);
}

test(10, 20, 30, 40);
```

**Output:**

```text
10
[20, 30, 40]
```

### Question 5 – Spread Operator

```javascript
const a = [10, 20];

const b = [...a, 30, 40];

console.log(b);
```

**Output:**

```javascript
[10, 20, 30, 40]
```

### Question 6 – Array Destructuring

```javascript
const numbers = [10, 20, 30, 40];

const [a, , b] = numbers;

console.log(a, b);
```

**Output:**

```text
10 30
```

### Question 7 – Nullish Coalescing

```javascript
console.log(0 ?? 100);

console.log(null ?? 100);

console.log(false ?? true);
```

**Output:**

```text
0
100
false
```

### Question 8 – Optional Chaining

```javascript
const user = {
    name: "Riyaz"
};

console.log(user.address?.city);
```

**Output:**

```text
undefined
```

### Question 9 – Set

```javascript
const numbers = new Set([10, 20, 10, 30, 20]);

console.log(numbers.size);
```

**Output:**

```text
3
```

### Question 10 – Map

```javascript
const map = new Map();

map.set("name", "Riyaz");

map.set("name", "Ahmed");

console.log(map.get("name"));
```

**Output:**

```text
Ahmed
```

Reason: A Map cannot contain duplicate keys. Setting an existing key updates its value.

---

# 32. Official Documentation

1. [MDN – JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide?utm_source=chatgpt.com)
2. [MDN – JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference?utm_source=chatgpt.com)
3. [MDN – Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring?utm_source=chatgpt.com)
4. [MDN – Spread Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax?utm_source=chatgpt.com)
5. [MDN – Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters?utm_source=chatgpt.com)
6. [MDN – Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map?utm_source=chatgpt.com)
7. [MDN – Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set?utm_source=chatgpt.com)
8. [MDN – Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator?utm_source=chatgpt.com)
9. [MDN – BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt?utm_source=chatgpt.com)

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
| Phase 9 | Advanced JavaScript | Next |
| Phase 10 | JavaScript Modules & Tooling | Upcoming |
| Phase 11 | JavaScript Projects & Interview Preparation | Upcoming |

## Next: Phase 9 – Advanced JavaScript

Topics will include:

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

**Recommendation:** Before moving to Phase 9, build a small product management application using ES6+ features. Use destructuring, spread operators, array methods, Map, Set, optional chaining, and template literals. These concepts are used extensively in React and Node.js projects.