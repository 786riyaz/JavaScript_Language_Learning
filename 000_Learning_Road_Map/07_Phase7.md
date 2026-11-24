# JavaScript Complete Revision Notes
# Phase 7 – Asynchronous JavaScript

Asynchronous JavaScript is one of the most important topics in JavaScript, especially for frontend and backend development.

It helps JavaScript perform time-consuming operations without blocking the execution of other code.

Examples:
- Fetching data from an API.
- Reading files.
- Communicating with a database.
- Setting timers.
- Handling user interactions while waiting for responses.

Let's understand these concepts step by step.

---

# 1. What is Synchronous JavaScript?

**Synchronous JavaScript** executes code one statement at a time, in sequence.

Each statement waits for the previous statement to finish before executing.

### Example

```javascript
console.log("First");

console.log("Second");

console.log("Third");
```

Output:

```text
First
Second
Third
```

Execution happens line by line.

### Important Points

- Executes code sequentially.
- Each operation must finish before the next one starts.
- A long-running operation can block subsequent code.
- JavaScript's normal execution model is synchronous.

---

# 2. What is Asynchronous JavaScript?

**Asynchronous JavaScript** allows certain operations to start and complete later without blocking the main JavaScript execution thread.

While an asynchronous operation is waiting, JavaScript can continue executing other code.

### Example

```javascript
console.log("First");

setTimeout(() => {
    console.log("Second");
}, 2000);

console.log("Third");
```

Output:

```text
First
Third
Second
```

Explanation:

1. `"First"` executes.
2. `setTimeout()` schedules a callback.
3. JavaScript continues executing.
4. `"Third"` executes.
5. After approximately two seconds, the callback executes.

**Important:** `setTimeout()` does not pause JavaScript execution. It schedules a callback to run no earlier than the specified delay, when the event loop can process it.

---

# 3. Blocking vs Non-Blocking Code

### Blocking Code

Blocking code prevents further JavaScript execution on the same thread until the operation finishes.

Example:

```javascript
console.log("Start");

const start = Date.now();

while (Date.now() - start < 3000) {
    // Blocking operation
}

console.log("End");
```

The program cannot execute `"End"` until the loop finishes.

### Non-Blocking Code

Non-blocking operations allow JavaScript to continue executing while the operation is pending.

Example:

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Operation completed");
}, 3000);

console.log("End");
```

Output:

```text
Start
End
Operation completed
```

### Difference

| Blocking | Non-Blocking |
|---|---|
| Prevents further execution on the same thread | Allows other code to continue |
| Can make applications unresponsive | Helps applications remain responsive |
| Example: Long synchronous loop | Example: Timer callback |
| Execution waits for the operation | Completion is handled later |

---

# 4. Is JavaScript Single-Threaded?

JavaScript is commonly described as a **single-threaded language** because its main execution thread processes one JavaScript task at a time.

However, modern JavaScript environments provide additional capabilities that allow asynchronous operations and parallel work.

### Browser Environment

The browser provides:
- JavaScript Engine.
- Web APIs.
- Event Loop.
- Task Queue.
- Microtask Queue.

### Node.js Environment

Node.js provides:
- JavaScript Engine (V8 by default).
- Node.js APIs.
- Event Loop.
- Task Queues.
- Thread Pool through libuv.
- Worker Threads for parallel JavaScript execution.

### Important

JavaScript's main thread is single-threaded, but the environment can perform operations outside that thread.

For example:
- Network requests.
- Timers.
- File system operations in Node.js.
- Certain cryptographic operations.

This is how asynchronous behavior is possible.

---

# 5. JavaScript Runtime Environment

A **JavaScript Runtime Environment** provides everything required to execute JavaScript code.

It includes the JavaScript engine and additional environment-specific APIs and mechanisms.

### Browser Runtime

```text
       JavaScript Runtime
              |
      -------------------
      |                 |
 JavaScript Engine   Web APIs
      |                 |
   Call Stack       DOM API
                    Timer API
                    Fetch API
      |                 |
      -------------------
              |
          Event Loop
              |
      -------------------
      |                 |
   Task Queue      Microtask Queue
