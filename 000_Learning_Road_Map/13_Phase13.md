# JavaScript Revision Notes – Phase 13
# JavaScript Security & Performance Optimization

This phase covers two important areas of professional JavaScript development:

1. **Security:** Protecting applications, users, APIs, and sensitive information from attacks.
2. **Performance:** Making applications faster, more responsive, and more efficient.

These concepts are particularly important when developing applications using React, Next.js, Node.js, Express, and MongoDB.

---

# PART 1: JAVASCRIPT SECURITY

# 1. What is Web Application Security?

Web application security refers to protecting websites and applications from vulnerabilities, unauthorized access, data theft, and malicious attacks.

A secure application should protect:

- User information.
- Authentication credentials.
- Database records.
- API endpoints.
- Application functionality.
- Server infrastructure.

### Common Web Security Threats

| Threat | Description |
|---|---|
| XSS | Injecting malicious scripts into webpages |
| CSRF | Tricking authenticated users into performing unwanted actions |
| SQL Injection | Manipulating SQL queries |
| NoSQL Injection | Manipulating NoSQL database queries |
| Clickjacking | Tricking users into interacting with hidden or disguised elements |
| Session Hijacking | Taking control of an authenticated session |
| Brute Force | Repeatedly guessing passwords |
| DDoS | Overwhelming a service with traffic |
| Data Exposure | Accidentally exposing sensitive information |

---

# 2. What is XSS (Cross-Site Scripting)?

XSS is a web security vulnerability in which an attacker injects malicious scripts into a webpage viewed by other users.

The malicious JavaScript executes in the context of the vulnerable website's origin.

### Example

Suppose your application displays user comments.

A user submits:

```html
<script>
    alert("Hacked!");
</script>
```

If your application directly inserts this content into the HTML, the browser may execute the script.

### Vulnerable JavaScript

```javascript
const comment = `
    <script>
        alert("Hacked!");
    </script>
`;

document.querySelector("#comments").innerHTML = comment;
```

The browser interprets the string as HTML.

This creates an XSS vulnerability.

### What Can an Attacker Do Through XSS?

Depending on the vulnerability and application:

1. Read sensitive information accessible to JavaScript.
2. Perform actions as the current user.
3. Modify webpage content.
4. Steal tokens stored in JavaScript-accessible storage.
5. Display fake login forms.
6. Redirect users to malicious websites.

**Important:** An HttpOnly cookie cannot be directly read using JavaScript, but XSS can still perform actions using the victim's authenticated session.

---

# 3. Types of XSS

There are three major types of XSS.

## A. Stored XSS

Stored XSS occurs when malicious content is saved somewhere, such as a database, and later executed when another user views it.

### Example

Suppose a comment system stores user comments.

An attacker submits:

```html
<img src="x" onerror="alert('XSS')">
```

The application stores this content in MongoDB.

Later, another user opens the comments page.

If the application inserts the comment using unsafe HTML rendering, the browser executes the malicious event handler.

### Flow

```text
Attacker
   |
   | Submits Malicious Content
   v
Backend Server
   |
   | Stores Content
   v
Database
   |
   | Retrieves Content
   v
Victim's Browser
   |
   v
Malicious JavaScript Executes
```

## B. Reflected XSS

Reflected XSS occurs when malicious input is included in a server response and executed immediately.

### Example

Suppose a website accepts a search query:

```text
https://example.com/search?q=hello
```

A vulnerable application might directly insert the query into HTML.

An attacker creates a malicious URL containing script injection.

When a victim opens it, the vulnerable application reflects the input into the page without safe handling.

## C. DOM-Based XSS

DOM-based XSS occurs when client-side JavaScript processes untrusted data and inserts it into the DOM in an unsafe way.

### Vulnerable Example

```javascript
const params = new URLSearchParams(location.search);

const name = params.get("name");

document.querySelector("#output").innerHTML = name;
```

An attacker could provide HTML or JavaScript through the URL parameter.

### Safer Approach

```javascript
const params = new URLSearchParams(location.search);

const name = params.get("name");

document.querySelector("#output").textContent = name;
```

`textContent` treats the input as text rather than parsing it as HTML.

### XSS Types Comparison

| Type | Where Malicious Input Comes From | Where It Is Stored |
|---|---|---|
| Stored XSS | User-submitted content | Database or another persistent store |
| Reflected XSS | Request parameters or submitted input | Reflected in an immediate response |
| DOM-Based XSS | Browser-side data sources | Often no server storage required |

---

# 4. How to Prevent XSS?

There are several ways to prevent XSS.

### 1. Use textContent Instead of innerHTML

Unsafe:

```javascript
element.innerHTML = userInput;
```

Safer:

```javascript
element.textContent = userInput;
```

### 2. Sanitize HTML When HTML Is Required

Sometimes applications need to display user-generated HTML.

For example:

- Blog content.
- Rich text editors.
- Product descriptions.

In such cases, use a trusted HTML sanitization library.

Example using DOMPurify:

```bash
npm install dompurify
```

```javascript
import DOMPurify from "dompurify";

const cleanHTML = DOMPurify.sanitize(userInput);

document.querySelector("#content").innerHTML = cleanHTML;
```

DOMPurify removes dangerous HTML and attributes according to its sanitization rules.

### 3. Avoid Dangerous DOM APIs

Be careful with:

```javascript
innerHTML
outerHTML
insertAdjacentHTML()
document.write()
eval()
new Function()
```

These APIs can introduce vulnerabilities when used with untrusted input.

They are not inherently unsafe in every situation, but require careful handling.

### 4. Use Content Security Policy

CSP can restrict which scripts are allowed to execute.

We will cover CSP later.

### 5. Use HttpOnly Cookies

HttpOnly cookies cannot be read through JavaScript.

This helps protect session credentials from direct theft through XSS.

However, it does not prevent XSS itself.

---

# 5. What is CSRF (Cross-Site Request Forgery)?

CSRF is an attack in which an attacker tricks an authenticated user's browser into sending an unwanted request to another website.

It commonly exploits automatically attached authentication cookies.

### Example

Suppose a user logs into:

```text
https://bank.example.com
```

The browser stores an authentication cookie.

Now the user visits a malicious website.

The malicious website contains a form:

```html
<form
    action="https://bank.example.com/transfer"
    method="POST"
>
    <input type="hidden" name="amount" value="10000">

    <input type="hidden" name="account" value="attacker">
</form>

<script>
    document.forms[0].submit();
</script>
```

If the bank application does not properly protect the transfer endpoint, the browser might automatically attach the user's bank cookies.

The server may mistakenly process the transfer as an authenticated request.

### CSRF Flow

