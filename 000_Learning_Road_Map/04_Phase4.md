# JavaScript – Phase 4: Arrays & Objects

Arrays and Objects are two of the most important data structures in JavaScript.

They are extensively used in frontend development, backend development, API responses, databases, React, Node.js and Next.js.

For example:
- API responses commonly contain arrays of objects.
- React uses arrays to render lists of components.
- Node.js applications use objects to manage data.
- MongoDB documents are represented using object-like structures.

This phase covers arrays and objects from fundamentals to advanced manipulation techniques.

# Topics Covered

| No. | Topic | Description |
|---|---|---|
| 1 | Introduction to Arrays | What are arrays? |
| 2 | Array Indexing | Accessing array elements |
| 3 | Modifying Arrays | Adding, updating and removing elements |
| 4 | Array Methods | Built-in array methods |
| 5 | Searching Arrays | find, findIndex, includes, indexOf |
| 6 | Iterating Arrays | forEach, map |
| 7 | Filtering Arrays | filter |
| 8 | Reducing Arrays | reduce |
| 9 | Array Sorting | sort, reverse |
| 10 | Array Transformation | flat, flatMap |
| 11 | Array Destructuring | Extracting array values |
| 12 | Multidimensional Arrays | Arrays inside arrays |
| 13 | Array of Objects | Working with structured data |
| 14 | Introduction to Objects | What are objects? |
| 15 | Object Properties | Keys and values |
| 16 | Accessing Properties | Dot and bracket notation |
| 17 | Modifying Objects | Adding, updating and deleting properties |
| 18 | Nested Objects | Objects inside objects |
| 19 | Object Methods | Object.keys, values, entries |
| 20 | Object Destructuring | Extracting object properties |
| 21 | Computed Properties | Dynamic property names |
| 22 | Shorthand Properties | Shorter object syntax |
| 23 | Object.assign() | Copying and merging objects |
| 24 | Object.freeze() | Preventing object modifications |
| 25 | Object.seal() | Restricting object modifications |
| 26 | Optional Chaining | Safe property access |
| 27 | Property Descriptors | Property behaviour |
| 28 | Shallow Copy | Copying references |
| 29 | Deep Copy | Independent nested copies |

---

# PART A: ARRAYS

## 1. What is an Array?

### Definition

An array is a data structure used to store multiple values in a single variable.

Arrays can contain values of different data types, including numbers, strings, booleans, objects, and even other arrays.

### Example

Without an array:

```javascript
let student1 = "Riyaz";
let student2 = "Ahmed";
let student3 = "Ali";
let student4 = "John";
```

Using an array:

```javascript
let students = ["Riyaz", "Ahmed", "Ali", "John"];
```

An array makes it easier to store, access, and manipulate collections of data.

### Creating Arrays

**Method 1: Array Literal (Recommended)**

```javascript
const numbers = [10, 20, 30, 40];
```

**Method 2: Array Constructor**

```javascript
const numbers = new Array(10, 20, 30, 40);
```

**Method 3: Array.of()**

```javascript
const numbers = Array.of(10, 20, 30);

console.log(numbers); // [10, 20, 30]
```

**Important:**

```javascript
const arr1 = new Array(5);

console.log(arr1.length); // 5
```

This creates an array with five empty slots.

But:

```javascript
const arr2 = Array.of(5);

console.log(arr2); // [5]
```

This creates an array containing one element: `5`.

---

## 2. Array Indexing

### What is Array Indexing?

Array indexing is the process of accessing individual elements using their numerical positions.

JavaScript arrays use zero-based indexing.

This means the first element has index `0`.

Example:

```javascript
const fruits = ["Apple", "Banana", "Mango", "Orange"];
```

| Index | Value |
|---|---|
| 0 | Apple |
| 1 | Banana |
| 2 | Mango |
| 3 | Orange |

### Accessing Array Elements

```javascript
console.log(fruits[0]); // Apple
console.log(fruits[1]); // Banana
console.log(fruits[2]); // Mango
```

### Updating Array Elements

```javascript
const fruits = ["Apple", "Banana", "Mango"];

fruits[1] = "Orange";

console.log(fruits);
```

Output:

```text
["Apple", "Orange", "Mango"]
```

Notice that we can modify array elements even though the array is declared using `const`.

This is because `const` prevents reassignment of the variable, not modification of the array.

### Array Length

The `length` property returns the number of elements in an array.

```javascript
const numbers = [10, 20, 30, 40];

console.log(numbers.length); // 4
```

The last element can be accessed using:

```javascript
console.log(numbers[numbers.length - 1]); // 40
```

### Accessing Elements Using at()

The `at()` method accesses an element using its index.

It also supports negative indexes.

```javascript
const fruits = ["Apple", "Banana", "Mango", "Orange"];

console.log(fruits.at(0));  // Apple
console.log(fruits.at(-1)); // Orange
console.log(fruits.at(-2)); // Mango
```

---

## 3. Adding, Updating and Removing Array Elements

JavaScript provides several methods for modifying arrays.

### 3.1 push()

Adds one or more elements to the end of an array.

```javascript
const numbers = [10, 20, 30];

numbers.push(40);

console.log(numbers);
```

Output:

```text
[10, 20, 30, 40]
```

### 3.2 pop()

Removes the last element from an array and returns the removed element.

```javascript
const numbers = [10, 20, 30];

let removed = numbers.pop();

console.log(numbers); // [10, 20]
console.log(removed); // 30
```

### 3.3 unshift()

Adds one or more elements to the beginning of an array.

