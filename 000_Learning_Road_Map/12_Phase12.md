# JavaScript Revision Notes – Phase 12
# Networking & HTTP Fundamentals

In this phase, we will learn how JavaScript applications communicate with servers, how HTTP works, how APIs are designed, and how authentication and real-time communication work.

These concepts are essential for frontend and backend development, especially when working with React, Next.js, Node.js, and Express.

---

# 1. What is the Internet?

The Internet is a global network of interconnected computer networks that communicate using standardized protocols.

It allows devices around the world to exchange information.

Examples:

- Browsing websites.
- Sending emails.
- Watching videos.
- Using online applications.
- Communicating with APIs.

### How does the Internet work?

Suppose you open:

```text
https://www.google.com
```

A simplified process:

```text
Your Browser
     |
     | 1. DNS Lookup
     v
Find Server IP Address
     |
     | 2. Establish Connection
     v
Google Server
     |
     | 3. HTTP Request
     v
Server Processes Request
     |
     | 4. HTTP Response
     v
Your Browser
     |
     v
Displays Website
```

### What is an IP Address?

An IP address identifies a device or network interface on an IP network.

Example IPv4 address:

```text
192.168.1.10
```

Example IPv6 address:

```text
2001:db8::1
```

### What is DNS?

DNS stands for Domain Name System.

It translates domain names into IP addresses.

For example:

```text
google.com
     |
     v
DNS Lookup
     |
     v
142.250.x.x
```

The actual IP address can vary depending on location, DNS provider, and infrastructure.

**Remember:**

- Domain name: Human-readable website address.
- IP address: Network address.
- DNS: System that resolves domain names to IP addresses.

---

# 2. What is HTTP?

HTTP stands for Hypertext Transfer Protocol.

It is an application-layer protocol used for communication between clients and servers.

For example:

When your browser requests a webpage:

```text
Browser → HTTP Request → Server

Browser ← HTTP Response ← Server
```

HTTP defines how requests and responses are structured.

### Example

Suppose your frontend wants to retrieve users from a backend.

Frontend:

```javascript
fetch("https://example.com/api/users");
```

The browser sends an HTTP request to the server.

The server processes the request and sends an HTTP response.

### Important Characteristics of HTTP

1. It follows a request-response model.
2. It is stateless by default.
3. It supports multiple request methods.
4. It uses headers to transfer metadata.
5. It supports different response status codes.

### What does Stateless Mean?

HTTP is stateless because each request is independent by default.

The server does not automatically remember previous requests.

Example:

```text
Request 1: Login
Request 2: Get Profile
Request 3: Get Orders
```

The server needs some mechanism, such as cookies or tokens, to associate these requests with the same authenticated user.

---

# 3. What is HTTPS?

HTTPS stands for Hypertext Transfer Protocol Secure.

It is HTTP communication protected by TLS (Transport Layer Security).

TLS provides:

1. Encryption.
2. Authentication of the server.
3. Integrity protection.

### HTTP vs HTTPS

| HTTP | HTTPS |
|---|---|
| No TLS protection | Protected by TLS |
| Data is not encrypted by HTTP itself | Data is encrypted in transit |
| URL starts with `http://` | URL starts with `https://` |
| No TLS certificate required | Requires a valid TLS certificate for normal authenticated HTTPS |
| Vulnerable to interception and modification | Protects against many network interception attacks |

### Example

HTTP:

```text
http://example.com
```

HTTPS:

```text
https://example.com
```

### Why is HTTPS Important?

Suppose a user submits login details.

Without HTTPS, network attackers may be able to read or modify the traffic.

With HTTPS, TLS protects the communication while it travels across the network.

**Important:** HTTPS does not automatically make an application secure. You still need proper authentication, authorization, input validation, and secure application logic.

---

# 4. How Does a Browser Communicate with a Server?

Let's understand the complete process.

Suppose a user opens:

```text
https://example.com/products
```

### Step 1: DNS Resolution

The browser resolves the domain name to an IP address.

### Step 2: Connection Establishment

The browser establishes a connection to the server.

For HTTPS, this involves TLS negotiation.

Depending on the protocol, communication may use TCP or QUIC.

### Step 3: HTTP Request

The browser sends an HTTP request.

Example:

```http
GET /products HTTP/1.1
Host: example.com
Accept: text/html
```

### Step 4: Server Processing

The server receives the request.

It may:

- Execute backend code.
- Query a database.
- Validate authentication.
- Retrieve information.
- Generate a response.

### Step 5: HTTP Response

The server sends a response.

```http
HTTP/1.1 200 OK
Content-Type: text/html
```

### Step 6: Browser Rendering

The browser processes the response and displays the webpage.

### Complete Flow

```text
User
 |
 v
Browser
 |
 v
DNS Resolution
 |
 v
Server Connection
 |
 v
HTTP Request
 |
 v
Backend Server
 |
 v
Database (if needed)
 |
 v
Backend Processing
 |
 v
HTTP Response
 |
 v
Browser Rendering
```

---

# 5. What is a Client and Server?

A client is a device or application that requests a service.

A server is a system that receives requests and provides services or resources.

### Example

Consider a React application and a Node.js backend.

