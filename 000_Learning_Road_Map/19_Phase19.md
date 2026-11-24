# JavaScript Revision Notes – Phase 19
# JavaScript Real-World Application Development

In this phase, we will move from individual JavaScript concepts to building real-world applications.

You have already covered JavaScript fundamentals, asynchronous programming, DOM, APIs, runtime internals, advanced concepts, and problem-solving patterns.

Now we will learn how to combine those concepts to build maintainable applications.

We will use practical examples relevant to React, Next.js, Node.js, and Express development.

---

# 1. Understanding Real-World Application Architecture

A real-world application usually contains multiple layers.

For example, consider an Expense Tracker application.

It might contain:

```text
Expense Tracker
│
├── Frontend
│   ├── Dashboard
│   ├── Add Expense Form
│   ├── Expense List
│   └── Reports
│
├── Backend
│   ├── Authentication
│   ├── Expense APIs
│   ├── User APIs
│   └── Report APIs
│
├── Database
│   ├── Users
│   └── Expenses
│
└── Utilities
    ├── Validation
    ├── Formatting
    └── Error Handling
```

### Application request flow

Suppose a user wants to add an expense.

```text
User
 |
 | Fills Expense Form
 |
Frontend
 |
 | Sends HTTP Request
 |
Backend API
 |
 | Validates Request
 |
Business Logic
 |
 | Saves Expense
 |
Database
 |
 | Returns Result
 |
Backend API
 |
 | Sends JSON Response
 |
Frontend
 |
 | Updates UI
 |
User sees new expense
```

### Important concepts

| Layer | Responsibility |
|---|---|
| UI Layer | Displays information |
| Application Layer | Coordinates application operations |
| Business Logic Layer | Implements application rules |
| Data Access Layer | Communicates with the database |
| Database Layer | Stores persistent information |

Separating responsibilities makes applications easier to maintain and test.

---

# 2. Working with APIs in Real Projects

An API allows different applications or components to communicate.

For example:

```text
React Application → Express API → MongoDB
```

The frontend sends an HTTP request, and the backend returns a response.

## 2.1 Fetch API

JavaScript provides the built-in `fetch()` method.

### GET request

```javascript
async function getUsers() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const users = await response.json();

        console.log(users);

        return users;

    } catch (error) {

        console.error("Failed to fetch users:", error);

    }

}

getUsers();
```

### Important: Why check `response.ok`?

A common mistake is assuming that `fetch()` automatically rejects when the server returns an HTTP error.

It does not.

For example:

```javascript
const response = await fetch("/api/users");
```

Even if the server returns:

```text
404 Not Found
```

The fetch Promise normally fulfills with a Response object.

Therefore, check:

```javascript
if (!response.ok) {
    throw new Error("Request failed");
}
```

## 2.2 POST request

Suppose you want to create a user.

```javascript
async function createUser(userData) {

    try {

        const response = await fetch("/api/users", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(userData)

        });

        if (!response.ok) {
            throw new Error("Failed to create user");
        }

        const result = await response.json();

        return result;

    } catch (error) {

        console.error(error);

    }

}

createUser({
    name: "Riyaz",
    email: "riyaz@example.com"
});
```

### Common HTTP methods

| Method | Purpose | Example |
|---|---|---|
| GET | Retrieve data | Get users |
| POST | Create data | Create user |
| PUT | Replace a resource | Replace user details |
| PATCH | Partially update data | Update user email |
| DELETE | Delete data | Delete user |

### PUT vs PATCH

PUT generally replaces the resource representation.

PATCH applies a partial modification.

Example:

Existing user:

```javascript
{
    name: "Riyaz",
    email: "riyaz@example.com",
    age: 25
}
```

PATCH request:

```javascript
{
    age: 26
}
```

Only the age needs to change.

---

# 3. Creating a Reusable API Service

In real projects, you should avoid writing the same fetch logic repeatedly.

Instead, create a reusable API utility.

### api.js

```javascript
const BASE_URL = "https://api.example.com";

async function apiRequest(endpoint, options = {}) {

    try {

        const response = await fetch(
            `${BASE_URL}${endpoint}`,
            {
                ...options,

                headers: {
                    "Content-Type": "application/json",
                    ...options.headers
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        if (response.status === 204) {
            return null;
        }

        return await response.json();

    } catch (error) {

        console.error("API Error:", error);

        throw error;

    }

}

export default apiRequest;
```

Usage:

```javascript
import apiRequest from "./api.js";

// GET
const users = await apiRequest("/users");

// POST
const newUser = await apiRequest("/users", {

    method: "POST",

    body: JSON.stringify({
        name: "Riyaz"
    })

});

// DELETE
await apiRequest("/users/10", {
    method: "DELETE"
});
```

Now all API requests use a common implementation.

**Note:** This is a starting point. Production API clients may also need authentication handling, request timeouts, response parsing based on content type, retry policies, and cancellation.

---

# 4. Handling API Errors

Real applications must handle different types of errors.

### Common error categories

| Error | Meaning |
|---|---|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

### Example

```javascript
async function getUser(id) {

    try {

        const response = await fetch(`/api/users/${id}`);

        if (response.status === 404) {
            throw new Error("User not found");
        }

        if (response.status === 401) {
            throw new Error("Please log in");
        }

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        return await response.json();

    } catch (error) {

        console.error(error.message);

        throw error;

    }

}
```

### Custom Error Classes

JavaScript allows you to create custom errors.

```javascript
class ApiError extends Error {

    constructor(message, statusCode) {

        super(message);

        this.name = "ApiError";

        this.statusCode = statusCode;

    }

}
```

Usage:

```javascript
async function getUser(id) {

    const response = await fetch(`/api/users/${id}`);

    if (!response.ok) {

        throw new ApiError(
            "Unable to fetch user",
            response.status
        );

    }

    return response.json();

}
```

Handling:

```javascript
try {

    const user = await getUser(10);

    console.log(user);

} catch (error) {

    if (error instanceof ApiError) {

        console.log(error.statusCode);

        console.log(error.message);

    } else {

        console.log("Unexpected error");

    }

}
```

This makes error handling more organized.

---

# 5. Application State Management

State represents the data that an application needs to remember while it runs.

For example, an Expense Tracker might maintain:

```javascript
const state = {

    user: null,

    expenses: [],

    loading: false,

    error: null,

    filters: {
        category: "all",
        search: ""
    }

};
```

### Types of application state

| State Type | Example |
|---|---|
| Local State | Input field value |
| Global State | Logged-in user |
| Server State | Expenses fetched from API |
| URL State | Search query or page number |
| Persistent State | Theme preference in localStorage |

### Why is state management important?

Suppose the user adds a new expense.

The application needs to update:

- Expense list.
- Total expenses.
- Category totals.
- Dashboard statistics.

If different components maintain unrelated copies of the same data, inconsistencies can occur.

Centralized or well-organized state helps maintain consistency.

## 5.1 Simple State Management Using JavaScript

```javascript
function createStore(initialState) {

    let state = initialState;

    const listeners = [];

    function getState() {
        return state;
    }

    function setState(newState) {

        state = {
            ...state,
            ...newState
        };

        listeners.forEach(listener => listener(state));

    }

    function subscribe(listener) {

        listeners.push(listener);

        return function unsubscribe() {

            const index = listeners.indexOf(listener);

            if (index !== -1) {
                listeners.splice(index, 1);
            }

        };

    }

    return {
        getState,
        setState,
        subscribe
    };

}
```

Usage:

```javascript
const store = createStore({

    count: 0,

    user: null

});

const unsubscribe = store.subscribe(state => {

    console.log("State updated:", state);

});

store.setState({
    count: 10
});

store.setState({
    user: {
        name: "Riyaz"
    }
});

unsubscribe();
```

This is a simple demonstration of a store.

It is not a complete production state-management library.

---

# 6. Form Handling

Forms are essential in real-world applications.

Examples:

- Login form.
- Registration form.
- Contact form.
- Expense form.
- Product form.
- Profile update form.

### HTML

```html
<form id="userForm">

    <input
        type="text"
        id="name"
        placeholder="Enter name"
    >

    <input
        type="email"
        id="email"
        placeholder="Enter email"
    >

    <button type="submit">
        Submit
    </button>

</form>
```

### JavaScript

```javascript
const form = document.querySelector("#userForm");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.querySelector("#name").value;

    const email = document.querySelector("#email").value;

    console.log({
        name,
        email
    });

});
```

### Why use `preventDefault()`?

Normally, submitting an HTML form can trigger browser navigation or a page reload.

```javascript
event.preventDefault();
```

Prevents the default submission behavior so JavaScript can handle the submission.

---

# 7. Form Validation

Validation ensures that users provide valid data.

There are two important types:

1. Client-side validation.
2. Server-side validation.

### Client-side validation

