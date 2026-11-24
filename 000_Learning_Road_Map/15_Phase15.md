# JavaScript Revision Notes – Phase 15
# JavaScript Testing & Debugging

In this phase, we will learn how to test JavaScript applications, identify bugs, debug errors, and ensure that our code works correctly.

Testing and debugging are essential skills for professional JavaScript developers, especially when working with React, Next.js, Node.js, and Express applications.

---

# 1. What Is Software Testing?

Software Testing is the process of checking whether an application behaves as expected.

The primary objectives are:

1. Find bugs before users encounter them.
2. Verify that functionality works correctly.
3. Prevent existing functionality from breaking.
4. Improve application reliability.
5. Ensure code quality.
6. Make future changes safer.

### Example

Suppose you create this function:

```javascript
function add(a, b) {
    return a + b;
}
```

Expected behavior:

```javascript
add(10, 20); // 30
add(5, 5);   // 10
add(2, 8);   // 10
```

Testing verifies that the actual output matches the expected output.

---

# 2. Types of Software Testing

There are several types of testing.

| Testing Type | Purpose |
|---|---|
| Unit Testing | Tests individual functions or components |
| Integration Testing | Tests whether multiple modules work together |
| End-to-End Testing | Tests complete application workflows |
| Regression Testing | Ensures existing functionality still works |
| Smoke Testing | Checks whether critical application functionality works |
| Performance Testing | Checks application performance |
| Security Testing | Identifies security vulnerabilities |
| Acceptance Testing | Checks whether the application meets user/business requirements |

Let's understand the most important testing types.

## 2.1 Unit Testing

Unit Testing means testing a small, isolated part of an application.

Usually, this means testing individual functions, methods, or components.

### Example

```javascript
function calculateTotal(price, quantity) {
    return price * quantity;
}
```

Test cases:

```javascript
calculateTotal(100, 2); // Expected: 200

calculateTotal(50, 3);  // Expected: 150

calculateTotal(0, 5);   // Expected: 0
```

Each test checks one specific behavior.

**Use case:** Testing utility functions, validation functions, calculations, and individual components.

## 2.2 Integration Testing

Integration Testing checks whether multiple modules work correctly together.

### Example

Suppose you have an Express application:

```text
API Request
    |
    v
Controller
    |
    v
Service
    |
    v
Repository
    |
    v
Database
```

Unit testing might test the service independently.

Integration testing might verify that:

1. The API receives a request.
2. The controller calls the service.
3. The service interacts with the repository.
4. The database operation works.
5. The API returns the expected response.

**Use case:** Testing database operations, API endpoints, authentication workflows, and interactions between modules.

## 2.3 End-to-End Testing (E2E)

E2E Testing checks an application from the user's perspective.

It tests complete workflows.

### Example: Login Workflow

```text
Open Website
     |
     v
Open Login Page
     |
     v
Enter Email
     |
     v
Enter Password
     |
     v
Click Login
     |
     v
Verify Dashboard
```

An E2E test verifies that the entire workflow works.

Popular tools:

- Playwright
- Cypress
- Selenium

Since you have previously worked with Playwright, this testing category will be particularly relevant when testing your web applications.

---

# 3. Unit Testing vs Integration Testing vs E2E Testing

| Feature | Unit Testing | Integration Testing | E2E Testing |
|---|---|---|---|
| Testing scope | Small unit | Multiple modules | Complete workflow |
| Speed | Usually fast | Medium | Usually slower |
| Dependencies | Often mocked | Some real dependencies | Often real application environment |
| Complexity | Low | Medium | High |
| Example | Test `calculateTotal()` | Test API with database | Test complete login process |
| Main purpose | Verify individual logic | Verify module interaction | Verify user experience |

### Simple Example

Imagine an e-commerce application.

- **Unit Test:** Does the discount function calculate 10% correctly?
- **Integration Test:** Does the order service correctly save an order in the database?
- **E2E Test:** Can a user log in, add a product to the cart, pay, and see the order confirmation?

---

# 4. Manual Testing vs Automated Testing

## Manual Testing

A human tester manually performs actions and checks the results.

Example:

1. Open the application.
2. Enter login credentials.
3. Click Login.
4. Verify whether the dashboard appears.

### Advantages

- Easy to start.
- Useful for exploratory testing.
- Helpful for checking visual appearance.
- Doesn't require writing automated test scripts.

### Disadvantages

- Repetitive.
- Time-consuming.
- Human errors are possible.
- Difficult to repeat consistently at scale.

## Automated Testing

Automated Testing uses scripts and tools to execute test cases automatically.

Example:

```javascript
test("Addition should return correct result", () => {

    expect(add(10, 20)).toBe(30);

});
```

### Advantages

- Repeatable.
- Faster for repetitive tests.
- Reduces manual effort.
- Useful for regression testing.
- Can run automatically during CI/CD.

### Disadvantages

- Initial setup takes time.
- Tests require maintenance.
- Poorly written tests can create false confidence.

---

# 5. What Is the Test Pyramid?

The Test Pyramid is a model that describes how to distribute different types of tests.