```javascript
const numbers = [20, 30];

numbers.unshift(10);

console.log(numbers);
```

Output:

```text
[10, 20, 30]
```

### 3.4 shift()

Removes the first element from an array and returns the removed element.

```javascript
const numbers = [10, 20, 30];

let removed = numbers.shift();

console.log(numbers); // [20, 30]
console.log(removed); // 10
```

### 3.5 splice()

The `splice()` method modifies an array by adding, removing, or replacing elements.

Syntax:

```javascript
array.splice(start, deleteCount, item1, item2, ...);
```

Parameters:

| Parameter | Description |
|---|---|
| start | Index at which modification begins. |
| deleteCount | Number of elements to remove. |
| item1, item2 | Optional elements to insert. |

**Removing Elements:**

```javascript
const fruits = ["Apple", "Banana", "Mango", "Orange"];

fruits.splice(1, 2);

console.log(fruits);
```

Output:

```text
["Apple", "Orange"]
```

**Adding Elements:**

```javascript
const fruits = ["Apple", "Orange"];

fruits.splice(1, 0, "Banana", "Mango");

console.log(fruits);
```

Output:

```text
["Apple", "Banana", "Mango", "Orange"]
```

**Replacing Elements:**

```javascript
const fruits = ["Apple", "Banana", "Mango"];

fruits.splice(1, 1, "Orange");

console.log(fruits);
```

Output:

```text
["Apple", "Orange", "Mango"]
```

### 3.6 slice()

The `slice()` method extracts a portion of an array and returns a new array without modifying the original.

Syntax:

```javascript
array.slice(start, end);
```

The `end` index is excluded.

Example:

```javascript
const numbers = [10, 20, 30, 40, 50];

const result = numbers.slice(1, 4);

console.log(result);
```

Output:

```text
[20, 30, 40]
```

Original array remains unchanged:

```javascript
console.log(numbers);

// [10, 20, 30, 40, 50]
```

### splice() vs slice()

| splice() | slice() |
|---|---|
| Modifies the original array. | Does not modify the original array. |
| Can add elements. | Cannot add elements. |
| Can remove elements. | Extracts a portion of an array. |
| Can replace elements. | Does not replace elements. |
| Returns removed elements. | Returns extracted elements. |

---

# 4. Array Methods

Array methods are built-in functions that allow developers to manipulate, search, transform and process array elements.

## 4.1 concat()

Combines two or more arrays and returns a new array.

```javascript
const arr1 = [10, 20];

const arr2 = [30, 40];

const result = arr1.concat(arr2);

console.log(result);
```

Output:

```text
[10, 20, 30, 40]
```

## 4.2 join()

Converts array elements into a string separated by a specified separator.

```javascript
const fruits = ["Apple", "Banana", "Mango"];

console.log(fruits.join(", "));
```

Output:

```text
Apple, Banana, Mango
```

## 4.3 includes()

Checks whether an array contains a specific value.

Returns a Boolean.

```javascript
const numbers = [10, 20, 30];

console.log(numbers.includes(20)); // true

console.log(numbers.includes(50)); // false
```

## 4.4 indexOf()

Returns the first index of a specified element.

Returns `-1` if the element is not found.

```javascript
const fruits = ["Apple", "Banana", "Mango"];

console.log(fruits.indexOf("Banana")); // 1

console.log(fruits.indexOf("Orange")); // -1
```

## 4.5 lastIndexOf()

Returns the last index of a specified element.

```javascript
const numbers = [10, 20, 30, 20, 40];

console.log(numbers.lastIndexOf(20)); // 3
```

## 4.6 Array.isArray()

Checks whether a value is an array.

```javascript
console.log(Array.isArray([10, 20])); // true

console.log(Array.isArray({})); // false

console.log(Array.isArray("Hello")); // false
```

**Important:** Use `Array.isArray()` instead of `typeof` when checking arrays.

---

# 5. Searching Arrays

JavaScript provides several methods for searching elements in arrays.

## 5.1 find()

Returns the first element that satisfies the provided condition.

```javascript
const numbers = [10, 20, 30, 40, 50];

const result = numbers.find(number => number > 25);

console.log(result);
```

Output:

```text
30
```

Only the first matching element is returned.

If no element matches, it returns `undefined`.

## 5.2 findIndex()

Returns the index of the first element that satisfies the condition.

```javascript
const numbers = [10, 20, 30, 40];

const result = numbers.findIndex(number => number > 25);

console.log(result);
```

Output:

```text
2
```

If no element matches, it returns `-1`.

## 5.3 findLast()

Returns the last element that satisfies the specified condition.

```javascript
const numbers = [10, 20, 30, 40, 50];

const result = numbers.findLast(number => number > 25);

console.log(result);
```

Output:

```text
50
```

## 5.4 findLastIndex()

Returns the index of the last element satisfying the condition.

```javascript
const numbers = [10, 20, 30, 40, 50];

const result = numbers.findLastIndex(number => number > 25);

console.log(result);
```

Output:

```text
4
```

### Searching Methods Comparison

| Method | Returns | If Not Found |
|---|---|---|
| includes() | Boolean | false |
| indexOf() | Index | -1 |
| lastIndexOf() | Last matching index | -1 |
| find() | First matching element | undefined |
| findIndex() | First matching index | -1 |
| findLast() | Last matching element | undefined |
| findLastIndex() | Last matching index | -1 |

---

# 6. Iterating Arrays

Iteration means accessing array elements one by one.

JavaScript provides multiple ways to iterate over arrays.

## 6.1 for Loop

```javascript
const numbers = [10, 20, 30];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
```