```text
React Frontend
     |
     | HTTP Request
     v
Node.js / Express Backend
     |
     | Database Query
     v
MongoDB
```

Here:

- React is the client.
- Node.js/Express is the server.
- MongoDB is the database.

### Client vs Server

| Client | Server |
|---|---|
| Sends requests | Receives requests |
| Displays user interface | Handles business logic |
| Runs in browser or application | Runs on a server environment |
| Example: React | Example: Express |
| Consumes APIs | Provides APIs |

**Important:** Client and server are roles, not necessarily separate physical computers. A single machine can run both.

---

# 6. What is Request and Response?

HTTP communication uses requests and responses.

### Request

A request is a message sent by a client to a server.

Example:

```http
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
```

### Response

A response is a message sent by the server to the client.

Example:

```http
HTTP/1.1 200 OK
Content-Type: application/json

[
    {
        "id": 1,
        "name": "Riyaz"
    }
]
```

### HTTP Request Structure

An HTTP request contains:

1. Request line.
2. Headers.
3. Optional body.

Example:

```http
POST /api/users HTTP/1.1
Host: example.com
Content-Type: application/json
Authorization: Bearer TOKEN

{
    "name": "Riyaz",
    "email": "riyaz@example.com"
}
```

### HTTP Response Structure

An HTTP response contains:

1. Status line.
2. Headers.
3. Optional body.

Example:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
    "message": "User created successfully"
}
```

---

# 7. What are HTTP Request Methods?

HTTP methods define the intended operation of a request.

The most commonly used methods are:

| Method | Purpose | Example |
|---|---|---|
| GET | Retrieve data | Get all users |
| POST | Submit data or create a resource | Create user |
| PUT | Replace a resource | Replace user details |
| PATCH | Partially update a resource | Update username |
| DELETE | Delete a resource | Delete user |
| HEAD | Retrieve headers without the response body | Check resource metadata |
| OPTIONS | Describe communication options | Check supported methods and CORS preflight |

### GET Example

```javascript
fetch("/api/users");
```

### POST Example

```javascript
fetch("/api/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Riyaz"
    })
});
```

### PUT Example

```javascript
fetch("/api/users/1", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Riyaz",
        email: "riyaz@example.com"
    })
});
```

### PATCH Example

```javascript
fetch("/api/users/1", {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Ahmed"
    })
});
```

### DELETE Example

```javascript
fetch("/api/users/1", {
    method: "DELETE"
});
```

### PUT vs PATCH

| PUT | PATCH |
|---|---|
| Intended to replace the target resource | Intended to apply partial modifications |
| Usually sends a complete representation | Usually sends only changed fields |
| Defined as idempotent | Idempotency depends on the particular patch operation |

### What is Idempotency?

An operation is idempotent if performing it multiple times has the same intended effect as performing it once.

Example:

```http
DELETE /api/users/10
```

Deleting the same resource multiple times should leave the resource deleted.

### HTTP Method Properties

| Method | Safe? | Idempotent? |
|---|---|---|
| GET | Yes | Yes |
| HEAD | Yes | Yes |
| OPTIONS | Yes | Yes |
| POST | No | Not necessarily |
| PUT | No | Yes |
| PATCH | No | Not necessarily |
| DELETE | No | Yes |

- **Safe:** The method is intended not to change server state.
- **Idempotent:** Repeating the same request has the same intended effect.

---

# 8. What are HTTP Status Codes?

HTTP status codes indicate the result of an HTTP request.

They are divided into five categories.

| Category | Range | Meaning |
|---|---|---|
| 1xx | 100–199 | Informational |
| 2xx | 200–299 | Success |
| 3xx | 300–399 | Redirection |
| 4xx | 400–499 | Client error |
| 5xx | 500–599 | Server error |

### Important 2xx Status Codes

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 202 | Accepted |
| 204 | No Content |

### Important 3xx Status Codes

| Code | Meaning |
|---|---|
| 301 | Moved Permanently |
| 302 | Found |
| 304 | Not Modified |
| 307 | Temporary Redirect |
| 308 | Permanent Redirect |

### Important 4xx Status Codes

| Code | Meaning |
|---|---|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 409 | Conflict |
| 415 | Unsupported Media Type |
| 422 | Unprocessable Content |
| 429 | Too Many Requests |

### Important 5xx Status Codes

| Code | Meaning |
|---|---|
| 500 | Internal Server Error |
| 501 | Not Implemented |
| 502 | Bad Gateway |
| 503 | Service Unavailable |
| 504 | Gateway Timeout |

### Important: 401 vs 403

**401 Unauthorized**

The request lacks valid authentication credentials.

Example:

```text
User is not logged in.
```

**403 Forbidden**

The server understands the request but refuses to authorize it.

Example:

```text
User is logged in but does not have admin permission.
```

### Important: 400 vs 422

- `400 Bad Request`: The request is malformed or cannot be processed as submitted.
- `422 Unprocessable Content`: The request content is understood but its instructions or data cannot be processed.

The exact choice depends on the API's design.

---

# 9. What are HTTP Headers?

HTTP headers carry metadata about requests and responses.

They provide additional information about communication.

### Request Headers

Example:

```http
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer TOKEN
```

### Common Request Headers

| Header | Purpose |
|---|---|
| `Accept` | Media types the client can accept |
| `Content-Type` | Media type of the request body |
| `Authorization` | Authentication credentials |
| `User-Agent` | Client identification |
| `Cookie` | Sends applicable cookies |
| `Origin` | Identifies the request origin |
| `Cache-Control` | Cache directives |

### Response Headers

Example:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-cache
```