```text
             /\
            /  \
           / E2E\
          /------\
         /        \
        /Integration\
       /------------\
      /              \
     /   Unit Tests   \
    /__________________\
```

### Explanation

| Level | Recommended Quantity | Speed |
|---|---|---|
| Unit Tests | Many | Fast |
| Integration Tests | Moderate | Medium |
| E2E Tests | Fewer, focused | Slower |

Why?

Unit tests are generally faster and cheaper to maintain.

E2E tests cover complete workflows but are usually slower and more sensitive to environmental changes.

**Important:** The pyramid is a guideline, not a strict requirement. Your testing strategy should depend on the application.

---

# 6. What Is a Testing Framework?

A Testing Framework provides tools and utilities for writing and executing automated tests.

Popular JavaScript testing frameworks include:

| Framework | Main Purpose |
|---|---|
| Jest | JavaScript testing |
| Vitest | Modern JavaScript and Vite-based projects |
| Mocha | JavaScript testing framework |
| Jasmine | JavaScript testing framework |
| Playwright | Browser automation and E2E testing |
| Cypress | Browser-based testing |

For this phase, we will primarily learn Jest and Vitest concepts.

---

# 7. Understanding Jest

Jest is a JavaScript testing framework developed by Meta.

It provides:

- Test execution.
- Assertions.
- Mocking.
- Spies.
- Code coverage.
- Snapshot testing.

Official documentation: [Jest Documentation](https://jestjs.io/docs/getting-started?utm_source=chatgpt.com)

## 7.1 Install Jest

For a Node.js project:

```bash
npm install --save-dev jest
```

Add a test script to `package.json`:

```json
{
    "scripts": {
        "test": "jest"
    }
}
```

## 7.2 Create Your First Test

Project structure:

```text
project/
│
├── src/
│   └── calculator.js
│
├── tests/
│   └── calculator.test.js
│
└── package.json
```

**calculator.js**

```javascript
function add(a, b) {
    return a + b;
}

module.exports = {
    add
};
```

**calculator.test.js**

```javascript
const { add } = require("../src/calculator");

test("should add two numbers", () => {

    const result = add(10, 20);

    expect(result).toBe(30);

});
```

Run:

```bash
npm test
```

Expected result:

```text
PASS tests/calculator.test.js

✓ should add two numbers
```

Let's understand the syntax.

```javascript
test("should add two numbers", () => {

    const result = add(10, 20);

    expect(result).toBe(30);

});
```

| Function | Meaning |
|---|---|
| `test()` | Defines a test case |
| `expect()` | Defines the actual value to check |
| `toBe()` | Checks whether the expected value matches |
| `() => {}` | Contains the test logic |

---

# 8. Assertions in JavaScript Testing

An assertion verifies whether a particular condition is true.

Jest provides several matchers.

### 1. toBe()

Checks exact equality using `Object.is()` semantics.

```javascript
expect(10).toBe(10);

expect("Hello").toBe("Hello");
```

### 2. toEqual()

Checks whether objects or arrays have equivalent values.

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

expect(user).toEqual({
    name: "Riyaz",
    age: 25
});
```

### 3. toBeTruthy()

Checks whether a value is truthy.

```javascript
expect(true).toBeTruthy();

expect(1).toBeTruthy();

expect("Hello").toBeTruthy();
```

### 4. toBeFalsy()

Checks whether a value is falsy.

```javascript
expect(false).toBeFalsy();

expect(0).toBeFalsy();

expect("").toBeFalsy();

expect(null).toBeFalsy();
```

### 5. toBeNull()

```javascript
expect(null).toBeNull();
```

### 6. toBeUndefined()

```javascript
let username;

expect(username).toBeUndefined();
```

### 7. toContain()

Checks whether an array or string contains a value.

```javascript
const numbers = [10, 20, 30];

expect(numbers).toContain(20);
```

### 8. toHaveLength()

```javascript
const users = ["Riyaz", "Ahmed"];

expect(users).toHaveLength(2);
```

### 9. toBeGreaterThan()

```javascript
expect(20).toBeGreaterThan(10);
```

### 10. toThrow()

Checks whether a function throws an error.

```javascript
function divide(a, b) {

    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }

    return a / b;
}

expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
```

### Common Jest Matchers

| Matcher | Purpose |
|---|---|
| `toBe()` | Exact value comparison |
| `toEqual()` | Deep value comparison |
| `toBeTruthy()` | Checks truthy value |
| `toBeFalsy()` | Checks falsy value |
| `toBeNull()` | Checks null |
| `toBeUndefined()` | Checks undefined |
| `toContain()` | Checks array/string contents |
| `toHaveLength()` | Checks length |
| `toBeGreaterThan()` | Greater-than comparison |
| `toBeLessThan()` | Less-than comparison |
| `toThrow()` | Checks thrown errors |

---

# 9. Test Suites and Test Cases

A **Test Case** is an individual test that verifies a specific behavior.

A **Test Suite** groups related test cases together.

Jest uses `describe()` to group tests.

### Example

```javascript
const { add, subtract, multiply } = require("./calculator");