## 6.2 for...of

```javascript
const numbers = [10, 20, 30];

for (let number of numbers) {
    console.log(number);
}
```

## 6.3 forEach()

The `forEach()` method executes a callback function once for each array element.

```javascript
const numbers = [10, 20, 30];

numbers.forEach(function (number) {
    console.log(number);
});
```

Using an arrow function:

```javascript
numbers.forEach(number => console.log(number));
```

### forEach() Parameters

The callback receives three arguments:

```javascript
array.forEach((element, index, array) => {
    // Code
});
```

| Parameter | Description |
|---|---|
| element | Current array element. |
| index | Index of the current element. |
| array | Original array being traversed. |

Example:

```javascript
const fruits = ["Apple", "Banana", "Mango"];

fruits.forEach((fruit, index) => {
    console.log(index, fruit);
});
```

Output:

```text
0 Apple
1 Banana
2 Mango
```

**Important characteristics:**

- `forEach()` returns `undefined`.
- It does not create a new array.
- It cannot be stopped using `break` or `continue` directly.
- It is generally used when you want to perform an operation for each element.

---

# 7. map()

### What is map()?

The `map()` method creates a new array by applying a callback function to every element of the original array.

It does not modify the original array itself.

### Syntax

```javascript
array.map((element, index, array) => {
    return newValue;
});
```

### Example

```javascript
const numbers = [1, 2, 3, 4, 5];

const result = numbers.map(number => number * 2);

console.log(result);
```

Output:

```text
[2, 4, 6, 8, 10]
```

Original array:

```text
[1, 2, 3, 4, 5]
```

### Example: Array of Objects

```javascript
const users = [
    { id: 1, name: "Riyaz" },
    { id: 2, name: "Ahmed" },
    { id: 3, name: "Ali" }
];

const names = users.map(user => user.name);

console.log(names);
```

Output:

```text
["Riyaz", "Ahmed", "Ali"]
```

### forEach() vs map()

| forEach() | map() |
|---|---|
| Executes a callback for every element. | Transforms every element. |
| Returns undefined. | Returns a new array. |
| Used for side effects. | Used for data transformation. |
| Does not directly support chaining through its return value. | Supports method chaining. |

---

# 8. filter()

### What is filter()?

The `filter()` method creates a new array containing only those elements that satisfy a specified condition.

### Syntax

```javascript
array.filter((element, index, array) => {
    return condition;
});
```

### Example: Even Numbers

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

const evenNumbers = numbers.filter(number => number % 2 === 0);

console.log(evenNumbers);
```

Output:

```text
[2, 4, 6]
```

### Example: Filtering Objects

```javascript
const users = [
    { id: 1, name: "Riyaz", age: 25 },
    { id: 2, name: "Ahmed", age: 17 },
    { id: 3, name: "Ali", age: 30 }
];

const adults = users.filter(user => user.age >= 18);

console.log(adults);
```

Output:

```javascript
[
    { id: 1, name: "Riyaz", age: 25 },
    { id: 3, name: "Ali", age: 30 }
]
```

**Important:**

- `filter()` returns a new array.
- If no elements match, it returns an empty array.
- The original array is not modified by the filter operation itself.

---

# 9. reduce()

### What is reduce()?

The `reduce()` method executes a callback function for each array element and reduces the array into a single accumulated result.

That result can be a number, string, object, array, or another data type.

### Syntax

```javascript
array.reduce((accumulator, currentValue, index, array) => {
    return updatedAccumulator;
}, initialValue);
```

### Parameters

| Parameter | Description |
|---|---|
| accumulator | Stores the accumulated result. |
| currentValue | Current array element. |
| index | Current element index. |
| array | Original array. |
| initialValue | Initial value of the accumulator. |

### Example: Sum of Numbers

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

### Execution Flow

| Iteration | Accumulator | Current Value | Result |
|---|---:|---:|---:|
| Initial | 0 | - | 0 |
| 1 | 0 | 10 | 10 |
| 2 | 10 | 20 | 30 |
| 3 | 30 | 30 | 60 |
| 4 | 60 | 40 | 100 |

### Example: Find Maximum Number

```javascript
const numbers = [10, 50, 20, 80, 30];

const maximum = numbers.reduce((max, number) => {
    return number > max ? number : max;
}, numbers[0]);

console.log(maximum);
```

Output:

```text
80
```

### Example: Count Frequency

```javascript
const fruits = ["Apple", "Banana", "Apple", "Mango", "Banana", "Apple"];

const result = fruits.reduce((acc, fruit) => {

    acc[fruit] = (acc[fruit] || 0) + 1;

    return acc;

}, {});

console.log(result);
```

Output:

```javascript
{
    Apple: 3,
    Banana: 2,
    Mango: 1
}
```

### map() vs filter() vs reduce()

| map() | filter() | reduce() |
|---|---|---|
| Transforms elements. | Selects matching elements. | Accumulates elements. |
| Returns a new array. | Returns a new array. | Returns an accumulated result. |
| Usually maintains the original array length. | Can return fewer elements. | Can return any data type. |

---

# 10. sort()

### What is sort()?

The `sort()` method sorts the elements of an array in place and returns the same array reference.

By default, elements are sorted as strings based on UTF-16 code unit order.

### Example: Default Sorting

```javascript
const fruits = ["Banana", "Apple", "Mango", "Orange"];

fruits.sort();

console.log(fruits);
```

Output:

```text
["Apple", "Banana", "Mango", "Orange"]
```

### Sorting Numbers

Be careful when sorting numbers without a comparator.

```javascript
const numbers = [10, 5, 100, 25];