```javascript
function validateUser(user) {

    const errors = {};

    if (!user.name.trim()) {

        errors.name = "Name is required";

    }

    if (!user.email.trim()) {

        errors.email = "Email is required";

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {

        errors.email = "Invalid email address";

    }

    if (!Number.isInteger(user.age) || user.age < 18) {

        errors.age = "Age must be at least 18";

    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };

}
```

Usage:

```javascript
const user = {

    name: "Riyaz",

    email: "riyaz@example.com",

    age: 25

};

const result = validateUser(user);

console.log(result);
```

Output:

```javascript
{
    isValid: true,
    errors: {}
}
```

### Client-side vs Server-side validation

| Client-side | Server-side |
|---|---|
| Runs in browser | Runs on backend |
| Improves user experience | Protects application integrity |
| Can be bypassed | Must always be enforced |
| Provides immediate feedback | Validates trusted business rules |

**Important:** Never trust client-side validation alone. Always validate incoming data on the server.

---

# 8. Working with JSON

JSON stands for JavaScript Object Notation.

It is a text-based format used for data exchange.

### JavaScript object

```javascript
const user = {

    name: "Riyaz",

    age: 25,

    skills: ["React", "Node.js"]

};
```

### Convert object into JSON

```javascript
const jsonData = JSON.stringify(user);

console.log(jsonData);
```

Output:

```json
{
    "name": "Riyaz",
    "age": 25,
    "skills": ["React", "Node.js"]
}
```

### Convert JSON into JavaScript object

```javascript
const parsedData = JSON.parse(jsonData);

console.log(parsedData.name);
```

Output:

```text
Riyaz
```

### Important difference

| JSON | JavaScript Object |
|---|---|
| Text format | JavaScript data structure |
| Keys must be double-quoted strings | Keys can often be unquoted identifiers |
| Cannot directly represent functions | Can contain functions |
| Cannot directly represent `undefined` | Can contain `undefined` |
| Used for data exchange | Used in application logic |

### Important JSON limitations

`JSON.stringify()` does not preserve every JavaScript value.

For example:

```javascript
const user = {

    name: "Riyaz",

    age: undefined,

    greet() {
        console.log("Hello");
    }

};

console.log(JSON.stringify(user));
```

Output:

```json
{
    "name": "Riyaz"
}
```

The function and the `undefined` object property are omitted.

---

# 9. Working with localStorage and sessionStorage

Browsers provide Web Storage APIs for storing simple key-value data.

## localStorage

Data remains available across browser sessions until it is removed or cleared.

```javascript
localStorage.setItem("username", "Riyaz");

const username = localStorage.getItem("username");

console.log(username);

localStorage.removeItem("username");
```

## sessionStorage

Data is associated with the current page session and normally disappears when that tab or window's session ends.

```javascript
sessionStorage.setItem("theme", "dark");

console.log(sessionStorage.getItem("theme"));
```

### Storing objects

Web Storage stores strings.

Therefore, use JSON serialization for objects.

```javascript
const user = {

    name: "Riyaz",

    age: 25

};

localStorage.setItem("user", JSON.stringify(user));
```

Retrieving:

```javascript
const storedUser = JSON.parse(
    localStorage.getItem("user")
);

console.log(storedUser.name);
```

### Comparison

| Feature | localStorage | sessionStorage |
|---|---|---|
| Storage duration | Until removed | Page session |
| Browser reload | Data remains | Data remains |
| New tab | Separate storage context | Separate page session |
| Stores | Strings | Strings |
| Capacity | Browser-dependent | Browser-dependent |

### Important security note

Do not store sensitive authentication credentials or secrets in localStorage without understanding the risks.

JavaScript running through an XSS vulnerability can access localStorage.

---

# 10. Cookies

Cookies are small pieces of data stored by the browser and can be sent automatically with matching HTTP requests.

They are commonly used for authentication and session management.

### Creating a cookie using JavaScript

```javascript
document.cookie = "username=Riyaz; path=/";
```

### Setting expiration

```javascript
document.cookie =
    "theme=dark; max-age=3600; path=/";
```

### Reading cookies

```javascript
console.log(document.cookie);
```

### Cookies vs localStorage

| Feature | Cookies | localStorage |
|---|---|---|
| Automatically sent with matching HTTP requests | Yes | No |
| JavaScript access | Depends on flags | Yes |
| Expiration | Configurable | Generally persists until removed |
| Typical use | Sessions and authentication | Preferences and simple client data |
| Storage size | Small | Larger, browser-dependent |

