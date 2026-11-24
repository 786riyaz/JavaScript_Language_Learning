# JavaScript – Phase 2: Control Flow & Loops

This phase covers how JavaScript controls program execution using conditions, decision-making statements, and loops.

## Topics Covered

| No. | Topic | Description |
|---|---|---|
| 1 | Control Flow | How JavaScript executes statements |
| 2 | Conditional Statements | if, else, else if |
| 3 | Nested if-else | Conditions inside conditions |
| 4 | Switch Statement | Multiple condition handling |
| 5 | Ternary Operator | Short form of if-else |
| 6 | Loops | Repeating code |
| 7 | for Loop | Loop with initialization, condition and update |
| 8 | while Loop | Condition-based loop |
| 9 | do-while Loop | Executes at least once |
| 10 | for...in | Iterating over object properties |
| 11 | for...of | Iterating over iterable values |
| 12 | Nested Loops | Loops inside loops |
| 13 | break | Terminating a loop |
| 14 | continue | Skipping an iteration |
| 15 | Truthy & Falsy | Boolean evaluation of values |
| 16 | Short-Circuit Evaluation | Conditional evaluation using logical operators |

---

# 1. Control Flow

### What is Control Flow?

Control flow refers to the order in which statements are executed in a program.

By default, JavaScript executes statements from top to bottom (sequential execution).

However, control flow statements allow developers to change the normal execution order.

### Types of Control Flow

| Type | Description | Examples |
|---|---|---|
| Sequential | Executes statements one after another. | Normal statements |
| Conditional | Executes code based on conditions. | if, else, switch |
| Iterative | Repeats a block of code. | for, while, do-while |
| Jump Statements | Changes normal execution flow. | break, continue, return |

Example:

```javascript
console.log("Step 1");

console.log("Step 2");

console.log("Step 3");
```

Output:
```text
Step 1
Step 2
Step 3
```

This is sequential execution.

---

# 2. Conditional Statements

Conditional statements allow JavaScript to execute different blocks of code depending on whether a condition evaluates to true or false.

## 2.1 if Statement

The `if` statement executes a block of code when the specified condition is true.

### Syntax

```javascript
if (condition) {
    // Code executes if condition is true
}
```

### Example

```javascript
let age = 20;

if (age >= 18) {
    console.log("You are eligible to vote.");
}
```

Output:
```text
You are eligible to vote.
```

## 2.2 if-else Statement

The `if-else` statement executes one block when the condition is true and another block when it is false.

### Syntax

```javascript
if (condition) {
    // Executes if condition is true
} else {
    // Executes if condition is false
}
```

### Example

```javascript
let age = 16;

if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}
```

Output:
```text
Minor
```

## 2.3 if-else-if Ladder

Used when multiple conditions need to be evaluated.

JavaScript checks conditions from top to bottom. The first true condition's block executes, and the remaining conditions are skipped.

### Syntax

```javascript
if (condition1) {
    // Code
} else if (condition2) {
    // Code
} else if (condition3) {
    // Code
} else {
    // Default code
}
```

### Example

```javascript
let marks = 85;

if (marks >= 90) {
    console.log("Grade A+");
} else if (marks >= 80) {
    console.log("Grade A");
} else if (marks >= 70) {
    console.log("Grade B");
} else if (marks >= 60) {
    console.log("Grade C");
} else {
    console.log("Fail");
}
```

Output:
```text
Grade A
```

**Important:** Once a condition evaluates to true, JavaScript does not check the remaining `else if` conditions.

## 2.4 Nested if-else

A nested if-else means placing one conditional statement inside another conditional statement.

### Example

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        console.log("You can drive.");
    } else {
        console.log("You need a driving license.");
    }
} else {
    console.log("You are underage.");
}
```

Output:
```text
You can drive.
```

**Use cases:**
- User authentication.
- Permission checking.
- Multiple eligibility conditions.
- Role-based access control.

---

# 3. Switch Statement

### What is a Switch Statement?

The `switch` statement is used to execute one block of code from multiple possible cases based on the value of an expression.

It is commonly used as an alternative to multiple `if-else` statements when comparing one expression against several fixed values.

### Syntax

```javascript
switch (expression) {
    case value1:
        // Code
        break;

    case value2:
        // Code
        break;

    default:
        // Default code
}
```

### Example

```javascript
let day = 3;