```

### Main Components

| Component | Description |
|---|---|
| JavaScript Engine | Executes JavaScript code |
| Call Stack | Tracks function execution |
| Web APIs | Provides browser features |
| Event Loop | Coordinates execution of queued callbacks |
| Task Queue | Holds scheduled tasks |
| Microtask Queue | Holds microtasks such as Promise callbacks |

**Note:** The browser runtime and Node.js runtime are different. They provide different APIs and have some differences in event-loop behavior.

---

# 6. JavaScript Engine

A JavaScript engine executes JavaScript code.

Examples:

| JavaScript Engine | Used In |
|---|---|
| V8 | Chrome, Node.js, Edge |
| SpiderMonkey | Firefox |
| JavaScriptCore | Safari |
| Hermes | React Native |

The engine is responsible for:
- Parsing JavaScript.
- Compiling or interpreting code.
- Executing code.
- Managing memory.

Example:

```javascript
const name = "Riyaz";

console.log(name);
```

The JavaScript engine processes and executes this code.

---

# 7. Call Stack

The **Call Stack** is a data structure used by JavaScript to manage function execution.

It follows the LIFO principle:

**LIFO = Last In, First Out**

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

second();
```

Output:

```text
First
Second
```

### Execution Flow

```text
Step 1:

Call Stack
-----------
second()


Step 2:

Call Stack
-----------
first()
second()


Step 3:

Call Stack
-----------
second()


Step 4:

Call Stack
-----------
Empty
```

The function `first()` executes and is removed from the stack before `second()` finishes.

### Important

The call stack manages synchronous JavaScript execution. It does not directly hold asynchronous operations while they are waiting.

---

# 8. What are Web APIs?

Web APIs are features provided by the browser that JavaScript can use.

Examples:

| Web API | Purpose |
|---|---|
| DOM API | Manipulates HTML |
| Timer API | Handles timers |
| Fetch API | Makes HTTP requests |
| Geolocation API | Gets location |
| Storage API | Stores browser data |
| Clipboard API | Accesses clipboard |

### Example: Timer API

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer completed");
}, 2000);

console.log("End");
```

Here:
1. JavaScript calls `setTimeout()`.
2. The browser's timer functionality manages the delay.
3. JavaScript continues executing.
4. When the timer becomes eligible, its callback is queued as a task.
5. The event loop allows it to execute when the call stack is available.

**Important:** Web APIs are browser features, not part of the JavaScript language itself.

Node.js provides its own APIs for timers, networking, and file operations.

---

# 9. What is a Callback Function?

A callback is a function passed as an argument to another function so that it can be invoked later or during that function's execution.

Callbacks can be synchronous or asynchronous.

### Synchronous Callback Example

```javascript
function greet(name, callback) {
    console.log("Hello " + name);

    callback();
}

function message() {
    console.log("Welcome!");
}

greet("Riyaz", message);
```

Output:

```text
Hello Riyaz
Welcome!
```

### Asynchronous Callback Example

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Callback executed");
}, 2000);

console.log("End");
```

Output:

```text
Start
End
Callback executed
```

### Important Points

- A callback is a function passed to another function.
- A callback is not necessarily asynchronous.
- Callbacks are commonly used in event handling and asynchronous operations.
- Too many nested callbacks can make code difficult to maintain.

---

# 10. Callback Hell

Callback Hell occurs when multiple asynchronous callbacks are nested inside one another, making code difficult to read and maintain.

It is also called the **Pyramid of Doom**.

### Example

```javascript
getUser(function (user) {

    getOrders(user.id, function (orders) {

        getPayment(orders[0].id, function (payment) {

            sendEmail(payment, function (response) {

                console.log(response);

            });

        });

    });

});
```

### Problems

1. Difficult to read.
2. Difficult to debug.
3. Difficult to maintain.
4. Error handling becomes complicated.
5. Code becomes deeply nested.

### Solution

Promises and `async/await` provide cleaner ways to manage asynchronous operations.

---

# 11. What is a Promise?

A **Promise** is a JavaScript object that represents the eventual completion or failure of an asynchronous operation.

A Promise can be in one of three states:

1. Pending
2. Fulfilled
3. Rejected

### Promise States