### Important authentication concept

A server can set an authentication cookie with:

```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax
```

Important attributes:

- `HttpOnly`: Prevents JavaScript from reading the cookie.
- `Secure`: Sends the cookie only over secure HTTPS connections.
- `SameSite`: Controls cross-site cookie behavior.

JavaScript cannot create or read an `HttpOnly` cookie.

**Remember:** Cookie-based authentication still requires careful CSRF protection, appropriate SameSite configuration, and secure server-side session handling.

---

# 11. Authentication Flow

Authentication verifies who a user is.

Authorization determines what an authenticated user is allowed to do.

### Authentication example

Suppose a user logs into an application.

```text
User
 |
 | Email + Password
 |
Frontend
 |
 | POST /api/login
 |
Backend
 |
 | Verify Credentials
 |
Database
 |
 | User Found
 |
Backend
 |
 | Create Session
 |
Browser receives session cookie
 |
User is authenticated
```

### Basic login request

```javascript
async function login(email, password) {

    const response = await fetch("/api/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        credentials: "include",

        body: JSON.stringify({
            email,
            password
        })

    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.json();

}
```

`credentials: "include"` tells fetch to include credentials such as cookies in cross-origin requests, subject to browser cookie and CORS policies. For same-origin requests, credentials are included by default.

### Fetch authenticated user

```javascript
async function getProfile() {

    const response = await fetch("/api/profile", {

        credentials: "include"

    });

    if (!response.ok) {
        throw new Error("Unable to fetch profile");
    }

    return response.json();

}
```

### Important authentication concepts

| Concept | Meaning |
|---|---|
| Authentication | Verifies identity |
| Authorization | Checks permissions |
| Session | Server-managed login state |
| JWT | Signed token format |
| Access Token | Credential used to access resources |
| Refresh Token | Used to obtain new access tokens |
| Password Hashing | Securely stores password-derived values |

### Important security practices

1. Never store plain-text passwords.
2. Use a secure password hashing algorithm such as Argon2id or bcrypt.
3. Use HTTPS.
4. Validate credentials on the server.
5. Protect sensitive endpoints.
6. Use secure cookie settings.
7. Implement appropriate CSRF and XSS defenses.
8. Apply rate limiting to login endpoints.

---

# 12. Pagination

Pagination divides a large dataset into smaller parts.

Suppose your database contains 10,000 users.

Loading all users at once is usually inefficient.

Instead, fetch 10 or 20 records per request.

### Offset-based pagination

API request:

```text
GET /api/users?page=2&limit=10
```

Calculation:

```javascript
const page = 2;

const limit = 10;

const offset = (page - 1) * limit;

console.log(offset); // 10
```

SQL example:

```sql
SELECT *
FROM users
LIMIT 10 OFFSET 10;
```

### Pagination response

```javascript
{
    data: [
        { id: 11, name: "User 11" },
        { id: 12, name: "User 12" }
    ],

    pagination: {
        currentPage: 2,
        limit: 10,
        totalRecords: 100,
        totalPages: 10
    }
}
```

### Frontend pagination

```javascript
async function getUsers(page, limit) {

    const response = await fetch(
        `/api/users?page=${page}&limit=${limit}`
    );

    if (!response.ok) {
        throw new Error("Unable to fetch users");
    }

    return response.json();

}
```

### Offset vs Cursor Pagination

| Offset Pagination | Cursor Pagination |
|---|---|
| Uses page and offset | Uses a cursor |
| Easy to implement | More complex |
| Can become inefficient for large offsets | Often performs better for large datasets |
| Can be affected by inserted or deleted rows between requests | Can provide more stable sequential traversal |

Cursor pagination is particularly useful for large feeds and continuously changing datasets.

---

# 13. Searching, Filtering and Sorting

These operations are common in almost every application.

Suppose we have this dataset:

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
    },

    {
        id: 4,
        name: "Table",
        price: 10000,
        category: "Furniture"
    }

];
```

## Searching

```javascript
function searchProducts(products, search) {

    return products.filter(product =>

        product.name
            .toLowerCase()
            .includes(search.toLowerCase())

    );

}

console.log(searchProducts(products, "lap"));
```

## Filtering

```javascript
function filterByCategory(products, category) {

    return products.filter(product =>

        product.category === category

    );

}

console.log(filterByCategory(products, "Electronics"));
```

## Sorting

```javascript
function sortByPrice(products) {

    return [...products].sort((a, b) =>

        a.price - b.price

    );

}