### Common Response Headers

| Header | Purpose |
|---|---|
| `Content-Type` | Type of response body |
| `Content-Length` | Body size in bytes, when supplied |
| `Set-Cookie` | Sets cookies |
| `Cache-Control` | Cache directives |
| `Access-Control-Allow-Origin` | CORS allowed origin |
| `Location` | Identifies a redirect or newly created resource, depending on status |
| `ETag` | Resource version identifier for cache validation |

### Content-Type vs Accept

This is an important interview question.

**Content-Type**

Describes the format of the data being sent.

```http
Content-Type: application/json
```

**Accept**

Describes the response formats the client can accept.

```http
Accept: application/json
```

### Example Using Fetch

```javascript
fetch("/api/users", {
    headers: {
        "Accept": "application/json",
        "Authorization": "Bearer TOKEN"
    }
});
```

---

# 10. What is an HTTP Request Body?

The request body contains data sent from the client to the server.

It is commonly used with POST, PUT, and PATCH requests.

### Example

```javascript
fetch("/api/users", {
    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        name: "Riyaz",
        age: 25
    })
});
```

Here:

- `method`: HTTP method.
- `headers`: Request metadata.
- `body`: Actual data being submitted.

### Common Body Formats

| Format | Content-Type | Use Case |
|---|---|---|
| JSON | `application/json` | APIs |
| Form URL Encoded | `application/x-www-form-urlencoded` | Traditional form submissions |
| Multipart Form Data | `multipart/form-data` | File uploads |
| Plain Text | `text/plain` | Text-based data |
| XML | `application/xml` | XML-based systems |

### Example: FormData

```javascript
const formData = new FormData();

formData.append("name", "Riyaz");

formData.append("profile", fileInput.files[0]);

fetch("/api/upload", {
    method: "POST",
    body: formData
});
```

**Important:** When sending `FormData` using Fetch, do not manually set the `Content-Type` header. The browser must add the multipart boundary automatically.

---

# 11. What are Query Parameters?

Query parameters are key-value pairs added to the URL after `?`.

Example:

```text
https://example.com/api/users?page=2&limit=10
```

Here:

- `page=2`
- `limit=10`

They are commonly used for filtering, searching, sorting, and pagination.

### Example Using Fetch

```javascript
fetch("/api/users?page=2&limit=10");
```

### Using URLSearchParams

```javascript
const params = new URLSearchParams({
    page: 2,
    limit: 10,
    search: "Riyaz"
});

fetch(`/api/users?${params.toString()}`);
```

Generated URL:

```text
/api/users?page=2&limit=10&search=Riyaz
```

### Access Query Parameters in JavaScript

```javascript
const params = new URLSearchParams(window.location.search);

const page = params.get("page");
const limit = params.get("limit");

console.log(page);
console.log(limit);
```

### Query Parameters vs Route Parameters

**Route Parameters**

These are dynamic values embedded in the URL path.

Example:

```text
/api/users/10
```

Here `10` is a route parameter representing a user ID.

Express:

```javascript
app.get("/api/users/:id", (req, res) => {
    console.log(req.params.id);
});
```

**Query Parameters**

These are values added after `?`.

Example:

```text
/api/users?page=2
```

Express:

```javascript
app.get("/api/users", (req, res) => {
    console.log(req.query.page);
});
```

### Comparison

| Route Parameters | Query Parameters |
|---|---|
| Part of URL path | Added after `?` |
| Commonly identify a resource | Commonly filter or modify a collection request |
| `req.params` in Express | `req.query` in Express |
| `/users/10` | `/users?page=2` |

---

# 12. What is a REST API?

REST stands for Representational State Transfer.

It is an architectural style for designing networked applications.

A REST API exposes resources through URLs and uses HTTP methods to interact with those resources.

### Example

Suppose we have a user management application.

Common endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/users` | Get all users |
| GET | `/api/users/10` | Get one user |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/10` | Replace user |
| PATCH | `/api/users/10` | Update user |
| DELETE | `/api/users/10` | Delete user |

### What are REST Resources?

A resource is an identifiable object or collection exposed by an API.

Examples:

```text
/users
/products
/orders
/categories
```

### REST API Principles

Important REST constraints include:

1. Client-server architecture.
2. Stateless communication.
3. Cacheability.
4. Uniform interface.
5. Layered system.
6. Code on demand (optional).

### What is Statelessness in REST?

Each request should contain the information needed to process it.

The server should not depend on remembering client-specific session state between requests.

For example:

```javascript
fetch("/api/profile", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
```

The client sends authentication information with the request.

### Example REST Response

```json
{
    "success": true,
    "data": {
        "id": 10,
        "name": "Riyaz"
    }
}
```

**Important:** REST is an architectural style, not a specific library or programming language.

---

# 13. What is JSON?

JSON stands for JavaScript Object Notation.

It is a lightweight text-based data interchange format.