```text
User Logs Into Bank
       |
       v
Browser Stores Authentication Cookie
       |
       v
User Visits Malicious Website
       |
       v
Malicious Website Sends Request
       |
       v
Browser Attaches Matching Cookies
       |
       v
Bank Receives Request
       |
       v
Unwanted Action May Be Executed
```

### Important Point

CSRF is different from XSS.

- XSS injects malicious code into a trusted website.
- CSRF tricks the browser into making unwanted authenticated requests.

---

# 6. How to Prevent CSRF?

Several techniques help prevent CSRF attacks.

## 1. CSRF Tokens

A CSRF token is a random value associated with a user's session or request context.

The application requires the token for sensitive state-changing requests.

Example:

```html
<form action="/transfer" method="POST">

    <input
        type="hidden"
        name="_csrf"
        value="RANDOM_CSRF_TOKEN"
    >

    <input type="text" name="amount">

    <button type="submit">
        Transfer
    </button>

</form>
```

The server validates the token before processing the request.

An attacker on another website generally cannot read the legitimate application's token because of browser same-origin restrictions.

## 2. SameSite Cookies

Cookies can use the `SameSite` attribute to control cross-site sending behavior.

Example:

```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax
```

We will cover SameSite in detail later.

## 3. Validate Origin and Referer

For sensitive requests, the backend can validate the `Origin` header and, where appropriate, the `Referer` header.

## 4. Avoid GET for State-Changing Operations

Do not use GET requests for actions such as:

- Deleting accounts.
- Transferring money.
- Changing passwords.
- Updating important records.

Use appropriate state-changing HTTP methods and CSRF protections.

### CSRF Protection Summary

| Technique | Purpose |
|---|---|
| CSRF Token | Verifies request legitimacy |
| SameSite Cookies | Restricts cross-site cookie sending |
| Origin Validation | Checks request origin |
| Referer Validation | Provides additional request-origin information |
| Proper HTTP Methods | Avoids unsafe actions through GET |

**Important:** CORS alone is not a general CSRF defense. A malicious website may be able to submit certain requests even when it cannot read the response.

---

# 7. What is SQL Injection?

SQL Injection is a security vulnerability in which an attacker manipulates SQL queries by injecting malicious SQL input.

It occurs when applications construct SQL queries unsafely using user input.

### Vulnerable Example

Suppose you have a login query:

```javascript
const username = req.body.username;

const password = req.body.password;

const query = `
    SELECT * FROM users
    WHERE username = '${username}'
    AND password = '${password}'
`;
```

An attacker may submit specially crafted input.

For example:

```text
Username: admin' OR '1'='1
Password: anything
```

The resulting query can become logically different from what the developer intended.

This may allow unauthorized access.

### How to Prevent SQL Injection?

Use parameterized queries.

### Unsafe Query

```javascript
const query = `
    SELECT * FROM users
    WHERE username = '${username}'
`;
```

### Safe Query Using mysql2

```javascript
const [rows] = await connection.execute(
    "SELECT * FROM users WHERE username = ?",
    [username]
);
```

The database driver treats the supplied value as data rather than SQL syntax.

### Using Sequelize

```javascript
const user = await User.findOne({
    where: {
        username: username
    }
});
```

Sequelize safely parameterizes ordinary values in its query methods.

### SQL Injection Prevention

1. Use parameterized queries.
2. Avoid string concatenation for SQL.
3. Validate input.
4. Use database accounts with minimum required privileges.
5. Do not expose database error details to users.
6. Keep database libraries updated.

---

# 8. What is NoSQL Injection?

NoSQL Injection is a security vulnerability in which an attacker manipulates a NoSQL database query through malicious input.

It is particularly relevant to applications using MongoDB.

### Vulnerable Example

Suppose a login controller uses:

```javascript
const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
});
```

If the application accepts arbitrary objects instead of strings, an attacker might submit an operator object instead of a normal username or password.

For example:

```json
{
    "username": {
        "$ne": null
    },
    "password": {
        "$ne": null
    }
}
```

Depending on the query and database implementation, this can change the query's meaning.

### How to Prevent NoSQL Injection?

### 1. Validate Input Types

```javascript
const { username, password } = req.body;

if (
    typeof username !== "string" ||
    typeof password !== "string"
) {
    return res.status(400).json({
        message: "Invalid input"
    });
}
```

### 2. Use Input Validation Libraries

Example using Zod:

```bash
npm install zod
```

```javascript
import { z } from "zod";

const loginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(8)
});

const result = loginSchema.safeParse(req.body);

if (!result.success) {
    return res.status(400).json({
        message: "Invalid input"
    });
}
```

### 3. Avoid Directly Trusting User Objects

Do not allow users to provide arbitrary MongoDB query operators.

Bad:

```javascript
User.findOne(req.body);
```

Better:

```javascript
User.findOne({
    username: validatedUsername
});
```

### SQL Injection vs NoSQL Injection

| SQL Injection | NoSQL Injection |
|---|---|
| Targets SQL queries | Targets NoSQL queries |
| Common in relational databases | Common in document and other NoSQL databases |
| Can manipulate SQL syntax | Can manipulate query operators and structures |
| Example: `' OR 1=1` | Example: `{"$ne": null}` |

---

# 9. What is Clickjacking?

Clickjacking is an attack where an attacker tricks a user into clicking something different from what they believe they are clicking.

It commonly uses transparent or disguised frames.

### Example

An attacker creates a webpage containing a visible button:

```text
Click here to claim your prize!
```

Behind that button, the attacker places an invisible iframe containing a sensitive website.

The user thinks they are clicking the prize button, but actually interacts with the hidden website.

### How to Prevent Clickjacking?

Use security headers.

### X-Frame-Options

```http
X-Frame-Options: DENY
```

This prevents the page from being displayed inside a frame.

Other common value:

```http
X-Frame-Options: SAMEORIGIN
```

Allows framing by pages from the same origin.

### Content Security Policy

You can also use:

```http
Content-Security-Policy: frame-ancestors 'none'
```

This prevents the page from being embedded in frames.

**Important:** CSP `frame-ancestors` is the more flexible modern mechanism. It cannot be set using a normal HTML meta tag; it must be delivered through an HTTP response header.

---

# 10. What is Content Security Policy (CSP)?

Content Security Policy is a browser security mechanism that restricts which resources a webpage can load or execute.

It helps reduce the impact of XSS and certain other attacks.

### Example

```http
Content-Security-Policy: default-src 'self'
```

This instructs the browser to use the current origin as the default source for resource loading.

### Common CSP Directives

| Directive | Purpose |
|---|---|
| `default-src` | Default policy for resource types |
| `script-src` | Controls JavaScript sources |
| `style-src` | Controls CSS sources |
| `img-src` | Controls image sources |
| `font-src` | Controls font sources |
| `connect-src` | Controls Fetch, XHR, WebSocket and similar connections |
| `media-src` | Controls audio and video sources |
| `frame-src` | Controls sources allowed inside frames |
| `frame-ancestors` | Controls which sites can embed the page |
| `object-src` | Controls plugin-based content |