switch (day) {
    case 1:
        console.log("Monday");
        break;

    case 2:
        console.log("Tuesday");
        break;

    case 3:
        console.log("Wednesday");
        break;

    case 4:
        console.log("Thursday");
        break;

    default:
        console.log("Invalid day");
}
```

Output:
```text
Wednesday
```

### Important Switch Keywords

**1. case**

Defines a possible matching value.

**2. break**

Terminates the switch statement after a matching case executes.

**3. default**

Executes when no case matches.

### What Happens Without break?

If `break` is omitted, JavaScript continues executing subsequent cases until it encounters a `break` or reaches the end of the switch statement.

This behaviour is called **Fall-Through**.

Example:

```javascript
let value = 1;

switch (value) {
    case 1:
        console.log("One");

    case 2:
        console.log("Two");

    case 3:
        console.log("Three");
        break;

    default:
        console.log("Invalid");
}
```

Output:
```text
One
Two
Three
```

### Multiple Cases with the Same Execution

```javascript
let day = "Saturday";

switch (day) {
    case "Saturday":
    case "Sunday":
        console.log("Weekend");
        break;

    default:
        console.log("Weekday");
}
```

Output:
```text
Weekend
```

### Switch vs if-else

| Switch | if-else |
|---|---|
| Compares an expression against case values. | Evaluates Boolean conditions. |
| Uses strict equality (`===`) for case matching. | Supports all types of conditions. |
| Useful for fixed values. | Useful for ranges and complex conditions. |
| Uses case and break. | Uses if, else if and else. |

**Important:** Switch case matching uses strict equality. For example, `1` and `"1"` are not considered equal.

---

# 4. Ternary Operator

### What is the Ternary Operator?

The ternary operator is a conditional operator that provides a shorter way to write simple if-else expressions.

It is called a ternary operator because it takes three operands.

### Syntax

```javascript
condition ? expressionIfTrue : expressionIfFalse;
```

### Example

```javascript
let age = 20;

let result = age >= 18 ? "Adult" : "Minor";

console.log(result);
```

Output:
```text
Adult
```

Equivalent if-else:

```javascript
let age = 20;
let result;

if (age >= 18) {
    result = "Adult";
} else {
    result = "Minor";
}
```

### Nested Ternary Operator

A ternary operator can be placed inside another ternary operator.

Example:

```javascript
let marks = 85;

let grade = marks >= 90
    ? "A+"
    : marks >= 80
        ? "A"
        : marks >= 70
            ? "B"
            : "Fail";

console.log(grade);
```

Output:
```text
A
```

**Best Practice:** Avoid deeply nested ternary operators because they reduce code readability. Use if-else when conditions become complex.

---

# 5. Loops in JavaScript

### What is a Loop?

A loop is a programming structure that repeatedly executes a block of code as long as a specified condition is satisfied.

Loops help avoid writing the same code multiple times.

### Types of Loops in JavaScript

| Loop | Description |
|---|---|
| for | Executes code a specified number of times or while a condition remains true. |
| while | Executes while a condition is true. |
| do-while | Executes the code at least once before checking the condition. |
| for...in | Iterates over enumerable property keys. |
| for...of | Iterates over iterable values. |

---

# 6. for Loop

### What is a for Loop?

The `for` loop is used when you want to repeat a block of code with initialization, condition checking, and updating in one statement.

### Syntax

```javascript
for (initialization; condition; update) {
    // Code to execute
}
```

A for loop has three main parts:

| Part | Purpose |
|---|---|
| Initialization | Initializes the loop variable. |
| Condition | Determines whether the loop should continue. |
| Update | Updates the loop variable after each iteration. |

### Example

```javascript
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
```

Output:
```text
1
2
3
4
5
```

### Execution Flow

1. `let i = 1` executes once.
2. `i <= 5` checks the condition.
3. If true, the loop body executes.
4. `i++` updates the variable.
5. The condition is checked again.
6. The loop terminates when the condition becomes false.

### Example: Multiplication Table

```javascript
let number = 5;

for (let i = 1; i <= 10; i++) {
    console.log(`${number} x ${i} = ${number * i}`);
}
```

Output:
```text
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
...
5 x 10 = 50
```

### Infinite for Loop

A loop becomes infinite if its termination condition never becomes false.

```javascript
for (;;) {
    console.log("Hello");
}
```

This loop has no initialization, condition, or update expression, so it runs indefinitely unless interrupted.

---

# 7. while Loop

### What is a while Loop?

The `while` loop repeatedly executes a block of code as long as the specified condition evaluates to true.

It is useful when the number of iterations is not known in advance.

### Syntax

```javascript
while (condition) {
    // Code to execute
}
```

### Example

```javascript
let i = 1;