console.log(sortByPrice(products));
```

Notice:

```javascript
[...products]
```

We create a shallow copy before sorting because `sort()` mutates the original array.

### Descending order

```javascript
const descending = [...products].sort(
    (a, b) => b.price - a.price
);
```

### Combining all operations

```javascript
function getProducts(products, options = {}) {

    const {
        search = "",
        category = "all",
        sort = "asc"
    } = options;

    let result = [...products];

    // Search
    if (search) {

        result = result.filter(product =>

            product.name
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }

    // Filter
    if (category !== "all") {

        result = result.filter(product =>

            product.category === category

        );

    }

    // Sort
    result.sort((a, b) => {

        return sort === "desc"
            ? b.price - a.price
            : a.price - b.price;

    });

    return result;

}

console.log(
    getProducts(products, {
        search: "",
        category: "Electronics",
        sort: "desc"
    })
);
```

This is a reusable data-processing function.

---

# 14. File Handling in JavaScript

File handling depends on the environment.

Browser JavaScript and Node.js provide different APIs.

## 14.1 Browser File API

Suppose a user uploads a file.

HTML:

```html
<input type="file" id="fileInput">
```

JavaScript:

```javascript
const fileInput = document.querySelector("#fileInput");

fileInput.addEventListener("change", function (event) {

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    console.log(file.name);

    console.log(file.size);

    console.log(file.type);

});
```

### Read a text file

```javascript
const fileInput = document.querySelector("#fileInput");

fileInput.addEventListener("change", async function (event) {

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    const content = await file.text();

    console.log(content);

});
```

### FileReader

You can also use the FileReader API.

```javascript
const reader = new FileReader();

reader.onload = function (event) {

    console.log(event.target.result);

};

reader.readAsText(file);
```

## 14.2 Node.js File Handling

Node.js provides the `fs` module.

### Read a file

```javascript
const fs = require("fs");

const content = fs.readFileSync(
    "data.txt",
    "utf-8"
);

console.log(content);
```

### Asynchronous file reading

```javascript
const fs = require("fs/promises");

async function readFile() {

    try {

        const content = await fs.readFile(
            "data.txt",
            "utf-8"
        );

        console.log(content);

    } catch (error) {

        console.error(error);

    }

}

readFile();
```

### Write a file

```javascript
const fs = require("fs/promises");

async function writeFile() {

    await fs.writeFile(
        "output.txt",
        "Hello JavaScript"
    );

}

writeFile();
```

### Browser vs Node.js file handling

| Browser | Node.js |
|---|---|
| File API | `fs` module |
| User-selected files | Server/local filesystem |
| Cannot freely access arbitrary local files | Can access files permitted by OS permissions |
| `FileReader`, `Blob` | `readFile()`, `writeFile()` |

---

# 15. Reusable Utility Functions

In real applications, you frequently need common functions.

Instead of repeating the same logic, create utility modules.

Example folder structure:

```text
src/
│
├── utils/
│   ├── formatDate.js
│   ├── formatCurrency.js
│   ├── validateEmail.js
│   ├── debounce.js
│   └── capitalize.js
│
├── services/
│   └── api.js
│
├── components/
│
└── app.js
```

### formatCurrency.js

```javascript
export function formatCurrency(amount) {

    return new Intl.NumberFormat("en-IN", {

        style: "currency",

        currency: "INR"

    }).format(amount);

}
```

Usage:

```javascript
import { formatCurrency } from "./utils/formatCurrency.js";

console.log(formatCurrency(50000));
```

Output:

```text
₹50,000.00
```

### capitalize.js

```javascript
export function capitalize(text) {

    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);

}
```

### validateEmail.js

```javascript
export function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}
```

### Why create utility functions?

- Avoid duplicate code.
- Improve readability.
- Simplify testing.
- Make maintenance easier.
- Encourage code reuse.

---

# 16. Environment Variables and Configuration

Applications often need configuration values.

Examples:

- API base URL.
- Database connection string.
- Application port.
- Third-party API keys.
- Environment mode.

Instead of hardcoding these values, use environment variables.

### Node.js example

`.env`

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/expense_tracker
NODE_ENV=development
```

Using Node.js:

```javascript
console.log(process.env.PORT);

console.log(process.env.NODE_ENV);
```

In modern Node.js, environment files can also be loaded using the built-in `--env-file` option, or through packages such as `dotenv`.

Example:

```bash
node --env-file=.env server.js
```