describe("Calculator Tests", () => {

    test("Addition", () => {
        expect(add(10, 20)).toBe(30);
    });

    test("Subtraction", () => {
        expect(subtract(20, 10)).toBe(10);
    });

    test("Multiplication", () => {
        expect(multiply(5, 5)).toBe(25);
    });

});
```

Here:

- `describe()` defines a test suite.
- Each `test()` defines an individual test case.

### Common Test Hooks

Jest provides hooks to run code before or after tests.

| Hook | Purpose |
|---|---|
| `beforeAll()` | Runs once before all tests in a suite |
| `afterAll()` | Runs once after all tests in a suite |
| `beforeEach()` | Runs before each test |
| `afterEach()` | Runs after each test |

Example:

```javascript
describe("User Tests", () => {

    beforeAll(() => {
        console.log("Starting test suite");
    });

    beforeEach(() => {
        console.log("Preparing test");
    });

    test("Test 1", () => {
        expect(10).toBe(10);
    });

    test("Test 2", () => {
        expect(20).toBe(20);
    });

    afterAll(() => {
        console.log("Test suite completed");
    });

});
```

---

# 10. What Is Mocking?

Mocking means replacing a real dependency with a controlled fake implementation during testing.

Why?

Suppose your function sends an email using an external email service.

You don't want to send a real email every time you execute a test.

Instead, you can mock the email service.

### Example

```javascript
function sendWelcomeEmail(emailService, user) {

    emailService.send(user.email, "Welcome!");

}
```

Test:

```javascript
const mockEmailService = {
    send: jest.fn()
};

const user = {
    email: "riyaz@gmail.com"
};

sendWelcomeEmail(mockEmailService, user);

expect(mockEmailService.send).toHaveBeenCalled();

expect(mockEmailService.send).toHaveBeenCalledWith(
    "riyaz@gmail.com",
    "Welcome!"
);
```

Here:

```javascript
jest.fn()
```

Creates a mock function.

It allows you to check whether a function was called and what arguments were passed.

### Why use Mocking?

- Avoid real API calls.
- Avoid sending real emails.
- Avoid database dependencies in unit tests.
- Control function responses.
- Simulate failures.

---

# 11. Mock Functions

Jest provides several useful methods for controlling mock functions.

### 1. jest.fn()

Creates a mock function.

```javascript
const mockFunction = jest.fn();

mockFunction();

expect(mockFunction).toHaveBeenCalled();
```

### 2. mockReturnValue()

Defines a fixed return value.

```javascript
const mockFunction = jest.fn();

mockFunction.mockReturnValue(100);

console.log(mockFunction());
```

Output:

```text
100
```

### 3. mockResolvedValue()

Defines a resolved Promise value.

```javascript
const mockFunction = jest.fn();

mockFunction.mockResolvedValue({
    id: 1,
    name: "Riyaz"
});

mockFunction().then(console.log);
```

### 4. mockRejectedValue()

Defines a rejected Promise.

```javascript
const mockFunction = jest.fn();

mockFunction.mockRejectedValue(
    new Error("API failed")
);
```

### 5. mockImplementation()

Defines custom mock behavior.

```javascript
const mockFunction = jest.fn();

mockFunction.mockImplementation((a, b) => {
    return a + b;
});

console.log(mockFunction(10, 20));
```

Output:

```text
30
```

---

# 12. What Is a Spy?

A Spy is used to monitor an existing function.

Unlike a standalone mock, a spy can wrap an existing method and preserve its original implementation unless you replace it.

Jest provides:

```javascript
jest.spyOn(object, "methodName");
```

### Example

```javascript
const userService = {

    getUser() {
        return {
            id: 1,
            name: "Riyaz"
        };
    }

};

const spy = jest.spyOn(userService, "getUser");

userService.getUser();

expect(spy).toHaveBeenCalled();
```

The original `getUser()` method still executes.

### Mocking a Spy

You can replace the implementation:

```javascript
spy.mockReturnValue({
    id: 2,
    name: "Ahmed"
});
```

Now calls to `getUser()` return the mocked value.

### Spy vs Mock

| Spy | Mock |
|---|---|
| Monitors an existing method | Usually creates a controlled replacement function |
| Can preserve original implementation | Can define custom behavior |
| Tracks calls and arguments | Tracks calls and arguments |
| Useful for monitoring behavior | Useful for isolating dependencies |

**Note:** These terms overlap in testing libraries. A Jest spy is also a mock function with tracking capabilities.

---

# 13. What Is a Stub?

A Stub replaces a dependency with a predefined response.

It is generally used to control what a dependency returns during a test.

### Example

```javascript
function getUserName(userService) {

    const user = userService.getUser();

    return user.name;

}
```

Stub:

```javascript
const userServiceStub = {

    getUser() {
        return {
            id: 1,
            name: "Riyaz"
        };
    }

};