while (i <= 5) {
    console.log(i);

    i++;
}
```

Output:
```text
1
2
3
4
5
```

### Important Points

- The condition is checked before executing the loop body.
- If the condition is initially false, the loop never executes.
- Make sure the condition eventually becomes false to avoid an infinite loop.

### Example: Sum of Numbers

```javascript
let i = 1;
let sum = 0;

while (i <= 5) {
    sum += i;
    i++;
}

console.log(sum); // 15
```

---

# 8. do-while Loop

### What is a do-while Loop?

The `do-while` loop executes the code block first and checks the condition afterward.

Therefore, the loop body always executes at least once, even if the condition is false initially.

### Syntax

```javascript
do {
    // Code to execute
} while (condition);
```

### Example

```javascript
let i = 1;

do {
    console.log(i);

    i++;
} while (i <= 5);
```

Output:
```text
1
2
3
4
5
```

### Important Example

```javascript
let i = 10;

do {
    console.log(i);
} while (i < 5);
```

Output:
```text
10
```

Although the condition is false, the code executes once because the condition is checked after execution.

### for vs while vs do-while

| Feature | for | while | do-while |
|---|---|---|---|
| Condition Checking | Before execution | Before execution | After execution |
| Minimum Execution | Zero times | Zero times | Once |
| Initialization | Usually in loop statement | Usually outside | Usually outside |
| Best Use | Known iteration count | Unknown iteration count | At least one execution required |

---

# 9. for...in Loop

### What is for...in?

The `for...in` loop iterates over the enumerable property keys of an object.

It is primarily used for iterating over object properties.

### Syntax

```javascript
for (let key in object) {
    // Code
}
```

### Example: Object

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};

for (let key in user) {
    console.log(key);
}
```

Output:
```text
name
age
city
```

### Accessing Object Values

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};

for (let key in user) {
    console.log(key, user[key]);
}
```

Output:
```text
name Riyaz
age 25
city Ahmedabad
```

**Important:** `user[key]` uses bracket notation to access the value associated with the property key.

### Using for...in with Arrays

```javascript
const numbers = [10, 20, 30];

for (let index in numbers) {
    console.log(index);
}
```

Output:
```text
0
1
2
```

Notice that `for...in` returns array indexes, not array values.

**Best Practice:** Avoid using `for...in` for normal array iteration. Use `for...of` or array methods instead.

---

# 10. for...of Loop

### What is for...of?

The `for...of` loop iterates over the values of iterable objects.

Common iterables include:

- Arrays
- Strings
- Maps
- Sets
- Typed Arrays

### Syntax

```javascript
for (let value of iterable) {
    // Code
}
```

### Example: Array

```javascript
const numbers = [10, 20, 30];

for (let number of numbers) {
    console.log(number);
}
```

Output:
```text
10
20
30
```

### Example: String

```javascript
const name = "Riyaz";

for (let character of name) {
    console.log(character);
}
```

Output:
```text
R
i
y
a
z
```

### Example: Map

```javascript
const user = new Map([
    ["name", "Riyaz"],
    ["age", 25]
]);

for (let [key, value] of user) {
    console.log(key, value);
}
```

Output:
```text
name Riyaz
age 25
```

### for...in vs for...of

| for...in | for...of |
|---|---|
| Iterates over enumerable property keys. | Iterates over iterable values. |
| Primarily used with objects. | Primarily used with iterables. |
| Returns object property names. | Returns actual values. |
| Works with ordinary objects. | Ordinary objects are not iterable by default. |
| Can include inherited enumerable properties. | Uses the object's iterator. |

**Important Example:**

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

// Works
for (let key in user) {
    console.log(key);
}

// TypeError: user is not iterable
for (let value of user) {
    console.log(value);
}
```

---

# 11. Nested Loops

### What is a Nested Loop?

A nested loop is a loop placed inside another loop.

The inner loop executes completely for every single iteration of the outer loop.

### Example

```javascript
for (let i = 1; i <= 3; i++) {

    for (let j = 1; j <= 3; j++) {

        console.log(`i = ${i}, j = ${j}`);

    }

}
```

Output:
```text
i = 1, j = 1
i = 1, j = 2
i = 1, j = 3

i = 2, j = 1
i = 2, j = 2
i = 2, j = 3

i = 3, j = 1
i = 3, j = 2
i = 3, j = 3
```