### Important distinction

Frontend and backend environment variables are not equally private.

In Next.js:

```env
DATABASE_PASSWORD=secret
NEXT_PUBLIC_API_URL=https://example.com
```

- `DATABASE_PASSWORD` must remain server-side.
- `NEXT_PUBLIC_API_URL` is exposed to the browser bundle.

Never expose database passwords, private API keys, or server secrets through public frontend environment variables.

---

# 17. AbortController – Cancelling API Requests

Sometimes a request becomes unnecessary.

For example:

A user searches for:

```text
Java
```

Then immediately changes the search to:

```text
JavaScript
```

The first request may still be running.

You can cancel it using `AbortController`.

### Example

```javascript
const controller = new AbortController();

async function getUsers() {

    try {

        const response = await fetch("/api/users", {

            signal: controller.signal

        });

        const users = await response.json();

        console.log(users);

    } catch (error) {

        if (error.name === "AbortError") {

            console.log("Request cancelled");

        } else {

            console.error(error);

        }

    }

}

getUsers();

// Cancel request
controller.abort();
```

### Real-world search example

```javascript
let controller;

async function searchUsers(query) {

    if (controller) {
        controller.abort();
    }

    controller = new AbortController();

    try {

        const response = await fetch(
            `/api/users?search=${encodeURIComponent(query)}`,
            {
                signal: controller.signal
            }
        );

        if (!response.ok) {
            throw new Error("Search failed");
        }

        return await response.json();

    } catch (error) {

        if (error.name !== "AbortError") {
            console.error(error);
        }

    }

}
```

This prevents older requests from unnecessarily continuing when a newer search supersedes them.

---

# 18. Error Handling Strategy in Real Applications

A production application should have a consistent error-handling strategy.

### Example structure

```text
Application
│
├── API Errors
│   ├── Network Errors
│   ├── HTTP Errors
│   └── Timeout Errors
│
├── Validation Errors
│
├── Authentication Errors
│
├── Authorization Errors
│
└── Unexpected Errors
```

### A reusable error handler

```javascript
function handleError(error) {

    if (error.name === "AbortError") {

        console.log("Request cancelled");

    } else if (error instanceof TypeError) {

        console.log("Possible network error");

    } else {

        console.log("Unexpected error:", error.message);

    }

}
```

**Important:** Browser fetch network failures commonly appear as `TypeError`, but not every `TypeError` necessarily means a network failure. Avoid relying only on error names to classify all errors.

### Production recommendations

1. Log detailed errors on the server.
2. Return safe error messages to clients.
3. Do not expose stack traces to users.
4. Use consistent error response structures.
5. Handle network failures.
6. Handle authentication failures.
7. Validate all external input.
8. Monitor unexpected application errors.

---

# 19. Practical Project – Expense Tracker

Now let's combine these concepts into a small application.

We will create an Expense Tracker using:

- HTML
- CSS
- JavaScript
- localStorage
- DOM manipulation
- Array methods
- Form validation
- Reusable functions

No backend or API is required for this exercise.

## 19.1 Project structure

```text
expense-tracker/
│
├── index.html
├── style.css
│
└── js/
    ├── app.js
    ├── storage.js
    ├── validation.js
    └── utils.js
```

## 19.2 index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Expense Tracker</title>

    <link rel="stylesheet" href="style.css">

</head>

<body>

    <h1>Expense Tracker</h1>

    <form id="expenseForm">

        <input
            type="text"
            id="title"
            placeholder="Expense title"
            required
        >

        <input
            type="number"
            id="amount"
            placeholder="Amount"
            min="0.01"
            step="0.01"
            required
        >

        <select id="category">

            <option value="">Select Category</option>

            <option value="Food">Food</option>

            <option value="Travel">Travel</option>

            <option value="Shopping">Shopping</option>

            <option value="Other">Other</option>

        </select>

        <button type="submit">
            Add Expense
        </button>

    </form>

    <h2>Total: <span id="total">₹0.00</span></h2>

    <ul id="expenseList"></ul>

    <script type="module" src="js/app.js"></script>

</body>

</html>
```

## 19.3 storage.js

```javascript
const STORAGE_KEY = "expenses";

export function getExpenses() {

    try {

        const data = localStorage.getItem(STORAGE_KEY);

        if (!data) {
            return [];
        }

        const parsedData = JSON.parse(data);

        return Array.isArray(parsedData) ? parsedData : [];

    } catch (error) {

        console.error("Unable to read expenses:", error);

        return [];

    }

}