It is commonly used to transfer data between frontend and backend applications.

### Example

```json
{
    "name": "Riyaz",
    "age": 25,
    "skills": [
        "JavaScript",
        "React",
        "Node.js"
    ],
    "isDeveloper": true
}
```

### JSON Data Types

JSON supports:

1. String.
2. Number.
3. Boolean.
4. Object.
5. Array.
6. Null.

Example:

```json
{
    "name": "Riyaz",
    "age": 25,
    "isActive": true,
    "skills": ["React", "Node.js"],
    "address": null
}
```

### What is JSON.stringify()?

It converts a JavaScript value into a JSON string.

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

const jsonData = JSON.stringify(user);

console.log(jsonData);
```

Output:

```text
{"name":"Riyaz","age":25}
```

### What is JSON.parse()?

It converts a JSON string into a JavaScript value.

```javascript
const jsonData = '{"name":"Riyaz","age":25}';

const user = JSON.parse(jsonData);

console.log(user.name);
```

Output:

```text
Riyaz
```

### JSON vs JavaScript Objects

| JSON | JavaScript Object |
|---|---|
| Text-based data format | JavaScript data structure |
| Keys must use double quotes | Keys can often be unquoted |
| Strings require double quotes | Strings can use single, double, or backticks |
| Cannot contain functions | Can contain functions |
| Cannot contain `undefined` | Can contain `undefined` |
| Cannot contain comments | JavaScript code can contain comments |

### Example

Valid JSON:

```json
{
    "name": "Riyaz",
    "age": 25
}
```

JavaScript object:

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    greet() {
        console.log("Hello");
    }
};
```

**Important:** JSON is not the same as a JavaScript object. JSON is a text format that can represent certain data structures.

---

# 14. What is XML?

XML stands for Extensible Markup Language.

It is a markup language used to store and transport structured data.

### Example

```xml
<?xml version="1.0" encoding="UTF-8"?>

<user>
    <name>Riyaz</name>
    <age>25</age>
    <role>Developer</role>
</user>
```

### JSON vs XML

| JSON | XML |
|---|---|
| Lightweight data format | Markup language |
| Uses key-value structures | Uses tags |
| Easier to work with in JavaScript | Requires XML parsing |
| Common in modern REST APIs | Common in some enterprise and legacy systems |
| Less verbose in many cases | Often more verbose |

### Parse XML in JavaScript

```javascript
const xmlString = `
<user>
    <name>Riyaz</name>
    <age>25</age>
</user>
`;

const parser = new DOMParser();

const xmlDocument = parser.parseFromString(
    xmlString,
    "application/xml"
);

const name = xmlDocument.querySelector("name").textContent;

console.log(name);
```

Output:

```text
Riyaz
```

---

# 15. What is AJAX?

AJAX stands for Asynchronous JavaScript and XML.

It is a technique for communicating with servers asynchronously without requiring a full page reload.

Despite the name, AJAX does not require XML. Modern applications commonly exchange JSON.

### Without AJAX

```text
User Action
    |
    v
Full Page Request
    |
    v
Server Response
    |
    v
Entire Page Reload
```

### With AJAX

```text
User Action
    |
    v
JavaScript Request
    |
    v
Server
    |
    v
JSON Response
    |
    v
Update Specific UI
```

### Example

```javascript
async function loadUser() {
    const response = await fetch("/api/users/10");

    const user = await response.json();

    document.querySelector("#username").textContent = user.name;
}
```

The page does not need to reload to update the username.

### Important Point

AJAX is a technique, not a particular API.

It can be implemented using:

- XMLHttpRequest.
- Fetch API.

---

# 16. What is XMLHttpRequest (XHR)?

XMLHttpRequest is a browser API used to make HTTP requests.

It existed before the Fetch API and is still supported.

### Example

```javascript
const xhr = new XMLHttpRequest();

xhr.open(
    "GET",
    "https://jsonplaceholder.typicode.com/users"
);

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        const users = JSON.parse(xhr.responseText);

        console.log(users);
    } else {
        console.log("Request failed:", xhr.status);
    }
};

xhr.onerror = function () {
    console.log("Network error");
};

xhr.send();
```

### Important XHR Methods

| Method | Purpose |
|---|---|
| `open()` | Initialize request |
| `send()` | Send request |
| `setRequestHeader()` | Set request headers |
| `abort()` | Abort request |
| `getResponseHeader()` | Read a response header |
| `getAllResponseHeaders()` | Read all response headers |

### Fetch vs XMLHttpRequest

| Fetch API | XMLHttpRequest |
|---|---|
| Promise-based | Event/callback-based |
| Modern API | Older API |
| Cleaner async/await syntax | More verbose |
| Supports streaming response bodies | Supports progress events for uploads/downloads |
| Does not reject on HTTP error status | Also requires status checking |
| Does not provide built-in upload progress events in the same way | Supports upload progress events |

---

# 17. What is CORS?

CORS stands for Cross-Origin Resource Sharing.

It is a browser security mechanism that allows servers to specify which origins can access their resources.

### What is an Origin?

An origin consists of:

```text
Protocol + Domain + Port
```

Example:

```text
http://localhost:3000
```

Another URL:

```text
http://localhost:5000
```