### Example CSP

```http
Content-Security-Policy:
    default-src 'self';
    script-src 'self';
    img-src 'self' https://images.example.com;
    style-src 'self';
    connect-src 'self' https://api.example.com;
    object-src 'none';
    frame-ancestors 'none';
```

### What does `'self'` mean?

It refers to the current origin.

For example:

```text
https://example.com
```

A resource from the same origin is allowed by the relevant directive.

### What is `unsafe-inline`?

Example:

```http
Content-Security-Policy: script-src 'self' 'unsafe-inline'
```

It permits inline scripts.

However, allowing arbitrary inline scripts weakens CSP protection.

A stronger approach uses nonces or hashes.

### What is a Nonce?

A nonce is a cryptographically random value generated for a response.

Example response header:

```http
Content-Security-Policy: script-src 'self' 'nonce-abc123'
```

HTML:

```html
<script nonce="abc123">
    console.log("Allowed script");
</script>
```

The nonce must be unpredictable and generated separately for each response.

**Important:** The example nonce is illustrative. Never use a fixed nonce in production.

---

# 11. What are Secure Cookies?

Cookies can store authentication and session information.

However, cookie configuration is important for security.

### Example

```http
Set-Cookie: sessionId=abc123;
HttpOnly;
Secure;
SameSite=Lax;
Path=/
```

### Important Cookie Attributes

| Attribute | Purpose |
|---|---|
| `HttpOnly` | Prevents JavaScript access |
| `Secure` | Sends cookie only over HTTPS |
| `SameSite` | Controls cross-site cookie behavior |
| `Path` | Controls URL path scope |
| `Domain` | Controls domain scope |
| `Max-Age` | Defines cookie lifetime |
| `Expires` | Defines expiration date |

### Why Use HttpOnly?

Without HttpOnly:

```javascript
console.log(document.cookie);
```

JavaScript can access cookies that are not marked HttpOnly and are otherwise accessible to the current document.

With HttpOnly, the browser prevents JavaScript from reading that cookie.

### Why Use Secure?

The Secure attribute restricts cookie transmission to secure HTTPS connections.

### Why Use SameSite?

It helps control when cookies are included in cross-site requests, reducing CSRF risk.

---

# 12. What is SameSite Cookies?

SameSite is a cookie attribute that controls whether cookies are sent with cross-site requests.

There are three main values.

### 1. SameSite=Strict

```http
Set-Cookie: sessionId=abc; SameSite=Strict
```

The browser generally does not send the cookie with cross-site requests.

This provides stronger cross-site request restrictions but may affect user experience when navigating from external sites.

### 2. SameSite=Lax

```http
Set-Cookie: sessionId=abc; SameSite=Lax
```

Allows cookies in certain cross-site top-level navigations using safe methods, while restricting many other cross-site requests.

It is commonly used as a reasonable default.

### 3. SameSite=None

```http
Set-Cookie: sessionId=abc; SameSite=None; Secure
```

Allows cross-site cookie sending, subject to browser privacy restrictions.

It requires the Secure attribute in modern browsers.

### Comparison

| Strict | Lax | None |
|---|---|---|
| Strongest cross-site restriction | Allows certain top-level navigations | Allows cross-site cookie sending |
| May affect external navigation flows | Common general-purpose setting | Used when cross-site cookies are required |
| No Secure requirement solely because of SameSite | No Secure requirement solely because of SameSite | Requires Secure |

---

# 13. What is CORS Security?

CORS is a browser security mechanism that controls cross-origin resource access.

It is important to configure CORS correctly on the backend.

### Example

Suppose your frontend runs on:

```text
https://app.example.com
```

Your backend runs on:

```text
https://api.example.com
```

You may configure the backend to allow the frontend origin.

### Express Example

```javascript
const cors = require("cors");

app.use(cors({
    origin: "https://app.example.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ]
}));
```

### CORS with Credentials

If your application uses cookies:

```javascript
app.use(cors({
    origin: "https://app.example.com",
    credentials: true
}));
```

Frontend:

```javascript
fetch("https://api.example.com/profile", {
    credentials: "include"
});
```

### Important Rules

1. Do not use `Access-Control-Allow-Origin: *` with credentialed CORS requests.
2. Specify trusted origins.
3. Allow only necessary methods and headers.
4. Do not treat CORS as authentication.
5. Use proper CSRF protection when using cookies for authentication.

---

# 14. What is Input Validation?

Input validation means checking whether user-provided data meets the application's requirements before processing it.

For example, suppose a registration form requires:

- Name.
- Email.
- Password.
- Age.

The backend should validate all these values.

### Basic Validation

```javascript
function validateUser(user) {
    if (!user.name) {
        return "Name is required";
    }

    if (!user.email) {
        return "Email is required";
    }

    if (!user.password || user.password.length < 8) {
        return "Password must contain at least 8 characters";
    }

    return null;
}
```

Usage:

```javascript
const error = validateUser(req.body);

if (error) {
    return res.status(400).json({
        message: error
    });
}
```

### Frontend vs Backend Validation

| Frontend Validation | Backend Validation |
|---|---|
| Improves user experience | Protects application logic |
| Provides immediate feedback | Enforces trusted validation |
| Can be bypassed | Must always be performed |
| Example: Required input | Example: Server-side schema validation |

**Important:** Never rely only on frontend validation. Attackers can bypass it by sending requests directly to your API.

---

# 15. What is Input Sanitization?

Input sanitization means transforming or cleaning input to make it safe for a particular use.

For example, removing dangerous HTML attributes before rendering user-generated HTML.

### Example

```javascript
const cleanHTML = DOMPurify.sanitize(userInput);
```

### Validation vs Sanitization

| Validation | Sanitization |
|---|---|
| Checks whether input is acceptable | Transforms input into a safer representation |
| Rejects invalid data | Cleans or normalizes data |
| Example: Validate email format | Example: Sanitize HTML |
| Usually preserves valid input | May modify input |

### Important

Sanitization is context-dependent.

The correct handling depends on where data will be used:

- HTML content.
- HTML attributes.
- JavaScript strings.
- CSS values.
- SQL parameters.
- URL parameters.

For SQL, use parameterized queries rather than attempting to sanitize SQL strings manually.

---

# 16. What is Output Encoding?

Output encoding converts special characters into a representation that is safe for a particular output context.

For example, HTML encoding transforms:

```text
<
```

into:

```text
&lt;
```

And:

```text
>
```

into:

```text
&gt;
```

### Example

Suppose the user enters:

```html
<script>alert("XSS")</script>
```

If this is safely HTML-encoded before display, the browser displays it as text instead of interpreting it as an executable script.

### Validation vs Sanitization vs Encoding

| Concept | Purpose |
|---|---|
| Validation | Check whether data is acceptable |
| Sanitization | Remove or transform unsafe content |
| Output Encoding | Convert special characters for safe output in a particular context |

**Important:** Output encoding is context-specific. HTML encoding alone is not sufficient for every JavaScript, CSS, URL, or HTML-attribute context.

---

# 17. What are Secure Authentication Practices?

Authentication is one of the most important areas of web application security.

### Important Practices

**1. Never Store Plain-Text Passwords**

Use password hashing algorithms designed for passwords.

Recommended choices include:

- Argon2id.
- bcrypt.
- scrypt.

Example using bcrypt:

```bash
npm install bcrypt
```

Hash a password:

```javascript
const bcrypt = require("bcrypt");

const password = "mySecurePassword";

const hashedPassword = await bcrypt.hash(password, 12);

console.log(hashedPassword);
```

Verify:

```javascript
const isValid = await bcrypt.compare(
    password,
    hashedPassword
);

console.log(isValid);
```

**2. Use HTTPS**

Protect credentials and tokens during network transmission.

**3. Use Strong Password Policies**

Apply reasonable minimum length and block commonly compromised passwords.

**4. Implement Rate Limiting**

Prevent unlimited login attempts.

**5. Use Multi-Factor Authentication**

Add another authentication factor where appropriate.

**6. Protect Sessions**

Use secure cookie attributes and invalidate sessions after logout.

**7. Avoid Exposing Secrets**

Never put private credentials in frontend JavaScript or public repositories.

### Password Hashing vs Encryption

| Hashing | Encryption |
|---|---|
| One-way transformation | Reversible with the appropriate key |
| Used for password verification | Used for protecting data that must be recovered |
| No decryption operation | Decryption is possible |
| Example: bcrypt | Example: AES |

**Important:** Do not use ordinary fast hashes such as SHA-256 alone for password storage. Password hashing should use a dedicated password-hashing algorithm with appropriate parameters.

---

# 18. What is Rate Limiting?

Rate limiting restricts how many requests a client can make within a specified period.

It helps protect APIs from abuse.

### Example

Suppose a login endpoint allows:

```text
5 requests per minute per IP
```

If a client exceeds this limit, the server may return:

```http
HTTP/1.1 429 Too Many Requests
```

### Why is Rate Limiting Important?

1. Prevents excessive login attempts.
2. Reduces brute-force attacks.
3. Protects API resources.
4. Controls automated abuse.
5. Helps manage server load.

### Express Rate Limiting

Install:

```bash
npm install express-rate-limit
```

Example:

```javascript
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,

    message: {
        message: "Too many login attempts. Try again later."
    }
});

app.use("/api/login", loginLimiter);
```

### Important Properties

| Property | Purpose |
|---|---|
| `windowMs` | Time window |
| `limit` | Maximum requests allowed |
| `message` | Response when limit is exceeded |
| `standardHeaders` | Enables standard rate-limit response headers |
| `legacyHeaders` | Controls older rate-limit headers |

### Important Production Consideration

If your application runs on multiple server instances, use a shared rate-limit store such as Redis.

An in-memory store may not share counters across instances.

Also, configure trusted proxy settings carefully when using IP-based rate limiting behind a reverse proxy.

---

# PART 2: JAVASCRIPT PERFORMANCE

# 19. What is Debouncing?

Debouncing delays the execution of a function until a specified period has passed without another call.

It is useful when an event fires repeatedly.

### Example: Search Input

Suppose a user types:

```text
JavaScript
```

Without debouncing, the application may send a request after every keystroke.

That means multiple unnecessary API requests.

### Without Debouncing

```javascript
searchInput.addEventListener("input", () => {
    searchAPI(searchInput.value);
});
```

### With Debouncing

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

const search = debounce((value) => {
    console.log("Searching:", value);
}, 500);

searchInput.addEventListener("input", (event) => {
    search(event.target.value);
});
```

### How It Works

```text
User Types: J
     |
     v
Timer Starts
     |
User Types: Ja
     |
     v
Previous Timer Cleared
     |
User Types: Java
     |
     v
Previous Timer Cleared
     |
No Input for 500ms
     |
     v
Function Executes
```

### Common Use Cases

- Search suggestions.
- Form validation.
- Auto-save.
- Window resize handling.

---

# 20. What is Throttling?

Throttling ensures that a function executes at most once during a specified time interval.

It is useful when events occur continuously.

### Example

Suppose a user scrolls the page.

The scroll event may fire many times per second.

We may not need to execute expensive calculations on every event.

### Throttle Implementation

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
const handleScroll = throttle(() => {
    console.log("Scroll event executed");
}, 500);

window.addEventListener("scroll", handleScroll);
```

### Debouncing vs Throttling

| Debouncing | Throttling |
|---|---|
| Executes after activity stops for a specified delay | Limits execution frequency |
| Waits for the final event | Allows execution at controlled intervals |
| Search input | Scroll event |
| Resize handling | Mouse movement tracking |

---

# 21. What is JavaScript Memory Management?

Memory management is the process of allocating, using, and releasing memory.

JavaScript automatically manages memory through garbage collection.

### Memory Lifecycle

```text
Memory Allocation
       |
       v
Memory Usage
       |
       v
Object Becomes Unreachable
       |
       v
Garbage Collection
       |
       v
Memory Can Be Reclaimed
```

### Example

```javascript
let user = {
    name: "Riyaz"
};
```

JavaScript allocates memory for the object.

Now:

```javascript
user = null;
```

If nothing else references the original object, it becomes eligible for garbage collection.

**Important:** Becoming unreachable makes memory eligible for garbage collection. It does not mean memory is released immediately.

---

# 22. What is Garbage Collection?

Garbage Collection (GC) is the automatic process of reclaiming memory that is no longer reachable by the application.

Modern JavaScript engines commonly use tracing garbage collectors.

### What is Reachability?

An object is considered reachable if it can be accessed through references starting from garbage collection roots.

Common roots include:

- Global variables.
- Active function execution contexts.
- Local variables and references on active stacks.
- Certain internal engine references.

### Example

```javascript
let user = {
    name: "Riyaz"
};

let admin = user;

user = null;
```

Is the object eligible for garbage collection?

No.

Because `admin` still references it.

Now:

```javascript
admin = null;
```

The object may now become eligible for garbage collection if no other references exist.

### Mark-and-Sweep Concept

A simplified garbage collection process:

1. Start from garbage collection roots.
2. Mark all reachable objects.
3. Identify unmarked objects.
4. Reclaim memory occupied by unreachable objects.