| State | Description |
|---|---|
| Pending | Operation is still in progress |
| Fulfilled | Operation completed successfully |
| Rejected | Operation failed |

### Promise Lifecycle

```text
          Pending
             |
       -------------
       |           |
       v           v
   Fulfilled    Rejected
```

A Promise settles only once. After it becomes fulfilled or rejected, its state cannot change.

### Creating a Promise

```javascript
const promise = new Promise((resolve, reject) => {

    const success = true;

    if (success) {
        resolve("Operation Successful");
    } else {
        reject("Operation Failed");
    }

});
```

### Explanation

- `new Promise()` creates a Promise object.
- The executor function runs immediately.
- `resolve()` fulfills the Promise.
- `reject()` rejects the Promise.

**Important:** Creating a Promise does not automatically make an operation asynchronous. The executor function itself executes synchronously.

---

# 12. Promise `.then()`

The `.then()` method handles a fulfilled Promise.

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("Data received");
});

promise.then((result) => {
    console.log(result);
});
```

Output:

```text
Data received
```

### Important Points

- `.then()` registers fulfillment and optionally rejection handlers.
- It returns a new Promise.
- The callback executes asynchronously as a microtask when the Promise settles.

Example:

```javascript
Promise.resolve("Hello")
    .then((result) => {
        console.log(result);
    });
```

---

# 13. Promise `.catch()`

The `.catch()` method handles Promise rejection.

```javascript
const promise = new Promise((resolve, reject) => {
    reject("Something went wrong");
});

promise.catch((error) => {
    console.log(error);
});
```

Output:

```text
Something went wrong
```

### Example with `.then()` and `.catch()`

```javascript
const promise = new Promise((resolve, reject) => {

    const success = false;

    if (success) {
        resolve("Success");
    } else {
        reject("Error occurred");
    }

});

promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });
```

Output:

```text
Error occurred
```

---

# 14. Promise `.finally()`

The `.finally()` method executes when a Promise settles, whether it is fulfilled or rejected.

It is commonly used for cleanup operations.

Example:

```javascript
const promise = new Promise((resolve, reject) => {
    resolve("Success");
});

promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Operation completed");
    });
```

Output:

```text
Success
Operation completed
```

### Practical Example

```javascript
function fetchData() {

    console.log("Loading...");

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 2000);
    });

}

fetchData()
    .then((data) => {
        console.log(data);
    })
    .finally(() => {
        console.log("Loading finished");
    });
```

---

# 15. Promise Chaining

Promise chaining means connecting multiple `.then()` methods to execute asynchronous operations sequentially.

Each `.then()` returns a new Promise.

### Example

```javascript
Promise.resolve(10)

    .then((value) => {
        console.log(value);

        return value * 2;
    })

    .then((value) => {
        console.log(value);

        return value + 5;
    })

    .then((value) => {
        console.log(value);
    });
```

Output:

```text
10
20
25
```

### How It Works

1. First `.then()` receives `10`.
2. It returns `20`.
3. Second `.then()` receives `20`.
4. It returns `25`.
5. Third `.then()` receives `25`.

### Important

If you return a Promise from a `.then()` callback, the next `.then()` waits for that Promise to settle.

```javascript
Promise.resolve(5)
    .then((value) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(value * 2);
            }, 1000);
        });
    })
    .then((result) => {
        console.log(result);
    });
```

Output after approximately one second:

```text
10
```

---

# 16. Promise Static Methods

JavaScript provides several static methods for working with multiple Promises.

The most important ones are:

1. `Promise.all()`
2. `Promise.allSettled()`
3. `Promise.race()`
4. `Promise.any()`

### 16.1 Promise.all()

`Promise.all()` accepts an iterable of Promises and returns a Promise that:

- Fulfills when all input Promises fulfill.
- Rejects as soon as one input Promise rejects.

Example:

```javascript
const promise1 = Promise.resolve("First");

const promise2 = Promise.resolve("Second");

const promise3 = Promise.resolve("Third");

Promise.all([
    promise1,
    promise2,
    promise3
])
.then((results) => {
    console.log(results);
})
.catch((error) => {
    console.log(error);
});
```

Output:

```javascript
["First", "Second", "Third"]
```

**Important:** Results preserve the order of the input Promises, not the order in which they complete.

Practical example:

```javascript
const userPromise = fetch("/api/user");