These are different origins because their ports are different.

### Example CORS Problem

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```

Frontend sends:

```javascript
fetch("http://localhost:5000/api/users");
```

The browser checks whether the backend permits this origin.

If the required CORS headers are missing or incorrect, the browser blocks JavaScript from accessing the response.

### Express CORS Configuration

Install:

```bash
npm install cors
```

Use:

```javascript
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "http://localhost:3000"
}));
```

Now the backend permits requests from the specified frontend origin.

### Allow Multiple Origins

```javascript
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://example.com"
    ]
}));
```

**Important:**

- CORS is enforced by browsers.
- It does not replace authentication.
- It does not prevent non-browser clients such as curl or Postman from making requests.
- CORS errors usually need to be fixed on the server.

---

# 18. What is a Preflight Request?

A preflight request is an HTTP OPTIONS request that a browser sends before certain cross-origin requests.

It checks whether the actual request is permitted by the server's CORS policy.

### When is Preflight Required?

For example, a cross-origin request using:

```http
PUT
```

or a custom header:

```http
Authorization: Bearer TOKEN
```

may trigger a preflight request.

### Preflight Flow

```text
Browser
   |
   | OPTIONS Request
   v
Backend Server
   |
   | CORS Permission Response
   v
Browser
   |
   | Actual Request
   v
Backend Server
```

### Example Preflight Request

```http
OPTIONS /api/users HTTP/1.1
Origin: http://localhost:3000
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: authorization, content-type
```

### Example Response

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Authorization, Content-Type
```

If the preflight succeeds, the browser can send the actual request, subject to other checks.

**Important:** Not every cross-origin request triggers a preflight. Some requests qualify as CORS-safelisted requests.

---

# 19. What are Authentication and Authorization?

These are two important security concepts.

### Authentication

Authentication verifies who the user is.

Example:

```text
Username: riyaz
Password: ********
```

The server verifies the credentials.

### Authorization

Authorization determines what an authenticated user is allowed to do.

Example:

```text
Admin → Can delete users
Normal User → Cannot delete users
```

### Authentication vs Authorization

| Authentication | Authorization |
|---|---|
| Verifies identity | Checks permissions |
| Answers: Who are you? | Answers: What can you access? |
| Happens before protected access is granted | Happens after identity is established in typical systems |
| Example: Login | Example: Admin-only route |

### Example

Suppose:

```text
User A: Normal User
User B: Admin
```

Both users can log in.

But only the admin can access:

```text
DELETE /api/users/10
```

This is authorization.

---

# 20. What is Basic Authentication?

Basic Authentication is an HTTP authentication scheme.

It sends credentials using the `Authorization` header.

Format:

```http
Authorization: Basic BASE64_ENCODED_CREDENTIALS
```

The credentials are generally:

```text
username:password
```

encoded using Base64.

### Example

```javascript
const credentials = btoa("riyaz:password123");

fetch("/api/users", {
    headers: {
        Authorization: `Basic ${credentials}`
    }
});
```

### Important Security Point

Base64 is encoding, not encryption.

Anyone who obtains the encoded credentials can decode them.

Therefore, Basic Authentication must only be used over HTTPS and should be handled carefully.

---

# 21. What is Token-Based Authentication?

Token-based authentication is an approach where the server issues a token after successful authentication.

The client sends the token with subsequent requests.

### Authentication Flow

```text
User
 |
 | Login Credentials
 v
Backend Server
 |
 | Verify Credentials
 v
Generate Token
 |
 | Return Token
 v
Frontend
 |
 | Store Token
 v
Send Token with Future Requests
 |
 v
Backend Verifies Token
 |
 v
Allow or Reject Request
```

### Example Login Request

```javascript
async function login() {
    const response = await fetch("/api/login", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: "riyaz@example.com",
            password: "password123"
        })
    });

    const data = await response.json();

    console.log(data);
}
```

### Sending a Token

```javascript
fetch("/api/profile", {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
```

### Important

Token-based authentication does not require JWT specifically. Tokens can be opaque random strings or structured tokens such as JWTs.

Also, where tokens are stored matters. Browser Local Storage is accessible to JavaScript, while HttpOnly cookies can reduce exposure to token theft through certain XSS scenarios. Cookie-based authentication requires appropriate CSRF protections.

---

# 22. What is JWT?

JWT stands for JSON Web Token.

It is a compact format for representing claims between parties.

JWTs are commonly used for authentication and authorization.

### JWT Structure

A JWT contains three parts:

```text
HEADER.PAYLOAD.SIGNATURE
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

### 1. Header

Contains metadata about the token.

```json
{
    "alg": "HS256",
    "typ": "JWT"
}
```

### 2. Payload

Contains claims.

```json
{
    "id": 10,
    "name": "Riyaz",
    "role": "admin"
}
```

### 3. Signature

The signature helps verify that the token has not been modified and that it was signed using the expected key.

### JWT Flow

```text
Login Request
     |
     v
Backend Verifies User
     |
     v
JWT Generated
     |
     v
Token Returned
     |
     v
Client Sends JWT
     |
     v
Backend Verifies Signature
     |
     v
Checks Claims and Permissions
     |
     v