---

# 23. What are Memory Leaks?

A memory leak occurs when memory that is no longer needed remains reachable and therefore cannot be reclaimed.

### Common Causes of Memory Leaks

1. Unremoved event listeners.
2. Unnecessary global variables.
3. Forgotten timers.
4. Detached DOM references.
5. Unbounded caches.
6. Closures retaining unnecessary data.

### Example 1: Forgotten Event Listener

```javascript
function setup() {
    const button = document.querySelector("#button");

    button.addEventListener("click", () => {
        console.log("Clicked");
    });
}
```

If the element is repeatedly created and removed while references and listeners remain, unnecessary memory may be retained.

### Better Approach

```javascript
function setup() {
    const button = document.querySelector("#button");

    function handleClick() {
        console.log("Clicked");
    }

    button.addEventListener("click", handleClick);

    return function cleanup() {
        button.removeEventListener("click", handleClick);
    };
}

const cleanup = setup();

// When no longer needed:
cleanup();
```

### Example 2: Forgotten setInterval()

```javascript
function startTimer() {
    setInterval(() => {
        console.log("Running...");
    }, 1000);
}

startTimer();
```

The interval continues running until cleared.

Better:

```javascript
const timer = setInterval(() => {
    console.log("Running...");
}, 1000);

clearInterval(timer);
```

### Example 3: Unbounded Cache

```javascript
const cache = new Map();

function storeData(key, value) {
    cache.set(key, value);
}
```

If the application keeps adding data without removing old entries, memory usage may grow indefinitely.

### How to Detect Memory Leaks?

Use Chrome DevTools:

1. Open Developer Tools.
2. Open the Memory tab.
3. Take a heap snapshot.
4. Perform the operation repeatedly.
5. Take another snapshot.
6. Compare retained objects.
7. Inspect unexpected references.

---

# 24. What is the Browser Rendering Pipeline?

The browser rendering pipeline is the process through which the browser converts HTML, CSS, and JavaScript into pixels displayed on the screen.

### Simplified Rendering Process

```text
HTML
 |
 v
DOM
 |
 |
CSS
 |
 v
CSSOM
 |
 v
Render Tree
 |
 v
Layout
 |
 v
Paint
 |
 v
Compositing
 |
 v
Screen
```

### Step 1: DOM Construction

The browser parses HTML and creates the DOM tree.

### Step 2: CSSOM Construction

The browser parses CSS and creates the CSS Object Model.

### Step 3: Render Tree

The browser combines relevant DOM and CSS information to determine what needs to be rendered.

### Step 4: Layout

The browser calculates the size and position of rendered elements.

### Step 5: Paint

The browser determines how visual elements should be drawn.

### Step 6: Compositing

The browser combines rendered layers into the final displayed image.

**Important:** This is a simplified conceptual pipeline. Modern browsers can optimize, parallelize, and skip certain stages depending on the changes.

---

# 25. What is the Critical Rendering Path?

The Critical Rendering Path is the sequence of steps the browser performs to convert HTML, CSS, and JavaScript into rendered pixels.

Optimizing this process improves page loading and rendering performance.

### Important Resources

- HTML.
- CSS.
- JavaScript.
- Fonts.
- Images.

### What Can Block Rendering?

Some CSS and JavaScript resources can delay rendering.

For example, a large stylesheet may delay the browser's ability to render styled content.

A synchronous script can block HTML parsing while it executes.

### Script Loading Strategies

**Normal Script**

```html
<script src="app.js"></script>
```

The browser pauses HTML parsing while fetching and executing the script.

**Defer**

```html
<script src="app.js" defer></script>
```

The script downloads in parallel with HTML parsing and executes after HTML parsing completes.

Deferred scripts preserve their relative order.

**Async**

```html
<script src="app.js" async></script>
```

The script downloads in parallel and executes as soon as it is ready.

Execution order is not guaranteed.

### Defer vs Async

| Defer | Async |
|---|---|
| Executes after HTML parsing | Executes when download completes |
| Preserves order among deferred scripts | Does not guarantee execution order |
| Suitable for scripts depending on parsed DOM | Suitable for independent scripts |
| Runs before DOMContentLoaded | May execute before or after DOMContentLoaded |

---

# 26. What are Reflow and Repaint?

Reflow and repaint are browser rendering operations that occur when the page changes.

### What is Reflow?

Reflow, also called layout, occurs when the browser recalculates the size and position of elements.

Example:

```javascript
element.style.width = "500px";
```

Changing width can affect the layout of nearby elements.

The browser may need to recalculate their positions.

### What is Repaint?

Repaint occurs when the browser redraws visual properties without necessarily recalculating layout.

Example:

```javascript
element.style.backgroundColor = "red";
```

This may require repainting without a layout change.

### Reflow vs Repaint

| Reflow | Repaint |
|---|---|
| Recalculates layout | Redraws visual appearance |
| Can be more expensive | Often less expensive |
| Changes width, height, position | Changes color, background, visibility |
| May cause repaint too | Does not necessarily cause reflow |

### Important Performance Tip

Avoid repeatedly reading layout-related properties after writing layout-related styles in a loop.

Bad example:

```javascript
const boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
    box.style.width = box.offsetWidth + 10 + "px";
});
```

Repeatedly mixing layout reads and writes can trigger forced synchronous layout.

Better approach:

```javascript
const boxes = [...document.querySelectorAll(".box")];

const widths = boxes.map((box) => box.offsetWidth);

boxes.forEach((box, index) => {
    box.style.width = widths[index] + 10 + "px";
});
```

This groups reads before writes.

---

# 27. What is DOM Performance Optimization?

DOM operations can affect browser performance.

Frequent DOM changes can cause unnecessary layout and rendering work.

### Technique 1: Minimize DOM Manipulation

Avoid repeatedly changing the DOM inside large loops.

Less efficient:

```javascript
const list = document.querySelector("#list");

for (let i = 0; i < 1000; i++) {
    list.innerHTML += `<li>Item ${i}</li>`;
}
```

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

### Technique 2: Use Event Delegation

Instead of adding listeners to hundreds of child elements, attach one listener to a common parent.

```javascript
const list = document.querySelector("#list");

list.addEventListener("click", (event) => {
    if (event.target.matches("li")) {
        console.log(event.target.textContent);
    }
});
```

### Technique 3: Avoid Unnecessary DOM Queries

Instead of repeatedly querying the same element:

```javascript
document.querySelector("#username").textContent = "Riyaz";

document.querySelector("#username").style.color = "blue";
```

Cache the reference:

```javascript
const username = document.querySelector("#username");

username.textContent = "Riyaz";

username.style.color = "blue";
```

### Technique 4: Use CSS for Visual Changes