numbers.sort();

console.log(numbers);
```

Output:

```text
[10, 100, 25, 5]
```

Why?

Because default sorting treats elements as strings.

### Ascending Order

```javascript
const numbers = [10, 5, 100, 25];

numbers.sort((a, b) => a - b);

console.log(numbers);
```

Output:

```text
[5, 10, 25, 100]
```

### Descending Order

```javascript
const numbers = [10, 5, 100, 25];

numbers.sort((a, b) => b - a);

console.log(numbers);
```

Output:

```text
[100, 25, 10, 5]
```

### Sorting Objects

```javascript
const users = [
    { name: "Riyaz", age: 25 },
    { name: "Ahmed", age: 20 },
    { name: "Ali", age: 30 }
];

users.sort((a, b) => a.age - b.age);

console.log(users);
```

This sorts users by age in ascending order.

**Important:** `sort()` mutates the original array. If you want a non-mutating version, use `toSorted()` where supported.

```javascript
const numbers = [10, 5, 100, 25];

const sorted = numbers.toSorted((a, b) => a - b);

console.log(sorted);
console.log(numbers);
```

---

# 11. reverse()

### What is reverse()?

The `reverse()` method reverses the order of elements in an array in place.

Example:

```javascript
const numbers = [10, 20, 30, 40];

numbers.reverse();

console.log(numbers);
```

Output:

```text
[40, 30, 20, 10]
```

### Non-Mutating Alternative

```javascript
const numbers = [10, 20, 30];

const reversed = numbers.toReversed();

console.log(reversed); // [30, 20, 10]
console.log(numbers);  // [10, 20, 30]
```

---

# 12. flat() and flatMap()

## 12.1 flat()

### What is flat()?

The `flat()` method creates a new array by flattening nested arrays up to a specified depth.

Example:

```javascript
const numbers = [1, 2, [3, 4], [5, 6]];

console.log(numbers.flat());
```

Output:

```text
[1, 2, 3, 4, 5, 6]
```

### Nested Arrays

```javascript
const numbers = [1, [2, [3, [4]]]];

console.log(numbers.flat());
```

Output:

```text
[1, 2, [3, [4]]]
```

By default, `flat()` flattens one level.

### Specifying Depth

```javascript
const numbers = [1, [2, [3, [4]]]];

console.log(numbers.flat(2));
```

Output:

```text
[1, 2, 3, [4]]
```

To flatten all levels:

```javascript
console.log(numbers.flat(Infinity));
```

Output:

```text
[1, 2, 3, 4]
```

## 12.2 flatMap()

### What is flatMap()?

The `flatMap()` method first applies a mapping function to each element and then flattens the resulting array by one level.

Example:

```javascript
const numbers = [1, 2, 3];

const result = numbers.flatMap(number => [number, number * 2]);

console.log(result);
```

Output:

```text
[1, 2, 2, 4, 3, 6]
```

### map() vs flatMap()

```javascript
const numbers = [1, 2, 3];

console.log(numbers.map(number => [number * 2]));
```

Output:

```text
[[2], [4], [6]]
```

Using flatMap():

```javascript
console.log(numbers.flatMap(number => [number * 2]));
```

Output:

```text
[2, 4, 6]
```

---

# 13. Array Destructuring

### What is Array Destructuring?

Array destructuring is an ES6 feature that allows developers to extract values from arrays and assign them to variables using a shorter syntax.

### Example

Without destructuring:

```javascript
const numbers = [10, 20, 30];

const a = numbers[0];
const b = numbers[1];
const c = numbers[2];
```

With destructuring:

```javascript
const numbers = [10, 20, 30];

const [a, b, c] = numbers;

console.log(a); // 10
console.log(b); // 20
console.log(c); // 30
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

### Rest with Destructuring

```javascript
const numbers = [10, 20, 30, 40, 50];

const [first, second, ...remaining] = numbers;

console.log(first);     // 10
console.log(second);    // 20
console.log(remaining); // [30, 40, 50]
```

### Swapping Variables

```javascript
let a = 10;
let b = 20;

[a, b] = [b, a];

console.log(a); // 20
console.log(b); // 10
```

---

# 14. Multidimensional Arrays

### What is a Multidimensional Array?

A multidimensional array is an array that contains other arrays as its elements.

It is commonly used to represent matrices, tables, grids, and structured data.

### Example: Two-Dimensional Array

```javascript
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
```

Structure:

| Row | Index 0 | Index 1 | Index 2 |
|---|---:|---:|---:|
| 0 | 1 | 2 | 3 |
| 1 | 4 | 5 | 6 |
| 2 | 7 | 8 | 9 |

### Accessing Elements

```javascript
console.log(matrix[0][0]); // 1

console.log(matrix[1][2]); // 6

console.log(matrix[2][1]); // 8
```

### Iterating Multidimensional Arrays

```javascript
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (let i = 0; i < matrix.length; i++) {

    for (let j = 0; j < matrix[i].length; j++) {

        console.log(matrix[i][j]);

    }
}
```

---

# 15. Array of Objects

### What is an Array of Objects?

An array of objects is an array in which each element is an object.

This structure is commonly used when working with API responses, database records and application data.

### Example

```javascript
const users = [
    {
        id: 1,
        name: "Riyaz",
        age: 25
    },
    {
        id: 2,
        name: "Ahmed",
        age: 22
    },
    {
        id: 3,
        name: "Ali",
        age: 30
    }
];
```

### Accessing Data