Access Granted / Denied
```

### Important JWT Claims

| Claim | Purpose |
|---|---|
| `iss` | Issuer |
| `sub` | Subject |
| `aud` | Audience |
| `exp` | Expiration time |
| `iat` | Issued at |
| `nbf` | Not valid before |
| `jti` | JWT ID |

### Important Security Points

1. A signed JWT is not automatically encrypted.
2. Its payload is generally readable after Base64URL decoding.
3. Never put passwords or secrets in the payload.
4. Verify the signature and expected algorithm.
5. Validate expiration, issuer, and audience where applicable.
6. Use HTTPS.
7. Keep signing keys secure.

**Important:** JWT is a token format, not a complete authentication system.

---

# 23. What are Access Tokens and Refresh Tokens?

Modern authentication systems often use two types of tokens.

### Access Token

An access token is used to access protected resources.

It generally has a relatively short lifetime.

Example:

```text
Access Token
Expiration: 15 minutes
```

### Refresh Token

A refresh token is used to obtain a new access token after the previous one expires.

It generally has a longer lifetime.

Example:

```text
Refresh Token
Expiration: 7 days
```

### Authentication Flow

```text
User Login
    |
    v
Backend
    |
    v
Access Token + Refresh Token
    |
    v
Frontend
    |
    v
Access Protected API
    |
    v
Access Token Expires
    |
    v
Send Refresh Token
    |
    v
Backend Validates Refresh Token
    |
    v
New Access Token
```

### Comparison

| Access Token | Refresh Token |
|---|---|
| Accesses protected APIs | Obtains new access tokens |
| Short-lived in many designs | Longer-lived in many designs |
| Sent with resource requests | Sent to refresh endpoint |
| Limited permissions may be included | Used to renew authentication |

### Important Security Practices

- Rotate refresh tokens when appropriate.
- Store refresh tokens securely.
- Revoke tokens when necessary.
- Validate token expiration.
- Detect refresh-token reuse in systems that support rotation.
- Avoid exposing long-lived credentials to JavaScript unnecessarily.

---

# 24. What is WebSocket?

WebSocket is a communication protocol that provides full-duplex communication over a single connection.

It allows the client and server to send messages to each other independently after establishing the connection.

It is commonly used for real-time applications.

Examples:

- Chat applications.
- Live notifications.
- Multiplayer games.
- Live dashboards.
- Collaborative applications.

### Normal HTTP Communication

```text
Client
   |
   | Request
   v
Server
   |
   | Response
   v
Client
```

Usually, the client initiates each exchange.

### WebSocket Communication

```text
Client  <---------------->  Server
          Persistent
          Connection
```

Both sides can send messages whenever needed.

### Basic Browser Example

```javascript
const socket = new WebSocket("wss://example.com/socket");

socket.onopen = () => {
    console.log("Connected");

    socket.send("Hello Server");
};

socket.onmessage = (event) => {
    console.log("Message:", event.data);
};

socket.onerror = (error) => {
    console.log("WebSocket error:", error);
};

socket.onclose = () => {
    console.log("Connection closed");
};
```

### Important WebSocket Events

| Event | Purpose |
|---|---|
| `open` | Connection established |
| `message` | Message received |
| `error` | Error occurred |
| `close` | Connection closed |

### WebSocket URL

```text
ws://example.com
```

Unencrypted WebSocket.

```text
wss://example.com
```

WebSocket protected by TLS.

---

# 25. HTTP vs WebSocket

| HTTP | WebSocket |
|---|---|
| Request-response communication | Full-duplex communication |
| Client typically initiates each request | Both sides can send messages |
| Commonly used for REST APIs | Commonly used for real-time communication |
| Requests and responses are independent | Connection can remain open |
| Stateless protocol by default | Connection maintains communication state |
| Example: Fetch users | Example: Live chat |

### When should you use HTTP?

- Login.
- Registration.
- Fetching products.
- Creating orders.
- Updating user profiles.

### When should you use WebSocket?

- Chat messaging.
- Live notifications.
- Real-time game updates.
- Live dashboards.

---

# 26. What are Server-Sent Events (SSE)?

Server-Sent Events allow a server to send event updates to a browser over a long-lived HTTP connection.

Communication is primarily one-way:

```text
Server → Client
```

The client opens a connection, and the server sends events whenever updates are available.

### Common Use Cases

- Live notifications.
- Stock price updates.
- Live order tracking.
- AI response streaming.
- Progress updates.

### Browser Example

```javascript
const eventSource = new EventSource("/api/events");

eventSource.onmessage = (event) => {
    console.log("New message:", event.data);
};

eventSource.onerror = (error) => {
    console.log("SSE error:", error);
};
```

Close the connection:

```javascript
eventSource.close();
```

### Server-Side Example Using Express

```javascript
const express = require("express");

const app = express();

app.get("/api/events", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    res.write("data: Connected to SSE\n\n");

    const interval = setInterval(() => {
        res.write(`data: Current time: ${new Date().toISOString()}\n\n`);
    }, 3000);

    req.on("close", () => {
        clearInterval(interval);
    });
});