console.log(getUserName(userServiceStub));
```

Output:

```text
Riyaz
```

The real user service is not required.

### Mock vs Stub vs Spy

| Concept | Main Purpose |
|---|---|
| Mock | Replace a dependency and control/verify its behavior |
| Stub | Provide predefined responses |
| Spy | Monitor calls to an existing function |

---

# 14. Code Coverage

Code Coverage measures how much of your code is executed during testing.

Jest supports code coverage reports.

Run:

```bash
npm test -- --coverage
```

Example output:

```text
File          % Stmts   % Branch   % Funcs   % Lines
-----------------------------------------------------
calculator.js   100       100        100       100
user.js          80        75        100        80
-----------------------------------------------------
All files        90        87         100       90
```

### Types of Code Coverage

| Coverage Type | Meaning |
|---|---|
| Statement Coverage | Percentage of statements executed |
| Branch Coverage | Percentage of decision branches executed |
| Function Coverage | Percentage of functions called |
| Line Coverage | Percentage of executable lines executed |

### Example

```javascript
function checkAge(age) {

    if (age >= 18) {
        return "Adult";
    }

    return "Minor";

}
```

If you only test:

```javascript
checkAge(25);
```

You have not tested the `Minor` branch.

A better test:

```javascript
test("Should identify adult", () => {
    expect(checkAge(25)).toBe("Adult");
});

test("Should identify minor", () => {
    expect(checkAge(15)).toBe("Minor");
});
```

Now both branches are tested.

**Important:** 100% code coverage does not guarantee that your application is bug-free. Coverage measures execution, not the quality of assertions.

---

# 15. Testing Asynchronous JavaScript

JavaScript applications frequently use asynchronous operations.

Examples:

- API requests.
- Database queries.
- File operations.
- Timers.
- Background tasks.

Testing these operations requires handling Promises correctly.

## 15.1 Testing Promises

Function:

```javascript
function getUser() {

    return Promise.resolve({
        id: 1,
        name: "Riyaz"
    });

}
```

Test:

```javascript
test("Should return user", () => {

    return getUser().then(user => {

        expect(user.name).toBe("Riyaz");

    });

});
```

Returning the Promise ensures Jest waits for it.

## 15.2 Testing with async/await

```javascript
test("Should return user", async () => {

    const user = await getUser();

    expect(user.name).toBe("Riyaz");

});
```

This is often easier to read.

## 15.3 Testing Rejected Promises

```javascript
function getUser() {

    return Promise.reject(
        new Error("User not found")
    );

}
```

Test:

```javascript
test("Should handle rejected Promise", async () => {

    await expect(getUser()).rejects.toThrow("User not found");

});
```

### Important

Never forget to return or await asynchronous operations in Jest tests. Otherwise, a test might finish before the asynchronous assertion executes.

---

# 16. API Testing

API Testing verifies whether an API behaves correctly.

You should test:

1. HTTP status codes.
2. Response body.
3. Response structure.
4. Validation errors.
5. Authentication.
6. Authorization.
7. Database operations.
8. Error handling.

### Example: Express API

Suppose you have:

```javascript
app.get("/api/users", (req, res) => {

    res.status(200).json({
        success: true,
        users: [
            {
                id: 1,
                name: "Riyaz"
            }
        ]
    });

});
```

You can test this using Supertest.

Install:

```bash
npm install --save-dev supertest
```

Example test:

```javascript
const request = require("supertest");

const app = require("../app");

describe("GET /api/users", () => {

    test("Should return users", async () => {

        const response = await request(app)
            .get("/api/users");

        expect(response.status).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.users).toHaveLength(1);

    });

});
```

Supertest allows you to test HTTP endpoints without manually starting a server and making requests through a browser.

Documentation: [Supertest GitHub Repository](https://github.com/ladjs/supertest?utm_source=chatgpt.com)

---

# 17. React Component Testing

React applications also require testing.

You generally want to verify:

- Whether components render correctly.
- Whether buttons work.
- Whether user interactions work.
- Whether form validation works.
- Whether API results are displayed.

Popular tools:

- Vitest or Jest.
- React Testing Library.
- Playwright for browser-level testing.

### Example Component

```jsx
function Greeting({ name }) {

    return <h1>Hello, {name}</h1>;

}

export default Greeting;
```

### Example Test

Using React Testing Library:

```jsx
import { render, screen } from "@testing-library/react";

import Greeting from "./Greeting";

test("Should display user name", () => {

    render(<Greeting name="Riyaz" />);

    expect(
        screen.getByText("Hello, Riyaz")
    ).toBeInTheDocument();

});
```

### Testing Button Clicks

Component:

```jsx
import { useState } from "react";

function Counter() {

    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Count: {count}</p>

            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );

}

export default Counter;
```

Test:

```jsx
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import Counter from "./Counter";