```javascript
console.log(users[0].name); // Riyaz

console.log(users[1].age);  // 22
```

### Iterating Array of Objects

```javascript
users.forEach(user => {
    console.log(user.name, user.age);
});
```

### Filtering Objects

```javascript
const adults = users.filter(user => user.age >= 25);

console.log(adults);
```

### Transforming Objects

```javascript
const names = users.map(user => user.name);

console.log(names);
```

### Finding an Object

```javascript
const user = users.find(user => user.id === 2);

console.log(user);
```

**Real-world example:** An API might return:

```json
[
    {
        "id": 1,
        "name": "Riyaz",
        "role": "Developer"
    },
    {
        "id": 2,
        "name": "Ahmed",
        "role": "Designer"
    }
]
```

You can use array methods to search, filter, sort and transform this data.

---

# PART B: OBJECTS

## 16. What is an Object?

### Definition

An object is a collection of properties, where each property consists of a key and a value.

Objects are used to represent entities with related data and behaviour.

### Example

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};
```

Here:

| Key | Value |
|---|---|
| name | Riyaz |
| age | 25 |
| city | Ahmedabad |

An object can contain:
- Strings
- Numbers
- Booleans
- Arrays
- Other objects
- Functions
- Other JavaScript values

### Object with Methods

A function stored as an object property is commonly called a method.

```javascript
const user = {
    name: "Riyaz",

    greet: function () {
        console.log("Hello Riyaz");
    }
};

user.greet();
```

Output:

```text
Hello Riyaz
```

---

# 17. Creating Objects

### Method 1: Object Literal

The most common way to create objects.

```javascript
const user = {
    name: "Riyaz",
    age: 25
};
```

### Method 2: new Object()

```javascript
const user = new Object();

user.name = "Riyaz";
user.age = 25;
```

### Method 3: Object.create()

Creates a new object using a specified prototype.

```javascript
const person = {
    greet() {
        console.log("Hello");
    }
};

const user = Object.create(person);

user.name = "Riyaz";

user.greet();
```

### Method 4: Constructor Function

```javascript
function User(name, age) {
    this.name = name;
    this.age = age;
}

const user1 = new User("Riyaz", 25);

console.log(user1);
```

Constructor functions and prototypes will be covered in detail in Phase 5.

---

# 18. Accessing Object Properties

JavaScript provides two main ways to access object properties.

### 18.1 Dot Notation

Syntax:

```javascript
object.property;
```

Example:

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

console.log(user.name);
console.log(user.age);
```

### 18.2 Bracket Notation

Syntax:

```javascript
object["property"];
```

Example:

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

console.log(user["name"]);
console.log(user["age"]);
```

### Dot Notation vs Bracket Notation

| Dot Notation | Bracket Notation |
|---|---|
| Uses a property name directly. | Uses a string or expression. |
| Property name must be a valid identifier. | Supports dynamic property names. |
| Cannot directly use a variable as the property name. | Can use variables and expressions. |

### Dynamic Property Access

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

let key = "name";

console.log(user[key]); // Riyaz
```

If you use `user.key`, JavaScript searches for a property literally named `key`, not the value stored in the variable.

---

# 19. Adding, Updating and Deleting Properties

### Adding Properties

```javascript
const user = {
    name: "Riyaz"
};

user.age = 25;

user.city = "Ahmedabad";

console.log(user);
```

### Updating Properties

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

user.age = 26;

console.log(user.age);
```

### Deleting Properties

Use the `delete` operator.

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};

delete user.city;

console.log(user);
```

Output:

```javascript
{
    name: "Riyaz",
    age: 25
}
```

**Important:** `delete` removes an object property. It does not directly remove an array element in the same way that `splice()` does.

---

# 20. Nested Objects

### What is a Nested Object?

A nested object is an object that contains another object as one of its properties.

### Example

```javascript
const user = {
    name: "Riyaz",

    address: {
        city: "Ahmedabad",
        state: "Gujarat",
        country: "India"
    },

    contact: {
        email: "riyaz@example.com",
        phone: "9999999999"
    }
};
```

### Accessing Nested Properties

```javascript
console.log(user.address.city);

console.log(user.contact.email);
```

### Updating Nested Properties

```javascript
user.address.city = "Mumbai";

console.log(user.address.city);
```

### Adding Nested Properties

```javascript
user.address.pincode = 380001;
```

### Iterating Nested Objects

```javascript
for (let key in user.address) {
    console.log(key, user.address[key]);
}
```

---

# 21. Object.keys(), Object.values(), Object.entries()

These methods allow developers to extract information from objects.

## 21.1 Object.keys()

Returns an array containing an object's own enumerable string-keyed property names.

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};

console.log(Object.keys(user));
```

Output:

```text
["name", "age", "city"]
```

## 21.2 Object.values()

Returns an array containing an object's own enumerable string-keyed property values.

```javascript
console.log(Object.values(user));
```

Output:

```text
["Riyaz", 25, "Ahmedabad"]
```

## 21.3 Object.entries()

Returns an array containing key-value pairs.

Each pair is represented as an array.

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

### Iterating Using Object.entries()

```javascript
for (let [key, value] of Object.entries(user)) {
    console.log(key, value);
}
```

### Comparison

| Method | Returns |
|---|---|
| Object.keys() | Array of keys |
| Object.values() | Array of values |
| Object.entries() | Array of key-value pairs |

---

# 22. Object Destructuring

### What is Object Destructuring?

Object destructuring is an ES6 feature that allows developers to extract properties from an object and assign them to variables.

### Example

Without destructuring:

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};

const name = user.name;
const age = user.age;
```

