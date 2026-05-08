# 📝 JavaScript Comments & JSDoc Guide

## 📌 1. Single-Line Comment

Single-line comments are used to write short notes or explanations in one line.

### ✅ Syntax:

```js
// This is a single-line comment
```

### 💡 Example:

```js
let a = 5;      // Initializing variable 'a'
console.log(a); // Printing value of 'a'
```

---

## 📌 2. Multi-Line Comment

Multi-line comments are used when you want to write longer explanations or multiple lines of notes.

### ✅ Syntax:

```js
/*
This is a multi-line comment
You can write multiple lines here
without using // repeatedly
*/
```

### 💡 Example:

```js
/*
This is a multiline comment
This allows user to write multiple lines as comment
without using the // repeatedly
*/
let a = 5;
console.log(a);
```

---

## 📌 3. JSDoc Comments

JSDoc is a special type of comment used to describe functions, parameters, and return values.
It helps developers understand how a function works and is useful for documentation and IDE support.

### ✅ Syntax:

```js
/**
 * Description of the function
 * 
 * @param {type} paramName - Description
 * @returns {type} Description
 */
```

### 💡 Example:

```js
/**
 * Adds two numbers and returns the sum.
 * 
 * @param {number} input1 - The first number.
 * @param {number} input2 - The second number.
 * @returns {number} The sum of input1 and input2.
 */
let sum = function(input1, input2) {
    return input1 + input2;
};

// Declare variables
let a = 5;
let b = 6;

// Log the result
console.log(sum(a, b));
```

---

## ⚠️ Important Notes

* `//` → Used for **single-line comments**
* `/* ... */` → Used for **multi-line comments**
* `/** ... */` → Used for **JSDoc documentation**
* Comments are ignored by JavaScript during execution
* Use comments to improve **code readability and maintainability**