Prefer CSS classes for visual state changes.

```javascript
element.classList.add("active");
```

Rather than manually changing many inline styles.

### Technique 5: Virtualization

For very large lists, render only the visible items instead of creating thousands of DOM elements simultaneously.

Libraries such as `react-window` and other virtualization tools can help.

---

# 28. What is Lazy Loading?

Lazy loading means loading resources only when they are needed.

It improves initial page loading by delaying non-critical resources.

### Example: Lazy Loading Images

```html
<img
    src="product.jpg"
    alt="Product"
    loading="lazy"
>
```

The browser can defer loading the image until it approaches the viewport.

### Lazy Loading JavaScript Modules

```javascript
async function loadDashboard() {
    const module = await import("./dashboard.js");

    module.initialize();
}
```

### Lazy Loading vs Eager Loading

| Lazy Loading | Eager Loading |
|---|---|
| Loads resources when required | Loads resources early |
| Reduces initial loading work | May increase initial loading work |
| Useful for below-the-fold content | Useful for critical content |
| Can improve initial performance | Can avoid delays when resources are immediately needed |

**Important:** Do not lazy-load important above-the-fold content such as the primary hero image without a good reason.

---

# 29. What is Code Splitting?

Code splitting divides application JavaScript into smaller chunks.

Instead of downloading one large JavaScript bundle, the browser can load smaller pieces when required.

### Without Code Splitting

```text
Application
    |
    v
Large Bundle
    |
    v
Browser Downloads Everything
```

### With Code Splitting

```text
Application
    |
    +---- Main Bundle
    |
    +---- Dashboard Chunk
    |
    +---- Admin Chunk
    |
    +---- Reports Chunk
```

### Example Using Dynamic Import

```javascript
async function loadAdminPanel() {
    const admin = await import("./admin.js");

    admin.initialize();
}
```

The admin module is loaded when the function executes.

### React Example

```javascript
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));

function App() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <Dashboard />
        </Suspense>
    );
}

export default App;
```

### Benefits

1. Smaller initial bundle.
2. Faster initial loading in suitable applications.
3. Loads features only when needed.
4. Better route-level loading strategies.

---

# 30. What is Tree Shaking?

Tree shaking is a build optimization technique that removes unused code from the final bundle.

It is commonly associated with ES modules.

### Example

**math.js**

```javascript
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}
```

**app.js**

```javascript
import { add } from "./math.js";

console.log(add(10, 20));
```

If the bundler determines that `subtract()` and `multiply()` are unused and safe to remove, they may be excluded from the production bundle.

### Why Are ES Modules Helpful?

ES modules use static import and export declarations.

This makes it easier for bundlers to analyze dependencies before runtime.

### Important

Tree shaking is not guaranteed in every situation.

It depends on:

- Bundler capabilities.
- Module format.
- Side effects.
- Package configuration.
- Build settings.

---

# 31. What is JavaScript Profiling?

Profiling is the process of analyzing application performance to identify slow operations and bottlenecks.

It helps answer questions such as:

- Which function takes the most time?
- Why is the UI freezing?
- Why is memory increasing?
- Which resources load slowly?
- Which operations are consuming CPU?

### Chrome DevTools Performance Panel

You can use it to analyze:

1. JavaScript execution.
2. Rendering.
3. Layout.
4. Paint.
5. Network activity.
6. Long tasks.
7. Frame performance.

### How to Profile

1. Open your application in Chrome.
2. Open Developer Tools.
3. Go to the Performance tab.
4. Start recording.
5. Perform the slow operation.
6. Stop recording.
7. Analyze the timeline.

### Performance API Example

```javascript
performance.mark("start");

function calculate() {
    let total = 0;

    for (let i = 0; i < 1000000; i++) {
        total += i;
    }

    return total;
}

calculate();

performance.mark("end");

performance.measure(
    "calculation",
    "start",
    "end"
);

console.log(
    performance.getEntriesByName("calculation")
);
```

---

# 32. What is Lighthouse?

Lighthouse is an automated tool for auditing web application quality.

It is available through Chrome DevTools and other development workflows.

It evaluates:

1. Performance.
2. Accessibility.
3. Best Practices.
4. SEO.

It can also provide diagnostic information and improvement suggestions.

### How to Run Lighthouse

1. Open Chrome.
2. Open Developer Tools.
3. Select the Lighthouse tab.
4. Select the audit categories.
5. Run the audit.
6. Review the report.

### What Does Lighthouse Measure?

Examples include:

- Largest Contentful Paint.
- Total Blocking Time.
- Cumulative Layout Shift.
- Accessibility checks.
- SEO checks.
- Security-related best practices.

**Important:** Lighthouse lab measurements are not the same as real-user field measurements.

---

# 33. What are Core Web Vitals?

Core Web Vitals are Google's user-experience metrics used to evaluate important aspects of webpage performance.

The three primary metrics are:

1. LCP – Largest Contentful Paint.
2. INP – Interaction to Next Paint.
3. CLS – Cumulative Layout Shift.

### Recommended Thresholds

| Metric | Good | Needs Improvement | Poor |
|---|---:|---:|---:|
| LCP | ≤ 2.5 seconds | 2.5–4 seconds | > 4 seconds |
| INP | ≤ 200 ms | 200–500 ms | > 500 ms |
| CLS | ≤ 0.1 | 0.1–0.25 | > 0.25 |

These thresholds are evaluated at the 75th percentile of page visits, segmented across mobile and desktop.

---

# 34. What is LCP (Largest Contentful Paint)?

LCP measures how long it takes for the largest visible content element to render within the viewport.

It represents perceived loading performance.

Common LCP elements include:

- Large images.
- Hero images.
- Video poster images.
- Large text blocks.

### Example

Suppose your homepage contains a large hero image.

If it takes 5 seconds to appear, the LCP may be poor.

### How to Improve LCP?

1. Optimize large images.
2. Use modern image formats such as WebP or AVIF.
3. Avoid unnecessary render-blocking resources.
4. Improve server response time.
5. Use CDN caching.
6. Preload critical resources when appropriate.
7. Avoid lazy-loading the LCP image.

### Example

```html
<link
    rel="preload"
    as="image"
    href="/hero.webp"
>
```

Use preload selectively for genuinely critical resources.

---

# 35. What is INP (Interaction to Next Paint)?

INP stands for Interaction to Next Paint.

It measures how responsive a page is to user interactions.

It considers interactions such as:

- Clicking buttons.
- Typing into inputs.
- Selecting dropdowns.
- Interacting with controls.

### Example

Suppose a user clicks a button.

The application takes 800 milliseconds before displaying a visual response.

This can indicate poor interaction responsiveness.

### How to Improve INP?