### Example: Star Pattern

```javascript
for (let i = 1; i <= 5; i++) {

    let pattern = "";

    for (let j = 1; j <= i; j++) {
        pattern += "* ";
    }

    console.log(pattern);
}
```

Output:
```text
*
* *
* * *
* * * *
* * * * *
```

### Example: Multiplication Grid

```javascript
for (let i = 1; i <= 3; i++) {

    for (let j = 1; j <= 3; j++) {

        console.log(i * j);

    }
}
```

**Common Use Cases:**

- Matrix operations.
- Pattern printing.
- Multidimensional arrays.
- Comparing elements in two collections.

---

# 12. break Statement

### What is break?

The `break` statement immediately terminates the nearest enclosing loop or switch statement.

Execution continues with the statement immediately following that loop or switch.

### Example

```javascript
for (let i = 1; i <= 10; i++) {

    if (i === 5) {
        break;
    }

    console.log(i);
}
```

Output:
```text
1
2
3
4
```

When `i` becomes 5, the loop terminates.

### break in Nested Loops

An unlabelled `break` terminates only the nearest enclosing loop.

```javascript
for (let i = 1; i <= 3; i++) {

    for (let j = 1; j <= 3; j++) {

        if (j === 2) {
            break;
        }

        console.log(`i=${i}, j=${j}`);
    }
}
```

Output:
```text
i=1, j=1
i=2, j=1
i=3, j=1
```

---

# 13. continue Statement

### What is continue?

The `continue` statement skips the remaining code in the current loop iteration and moves to the next iteration.

Unlike `break`, it does not terminate the entire loop.

### Example

```javascript
for (let i = 1; i <= 5; i++) {

    if (i === 3) {
        continue;
    }

    console.log(i);
}
```

Output:
```text
1
2
4
5
```

When `i` becomes 3, the current iteration is skipped.

### Example: Print Only Even Numbers

```javascript
for (let i = 1; i <= 10; i++) {

    if (i % 2 !== 0) {
        continue;
    }

    console.log(i);
}
```

Output:
```text
2
4
6
8
10
```

### break vs continue

| break | continue |
|---|---|
| Terminates the loop. | Skips the current iteration. |
| Execution moves outside the loop. | Execution moves to the next iteration. |
| Used to stop iteration completely. | Used to skip specific iterations. |

---

# 14. Truthy and Falsy Values

### What are Truthy and Falsy Values?

JavaScript values are converted to Boolean values when evaluated in a Boolean context, such as an `if` condition.

There are two categories:

1. Truthy values
2. Falsy values

### Falsy Values

JavaScript has exactly seven falsy values:

| Value | Boolean Result |
|---|---|
| `false` | false |
| `0` | false |
| `-0` | false |
| `0n` | false |
| `""` | false |
| `null` | false |
| `undefined` | false |
| `NaN` | false |

### Truthy Values

All values other than falsy values are truthy.

Examples:

```javascript
Boolean("Hello"); // true

Boolean("0");     // true

Boolean(" ");     // true

Boolean([]);      // true

Boolean({});      // true

Boolean(-1);      // true
```

### Example with if Statement

```javascript
let username = "";

if (username) {
    console.log("Username exists");
} else {
    console.log("Username is empty");
}
```

Output:
```text
Username is empty
```

**Important:** Empty arrays and empty objects are truthy, unlike some other programming languages.

---

# 15. Short-Circuit Evaluation

### What is Short-Circuit Evaluation?

Short-circuit evaluation is a behaviour in which JavaScript stops evaluating an expression as soon as the final result can be determined.

It is commonly used with logical AND (`&&`) and logical OR (`||`) operators.

### 15.1 Short-Circuit AND (&&)

If the first operand is falsy, JavaScript does not evaluate the second operand.

Example:

```javascript
console.log(false && "Hello");
```

Output:
```text
false
```

Another example:

```javascript
let isLoggedIn = false;

isLoggedIn && console.log("Welcome User");
```

The message will not be printed.

### 15.2 Short-Circuit OR (||)

If the first operand is truthy, JavaScript does not evaluate the second operand.

Example:

```javascript
console.log("Hello" || "World");
```

Output:
```text
Hello
```

### 15.3 Practical Example

```javascript
let username = "";

let displayName = username || "Guest";

console.log(displayName);
```

Output:
```text
Guest
```