With destructuring:

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};

const { name, age } = user;

console.log(name);
console.log(age);
```

### Renaming Variables

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

const { name: username, age: userAge } = user;

console.log(username);
console.log(userAge);
```

### Default Values

```javascript
const user = {
    name: "Riyaz"
};

const { name, city = "Ahmedabad" } = user;

console.log(name);
console.log(city);
```

### Nested Destructuring

```javascript
const user = {
    name: "Riyaz",

    address: {
        city: "Ahmedabad",
        state: "Gujarat"
    }
};

const {
    address: { city, state }
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
    role: "Developer"
};

const { name, age, ...remaining } = user;

console.log(name);
console.log(age);
console.log(remaining);
```

Output:

```javascript
Riyaz
25

{
    city: "Ahmedabad",
    role: "Developer"
}
```

---

# 23. Computed Property Names

### What are Computed Properties?

Computed property names allow developers to create object properties dynamically using expressions.

They are written using square brackets inside an object literal.

### Example

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

### Dynamic Property Names

```javascript
const property = "age";

const user = {
    name: "Riyaz",
    [property]: 25
};

console.log(user);
```

Output:

```javascript
{
    name: "Riyaz",
    age: 25
}
```

### Practical Example

```javascript
function createUser(key, value) {
    return {
        [key]: value
    };
}

console.log(createUser("name", "Riyaz"));

console.log(createUser("age", 25));
```

---

# 24. Property Shorthand

### What is Property Shorthand?

Property shorthand allows developers to create object properties using shorter syntax when the variable name and property name are identical.

### Without Shorthand

```javascript
const name = "Riyaz";
const age = 25;

const user = {
    name: name,
    age: age
};
```

### With Shorthand

```javascript
const name = "Riyaz";
const age = 25;

const user = {
    name,
    age
};

console.log(user);
```

Output:

```javascript
{
    name: "Riyaz",
    age: 25
}
```

### Method Shorthand

Traditional syntax:

```javascript
const user = {
    greet: function () {
        console.log("Hello");
    }
};
```

Shorthand syntax:

```javascript
const user = {
    greet() {
        console.log("Hello");
    }
};
```

Both create an ordinary method, but the shorthand method definition has different behaviour from an ordinary function-valued property in certain contexts, such as constructor capability and use of `super`.

---

# 25. Object.assign()

### What is Object.assign()?

`Object.assign()` copies the enumerable own properties from one or more source objects into a target object.

It returns the modified target object.

### Syntax

```javascript
Object.assign(target, ...sources);
```

### Example: Copying an Object

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

const copy = Object.assign({}, user);

console.log(copy);
```

### Example: Merging Objects

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

Output:

```javascript
{
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
}
```

### Important Behaviour

`Object.assign()` performs a shallow copy, not a deep copy.

Nested objects are still shared by reference.

---

# 26. Object.freeze()

### What is Object.freeze()?

`Object.freeze()` prevents an object's own properties from being added, removed, or changed through ordinary property operations.

It returns the same object.

### Example

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

Object.freeze(user);

user.age = 30;

user.city = "Ahmedabad";

delete user.name;

console.log(user);
```

In non-strict mode, these attempted modifications generally fail silently.

In strict mode, modifying frozen properties or adding properties throws a `TypeError`.

### Important: Shallow Freeze

`Object.freeze()` is shallow.

Nested objects can still be modified unless they are frozen separately.

```javascript
const user = {
    name: "Riyaz",

    address: {
        city: "Ahmedabad"
    }
};

Object.freeze(user);

user.address.city = "Mumbai";

console.log(user.address.city);
```

Output:

```text
Mumbai
```

The outer object is frozen, but the nested object is not.

---

# 27. Object.seal()

### What is Object.seal()?

`Object.seal()` prevents new properties from being added and existing properties from being removed.

However, existing writable properties can still be modified.

### Example

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

Object.seal(user);

user.age = 30;          // Allowed

user.city = "Ahmedabad"; // Not allowed

delete user.name;       // Not allowed

console.log(user);
```

Output:

```javascript
{
    name: "Riyaz",
    age: 30
}
```

### Object.freeze() vs Object.seal()

| Object.freeze() | Object.seal() |
|---|---|
| Prevents adding properties. | Prevents adding properties. |
| Prevents deleting properties. | Prevents deleting properties. |
| Prevents changing existing data properties. | Allows changing existing writable data properties. |
| Makes existing data properties non-writable. | Makes properties non-configurable. |
| Shallow operation. | Shallow operation. |

### Related Methods

```javascript
Object.isFrozen(user);

Object.isSealed(user);
```

These methods check whether an object is frozen or sealed.

---

# 28. Optional Chaining (?.)

### What is Optional Chaining?

Optional chaining allows developers to safely access properties of an object without throwing an error when an intermediate value is `null` or `undefined`.

### Without Optional Chaining

```javascript
const user = {};

console.log(user.address.city);
```

This produces a `TypeError` because `address` is undefined.

### With Optional Chaining

```javascript
const user = {};

console.log(user.address?.city);
```

Output:

```text
undefined
```

### Nested Optional Chaining

```javascript
const user = {
    name: "Riyaz",

    address: {
        city: "Ahmedabad"
    }
};

console.log(user?.address?.city);
```

Output:

```text
Ahmedabad
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

### Optional Chaining with Arrays

```javascript
const users = [
    {
        name: "Riyaz"
    }
];

console.log(users?.[0]?.name);

console.log(users?.[5]?.name);
```

Output:

```text
Riyaz
undefined
```

**Important:** Optional chaining only handles `null` and `undefined`. It does not make every invalid property access safe.

---

# 29. Property Descriptors

### What are Property Descriptors?

Property descriptors define the characteristics and behaviour of an object's properties.

They control whether a property can be modified, deleted, enumerated, or reconfigured.

JavaScript provides two major types of property descriptors:

1. Data Descriptors
2. Accessor Descriptors

### 29.1 Data Descriptors

A data descriptor contains:

| Property | Description |
|---|---|
| value | The property's value. |
| writable | Whether the property's value can be changed. |
| enumerable | Whether the property appears in normal enumeration. |
| configurable | Whether the property can be deleted or reconfigured. |

Example:

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

Attempting to modify the property:

```javascript
user.name = "Ahmed";
```

The modification fails. In strict mode, it throws a `TypeError`.

### 29.2 Accessor Descriptors

Accessor descriptors use:

- `get`
- `set`

Example:

```javascript
const user = {
    firstName: "Riyaz",
    lastName: "Khan",

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    },

    set fullName(value) {
        const parts = value.split(" ");

        this.firstName = parts[0];
        this.lastName = parts[1];
    }
};

console.log(user.fullName);

user.fullName = "Ahmed Khan";

console.log(user.firstName);
```

Output:

```text
Riyaz Khan
Ahmed
```

### 29.3 Object.getOwnPropertyDescriptor()

Returns the descriptor for an object's own property.

```javascript
const user = {
    name: "Riyaz"
};

console.log(
    Object.getOwnPropertyDescriptor(user, "name")
);
```

### 29.4 Object.defineProperties()

Allows multiple properties to be defined with their descriptors.

```javascript
const user = {};

Object.defineProperties(user, {
    name: {
        value: "Riyaz",
        writable: true,
        enumerable: true,
        configurable: true
    },

    age: {
        value: 25,
        writable: false,
        enumerable: true,
        configurable: false
    }
});

console.log(user);
```

---

# 30. Shallow Copy

### What is Shallow Copy?

A shallow copy creates a new object or array but copies nested objects and arrays by reference rather than creating independent copies of them.

This means top-level properties are copied, but nested reference values are shared.

### Example

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
console.log(copy);
```

Output:

```javascript
// Original
{
    name: "Riyaz",
    address: {
        city: "Mumbai"
    }
}

// Copy
{
    name: "Ahmed",
    address: {
        city: "Mumbai"
    }
}
```

Why did the original address change?

Because both objects reference the same nested `address` object.

### Common Shallow Copy Methods

**For Arrays:**

```javascript
const copy1 = [...originalArray];

const copy2 = originalArray.slice();

const copy3 = Array.from(originalArray);
```

**For Objects:**

```javascript
const copy1 = { ...originalObject };

const copy2 = Object.assign({}, originalObject);
```

---

# 31. Deep Copy

### What is Deep Copy?

A deep copy creates a new object or array and recursively copies its nested objects and arrays.

The copied structure does not share nested object references with the original.

### Example Using structuredClone()

```javascript
const original = {
    name: "Riyaz",

    address: {
        city: "Ahmedabad"
    }
};

const copy = structuredClone(original);

copy.address.city = "Mumbai";

console.log(original.address.city); // Ahmedabad