app.listen(5000);
```

Open:

```text
http://localhost:5000/api/events
```

The browser receives updates approximately every three seconds.

### Important SSE Characteristics

- Server-to-client communication.
- Uses HTTP.
- Supports automatic reconnection in the browser's EventSource implementation.
- Supports named events.
- Text-based event stream.
- Does not provide the same bidirectional communication as WebSocket.

---

# 27. HTTP vs WebSocket vs SSE

| Feature | HTTP | WebSocket | SSE |
|---|---|---|---|
| Communication | Request-response | Bidirectional | Server-to-client |
| Connection | Per request or managed by protocol | Persistent | Long-lived HTTP connection |
| Real-time updates | Usually polling or streaming | Yes | Yes |
| Client sends messages | Yes, through requests | Yes | Through separate HTTP requests |
| Server sends updates | In response to requests | Anytime | Anytime |
| Browser API | Fetch | WebSocket | EventSource |
| Typical use | CRUD APIs | Chat applications | Live notifications |

### Which One Should You Choose?

| Requirement | Recommended |
|---|---|
| Fetch user details | HTTP |
| Submit login form | HTTP |
| Create an order | HTTP |
| Real-time chat | WebSocket |
| Multiplayer game | WebSocket |
| Live stock updates | SSE or WebSocket |
| AI-generated text streaming | SSE or streaming HTTP |
| Live order status | SSE or WebSocket |

---

# 28. Practical Project: Build a Client-Server Application

Let's create a small application using JavaScript, Node.js, and Express.

### Project Structure

```text
networking-project/
│
├── package.json
│
├── server/
│   └── index.js
│
└── client/
    └── index.html
```

### Step 1: Initialize Project

```bash
npm init -y
```

Install Express:

```bash
npm install express cors
```

### Step 2: Create Backend

`server/index.js`

```javascript
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const users = [
    {
        id: 1,
        name: "Riyaz",
        role: "Developer"
    },
    {
        id: 2,
        name: "Ahmed",
        role: "Designer"
    }
];

// GET all users
app.get("/api/users", (req, res) => {
    res.status(200).json(users);
});

// GET single user
app.get("/api/users/:id", (req, res) => {
    const user = users.find(
        (item) => item.id === Number(req.params.id)
    );

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);
});

// POST create user
app.post("/api/users", (req, res) => {
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({
            message: "Name and role are required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        role
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created",
        data: newUser
    });
});