export function saveExpenses(expenses) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(expenses)
    );

}
```

## 19.4 validation.js

```javascript
export function validateExpense(expense) {

    const errors = {};

    if (!expense.title.trim()) {

        errors.title = "Title is required";

    }

    if (
        !Number.isFinite(expense.amount) ||
        expense.amount <= 0
    ) {

        errors.amount = "Amount must be greater than zero";

    }

    if (!expense.category) {

        errors.category = "Category is required";

    }

    return {

        isValid: Object.keys(errors).length === 0,

        errors

    };

}
```

## 19.5 utils.js

```javascript
export function formatCurrency(amount) {

    return new Intl.NumberFormat("en-IN", {

        style: "currency",

        currency: "INR"

    }).format(amount);

}

export function generateId() {

    return crypto.randomUUID();

}
```

## 19.6 app.js

```javascript
import {
    getExpenses,
    saveExpenses
} from "./storage.js";

import {
    validateExpense
} from "./validation.js";

import {
    formatCurrency,
    generateId
} from "./utils.js";


const form = document.querySelector("#expenseForm");

const titleInput = document.querySelector("#title");

const amountInput = document.querySelector("#amount");

const categoryInput = document.querySelector("#category");

const expenseList = document.querySelector("#expenseList");

const totalElement = document.querySelector("#total");


let expenses = getExpenses();


function renderExpenses() {

    expenseList.innerHTML = "";

    expenses.forEach(expense => {

        const li = document.createElement("li");

        const title = document.createElement("span");

        title.textContent = expense.title;

        const amount = document.createElement("span");

        amount.textContent = formatCurrency(expense.amount);

        const category = document.createElement("span");

        category.textContent = expense.category;

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.dataset.id = expense.id;

        li.append(
            title,
            amount,
            category,
            deleteButton
        );

        expenseList.appendChild(li);

    });

    updateTotal();

}


function updateTotal() {

    const total = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    totalElement.textContent = formatCurrency(total);

}


function addExpense(expense) {

    expenses = [...expenses, expense];

    saveExpenses(expenses);

    renderExpenses();

}


function deleteExpense(id) {

    expenses = expenses.filter(
        expense => expense.id !== id
    );

    saveExpenses(expenses);

    renderExpenses();

}


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const expense = {

        id: generateId(),

        title: titleInput.value.trim(),

        amount: Number(amountInput.value),

        category: categoryInput.value,

        createdAt: new Date().toISOString()

    };

    const validation = validateExpense(expense);

    if (!validation.isValid) {

        alert(
            Object.values(validation.errors).join("\n")
        );

        return;

    }

    addExpense(expense);

    form.reset();

});


expenseList.addEventListener("click", function (event) {

    const button = event.target.closest("button[data-id]");

    if (!button || !expenseList.contains(button)) {
        return;
    }

    deleteExpense(button.dataset.id);

});