const productPromise = fetch("/api/products");

Promise.all([
    userPromise,
    productPromise
])
.then((responses) => {
    console.log(responses);
});
```

Both requests can be started without waiting for one another.

Note: This example only waits for the HTTP responses. You still need to parse their bodies.

### 16.2 Promise.allSettled()

Waits until every input Promise settles, regardless of whether it fulfills or rejects.

```javascript
const promise1 = Promise.resolve("Success");

const promise2 = Promise.reject("Failed");

const promise3 = Promise.resolve("Completed");

Promise.allSettled([
    promise1,
    promise2,
    promise3
])
.then((results) => {
    console.log(results);
});
```

Output:

```javascript
[
    { status: "fulfilled", value: "Success" },
    { status: "rejected", reason: "Failed" },
    { status: "fulfilled", value: "Completed" }
]
```

### 16.3 Promise.race()

Returns a Promise that settles as soon as the first input Promise settles.

It can fulfill or reject depending on which Promise settles first.

```javascript
const promise1 = new Promise((resolve) => {
    setTimeout(() => resolve("First"), 2000);
});

const promise2 = new Promise((resolve) => {
    setTimeout(() => resolve("Second"), 1000);
});

Promise.race([
    promise1,
    promise2
])
.then((result) => {
    console.log(result);
});
```

Output:

```text
Second
```

Because the second Promise settles first.

### 16.4 Promise.any()

Returns a Promise that fulfills as soon as the first input Promise fulfills.

It ignores rejections unless every input Promise rejects.

```javascript
const promise1 = Promise.reject("Error 1");

const promise2 = Promise.resolve("Success");

const promise3 = Promise.resolve("Another Success");

Promise.any([
    promise1,
    promise2,
    promise3
])
.then((result) => {
    console.log(result);
})
.catch((error) => {
    console.log(error);
});
```

Output:

```text
Success
```

If all Promises reject, `Promise.any()` rejects with an `AggregateError`.

### Comparison

| Method | Behavior |
|---|---|
| `Promise.all()` | Fulfills when all fulfill; rejects on first rejection |
| `Promise.allSettled()` | Waits for all to settle |
| `Promise.race()` | Settles with the first settled Promise |
| `Promise.any()` | Fulfills with the first fulfilled Promise |

### Quick Example to Remember

Suppose you have three API requests:

- Request A takes 3 seconds.
- Request B takes 1 second.
- Request C takes 2 seconds.

| Method | Result |
|---|---|
| `Promise.all()` | Waits for all three |
| `Promise.allSettled()` | Waits for all three, including failures |
| `Promise.race()` | Returns the result or error from the first settled request |
| `Promise.any()` | Returns the first successful result |

---

# 17. What is async/await?

`async/await` provides a cleaner syntax for working with Promises.

It makes asynchronous code look similar to synchronous code.

### async Function

An `async` function always returns a Promise.

Example:

```javascript
async function greet() {
    return "Hello World";
}

const result = greet();

console.log(result);
```

Output:

```text
Promise { 'Hello World' }
```

To get the resolved value:

```javascript
greet().then((result) => {
    console.log(result);
});
```

Output:

```text
Hello World
```

### await Keyword

`await` pauses the execution of the surrounding async function until the Promise settles.

Example:

```javascript
function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 2000);
    });
}

async function showData() {

    console.log("Start");

    const result = await getData();

    console.log(result);

    console.log("End");
}

showData();
```

Output:

```text
Start
Data received
End
```

**Important:** `await` pauses only the surrounding async function. It does not block the entire JavaScript thread.

### async/await vs Promise `.then()`

Using `.then()`:

```javascript
getData()
    .then((result) => {
        console.log(result);
    });
```

Using `async/await`:

```javascript
async function showData() {
    const result = await getData();

    console.log(result);
}

showData();
```

Both approaches work with Promises.

---

# 18. Error Handling with try...catch

When working with asynchronous operations, errors must be handled properly.

With `async/await`, we commonly use `try...catch`.

### Example

```javascript
function getData() {

    return new Promise((resolve, reject) => {

        reject("Something went wrong");

    });

}