// DELETE user
app.delete("/api/users/:id", (req, res) => {
    const index = users.findIndex(
        (user) => user.id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users.splice(index, 1);

    res.status(204).send();
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
```

### Step 3: Create Frontend

`client/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Networking Project</title>
</head>

<body>

    <h1>User Management</h1>

    <button id="loadUsers">Load Users</button>

    <ul id="userList"></ul>

    <script>
        const button = document.querySelector("#loadUsers");

        const userList = document.querySelector("#userList");

        button.addEventListener("click", async () => {

            try {
                const response = await fetch(
                    "http://localhost:5000/api/users"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const users = await response.json();

                userList.innerHTML = "";

                users.forEach((user) => {
                    const li = document.createElement("li");

                    li.textContent = `${user.name} - ${user.role}`;

                    userList.appendChild(li);
                });

            } catch (error) {
                console.error(error);
            }

        });
    </script>

</body>

</html>
```

### Step 4: Run Backend

```bash
node server/index.js
```

Open `client/index.html` through a local development server.

Click **Load Users**.

Expected output:

```text
Riyaz - Developer
Ahmed - Designer
```

### What Did We Learn?

This small project demonstrates:

1. Client-server communication.
2. HTTP GET requests.
3. HTTP POST requests.
4. HTTP DELETE requests.
5. JSON data exchange.
6. Express routes.
7. Request parameters.
8. Request bodies.
9. HTTP status codes.
10. CORS configuration.
11. Fetch API.
12. Error handling.

---

# 29. Important Interview Questions

| No. | Question | Short Answer |
|---|---|---|
| 1 | What is HTTP? | Application-layer request-response protocol. |
| 2 | What is HTTPS? | HTTP protected by TLS. |
| 3 | What is DNS? | System that resolves domain names to IP addresses. |
| 4 | What is an IP address? | Address identifying a network interface. |
| 5 | What is a stateless protocol? | A protocol where each request is independent by default. |
| 6 | What is REST? | Architectural style for networked applications. |
| 7 | What is JSON? | Text-based data interchange format. |
| 8 | What is AJAX? | Technique for asynchronous server communication. |
| 9 | What is XHR? | Browser API for HTTP requests. |
| 10 | What is CORS? | Browser-enforced cross-origin access mechanism. |
| 11 | What is a preflight request? | OPTIONS request checking CORS permissions. |
| 12 | What is the difference between PUT and PATCH? | PUT replaces a resource; PATCH partially modifies it. |
| 13 | What is the difference between 401 and 403? | 401 concerns authentication; 403 concerns permission. |
| 14 | What is the difference between 400 and 500? | Client-side request error vs server-side error. |
| 15 | What is an idempotent method? | Repeating the operation has the same intended effect. |
| 16 | What is a JWT? | Compact token format for representing claims. |
| 17 | What is an access token? | Token used to access protected resources. |
| 18 | What is a refresh token? | Token used to obtain new access tokens. |
| 19 | What is WebSocket? | Full-duplex communication protocol. |
| 20 | What is SSE? | Server-to-client event streaming over HTTP. |
| 21 | What is the difference between HTTP and WebSocket? | Request-response vs bidirectional persistent communication. |
| 22 | What is the difference between SSE and WebSocket? | One-way server updates vs bidirectional messaging. |
| 23 | What is Content-Type? | Describes the media type of the message body. |
| 24 | What is Accept? | Specifies acceptable response media types. |
| 25 | What is the difference between query and route parameters? | Query parameters modify/filter requests; route parameters identify path resources. |

---

# 30. Practical Exercises

Try these exercises yourself.

| No. | Exercise | Difficulty |
|---|---|---|
| 1 | Fetch users from a public REST API. | Easy |
| 2 | Display HTTP status codes in the browser. | Easy |
| 3 | Create a POST request using Fetch. | Easy |
| 4 | Build a CRUD API using Express. | Medium |
| 5 | Implement route parameters and query parameters. | Medium |
| 6 | Implement pagination using query parameters. | Medium |
| 7 | Configure CORS for multiple frontend origins. | Medium |
| 8 | Implement file uploads using FormData. | Medium |
| 9 | Build a login system using token-based authentication. | Advanced |
| 10 | Generate and verify JWTs using Node.js. | Advanced |
| 11 | Implement access and refresh token handling. | Advanced |
| 12 | Build a real-time chat application using WebSocket. | Advanced |
| 13 | Build a live notification system using SSE. | Advanced |
| 14 | Implement request cancellation using AbortController. | Advanced |

---

# 31. Output-Based Questions

Try predicting the output before checking the answers.

### Question 1

```javascript
const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
);

console.log(response instanceof Response);
console.log(response.ok);
```

### Question 2

```javascript
const params = new URLSearchParams({
    page: 2,
    limit: 10
});

console.log(params.toString());
```

### Question 3

```javascript
console.log(JSON.stringify({
    name: "Riyaz",
    age: 25
}));
```

### Question 4

```javascript
const data = '{"name":"Riyaz"}';

const user = JSON.parse(data);

console.log(user.name);
```

### Question 5

```javascript
const user = {
    name: "Riyaz"
};

console.log(typeof user);

console.log(typeof JSON.stringify(user));
```

### Question 6

```javascript
const response = new Response(
    JSON.stringify({
        message: "Success"
    }),
    {
        status: 200
    }
);

console.log(response.ok);
console.log(response.status);
```

### Question 7

```javascript
const url = new URL(
    "https://example.com/users?page=2"
);

console.log(url.hostname);
console.log(url.pathname);
console.log(url.searchParams.get("page"));
```

## Answers

| Question | Answer |
|---|---|
| 1 | `true`, `true` for the successful endpoint response |
| 2 | `page=2&limit=10` |
| 3 | `{"name":"Riyaz","age":25}` |
| 4 | `Riyaz` |
| 5 | `"object"`, `"string"` |
| 6 | `true`, `200` |
| 7 | `example.com`, `/users`, `2` |

---

# 32. Important Documentation

| Topic | Official Documentation |
|---|---|
| HTTP Overview | [MDN HTTP Overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview?utm_source=chatgpt.com) |
| HTTP Methods | [MDN HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods?utm_source=chatgpt.com) |
| HTTP Status Codes | [MDN HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status?utm_source=chatgpt.com) |
| HTTP Headers | [MDN HTTP Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers?utm_source=chatgpt.com) |
| REST | [MDN REST](https://developer.mozilla.org/en-US/docs/Glossary/REST?utm_source=chatgpt.com) |
| JSON | [MDN JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON?utm_source=chatgpt.com) |
| Fetch API | [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API?utm_source=chatgpt.com) |
| XMLHttpRequest | [MDN XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest?utm_source=chatgpt.com) |
| CORS | [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS?utm_source=chatgpt.com) |
| JWT | [JWT Introduction](https://jwt.io/introduction?utm_source=chatgpt.com) |
| WebSocket | [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket?utm_source=chatgpt.com) |
| Server-Sent Events | [MDN SSE](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events?utm_source=chatgpt.com) |

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

## Next: Phase 13 – JavaScript Security & Performance

Topics we will cover:

1. What is XSS?
2. Types of XSS.
3. How to prevent XSS.
4. What is CSRF?
5. How to prevent CSRF.
6. What is SQL Injection?
7. What is NoSQL Injection?
8. What is Clickjacking?
9. What is Content Security Policy (CSP)?
10. What are Secure Cookies?
11. SameSite Cookies.
12. CORS Security.
13. Input Validation and Sanitization.
14. Output Encoding.
15. Secure Authentication Practices.
16. What is Rate Limiting?
17. What is Debouncing and Throttling? (Revision)
18. JavaScript Memory Management.
19. Memory Leaks.
20. Garbage Collection.
21. Browser Rendering Pipeline.
22. Critical Rendering Path.
23. Reflow and Repaint.
24. DOM Performance Optimization.
25. Lazy Loading.
26. Code Splitting.
27. Tree Shaking.
28. JavaScript Profiling.
29. Lighthouse.
30. Core Web Vitals.
31. LCP, INP, and CLS.
32. Performance Optimization Techniques.

**Phase 12 completed.**