test("Should increment count", async () => {

    const user = userEvent.setup();

    render(<Counter />);

    await user.click(
        screen.getByRole("button", {
            name: "Increment"
        })
    );

    expect(
        screen.getByText("Count: 1")
    ).toBeInTheDocument();

});
```

This test checks the component from the user's perspective.

---

# 18. What Is Vitest?

Vitest is a modern JavaScript testing framework that integrates particularly well with Vite.

It supports:

- Unit testing.
- Assertions.
- Mocking.
- Spies.
- Code coverage.
- Browser testing integrations.

Official documentation: [Vitest Documentation](https://vitest.dev/guide/?utm_source=chatgpt.com)

### Install Vitest

```bash
npm install -D vitest
```

Add to `package.json`:

```json
{
    "scripts": {
        "test": "vitest"
    }
}
```

### Example

```javascript
import { describe, test, expect } from "vitest";

function add(a, b) {
    return a + b;
}

describe("Calculator", () => {

    test("Should add numbers", () => {

        expect(add(10, 20)).toBe(30);

    });

});
```

Run:

```bash
npm test
```

### Jest vs Vitest

| Feature | Jest | Vitest |
|---|---|---|
| Main use | JavaScript testing | JavaScript testing |
| Vite integration | Requires additional configuration in some setups | Native integration |
| API | Rich testing API | Jest-compatible API for many common operations |
| Mocking | Supported | Supported |
| Code coverage | Supported | Supported |
| React testing | Supported with suitable libraries | Supported with suitable libraries |

**Which should you learn?**

Understand both concepts, but if you are starting a new Vite-based React project, Vitest is a natural choice.

For Node.js projects, Jest and Vitest are both viable options.

---

# 19. What Is Debugging?

Debugging is the process of identifying, analyzing, and fixing errors in a program.

A bug is an issue that causes software to behave incorrectly or unexpectedly.

### Example

```javascript
function calculateTotal(price, quantity) {

    return price + quantity;

}