async function showData() {

    try {

        const result = await getData();

        console.log(result);

    } catch (error) {

        console.log("Error:", error);

    }

}

showData();
```

Output:

```text
Error: Something went wrong
```

### Using finally

```javascript
async function showData() {

    try {

        const result = await getData();

        console.log(result);

    } catch (error) {

        console.log(error);

    } finally {

        console.log("Execution completed");

    }

}
```

### Important Points

- `try` contains code that may throw an error.
- `catch` handles the error.
- `finally` executes after the try/catch process.
- Rejected Promises awaited inside `try` can be handled by `catch`.

### Important Interview Question

**Does `try...catch` catch errors from asynchronous callbacks automatically?**

No.

Example:

```javascript
try {

    setTimeout(() => {
        throw new Error("Something went wrong");
    }, 1000);

} catch (error) {

    console.log("Caught:", error);

}
```

The `catch` block does not catch the error because the callback executes later, outside the synchronous `try...catch` execution.

---

# 19. What is the Event Loop?

The **Event Loop** is a mechanism that coordinates JavaScript execution with queued asynchronous callbacks.

It helps JavaScript process asynchronous tasks without blocking the main execution thread while operations are pending.

### Main Components

1. Call Stack
2. Web APIs or environment APIs
3. Task Queue
4. Microtask Queue
5. Event Loop

### Simplified Diagram

```text
            JavaScript Code
                  |
                  v
              Call Stack
                  |
          -----------------
          |               |
          v               v
       Web APIs        Synchronous
          |             Execution
          |
     ---------------
     |             |
     v             v
 Task Queue    Microtask Queue
     |             |
     ---------------
          |
          v
       Event Loop
          |
          v
       Call Stack
```

### How the Event Loop Works

1. JavaScript executes synchronous code on the call stack.
2. Asynchronous operations are handled by browser or runtime APIs.
3. When callbacks become eligible, they are placed in appropriate queues.
4. The event loop coordinates when queued work can execute.
5. Microtasks are processed before the next task begins, subject to the event-loop rules.

### Example

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timer");
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
Timer
```

Why?

1. `"Start"` executes synchronously.
2. Timer callback is scheduled as a task.
3. Promise callback is scheduled as a microtask.
4. `"End"` executes synchronously.
5. The microtask queue is processed.
6. The timer task executes afterward.

**Important:** `setTimeout(..., 0)` does not mean the callback executes immediately.

---

# 20. Microtask Queue vs Macrotask Queue

JavaScript uses different queues to manage scheduled work.

The term **macrotask queue** is commonly used informally for the task queue.

### Microtasks

Examples:
- Promise `.then()` callbacks.
- Promise `.catch()` callbacks.
- Promise `.finally()` callbacks.
- `queueMicrotask()` callbacks.
- MutationObserver callbacks.

### Tasks (Often Called Macrotasks)

Examples:
- `setTimeout()` callbacks.
- `setInterval()` callbacks.
- DOM event callbacks.
- Some browser event callbacks.

### Difference

| Microtask Queue | Task Queue |
|---|---|
| Stores microtasks | Stores tasks |
| Processed after the current task and before the next task | Processes tasks one at a time |
| Promise callbacks are common examples | Timer callbacks are common examples |
| Usually has higher scheduling priority | Runs after microtask processing |

### Example

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

### Another Important Example

```javascript
console.log("Start");

setTimeout(() => {
    console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise 1");

    Promise.resolve().then(() => {
        console.log("Promise 2");
    });
});

setTimeout(() => {
    console.log("Timeout 2");
}, 0);

console.log("End");
```

Output:

```text
Start
End
Promise 1
Promise 2
Timeout 1
Timeout 2
```

Why?

- Synchronous code executes first.
- Promise callbacks are processed as microtasks.
- The nested Promise creates another microtask.
- The timer callbacks execute as tasks afterward.

**Important:** Excessive microtask scheduling can delay other tasks, including rendering and user interactions.

---

# 21. setTimeout()

`setTimeout()` schedules a callback to execute after a specified delay.

Syntax:

```javascript
setTimeout(callback, delay);
```