1. Reduce long-running JavaScript tasks.
2. Break large tasks into smaller tasks.
3. Avoid unnecessary DOM operations.
4. Optimize event handlers.
5. Use Web Workers for suitable CPU-intensive tasks.
6. Reduce excessive rendering.
7. Avoid unnecessary synchronous work.

### What is a Long Task?

A long task is a task that occupies the main thread for more than 50 milliseconds.

Long tasks can delay user interactions.

---

# 36. What is CLS (Cumulative Layout Shift)?

CLS measures unexpected visual layout shifts during a page's lifetime.

### Example

Suppose a user is reading an article.

Suddenly, an image loads above the paragraph and pushes the content downward.

The user loses their reading position.

This creates a layout shift.

### Common Causes

1. Images without dimensions.
2. Ads loading dynamically.
3. Late-loading fonts.
4. Content inserted above existing content.
5. Dynamically resized elements.

### How to Prevent CLS?

Reserve space for images:

```html
<img
    src="product.jpg"
    width="400"
    height="300"
    alt="Product"
>
```

Or use CSS:

```css
.image-container {
    aspect-ratio: 4 / 3;
}
```

Reserve space for dynamic content:

```css
.ad-container {
    min-height: 250px;
}
```

### Core Web Vitals Summary

| Metric | Measures | Main Optimization |
|---|---|---|
| LCP | Loading | Optimize critical content |
| INP | Interactivity | Reduce main-thread blocking |
| CLS | Visual stability | Reserve layout space |

---

# 37. Important JavaScript Performance Optimization Techniques

Here is a practical checklist.

| Technique | Benefit |
|---|---|
| Minification | Reduces file size |
| Compression | Reduces transferred data |
| Code Splitting | Reduces initial JavaScript |
| Tree Shaking | Removes unused code |
| Lazy Loading | Defers non-critical resources |
| Image Optimization | Reduces image transfer size |
| CDN | Improves resource delivery |
| Browser Caching | Avoids unnecessary downloads |
| Debouncing | Reduces excessive function calls |
| Throttling | Controls function execution frequency |
| Web Workers | Moves suitable work off the main thread |
| Virtualization | Reduces DOM element count |
| Event Delegation | Reduces event listeners |
| Memoization | Avoids repeated calculations |
| DOM Optimization | Reduces layout and rendering work |

---

# 38. Security vs Performance

Security and performance are both essential, but they solve different problems.

| Security | Performance |
|---|---|
| Protects application and user data | Improves speed and responsiveness |
| Prevents unauthorized access | Reduces unnecessary work |
| Uses authentication and authorization | Uses caching and optimization |
| Prevents XSS and CSRF | Prevents rendering bottlenecks |
| Uses secure headers | Uses compression and code splitting |
| Validates user input | Optimizes DOM operations |

A production-ready application needs both.

---

# 39. Practical Security Project

Let's create a basic secure login API using Express, bcrypt, JWT, validation, and rate limiting.

### Step 1: Install Dependencies

```bash
npm install express bcrypt jsonwebtoken zod express-rate-limit dotenv
```

### Step 2: Create `.env`

```env
PORT=5000
JWT_SECRET=replace-with-a-long-random-secret
```

Add `.env` to `.gitignore`.

### Step 3: Create `server.js`

```javascript
require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { z } = require("zod");

const app = express();

app.use(express.json());

const users = [
    {
        id: 1,
        email: "riyaz@example.com",
        passwordHash: bcrypt.hashSync("password123", 12),
        role: "admin"
    }
];

// Login validation schema
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

// Rate limiter
const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5
});

// Login route
app.post("/api/login", loginLimiter, async (req, res) => {
    try {
        const validation = loginSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input"
            });
        }

        const { email, password } = validation.data;

        const user = users.find(
            (item) => item.email === email
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const isValid = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.status(200).json({
            message: "Login successful",
            accessToken: token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Authentication middleware
function authenticateToken(req, res, next) {
    const authorization = req.headers.authorization;

    const token = authorization?.startsWith("Bearer ")
        ? authorization.slice(7)
        : null;

    if (!token) {
        return res.status(401).json({
            message: "Authentication required"
        });
    }

    try {
        req.user = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

// Protected route
app.get("/api/profile", authenticateToken, (req, res) => {
    res.status(200).json({
        message: "Profile accessed successfully",
        user: req.user
    });
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running");
});
```

### What Does This Project Demonstrate?

1. Input validation.
2. Password hashing.
3. Password verification.
4. JWT generation.
5. JWT verification.
6. Authentication middleware.
7. Rate limiting.
8. Environment variables.
9. HTTP status codes.
10. Protected API endpoints.

**Production note:** This is a learning example, not a complete production authentication system. A production application should use a persistent database, stronger account protections, key rotation, carefully configured rate limiting, secure token handling, and appropriate authorization checks. Avoid synchronous password hashing in request handlers.

---

# 40. Important Interview Questions

| No. | Question | Short Answer |
|---|---|---|
| 1 | What is XSS? | Injection of malicious scripts into webpages. |
| 2 | What are the types of XSS? | Stored, reflected, and DOM-based. |
| 3 | How can XSS be prevented? | Safe DOM APIs, sanitization, output encoding, and CSP. |
| 4 | What is CSRF? | An attack that tricks a browser into sending unwanted authenticated requests. |
| 5 | How can CSRF be prevented? | CSRF tokens, SameSite cookies, and origin validation. |
| 6 | What is SQL Injection? | Manipulation of SQL queries through untrusted input. |
| 7 | How can SQL Injection be prevented? | Parameterized queries and least-privilege database access. |
| 8 | What is NoSQL Injection? | Manipulation of NoSQL queries using untrusted input. |
| 9 | What is Clickjacking? | Tricking users into interacting with disguised or hidden UI. |
| 10 | What is CSP? | A browser policy controlling allowed resource sources. |
| 11 | What is HttpOnly? | Cookie attribute preventing JavaScript access. |
| 12 | What is SameSite? | Cookie attribute controlling cross-site cookie sending. |
| 13 | What is Input Validation? | Checking whether input meets requirements. |
| 14 | What is Sanitization? | Cleaning or transforming input for safe use. |
| 15 | What is Rate Limiting? | Restricting requests within a time period. |
| 16 | What is Debouncing? | Executing after a quiet period. |
| 17 | What is Throttling? | Limiting execution frequency. |
| 18 | What is Garbage Collection? | Automatic reclamation of unreachable memory. |
| 19 | What is a Memory Leak? | Unneeded memory remains reachable. |
| 20 | What is Reflow? | Recalculation of layout. |
| 21 | What is Repaint? | Redrawing visual elements. |
| 22 | What is Lazy Loading? | Loading resources when needed. |
| 23 | What is Code Splitting? | Dividing application code into smaller chunks. |
| 24 | What is Tree Shaking? | Removing unused code during bundling. |
| 25 | What is Lighthouse? | A tool for auditing web application quality. |
| 26 | What is LCP? | Largest Contentful Paint; loading performance. |
| 27 | What is INP? | Interaction to Next Paint; responsiveness. |
| 28 | What is CLS? | Cumulative Layout Shift; visual stability. |