console.log(copy.address.city); // Mumbai
```

### structuredClone()

`structuredClone()` is a built-in JavaScript API used to create deep copies of supported values.

It supports many data types, including:

- Objects
- Arrays
- Date
- Map
- Set
- Circular references
- ArrayBuffer

However, it does not support every JavaScript value. For example, functions and DOM nodes cannot be cloned using the structured clone algorithm.

### JSON Method

Another traditional approach is:

```javascript
const copy = JSON.parse(JSON.stringify(original));
```

However, this method has limitations:

- Functions are omitted or transformed.
- `undefined` object properties are omitted.
- Symbols are not preserved.
- Date objects become strings.
- BigInt causes an error.
- Circular references cause an error.
- Special values such as `NaN` and `Infinity` are converted to `null`.

**Recommendation:** Prefer `structuredClone()` when its supported data types meet your requirements.

### Shallow Copy vs Deep Copy

| Shallow Copy | Deep Copy |
|---|---|
| Creates a new outer object. | Creates a new outer object and copies nested structures. |
| Nested objects share references. | Nested objects have independent references. |
| Faster and simpler. | Generally more expensive. |
| Uses spread, slice, Object.assign. | Uses structuredClone or suitable deep-copy implementations. |

---

# Phase 4 – Important Interview Questions

| No. | Interview Question |
|---|---|
| 1 | What is an array in JavaScript? |
| 2 | Why does array indexing start from zero? |
| 3 | What is the difference between push() and unshift()? |
| 4 | What is the difference between pop() and shift()? |
| 5 | What is the difference between splice() and slice()? |
| 6 | What is the difference between find() and filter()? |
| 7 | What is the difference between find() and findIndex()? |
| 8 | What is the difference between map() and forEach()? |
| 9 | What is the difference between map(), filter(), and reduce()? |
| 10 | Why does sort() produce unexpected numeric results by default? |
| 11 | What is the difference between sort() and toSorted()? |
| 12 | What is the difference between flat() and flatMap()? |
| 13 | What is array destructuring? |
| 14 | What is a multidimensional array? |
| 15 | What is an array of objects? |
| 16 | What is an object in JavaScript? |
| 17 | What is the difference between dot and bracket notation? |
| 18 | What is the difference between Object.keys(), values(), and entries()? |
| 19 | What is object destructuring? |
| 20 | What are computed property names? |
| 21 | What is Object.assign()? |
| 22 | What is the difference between Object.freeze() and Object.seal()? |
| 23 | What is optional chaining? |
| 24 | What are property descriptors? |
| 25 | What is the difference between shallow and deep copying? |
| 26 | What is structuredClone()? |
| 27 | Why is typeof [] equal to "object"? |
| 28 | Does map() modify the original array? |
| 29 | Does sort() modify the original array? |
| 30 | Can JavaScript arrays contain different data types? |

---

# Phase 4 – Practical Exercises

Practice these problems using arrays and objects.

## Beginner Level

| No. | Exercise |
|---|---|
| 1 | Find the sum of all array elements. |
| 2 | Find the largest and smallest numbers in an array. |
| 3 | Reverse an array without using reverse(). |
| 4 | Remove duplicate elements from an array. |
| 5 | Find the second-largest number in an array. |
| 6 | Count even and odd numbers. |
| 7 | Find the index of a given element. |
| 8 | Merge two arrays. |
| 9 | Check whether an array contains a specific value. |
| 10 | Sort an array in ascending and descending order. |

## Intermediate Level

| No. | Exercise |
|---|---|
| 11 | Count the frequency of each element. |
| 12 | Find common elements between two arrays. |
| 13 | Find missing numbers in an array. |
| 14 | Flatten a nested array. |
| 15 | Group objects by a specific property. |
| 16 | Filter employees by salary. |
| 17 | Sort employees by age. |
| 18 | Calculate the total price of shopping cart items. |
| 19 | Group products by category. |
| 20 | Find the most frequently occurring element. |

## Advanced Level

| No. | Exercise |
|---|---|
| 21 | Implement custom map(). |
| 22 | Implement custom filter(). |
| 23 | Implement custom reduce(). |
| 24 | Implement custom find(). |
| 25 | Implement custom sort(). |
| 26 | Deep clone a nested object. |
| 27 | Compare two objects for equality. |
| 28 | Create a custom groupBy() function. |
| 29 | Convert an array of objects into an object indexed by ID. |
| 30 | Implement a shopping cart using array methods. |

---

# Phase 4 – Quick Revision

| Concept | Key Point |
|---|---|
| Array | Stores multiple values in an ordered collection. |
| Indexing | Starts from zero. |
| push() | Adds elements at the end. |
| pop() | Removes the last element. |
| unshift() | Adds elements at the beginning. |
| shift() | Removes the first element. |
| splice() | Adds, removes, or replaces elements. |
| slice() | Extracts a portion without modifying the original. |
| concat() | Combines arrays. |
| join() | Converts array elements into a string. |
| includes() | Checks whether a value exists. |
| find() | Returns the first matching element. |
| findIndex() | Returns the first matching index. |
| forEach() | Executes a callback for every element. |
| map() | Transforms elements into a new array. |
| filter() | Returns elements matching a condition. |
| reduce() | Accumulates array elements into one result. |
| sort() | Sorts elements in place by default. |
| reverse() | Reverses elements in place. |
| flat() | Flattens nested arrays. |
| flatMap() | Maps and flattens one level. |
| Destructuring | Extracts values into variables. |
| Object | Collection of key-value properties. |
| Object.keys() | Returns property names. |
| Object.values() | Returns property values. |
| Object.entries() | Returns key-value pairs. |
| Object.assign() | Copies enumerable own properties. |
| Object.freeze() | Prevents ordinary property modifications. |
| Object.seal() | Prevents adding and removing properties. |
| Optional Chaining | Safely accesses nested properties. |
| Property Descriptors | Define property behaviour. |
| Shallow Copy | Nested references remain shared. |
| Deep Copy | Creates independent nested copies. |

---

# Recommended Documentation

1. [MDN – Indexed Collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections?utm_source=chatgpt.com)
2. [JavaScript.info – Arrays](https://javascript.info/array?utm_source=chatgpt.com)
3. [MDN – Array Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array?utm_source=chatgpt.com)
4. [JavaScript.info – Objects](https://javascript.info/object?utm_source=chatgpt.com)
5. [MDN – Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects?utm_source=chatgpt.com)

---

# JavaScript Learning Progress

| Phase | Topic | Status |
|---|---|---|
| Phase 1 | JavaScript Fundamentals | Completed |
| Phase 2 | Control Flow & Loops | Completed |
| Phase 3 | Functions | Completed |
| Phase 4 | Arrays & Objects | Completed |
| Phase 5 | JavaScript Core Concepts | Upcoming |
| Phase 6 | DOM & Browser APIs | Pending |
| Phase 7 | Asynchronous JavaScript | Pending |
| Phase 8 | Modern JavaScript | Pending |
| Phase 9 | Advanced JavaScript | Pending |
| Phase 10 | Professional Development | Pending |

**Next: Phase 5 – JavaScript Core Concepts**

This is one of the most important phases of the entire roadmap. We will cover:

1. Execution Context
2. Call Stack
3. Hoisting
4. Scope and Scope Chain
5. Lexical Environment
6. Closures
7. `this` Keyword
8. call(), apply(), bind()
9. Prototype and Prototype Chain
10. Prototypal Inheritance
11. Constructor Functions
12. Classes and Inheritance
13. Encapsulation
14. Shallow Copy and Deep Copy
15. Pass by Value and Object References
16. Garbage Collection
17. Memory Management
18. Equality and Type Comparison

These concepts will help you understand how JavaScript actually works internally rather than just learning its syntax.