Example:

```javascript
setTimeout(() => {
    console.log("Hello");
}, 2000);
```

The callback becomes eligible after approximately two seconds.

### Passing Arguments

```javascript
function greet(name) {
    console.log("Hello " + name);
}

setTimeout(greet, 2000, "Riyaz");
```

Output after approximately two seconds:

```text
Hello Riyaz
```

### Clearing Timeout

```javascript
const timer = setTimeout(() => {
    console.log("Hello");
}, 5000);

clearTimeout(timer);
```

The callback is cancelled before execution.

---

# 22. setInterval()

`setInterval()` schedules a callback to execute repeatedly at approximately specified intervals.

Syntax:

```javascript
setInterval(callback, delay);
```

Example:

```javascript
setInterval(() => {
    console.log("Hello");
}, 2000);
```

The callback runs repeatedly, approximately every two seconds, while the interval remains active.

### Clearing Interval

```javascript
const interval = setInterval(() => {
    console.log("Hello");
}, 2000);

clearInterval(interval);
```

### Difference Between setTimeout() and setInterval()

| `setTimeout()` | `setInterval()` |
|---|---|
| Executes callback once | Repeats callback |
| Schedules one execution | Schedules repeated executions |
| Use `clearTimeout()` to cancel | Use `clearInterval()` to cancel |

### Practical Example: Countdown

```javascript
let count = 5;

const interval = setInterval(() => {

    console.log(count);

    count--;

    if (count < 0) {

        clearInterval(interval);

        console.log("Time Up!");

    }

}, 1000);
```

Output:

```text
5
4
3
2
1
0
Time Up!
```

---

# 23. Fetch API

The Fetch API is used to make HTTP requests from JavaScript.

It is commonly used to communicate with backend APIs.

### Basic Syntax

```javascript
fetch(url);
```

`fetch()` returns a Promise that fulfills with a `Response` object when the response is available.

### Example: GET Request

```javascript
fetch("https://jsonplaceholder.typicode.com/users")

    .then((response) => {
        return response.json();
    })

    .then((data) => {
        console.log(data);
    })

    .catch((error) => {
        console.log(error);
    });
```

### Explanation

1. `fetch()` sends an HTTP request.
2. It returns a Promise.
3. The Promise fulfills with a `Response` object.
4. `response.json()` reads and parses the response body as JSON.
5. It returns another Promise.
6. The final `.then()` receives the parsed data.

### Using async/await

```javascript
async function getUsers() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log("Error:", error);

    }

}

getUsers();
```

### Important: HTTP Error Handling

One common mistake is assuming `fetch()` rejects automatically for HTTP errors such as:

- 404 Not Found.
- 500 Internal Server Error.
- 403 Forbidden.

It generally does not reject for these HTTP status codes.

You should check `response.ok`.

```javascript
async function getUsers() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log(error.message);

    }

}

getUsers();
```

### Important Response Properties

| Property | Description |
|---|---|
| `response.ok` | Indicates whether status is in the 200–299 range |
| `response.status` | HTTP status code |
| `response.statusText` | HTTP status message |
| `response.headers` | Response headers |
| `response.url` | Final response URL |

### Important Response Methods

| Method | Description |
|---|---|
| `response.json()` | Parses JSON response body |
| `response.text()` | Reads body as text |
| `response.blob()` | Reads body as Blob |
| `response.arrayBuffer()` | Reads body as ArrayBuffer |
| `response.formData()` | Reads body as FormData |
| `response.clone()` | Creates a clone of the response |

**Important:** A response body is generally consumable only once. Use `response.clone()` if you need to read it more than once.

---

# 24. HTTP Requests and Responses

HTTP stands for **Hypertext Transfer Protocol**.

It is a protocol used for communication between clients and servers.

### Request Flow

```text
        Client
      (Browser)
          |
          |
      HTTP Request
          |
          v
        Server
          |
          |
     Process Request
          |
          v
     HTTP Response
          |
          v
        Client
      (Browser)
```

### Common HTTP Methods

| Method | Purpose |
|---|---|
| GET | Retrieve data |
| POST | Submit or create data |
| PUT | Replace a resource |
| PATCH | Partially update a resource |
| DELETE | Delete a resource |