console.log(calculateTotal(100, 5));
```

Output:

```text
105
```

Expected:

```text
500
```

The bug is in the calculation.

Correct code:

```javascript
function calculateTotal(price, quantity) {

    return price * quantity;

}
```

Debugging is not just fixing syntax errors. It also involves understanding incorrect logic, unexpected data, timing issues, and environmental problems.

---

# 20. Types of JavaScript Errors

JavaScript has several built-in error types.

| Error Type | Meaning |
|---|---|
| SyntaxError | Invalid JavaScript syntax |
| ReferenceError | Accessing an undefined variable binding |
| TypeError | Operation is invalid for a value's type |
| RangeError | Value is outside an acceptable range |
| URIError | Incorrect use of URI encoding/decoding functions |
| EvalError | Legacy error type associated with `eval()` |

### 1. SyntaxError

```javascript
if (true {
    console.log("Hello");
}
```

Missing closing parenthesis.

### 2. ReferenceError

```javascript
console.log(username);
```

If `username` is not declared, JavaScript throws a ReferenceError.

### 3. TypeError

```javascript
const user = null;

console.log(user.name);
```

You cannot access a property of `null`.

### 4. RangeError

```javascript
const numbers = new Array(-5);
```

An invalid array length causes a RangeError.

---

# 21. console Methods for Debugging

The browser and Node.js provide several useful console methods.

### console.log()

```javascript
console.log("Hello");
```

Displays general information.

### console.error()

```javascript
console.error("Something went wrong");
```

Displays error information.

### console.warn()

```javascript
console.warn("This is a warning");
```

Displays warnings.

### console.table()

```javascript
const users = [
    {
        id: 1,
        name: "Riyaz"
    },
    {
        id: 2,
        name: "Ahmed"
    }
];

console.table(users);
```

Displays structured data in a table.

### console.time() and console.timeEnd()

Measure how long an operation takes.

```javascript
console.time("Loop");

for (let i = 0; i < 1000000; i++) {
    // Operation
}

console.timeEnd("Loop");
```

Example output:

```text
Loop: 4.2ms
```

Actual time depends on the system.

### console.trace()

Displays the stack trace showing where a function was called.

```javascript
function first() {
    second();
}

function second() {
    console.trace("Execution trace");
}

first();
```

---

# 22. What Is a Breakpoint?

A Breakpoint is a debugging feature that pauses JavaScript execution at a particular line.

It allows you to inspect the current state of your program.

You can use breakpoints in Chrome DevTools or VS Code.

### Example

```javascript
function calculateTotal(price, quantity) {

    const subtotal = price * quantity;

    const tax = subtotal * 0.18;

    const total = subtotal + tax;

    return total;

}

calculateTotal(1000, 2);
```

Set a breakpoint on:

```javascript
const tax = subtotal * 0.18;
```

Execution pauses there.

You can inspect:

- `price`
- `quantity`
- `subtotal`
- Current call stack
- Local variables

### JavaScript debugger Statement

You can also insert:

```javascript
function calculate(a, b) {

    debugger;

    return a + b;

}
```

When developer tools are open, execution pauses at the `debugger` statement.

---

# 23. Chrome DevTools Debugger

Chrome DevTools provides powerful debugging capabilities.

Open it using:

```text
F12
```

Or:

```text
Ctrl + Shift + I
```

Open the **Sources** tab.

Important features:

| Feature | Purpose |
|---|---|
| Breakpoints | Pause execution |
| Watch | Monitor expressions |
| Scope | Inspect local and global variables |
| Call Stack | Understand function execution order |
| Step Over | Execute the current line and move to the next |
| Step Into | Enter a function call |
| Step Out | Finish the current function and return to its caller |
| Resume | Continue execution |
| Conditional Breakpoint | Pause only when a condition is true |

### Understanding Stepping Controls

Suppose:

```javascript
function greet() {
    console.log("Hello");
}

function main() {
    greet();
    console.log("Finished");
}

main();
```

**Step Over:** Executes a function call without entering its body.

**Step Into:** Enters the called function.

**Step Out:** Finishes the current function and returns to its caller.

These controls are extremely useful when debugging complex applications.

---

# 24. Watch Expressions

A Watch Expression allows you to monitor the value of an expression while debugging.

Example:

```javascript
let price = 100;
let quantity = 5;

let total = price * quantity;
```

You can add these expressions to the Watch panel:

```javascript
price
quantity
total
price * quantity
```

When execution pauses, DevTools displays their current values.

This helps you understand how values change during execution.

---

# 25. Understanding Call Stack and Stack Trace

These two concepts are related but have slightly different purposes.

## Call Stack

The Call Stack tracks the currently active function calls.

Example:

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

When execution reaches `third()`, the call stack looks conceptually like this:

```text
third()
second()
first()
global()
```

As functions finish executing, they are removed from the stack.

## Stack Trace

A Stack Trace shows the sequence of function calls that led to a particular error or execution point.

Example:

```javascript
function first() {
    second();
}

function second() {
    third();
}

function third() {
    throw new Error("Something went wrong");
}

first();
```

The error stack trace helps identify where the error occurred and how execution reached that location.

### Call Stack vs Stack Trace

| Call Stack | Stack Trace |
|---|---|
| Represents active function calls | Records a sequence of calls |
| Changes during execution | Commonly displayed when an error occurs |
| Used while debugging | Used to investigate errors |

---

# 26. Debugging Node.js Applications

Node.js provides built-in debugging support through the Inspector protocol.

### Option 1: Use console.log()

```javascript
function calculate(a, b) {

    console.log("A:", a);

    console.log("B:", b);

    return a + b;

}
```

Useful for quick checks, but not ideal for complex debugging.

### Option 2: Use debugger

```javascript
function calculate(a, b) {

    debugger;

    return a + b;

}

console.log(calculate(10, 20));
```

Run:

```bash
node --inspect-brk app.js
```

This starts Node.js with debugging enabled and pauses at the beginning.

You can connect using Chrome DevTools or VS Code.

### Option 3: Use VS Code Debugger

VS Code supports debugging Node.js applications.

A basic `launch.json` configuration:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug Node.js",
            "program": "${workspaceFolder}/app.js"
        }
    ]
}
```

Steps:

1. Open your Node.js project in VS Code.
2. Open the Run and Debug panel.
3. Create a `launch.json` configuration.
4. Set breakpoints.
5. Start debugging.
6. Inspect variables and the call stack.

Official documentation: [Node.js Debugging Guide](https://nodejs.org/en/learn/getting-started/debugging?utm_source=chatgpt.com)

**Security note:** Don't expose the Node.js inspector port publicly. It can provide powerful control over the running process.

---

# 27. Debugging Async JavaScript

Asynchronous JavaScript can be more difficult to debug because execution does not always follow a simple sequential flow.

### Example

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 1000);

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

To debug asynchronous code, pay attention to:

- Promise resolution and rejection.
- `async` and `await`.
- Event Loop behavior.
- Network requests.
- Timers.
- Async stack traces.

### Example: Async Error

```javascript
async function getUser() {

    try {

        const response = await fetch("/api/user");

        if (!response.ok) {
            throw new Error("Request failed");
        }

        return await response.json();

    } catch (error) {

        console.error("API Error:", error.message);

        throw error;
    }

}
```

Use breakpoints inside the `try` and `catch` blocks to inspect execution.

---

# 28. Common Debugging Techniques

| Technique | Purpose |
|---|---|
| Console Logging | Inspect variable values |
| Breakpoints | Pause execution |
| Step Debugging | Execute code line by line |
| Watch Expressions | Monitor values |
| Call Stack Inspection | Understand function execution |
| Network Tab | Inspect API requests and responses |
| Performance Tab | Investigate performance problems |
| Memory Tab | Investigate memory leaks |
| Source Maps | Debug original source code |
| Error Stack Traces | Locate errors |

### Important: Network Tab

When debugging API issues, the Network tab is particularly useful.

You can inspect:

- Request URL.
- HTTP method.
- Request headers.
- Request payload.
- Response status.
- Response body.
- Timing.
- Failed requests.

For example, if your React application receives a `401 Unauthorized` response, you can inspect the request and verify whether the authentication token was included.

---

# 29. Regression Testing

Regression Testing verifies that previously working functionality continues to work after code changes.

### Example

Suppose your application has:

```text
Login
Registration
Product Listing
Add to Cart
Checkout
```

You modify the checkout functionality.

You should also check whether your changes accidentally broke:

- Login.
- Product listing.
- Cart operations.

This is regression testing.

Automated test suites make regression testing much easier.

---

# 30. What Is Test-Driven Development (TDD)?

TDD stands for **Test-Driven Development**.

It is a development approach in which tests are written before the implementation.

TDD follows three steps:

```text
       RED
        |
        v
    GREEN
        |
        v
     REFACTOR
        |
        v
      REPEAT
```

### Step 1: Red

Write a test for functionality that doesn't exist yet.

```javascript
test("Should add two numbers", () => {

    expect(add(10, 20)).toBe(30);

});
```

Initially, this test fails because `add()` hasn't been implemented.

### Step 2: Green

Write the minimum implementation to pass the test.

```javascript
function add(a, b) {
    return a + b;
}
```

Now the test passes.

### Step 3: Refactor

Improve the code while keeping the test passing.

For example, improve naming, remove duplication, or simplify implementation.

### Advantages

- Encourages testable code.
- Clarifies expected behavior.
- Helps prevent regressions.
- Encourages small development steps.

**Important:** TDD is a development methodology, not a testing framework.

---

# 31. Common Testing Mistakes

| Mistake | Why It Is a Problem |
|---|---|
| Testing only happy paths | Errors and edge cases remain untested |
| Testing implementation details | Tests become fragile |
| Excessive mocking | Tests may not represent real behavior |
| Ignoring async operations | Tests may finish too early |
| No regression tests | Existing functionality may break |
| Testing everything through E2E | Test suite becomes slow and expensive |
| Poor test naming | Difficult to understand failures |
| Ignoring test cleanup | Tests can interfere with each other |
| Chasing 100% coverage blindly | High coverage doesn't guarantee correctness |

### Example: Test Edge Cases

Instead of only testing:

```javascript
calculateTotal(100, 5);
```

Also consider:

```javascript
calculateTotal(0, 5);

calculateTotal(100, 0);

calculateTotal(100, -1);

calculateTotal("100", 5);

calculateTotal(null, 5);
```

Whether these inputs should be accepted or rejected depends on your application's requirements.

---

# 32. Practical Testing Project

Let's combine the concepts into a small project.

## Project: User Management Service

Requirements:

1. Create a user.
2. Get a user by ID.
3. Validate email.
4. Handle missing users.
5. Test all functionality.

### Project Structure

```text
user-management/
│
├── src/
│   ├── user.service.js
│   └── user.repository.js
│
├── tests/
│   └── user.service.test.js
│
├── package.json
└── app.js
```

### user.repository.js

```javascript
const users = [];

async function create(user) {

    const newUser = {
        id: users.length + 1,
        ...user
    };

    users.push(newUser);

    return newUser;
}

async function findById(id) {

    return users.find(user => user.id === id) || null;

}

module.exports = {
    create,
    findById
};
```

### user.service.js

```javascript
const userRepository = require("./user.repository");

async function createUser(user) {

    if (!user.name) {
        throw new Error("Name is required");
    }

    if (!user.email || !user.email.includes("@")) {
        throw new Error("Invalid email");
    }

    return await userRepository.create(user);

}

async function getUser(id) {

    const user = await userRepository.findById(id);

    if (!user) {
        throw new Error("User not found");
    }

    return user;

}

module.exports = {
    createUser,
    getUser
};
```

### user.service.test.js

```javascript
const userService = require("../src/user.service");

describe("User Service", () => {

    test("Should create user", async () => {

        const user = await userService.createUser({
            name: "Riyaz",
            email: "riyaz@gmail.com"
        });

        expect(user.name).toBe("Riyaz");

        expect(user.email).toBe("riyaz@gmail.com");

    });

    test("Should reject invalid email", async () => {

        await expect(
            userService.createUser({
                name: "Riyaz",
                email: "invalid-email"
            })
        ).rejects.toThrow("Invalid email");

    });

    test("Should reject missing name", async () => {

        await expect(
            userService.createUser({
                email: "riyaz@gmail.com"
            })
        ).rejects.toThrow("Name is required");

    });

});
```

This is a simplified learning example.

For a production application, you should also consider test isolation, database cleanup, unique email validation, schema validation, and integration tests.

---

# 33. Important Interview Questions

### Basic Questions

1. What is Software Testing?
2. What is Unit Testing?
3. What is Integration Testing?
4. What is End-to-End Testing?
5. What is the difference between manual and automated testing?
6. What is the Test Pyramid?
7. What is Jest?
8. What is Vitest?
9. What is an assertion?
10. What is a test case?

### Intermediate Questions

11. What is the difference between `toBe()` and `toEqual()`?
12. What is the difference between `describe()` and `test()`?
13. What are `beforeEach()` and `afterEach()`?
14. What is mocking?
15. What is a spy?
16. What is a stub?
17. What is code coverage?
18. How do you test asynchronous functions?
19. How do you test API endpoints?
20. How do you test React components?

### Advanced Questions

21. What is Test-Driven Development?
22. Explain the Red-Green-Refactor cycle.
23. What is Regression Testing?
24. What is Branch Coverage?
25. What is the difference between Unit and Integration Testing?
26. How do you mock external API calls?
27. How do you debug asynchronous JavaScript?
28. What is a breakpoint?
29. What is the difference between Call Stack and Stack Trace?
30. How do you debug a Node.js application?

---

# 34. Practical Exercises

Complete these exercises yourself.

### Exercise 1: Calculator Testing

Create these functions:

- `add()`
- `subtract()`
- `multiply()`
- `divide()`

Write test cases for each function.

Include division-by-zero handling.

### Exercise 2: User Validation

Create a user validation function.

Rules:

- Name is required.
- Email must be valid.
- Password must have at least 8 characters.

Write tests for valid and invalid inputs.

### Exercise 3: Async Testing

Create a function that fetches users from an API.

Write tests for:

- Successful response.
- Failed response.
- Network error.
- Invalid response.

Mock the API request.

### Exercise 4: API Testing

Create an Express API with:

```text
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

Write integration tests using Supertest.

### Exercise 5: React Testing

Create a registration form.

Test:

- Form rendering.
- Empty input validation.
- Invalid email validation.
- Successful submission.
- Loading state.

### Exercise 6: Debugging

Create a JavaScript program containing at least five intentional bugs.

Use Chrome DevTools or VS Code Debugger to identify and fix them.

---

# 35. Output-Based Questions

Predict the output before running each example.

### Question 1

```javascript
function add(a, b) {
    return a + b;
}

test("Addition", () => {
    expect(add(10, 20)).toBe(30);
});
```

What does the test verify?

### Question 2

```javascript
const mock = jest.fn();

mock(10);
mock(20);

console.log(mock.mock.calls.length);
```

What is the output?

### Question 3

```javascript
function getUser() {
    return Promise.resolve({
        name: "Riyaz"
    });
}

test("User test", async () => {

    const user = await getUser();

    expect(user.name).toBe("Riyaz");

});
```

Why do we use `async` and `await` here?

### Question 4

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

What will the call stack look like when execution reaches `third()`?

### Question 5

```javascript
function checkAge(age) {

    if (age >= 18) {
        return "Adult";
    }

    return "Minor";

}
```

If you test only `checkAge(25)`, which branch remains untested?

---

# 36. Official Documentation & Learning Resources

1. [Jest Documentation](https://jestjs.io/docs/getting-started?utm_source=chatgpt.com)
2. [Vitest Documentation](https://vitest.dev/guide/?utm_source=chatgpt.com)
3. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/?utm_source=chatgpt.com)
4. [Playwright Documentation](https://playwright.dev/docs/intro?utm_source=chatgpt.com)
5. [Cypress Documentation](https://docs.cypress.io/?utm_source=chatgpt.com)
6. [Node.js Debugging Guide](https://nodejs.org/en/learn/getting-started/debugging?utm_source=chatgpt.com)
7. [Chrome DevTools Documentation](https://developer.chrome.com/docs/devtools/?utm_source=chatgpt.com)
8. [Supertest Documentation](https://github.com/ladjs/supertest?utm_source=chatgpt.com)

---

# 37. Phase 15 – Revision Checklist

Before moving to the next phase, make sure you understand:

- [ ] Software Testing.
- [ ] Manual vs Automated Testing.
- [ ] Unit Testing.
- [ ] Integration Testing.
- [ ] End-to-End Testing.
- [ ] Regression Testing.
- [ ] Smoke Testing.
- [ ] Test Pyramid.
- [ ] Jest.
- [ ] Vitest.
- [ ] Assertions and Matchers.
- [ ] Test Suites and Test Cases.
- [ ] Test Hooks.
- [ ] Mocking.
- [ ] Spies.
- [ ] Stubs.
- [ ] Code Coverage.
- [ ] Async Testing.
- [ ] API Testing.
- [ ] React Component Testing.
- [ ] Debugging.
- [ ] JavaScript Error Types.
- [ ] Chrome DevTools.
- [ ] Breakpoints.
- [ ] Watch Expressions.
- [ ] Call Stack and Stack Trace.
- [ ] Node.js Debugging.
- [ ] Test-Driven Development.

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
| **15** | **Testing & Debugging** | **Completed** |

## Next Phase – Phase 16: JavaScript and TypeScript Ecosystem

We will cover:

1. What is TypeScript?
2. JavaScript vs TypeScript.
3. Static vs Dynamic Typing.
4. Type Annotations.
5. Type Inference.
6. Primitive Types.
7. Arrays and Tuples.
8. Interfaces.
9. Type Aliases.
10. Union and Intersection Types.
11. Enums.
12. Functions and Function Types.
13. Optional and Default Parameters.
14. Generics.
15. Utility Types.
16. Type Narrowing.
17. Type Guards.
18. Type Assertions.
19. Classes and Access Modifiers.
20. Abstract Classes.
21. Interfaces vs Abstract Classes.
22. Modules and Namespaces.
23. TypeScript Configuration (`tsconfig.json`).
24. TypeScript with React.
25. TypeScript with Node.js and Express.

**Phase 15 is complete.**