### 15.4 Nullish Coalescing Operator (??)

The nullish coalescing operator returns the right-hand operand only when the left-hand operand is `null` or `undefined`.

Example:

```javascript
let username = "";

console.log(username || "Guest"); // Guest

console.log(username ?? "Guest"); // ""
```

### Difference Between || and ??

| `||` | `??` |
|---|---|
| Checks whether the left operand is falsy. | Checks whether the left operand is null or undefined. |
| Replaces `0`, `false`, and `""`. | Preserves `0`, `false`, and `""`. |
| Useful for general fallback values. | Useful when only missing values should trigger a fallback. |

Example:

```javascript
let age = 0;

console.log(age || 18); // 18

console.log(age ?? 18); // 0
```

---

# Phase 2 – Important Interview Questions

| No. | Question |
|---|---|
| 1 | What is control flow in JavaScript? |
| 2 | What is the difference between if-else and switch? |
| 3 | What is fall-through in switch statements? |
| 4 | What is the ternary operator? |
| 5 | What is the difference between for and while loops? |
| 6 | What is the difference between while and do-while? |
| 7 | What is the difference between for...in and for...of? |
| 8 | Can we use for...of with objects? |
| 9 | What is a nested loop? |
| 10 | What is the difference between break and continue? |
| 11 | What are truthy and falsy values? |
| 12 | Why is an empty array truthy? |
| 13 | What is short-circuit evaluation? |
| 14 | What is the difference between || and ??? |
| 15 | What happens when a loop has no termination condition? |

---

# Phase 2 – Practical Exercises

Try solving these exercises without looking at solutions.

### Beginner Level

| No. | Exercise |
|---|---|
| 1 | Check whether a number is positive, negative, or zero. |
| 2 | Check whether a number is even or odd. |
| 3 | Find the largest of three numbers. |
| 4 | Check whether a year is a leap year. |
| 5 | Create a simple calculator using switch. |
| 6 | Print numbers from 1 to 100. |
| 7 | Print multiplication tables from 1 to 10. |

### Intermediate Level

| No. | Exercise |
|---|---|
| 8 | Calculate the factorial of a number. |
| 9 | Print the Fibonacci series. |
| 10 | Check whether a number is prime. |
| 11 | Reverse a number. |
| 12 | Check whether a number is a palindrome. |
| 13 | Calculate the sum of digits of a number. |
| 14 | Print all even numbers between 1 and 100. |
| 15 | Print a pyramid star pattern. |

### Advanced Level

| No. | Exercise |
|---|---|
| 16 | Find all prime numbers between 1 and 100. |
| 17 | Print multiplication tables using nested loops. |
| 18 | Find the second-largest number without using array methods. |
| 19 | Count the frequency of digits in a number. |
| 20 | Create a number guessing game. |

---

# Phase 2 – Quick Revision

| Concept | Remember |
|---|---|
| if | Executes code when a condition is true. |
| else | Executes when the previous condition is false. |
| else if | Checks additional conditions. |
| switch | Matches an expression against case values. |
| ternary | Short form of conditional expression. |
| for | Loop with initialization, condition and update. |
| while | Checks condition before execution. |
| do-while | Executes at least once. |
| for...in | Iterates over enumerable property keys. |
| for...of | Iterates over iterable values. |
| break | Terminates the nearest loop or switch. |
| continue | Skips the current iteration. |
| Truthy | Values that evaluate to true in Boolean contexts. |
| Falsy | Values that evaluate to false in Boolean contexts. |
| Short-Circuit | Stops evaluating when the result is determined. |

---

## Learning Progress

| Phase | Topic | Status |
|---|---|---|
| Phase 1 | JavaScript Fundamentals | Completed |
| Phase 2 | Control Flow & Loops | Completed |
| Phase 3 | Functions | Upcoming |
| Phase 4 | Arrays & Objects | Pending |
| Phase 5 | JavaScript Core Concepts | Pending |
| Phase 6 | DOM & Browser APIs | Pending |
| Phase 7 | Asynchronous JavaScript | Pending |
| Phase 8 | Modern JavaScript | Pending |
| Phase 9 | Advanced JavaScript | Pending |
| Phase 10 | Professional Development | Pending |

**Next: Phase 3 – Functions in JavaScript**

Phase 3 will cover function declarations, expressions, arrow functions, callbacks, higher-order functions, closures (introduction), recursion, IIFE, rest parameters, spread syntax and much more.