### GET Request

```javascript
fetch("/api/users");
```

### POST Request

```javascript
async function createUser() {

    const response = await fetch("/api/users", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: "Riyaz",
            email: "riyaz@example.com"
        })

    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);

}
```

### Important Request Options

| Option | Description |
|---|---|
| `method` | HTTP method |
| `headers` | Request headers |
| `body` | Request payload |
| `mode` | Request mode, including CORS behavior |
| `credentials` | Controls credential handling |
| `signal` | Allows cancellation using AbortController |

### Common HTTP Status Codes

| Status | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 301 | Moved Permanently |
| 302 | Found |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |

---

# 25. AbortController

`AbortController` is a browser API that allows you to cancel certain asynchronous operations, including Fetch requests.

### Example

```javascript
const controller = new AbortController();

fetch("https://jsonplaceholder.typicode.com/users", {

    signal: controller.signal

})
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => {
    console.log(error.name);
});
```

Cancel the request:

```javascript
controller.abort();
```

The Fetch request rejects with an `AbortError`.

### Complete Example

```javascript
async function getUsers() {

    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 3000);

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users",
            {
                signal: controller.signal
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        if (error.name === "AbortError") {
            console.log("Request cancelled");
        } else {
            console.log(error.message);
        }

    } finally {

        clearTimeout(timeout);

    }

}

getUsers();
```

Here, the request is cancelled if it has not completed within approximately three seconds.

---

# 26. Important Asynchronous JavaScript Concepts – Quick Reference

| Concept | Description |
|---|---|
| Synchronous | Executes sequentially |
| Asynchronous | Allows operations to complete later |
| Blocking | Prevents further execution on the same thread |
| Non-blocking | Allows other code to continue |
| Call Stack | Tracks function execution |
| Web APIs | Browser-provided functionality |
| Callback | Function passed to another function |
| Callback Hell | Deeply nested callbacks |
| Promise | Represents eventual success or failure |
| `resolve()` | Fulfills a Promise |
| `reject()` | Rejects a Promise |
| `.then()` | Handles fulfillment |
| `.catch()` | Handles rejection |
| `.finally()` | Runs after settlement |
| Promise Chaining | Connects asynchronous operations |
| `async` | Declares an async function |
| `await` | Waits for a Promise inside an async function |
| Event Loop | Coordinates queued work |
| Microtask Queue | Holds microtasks |
| Task Queue | Holds tasks |
| `setTimeout()` | Schedules one callback |
| `setInterval()` | Schedules repeated callbacks |
| Fetch API | Makes HTTP requests |
| AbortController | Cancels supported operations |

---

# 27. Interview Questions

### Basic Questions

1. What is synchronous JavaScript?
2. What is asynchronous JavaScript?
3. What is the difference between blocking and non-blocking code?
4. Is JavaScript single-threaded?
5. What is a JavaScript runtime environment?
6. What is the call stack?
7. What are Web APIs?
8. What is a callback function?
9. What is callback hell?
10. What is a Promise?

### Intermediate Questions

11. What are the three states of a Promise?
12. What is the difference between `resolve()` and `reject()`?
13. What is the difference between `.then()` and `.catch()`?
14. What is `.finally()`?
15. What is Promise chaining?
16. What is the difference between `Promise.all()` and `Promise.allSettled()`?
17. What is the difference between `Promise.race()` and `Promise.any()`?
18. What is async/await?
19. Does an async function always return a Promise?
20. What happens when you use `await`?
21. How do you handle errors in async/await?
22. What is the Event Loop?
23. What is the Microtask Queue?
24. What is the difference between the Microtask Queue and Task Queue?

### Advanced Questions

25. What is the execution order of synchronous code, Promises, and timers?
26. Why does `setTimeout(callback, 0)` not execute immediately?
27. What happens when a Promise is returned from a `.then()` callback?
28. Does `Promise.all()` execute Promises in parallel?
29. What happens if one Promise rejects inside `Promise.all()`?
30. What is the difference between concurrency and parallelism?
31. How does Fetch API work?
32. Does Fetch reject when the server returns a 404 response?
33. What is the difference between `response.json()` and `response.text()`?
34. What is HTTP?
35. What is the difference between PUT and PATCH?
36. What is AbortController?
37. Can `try...catch` catch errors from asynchronous callbacks?
38. Can JavaScript perform parallel execution?