renderExpenses();
```

### Concepts covered in this project

| Feature | JavaScript Concept |
|---|---|
| Add expense | DOM events |
| Form submission | Event handling |
| Validation | Conditional logic |
| Display expenses | DOM manipulation |
| Calculate total | `reduce()` |
| Delete expense | `filter()` |
| Update state | Immutability |
| Save data | localStorage |
| Load data | JSON parsing |
| Generate IDs | Browser crypto API |
| Delete button handling | Event delegation |
| Reusable code | ES Modules |

**Note:** This is a learning project. For a production application, add stronger storage validation, error handling around writes, accessible feedback, and a backend database. Also, localStorage is not suitable for sensitive financial information.

---

# 20. Common Real-World JavaScript Mistakes

These mistakes frequently appear in production applications.

| Mistake | Better approach |
|---|---|
| Not checking `response.ok` | Check HTTP response status |
| Trusting frontend validation | Validate on backend too |
| Repeating API logic | Create reusable API service |
| Mutating shared state unexpectedly | Use immutable updates |
| Storing secrets in frontend code | Keep secrets server-side |
| Ignoring rejected promises | Handle errors |
| Fetching unnecessary data | Use pagination and filtering |
| Not cancelling outdated requests | Use AbortController |
| Repeating utility logic | Create reusable utility modules |
| Directly inserting untrusted HTML | Prefer safe DOM APIs |
| Storing passwords in plain text | Use secure password hashing |
| Returning internal server errors to users | Return safe error responses |

---

# 21. Important Interview Questions

### Q1. What is application architecture?

It is the overall organization of an application into components, layers, modules, and their interactions.

### Q2. What is the difference between frontend and backend validation?

Frontend validation improves user experience. Backend validation enforces data integrity and security.

### Q3. Why does fetch not reject on a 404 response?

Because HTTP error responses are still valid HTTP responses. Fetch rejects mainly for network-level failures, request errors, or aborts.

### Q4. What is the difference between PUT and PATCH?

PUT generally replaces a resource representation, while PATCH applies partial modifications.

### Q5. What is state management?

It is the process of storing, updating, and distributing application data.

### Q6. What is the difference between localStorage and sessionStorage?

localStorage persists until removed, whereas sessionStorage is associated with a page session.

### Q7. What is the difference between authentication and authorization?

Authentication verifies identity. Authorization determines permissions.

### Q8. Why should we use pagination?

To avoid retrieving and processing unnecessarily large datasets at once.

### Q9. What is AbortController?

It provides a mechanism for aborting supported asynchronous operations, including fetch requests.

### Q10. What are environment variables?

Configuration values provided to an application through its execution environment.

### Q11. Why should API logic be separated into service files?

To improve reusability, maintainability, and separation of concerns.

### Q12. What is the difference between server state and client state?

Client state is managed by the frontend application. Server state represents data owned and managed by a backend.

### Q13. Why should passwords never be stored in plain text?

If the database is compromised, plain-text passwords are immediately exposed. Passwords should be stored using secure, salted password hashing.

### Q14. What is event delegation?

It is a technique where a parent element handles events originating from its child elements.

### Q15. Why should sensitive data not be stored in localStorage?

JavaScript running in the page can read it, including JavaScript injected through an XSS vulnerability.

---

# 22. Practical Exercises

Try implementing these yourself.

| No. | Exercise | Concepts |
|---|---|---|
| 1 | Create a reusable GET API function | Fetch |
| 2 | Create a reusable POST API function | HTTP |
| 3 | Handle API errors using custom error classes | Error Handling |
| 4 | Build a simple state store | State Management |
| 5 | Create a registration form with validation | DOM, Validation |
| 6 | Store user preferences in localStorage | Web Storage |
| 7 | Implement login form handling | Authentication |
| 8 | Create pagination for an array of 100 users | Array Methods |
| 9 | Implement search and filtering | Filter |
| 10 | Implement sorting by price | Sort |
| 11 | Read a text file in the browser | File API |
| 12 | Read and write a file in Node.js | fs |
| 13 | Create reusable utility modules | ES Modules |
| 14 | Implement request cancellation | AbortController |
| 15 | Build an Expense Tracker | Multiple Concepts |

---

# 23. Phase 19 Completion Checklist

You should now understand:

- [ ] Real-world application architecture.
- [ ] API integration using fetch.
- [ ] GET, POST, PUT, PATCH, and DELETE.
- [ ] Reusable API services.
- [ ] HTTP and network error handling.
- [ ] Custom error classes.
- [ ] Application state management.
- [ ] Form handling.
- [ ] Client-side and server-side validation.
- [ ] JSON serialization and parsing.
- [ ] localStorage and sessionStorage.
- [ ] Cookies and their security attributes.
- [ ] Authentication and authorization.
- [ ] Pagination.
- [ ] Searching, filtering, and sorting.
- [ ] Browser file handling.
- [ ] Node.js file handling.
- [ ] Reusable utility functions.
- [ ] Environment variables.
- [ ] AbortController.
- [ ] Practical application development.

---

# JavaScript Roadmap Progress

| Phase | Topic | Status |
|---|---|---|
| 1–17 | Fundamentals to Runtime & Internals | Completed |
| 18 | Advanced Concepts & Problem Solving | Completed |
| **19** | **Real-World Application Development** | **Completed** |

## Next Phase – Phase 20

**JavaScript Mastery Through Projects & Interview Preparation**

We will cover:

1. Build a complete JavaScript project.
2. Advanced array and object coding problems.
3. Common JavaScript interview coding challenges.
4. Practical DOM challenges.
5. Asynchronous JavaScript coding challenges.
6. Performance optimization exercises.
7. Debugging real-world JavaScript code.
8. Common frontend and backend JavaScript interview scenarios.
9. Machine coding round preparation.
10. JavaScript final revision and assessment.

**Recommendation:** Before moving to Phase 20, implement the Expense Tracker yourself without copying the code. That will help you verify whether you can combine the concepts independently.