---

# 41. Practical Exercises

Try completing these exercises yourself.

| No. | Exercise | Difficulty |
|---|---|---|
| 1 | Identify and fix an XSS vulnerability using `innerHTML`. | Easy |
| 2 | Implement HTML sanitization using DOMPurify. | Easy |
| 3 | Implement input validation using Zod. | Medium |
| 4 | Build a login endpoint with rate limiting. | Medium |
| 5 | Implement password hashing using bcrypt. | Medium |
| 6 | Implement JWT authentication middleware. | Medium |
| 7 | Configure secure authentication cookies. | Advanced |
| 8 | Implement CSRF token validation. | Advanced |
| 9 | Fix a vulnerable SQL query using parameterized queries. | Medium |
| 10 | Identify and prevent NoSQL injection in a MongoDB login API. | Advanced |
| 11 | Configure a Content Security Policy. | Advanced |
| 12 | Build a reusable debounce function. | Easy |
| 13 | Build a reusable throttle function. | Easy |
| 14 | Detect a memory leak using Chrome DevTools. | Advanced |
| 15 | Optimize a page with excessive DOM manipulation. | Advanced |
| 16 | Implement lazy loading for images. | Medium |
| 17 | Implement React route-based code splitting. | Medium |
| 18 | Analyze a website using Lighthouse. | Medium |
| 19 | Improve LCP, INP, and CLS. | Advanced |

---

# 42. Output-Based Questions

Try predicting the output before checking the answers.

### Question 1: Debouncing

```javascript
function debounce(callback, delay) {
    let timer;

    return function () {
        clearTimeout(timer);

        timer = setTimeout(callback, delay);
    };
}

const test = debounce(() => {
    console.log("Hello");
}, 500);

test();
test();
test();
```

How many times will `"Hello"` be printed if all three calls happen within 500 milliseconds?

### Question 2: Throttling

```javascript
function throttle(callback, delay) {
    let lastExecution = 0;

    return function () {
        const now = Date.now();

        if (now - lastExecution >= delay) {
            lastExecution = now;

            callback();
        }
    };
}

const test = throttle(() => {
    console.log("Executed");
}, 1000);

test();
test();
test();
```

Assuming all three calls happen immediately, how many times will the callback execute?

### Question 3: Garbage Collection

```javascript
let user = {
    name: "Riyaz"
};

let admin = user;

user = null;

console.log(admin.name);
```

Will the object be eligible for garbage collection?

### Question 4: XSS Prevention

```javascript
const input = "<h1>Hello</h1>";

document.querySelector("#output").textContent = input;
```

Will the browser render a heading or display the HTML as text?

### Question 5: HTTP Security

Which HTTP status code is commonly returned when a rate limit is exceeded?

### Question 6: Performance

Which Core Web Vital measures visual layout stability?

### Question 7: Memory

```javascript
const cache = new Map();

cache.set("user", {
    name: "Riyaz"
});

cache.clear();
```

What happens to the entry stored in the Map?

### Question 8: Rendering

Which operation generally requires layout recalculation?

```javascript
element.style.width = "500px";
```

Or:

```javascript
element.style.backgroundColor = "red";
```

## Answers

| Question | Answer |
|---|---|
| 1 | Once |
| 2 | Once |
| 3 | No. `admin` still references the object. |
| 4 | Displays the HTML as text. |
| 5 | `429 Too Many Requests` |
| 6 | CLS |
| 7 | The Map no longer references the entry. Its object becomes eligible for garbage collection if nothing else references it. |
| 8 | Changing width generally requires layout recalculation. Changing background color generally requires repainting. |

---

# 43. Important Documentation

| Topic | Documentation |
|---|---|
| XSS Prevention | [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html?utm_source=chatgpt.com) |
| CSRF Prevention | [OWASP CSRF Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html?utm_source=chatgpt.com) |
| SQL Injection | [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html?utm_source=chatgpt.com) |
| NoSQL Security | [OWASP NoSQL Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/NoSQL_Security_Cheat_Sheet.html?utm_source=chatgpt.com) |
| CSP | [MDN CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP?utm_source=chatgpt.com) |
| Cookies | [MDN HTTP Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies?utm_source=chatgpt.com) |
| DOMPurify | [DOMPurify GitHub](https://github.com/cure53/DOMPurify?utm_source=chatgpt.com) |
| Zod | [Zod Documentation](https://zod.dev/?utm_source=chatgpt.com) |
| bcrypt | [bcrypt npm](https://www.npmjs.com/package/bcrypt?utm_source=chatgpt.com) |
| Express Rate Limit | [Express Rate Limit](https://express-rate-limit.mintlify.app/?utm_source=chatgpt.com) |
| JavaScript Memory Management | [MDN Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management?utm_source=chatgpt.com) |
| Chrome DevTools Performance | [Chrome Performance Documentation](https://developer.chrome.com/docs/devtools/performance/overview?utm_source=chatgpt.com) |
| Lighthouse | [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/overview/?utm_source=chatgpt.com) |
| Core Web Vitals | [Web.dev Core Web Vitals](https://web.dev/articles/vitals?utm_source=chatgpt.com) |

---

# JavaScript Revision Roadmap – Progress

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

## Next: Phase 14 – JavaScript Design Patterns & Architecture

Topics we will cover:

1. What are Design Patterns?
2. Why do we need Design Patterns?
3. Creational Design Patterns.
4. Constructor Pattern.
5. Factory Pattern.
6. Singleton Pattern.
7. Prototype Pattern.
8. Module Pattern.
9. Revealing Module Pattern.
10. Structural Design Patterns.
11. Adapter Pattern.
12. Decorator Pattern.
13. Facade Pattern.
14. Proxy Pattern.
15. Composite Pattern.
16. Behavioral Design Patterns.
17. Observer Pattern.
18. Pub/Sub Pattern.
19. Mediator Pattern.
20. Strategy Pattern.
21. Command Pattern.
22. Iterator Pattern.
23. State Pattern.
24. Dependency Injection.
25. Separation of Concerns.
26. DRY Principle.
27. KISS Principle.
28. SOLID Principles.
29. Clean Code.
30. Separation of Business Logic and UI Logic.
31. MVC Architecture.
32. Layered Architecture.
33. Event-Driven Architecture.
34. Component-Based Architecture.
35. Common JavaScript Architecture Mistakes.

**Phase 13 completed.**