---

# 28. Practical Exercises

Try to solve these without looking at the solutions.

| No. | Exercise | Concepts |
|---|---|---|
| 1 | Print messages using setTimeout | Timers |
| 2 | Build a countdown timer | setInterval |
| 3 | Stop a timer using clearInterval | Timer Management |
| 4 | Create a Promise that resolves after 2 seconds | Promise |
| 5 | Create a Promise that rejects with an error | Promise Error Handling |
| 6 | Implement Promise chaining | Promise Chaining |
| 7 | Fetch user data from an API | Fetch API |
| 8 | Fetch multiple APIs using Promise.all | Promise.all |
| 9 | Fetch multiple APIs using Promise.allSettled | Promise.allSettled |
| 10 | Compare Promise.race and Promise.any | Promise Methods |
| 11 | Convert `.then()` code into async/await | Async/Await |
| 12 | Handle errors using try...catch | Error Handling |
| 13 | Build a simple API-based user list | Fetch + DOM |
| 14 | Build a search feature with API requests | Fetch + Events |
| 15 | Cancel an API request using AbortController | AbortController |
| 16 | Predict the output of Event Loop examples | Event Loop |

---

# 29. Important Output-Based Questions

These are especially useful for JavaScript interviews.

### Question 1

```javascript
console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");
```

**Output:**

```text
A
C
B
```

### Question 2

```javascript
console.log("A");

Promise.resolve().then(() => {
    console.log("B");
});

console.log("C");
```

**Output:**

```text
A
C
B
```

### Question 3

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

**Output:**

```text
A
D
C
B
```

### Question 4

```javascript
async function test() {

    console.log("A");

    await Promise.resolve();

    console.log("B");

}

console.log("C");

test();

console.log("D");
```

**Output:**

```text
C
A
D
B
```

### Question 5

```javascript
Promise.resolve()
    .then(() => {
        console.log("A");
    })
    .then(() => {
        console.log("B");
    });

Promise.resolve().then(() => {
    console.log("C");
});

console.log("D");
```

**Output:**

```text
D
A
C
B
```

Understanding these execution orders is essential for mastering the Event Loop.

---

# 30. Official Documentation

1. [MDN – Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS?utm_source=chatgpt.com)
2. [MDN – Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise?utm_source=chatgpt.com)
3. [MDN – async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function?utm_source=chatgpt.com)
4. [MDN – await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await?utm_source=chatgpt.com)
5. [MDN – Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop?utm_source=chatgpt.com)
6. [MDN – Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API?utm_source=chatgpt.com)
7. [MDN – AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController?utm_source=chatgpt.com)

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
| Phase 8 | Modern JavaScript (ES6+) | Next |
| Phase 9 | Advanced JavaScript | Upcoming |
| Phase 10 | JavaScript Modules & Tooling | Upcoming |
| Phase 11 | JavaScript Projects & Interview Preparation | Upcoming |

## Next: Phase 8 – Modern JavaScript (ES6+)

Topics will include:

1. What is ECMAScript?
2. What is ES6?
3. `var`, `let`, and `const` revision.
4. Template Literals.
5. Arrow Functions.
6. Default Parameters.
7. Rest Parameters.
8. Spread Operator.
9. Destructuring – Arrays.
10. Destructuring – Objects.
11. Enhanced Object Literals.
12. Computed Property Names.
13. Optional Chaining (`?.`).
14. Nullish Coalescing (`??`).
15. Short-Circuit Evaluation.
16. Object and Array Methods.
17. `for...of` vs `for...in`.
18. Map.
19. Set.
20. WeakMap.
21. WeakSet.
22. Symbols.
23. Iterators.
24. Generators.
25. BigInt.
26. Dynamic Import.

**Recommendation:** Before moving to Phase 8, build a small application that fetches users from an API, displays them in the DOM, handles loading and error states, and supports cancelling an API request. This will reinforce Promises, async/await, Fetch, and DOM manipulation.