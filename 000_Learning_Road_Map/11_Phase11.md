# JavaScript Revision Notes – Phase 11
# Browser APIs & Web Storage

In this phase, we will learn how JavaScript interacts with the browser and uses browser-provided APIs to access browser features, store data, manage navigation, handle background tasks, and optimize application performance.

---

# 1. What are Browser APIs?

Browser APIs are built-in interfaces provided by web browsers that allow JavaScript to interact with browser functionality.

JavaScript itself is a programming language. Browser APIs provide additional capabilities.

For example:

| Browser API | Purpose |
|---|---|
| DOM API | Manipulate HTML elements |
| Fetch API | Make HTTP requests |
| Geolocation API | Get user's geographical location |
| Storage API | Store data in the browser |
| History API | Manage browser navigation history |
| Clipboard API | Read and write clipboard data |
| Notification API | Display browser notifications |
| Intersection Observer | Detect element visibility |
| Web Workers | Execute JavaScript in background threads |

### Example

```javascript
console.log(window.innerWidth);
```

Here:

- `window` is a browser-provided object.
- `innerWidth` gives the width of the browser's content viewport.

### JavaScript vs Browser APIs

| JavaScript | Browser APIs |
|---|---|
| Programming language | Browser-provided functionality |
| Defines variables, functions, loops, etc. | Provides browser-specific capabilities |
| Can run in different environments | Usually available in browser environments |
| Example: `Array`, `Promise` | Example: `window`, `document`, `localStorage` |

**Important:** Node.js also provides its own APIs, such as `fs`, `http`, and `path`. These are not browser APIs.

---

# 2. What is the Window Object?

The `window` object represents the browser window and acts as the global object in traditional browser scripts.

It provides access to several browser features.

### Example

```javascript
console.log(window);
```

Some commonly used properties and methods:

| Property / Method | Purpose |
|---|---|
| `window.innerWidth` | Viewport width |
| `window.innerHeight` | Viewport height |
| `window.outerWidth` | Browser window width |
| `window.outerHeight` | Browser window height |
| `window.location` | Current URL information |
| `window.history` | Browser history |
| `window.navigator` | Browser and device information |
| `window.localStorage` | Persistent browser storage |
| `window.sessionStorage` | Session-based browser storage |
| `window.alert()` | Display alert |
| `window.confirm()` | Display confirmation dialog |
| `window.prompt()` | Ask for input |
| `window.setTimeout()` | Execute code after a delay |
| `window.setInterval()` | Execute code repeatedly |
| `window.open()` | Open another browsing context |
| `window.close()` | Close a script-created window in permitted circumstances |

### Example: Alert

```javascript
window.alert("Welcome to JavaScript!");
```

You can also write:

```javascript
alert("Welcome!");
```

Because many `window` properties and methods are exposed as global identifiers in classic browser scripts.

### Example: Confirm

```javascript
const result = confirm("Do you want to continue?");

console.log(result);
```

Output:

```text
true
```

Or:

```text
false
```

### Example: Prompt

```javascript
const name = prompt("Enter your name");

console.log(name);
```

The user can enter a value.

**Important:** These dialog methods block JavaScript execution until the user responds. They are generally avoided in modern production UI in favor of custom dialogs.

---

# 3. What is the Navigator Object?

The `navigator` object provides information about the browser and the environment in which the page is running.

It is accessed using:

```javascript
console.log(navigator);
```

### Common Properties

| Property | Purpose |
|---|---|
| `navigator.userAgent` | Browser identification string |
| `navigator.language` | Preferred browser language |
| `navigator.languages` | Preferred languages |
| `navigator.onLine` | Browser's online status indicator |
| `navigator.cookieEnabled` | Indicates whether cookies are enabled |
| `navigator.geolocation` | Geolocation API |
| `navigator.clipboard` | Clipboard API |
| `navigator.hardwareConcurrency` | Reported logical processor count |
| `navigator.maxTouchPoints` | Maximum supported simultaneous touch points |

### Example

```javascript
console.log(navigator.language);
console.log(navigator.onLine);
console.log(navigator.cookieEnabled);
```

Possible output:

```text
en-US
true
true
```

### What is userAgent?

`navigator.userAgent` returns a string containing browser and platform identification information.

```javascript
console.log(navigator.userAgent);
```

**Important:** Do not rely on user-agent detection as your primary way of detecting browser features. Feature detection is generally more reliable.

Example:

```javascript
if ("geolocation" in navigator) {
    console.log("Geolocation is supported");
}
```

---

# 4. What is the Location Object?

The `location` object provides information about the current URL and allows us to navigate to other URLs.

Access it using:

```javascript
console.log(window.location);
```

Suppose the current URL is:

```text
https://example.com:8080/products?id=10#details
```

### Important Location Properties

| Property | Value |
|---|---|
| `location.href` | Complete URL |
| `location.protocol` | `https:` |
| `location.hostname` | `example.com` |
| `location.port` | `8080` |
| `location.host` | `example.com:8080` |
| `location.pathname` | `/products` |
| `location.search` | `?id=10` |
| `location.hash` | `#details` |
| `location.origin` | `https://example.com:8080` |

### Example

```javascript
console.log(location.href);
console.log(location.pathname);
console.log(location.search);
```

### Navigate to Another Page

```javascript
location.href = "https://google.com";
```

### Reload the Current Page

```javascript
location.reload();
```

### Replace Current History Entry

```javascript
location.replace("https://google.com");
```

### Difference Between `href` and `replace()`

| `location.href` | `location.replace()` |
|---|---|
| Navigates to a new URL | Navigates to a new URL |
| Normally adds a history entry | Replaces the current history entry |
| User can generally return using Back | Previous entry is not retained as the current page's entry |

---

# 5. What is the History API?

The History API allows JavaScript to interact with the browser's session history.

It is useful for single-page applications (SPAs).

Access it using:

```javascript
window.history;
```

### Common Properties and Methods

| Method / Property | Purpose |
|---|---|
| `history.length` | Number of entries in session history |
| `history.back()` | Navigate backward |
| `history.forward()` | Navigate forward |
| `history.go()` | Navigate by a specified number of entries |
| `history.pushState()` | Add a history entry |
| `history.replaceState()` | Modify the current history entry |

### Example: Back and Forward

```javascript
history.back();
history.forward();
```

### Example: Navigate Two Entries Back

```javascript
history.go(-2);
```

### What is pushState()?

It adds a new entry to browser history without performing a normal page reload.

```javascript
history.pushState(
    { page: "about" },
    "",
    "/about"
);
```

The URL changes to:

```text
https://example.com/about
```

But the browser does not automatically load a new document.

### What is replaceState()?

It modifies the current history entry.

```javascript
history.replaceState(
    { page: "home" },
    "",
    "/home"
);
```

### What is the popstate Event?

The `popstate` event fires when the active history entry changes through certain history traversal operations, such as Back and Forward navigation.

```javascript
window.addEventListener("popstate", (event) => {
    console.log("History changed");
    console.log(event.state);
});
```

**Important:** Calling `pushState()` or `replaceState()` does not itself fire a `popstate` event.

### pushState vs replaceState

| pushState | replaceState |
|---|---|
| Adds a new history entry | Replaces the current history entry |
| Back button can return to previous entry | Does not create an additional entry |
| Used for navigation | Used for updating current URL/state |

---

# 6. What is the Screen Object?

The `screen` object provides information about the user's screen.

```javascript
console.log(window.screen);
```

### Common Properties

| Property | Purpose |
|---|---|
| `screen.width` | Total screen width |
| `screen.height` | Total screen height |
| `screen.availWidth` | Available screen width |
| `screen.availHeight` | Available screen height |
| `screen.colorDepth` | Color depth |
| `screen.pixelDepth` | Pixel depth |

### Example

```javascript
console.log(screen.width);
console.log(screen.height);

console.log(screen.availWidth);
console.log(screen.availHeight);
```

Possible output:

```text
1920
1080
1920
1040
```

### Screen vs Window

| Screen Object | Window Object |
|---|---|
| Provides screen information | Provides browser window information |
| `screen.width` | `window.innerWidth` |
| `screen.height` | `window.innerHeight` |
| Represents display dimensions | Represents browser viewport/window dimensions |

**Important:** For responsive layouts, use CSS media queries and viewport dimensions rather than relying on screen dimensions.

---

# 7. What is the Geolocation API?

The Geolocation API allows websites to request the user's geographical location.

It can provide:

- Latitude
- Longitude
- Accuracy
- Altitude, when available
- Speed, when available
- Heading, when available

### Example

```javascript
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
    },
    (error) => {
        console.log(error.message);
    }
);
```

### How does it work?

1. The website requests location access.
2. The browser asks the user for permission if required.
3. The user grants or denies permission.
4. If successful, the browser returns location information.
5. If unsuccessful, the error callback receives an error.

### Common Geolocation Methods

| Method | Purpose |
|---|---|
| `getCurrentPosition()` | Get the current position once |
| `watchPosition()` | Monitor location changes |
| `clearWatch()` | Stop monitoring location |

### Example: watchPosition()

```javascript
const watchId = navigator.geolocation.watchPosition(
    (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
    },
    (error) => {
        console.log(error.message);
    }
);
```

Stop monitoring:

```javascript
navigator.geolocation.clearWatch(watchId);
```

### Important Requirements

- Geolocation generally requires HTTPS.
- Localhost is treated as a secure context for development.
- User permission is required.
- Location accuracy depends on the device and available location sources.

---

# 8. What is the Clipboard API?

The Clipboard API allows JavaScript to read from and write to the system clipboard.

For example:

- Copy text.
- Read copied text.
- Build copy buttons.
- Provide paste functionality.

### Copy Text

```javascript
async function copyText() {
    await navigator.clipboard.writeText("Hello Riyaz");

    console.log("Text copied");
}

copyText();
```

### Read Clipboard Text

```javascript
async function readClipboard() {
    const text = await navigator.clipboard.readText();

    console.log(text);
}

readClipboard();
```

### Practical Example: Copy Button

HTML:

```html
<input type="text" id="textInput" value="Hello JavaScript">

<button id="copyButton">Copy</button>
```

JavaScript:

```javascript
const input = document.querySelector("#textInput");
const button = document.querySelector("#copyButton");

button.addEventListener("click", async () => {
    try {
        await navigator.clipboard.writeText(input.value);

        alert("Copied successfully!");
    } catch (error) {
        console.error("Copy failed:", error);
    }
});
```

**Important:** Clipboard access generally requires a secure context and may require user interaction or permission depending on the browser and operation.

---

# 9. What is the Fetch API?

The Fetch API allows JavaScript to make HTTP requests to servers.

It is commonly used to communicate with backend APIs.

For example:

- Fetch user information.
- Submit login details.
- Retrieve products.
- Send form data.
- Update database records through backend endpoints.

### Basic Syntax

```javascript
fetch(url, options);
```

`fetch()` returns a Promise that resolves to a `Response` object when a response is received.

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
        console.log(error);
    }
}

getUsers();
```

### Important Response Properties

| Property | Purpose |
|---|---|
| `response.status` | HTTP status code |
| `response.ok` | Indicates whether status is in the 200–299 range |
| `response.statusText` | Status message |
| `response.headers` | Response headers |
| `response.url` | Final response URL |
| `response.json()` | Reads response body as JSON |
| `response.text()` | Reads response body as text |
| `response.blob()` | Reads response body as Blob |

### Important: Fetch Does Not Reject for HTTP Errors

This is a common interview question.

Suppose the server returns:

```text
404 Not Found
```

Fetch usually resolves successfully with a `Response` object.

It does not automatically throw an error for HTTP status codes such as 404 or 500.

Therefore, check `response.ok`.

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
        console.error(error.message);
    }
}
```

### POST Request

```javascript
async function createUser() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: "Riyaz",
                    email: "riyaz@example.com"
                })
            }
        );

        if (!response.ok) {
            throw new Error("Request failed");
        }

        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

createUser();
```

### Important Fetch Methods

| HTTP Method | Purpose |
|---|---|
| GET | Retrieve data |
| POST | Create or submit data |
| PUT | Replace a resource |
| PATCH | Partially update a resource |
| DELETE | Delete a resource |

### Important Concept: CORS

CORS stands for Cross-Origin Resource Sharing.

It is a browser security mechanism that controls whether a webpage can access resources from another origin.

An origin consists of:

```text
Protocol + Host + Port
```

For example:

```text
http://localhost:3000
http://localhost:5000
```

These are different origins because their ports differ.

The backend server must provide appropriate CORS headers to allow cross-origin requests.

**Important:** CORS is enforced by browsers. It is not an authentication or authorization mechanism.

---

# 10. What is the Web Storage API?

The Web Storage API allows websites to store key-value data in the browser.

It provides two main storage mechanisms:

1. Local Storage
2. Session Storage

Both store data as strings.

### Example

```javascript
localStorage.setItem("name", "Riyaz");

const name = localStorage.getItem("name");

console.log(name);
```

Output:

```text
Riyaz
```

### Common Web Storage Methods

| Method | Purpose |
|---|---|
| `setItem()` | Store data |
| `getItem()` | Retrieve data |
| `removeItem()` | Remove specific data |
| `clear()` | Remove all data for the storage area |
| `key()` | Get a key by index |
| `length` | Number of stored items |

---

# 11. What is Local Storage?

Local Storage stores data in the browser and keeps it across browser restarts.

The data remains until it is explicitly removed or cleared by the user, browser, or application.

### Store Data

```javascript
localStorage.setItem("username", "Riyaz");

localStorage.setItem("theme", "dark");
```

### Retrieve Data

```javascript
const username = localStorage.getItem("username");

console.log(username);
```

### Remove Specific Data

```javascript
localStorage.removeItem("username");
```

### Clear All Data

```javascript
localStorage.clear();
```

### Store Objects in Local Storage

Local Storage only stores strings.

To store an object, convert it into JSON.

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    role: "Developer"
};

localStorage.setItem("user", JSON.stringify(user));
```

Retrieve:

```javascript
const userData = localStorage.getItem("user");

const user = JSON.parse(userData);

console.log(user.name);
```

### Why do we use JSON.stringify()?

Because Local Storage cannot directly store JavaScript objects.

Without conversion:

```javascript
localStorage.setItem("user", {
    name: "Riyaz"
});
```

The object is converted to a string representation, generally:

```text
[object Object]
```

Therefore, use:

```javascript
JSON.stringify()
```

to serialize the object.

And:

```javascript
JSON.parse()
```

to convert the JSON string back into a JavaScript value.

### Common Use Cases

- Theme preference.
- Language preference.
- Shopping cart data.
- User interface settings.
- Non-sensitive application state.

**Security warning:** Do not store passwords, private API keys, or sensitive authentication tokens in Local Storage. JavaScript running on the same origin can access it, so an XSS vulnerability can expose its contents.

---

# 12. What is Session Storage?

Session Storage stores data for a particular browser tab's page session.

When the tab or window is closed, its session storage is generally cleared.

### Example

```javascript
sessionStorage.setItem("username", "Riyaz");

console.log(
    sessionStorage.getItem("username")
);
```

### Remove Data

```javascript
sessionStorage.removeItem("username");
```

### Clear Everything

```javascript
sessionStorage.clear();
```

### Local Storage vs Session Storage

| Feature | Local Storage | Session Storage |
|---|---|---|
| Lifetime | Until removed or cleared | Until the page session ends |
| Browser restart | Normally persists | Does not survive closing the tab |
| Storage scope | Origin | Origin and tab's page session |
| Capacity | Browser-dependent | Browser-dependent |
| Data type | String | String |
| API | `localStorage` | `sessionStorage` |

### Practical Example

Suppose a user is filling out a multi-step form.

You may use Session Storage to preserve temporary form progress within that tab.

```javascript
sessionStorage.setItem("step", "2");
```

When the tab is closed, the session normally ends.

---

# 13. What are Cookies?

Cookies are small pieces of data stored by the browser and associated with a website.

They are commonly used for:

- Session management.
- Authentication.
- User preferences.
- Tracking.
- Server-side state management.

### Example

```javascript
document.cookie = "username=Riyaz";
```

Read cookies:

```javascript
console.log(document.cookie);
```

### Set Cookie Expiration

```javascript
document.cookie =
    "username=Riyaz; max-age=3600; path=/";
```

This cookie expires after approximately one hour.

### Common Cookie Attributes

| Attribute | Purpose |
|---|---|
| `Expires` | Sets expiration date |
| `Max-Age` | Sets lifetime in seconds |
| `Path` | Controls which URL paths receive the cookie |
| `Domain` | Controls the domain scope |
| `Secure` | Sends the cookie only over secure HTTPS connections |
| `HttpOnly` | Prevents JavaScript access |
| `SameSite` | Controls cross-site cookie sending behavior |

### What is HttpOnly?

An HttpOnly cookie cannot be accessed through JavaScript using `document.cookie`.

Example:

```text
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax
```

This is useful for session authentication.

**Important:** HttpOnly cookies must be set by the server through the `Set-Cookie` response header. JavaScript cannot create an HttpOnly cookie.

### What is SameSite?

SameSite controls when browsers send cookies with cross-site requests.

Common values:

- `Strict`
- `Lax`
- `None`

`SameSite=None` generally requires the `Secure` attribute.

### Cookies vs Local Storage vs Session Storage

| Feature | Cookies | Local Storage | Session Storage |
|---|---|---|---|
| Storage location | Browser | Browser | Browser |
| Sent automatically with matching HTTP requests | Yes, subject to cookie rules | No | No |
| JavaScript access | Usually, unless HttpOnly | Yes | Yes |
| Expiration | Configurable | Until removed | Until session ends |
| Typical use | Authentication/session management | Persistent preferences | Temporary tab data |
| Size | Usually around 4 KB per cookie | Browser-dependent | Browser-dependent |

**Important:** Cookies are not automatically more secure than Local Storage. Security depends on how they are configured and used. HttpOnly, Secure, and SameSite attributes help protect authentication cookies.

---

# 14. What is IndexedDB?

IndexedDB is a browser database that allows websites to store large amounts of structured data.

Unlike Local Storage, IndexedDB supports:

- Objects.
- Structured data.
- Indexes.
- Transactions.
- Asynchronous operations.
- Large datasets.

### Local Storage vs IndexedDB

| Local Storage | IndexedDB |
|---|---|
| Simple key-value storage | Structured database |
| Stores strings | Stores structured JavaScript values |
| Synchronous API | Asynchronous API |
| Suitable for small data | Suitable for larger datasets |
| No indexes or transactions | Supports indexes and transactions |

### Basic IndexedDB Example

```javascript
const request = indexedDB.open("MyDatabase", 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;

    db.createObjectStore("users", {
        keyPath: "id"
    });
};

request.onsuccess = (event) => {
    const db = event.target.result;

    console.log("Database opened");

    const transaction = db.transaction(
        "users",
        "readwrite"
    );

    const store = transaction.objectStore("users");

    store.add({
        id: 1,
        name: "Riyaz",
        role: "Developer"
    });
};

request.onerror = () => {
    console.log("Database error");
};
```

### Important IndexedDB Concepts

| Concept | Meaning |
|---|---|
| Database | Container for object stores |
| Object Store | Stores records |
| Key | Identifies a record |
| Index | Enables efficient searching by another property |
| Transaction | Groups database operations |
| Cursor | Iterates over records |

**Use cases:**

- Offline applications.
- Large local datasets.
- Caching structured application data.
- Progressive Web Applications.

---

# 15. What is the Cache API?

The Cache API allows applications to store and retrieve HTTP request and response objects.

It is commonly used with Service Workers to support offline experiences.

### Example

```javascript
async function cacheResources() {
    const cache = await caches.open("my-cache");

    await cache.add("/index.html");

    console.log("Resource cached");
}

cacheResources();
```

### Retrieve Cached Data

```javascript
async function getCachedPage() {
    const cache = await caches.open("my-cache");

    const response = await cache.match("/index.html");

    console.log(response);
}

getCachedPage();
```

### Important Cache API Methods

| Method | Purpose |
|---|---|
| `caches.open()` | Open or create a cache |
| `cache.add()` | Fetch and store a resource |
| `cache.addAll()` | Fetch and store multiple resources |
| `cache.put()` | Store a request-response pair |
| `cache.match()` | Find a matching cached response |
| `cache.delete()` | Delete an entry |
| `caches.delete()` | Delete a named cache |

### Cache API vs Local Storage

| Cache API | Local Storage |
|---|---|
| Stores Request/Response objects | Stores strings |
| Useful for caching HTTP resources | Useful for simple application data |
| Asynchronous | Synchronous |
| Commonly used with Service Workers | Directly available to page JavaScript |

---

# 16. What are Service Workers?

A Service Worker is a JavaScript script that runs separately from the main webpage.

It can intercept network requests and manage caching.

Service Workers are important for Progressive Web Applications (PWAs).

### Common Use Cases

1. Offline support.
2. Caching resources.
3. Network request interception.
4. Background synchronization, where supported.
5. Push notifications, where supported.

### How Service Workers Work

```text
Browser Page
     |
     | Register
     v
Service Worker
     |
     | Intercepts Requests
     v
Cache API / Network
```

### Step 1: Register Service Worker

In `index.js`:

```javascript
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
            console.log("Service Worker registered");
        })
        .catch((error) => {
            console.log(error);
        });
}
```

### Step 2: Create service-worker.js

```javascript
const CACHE_NAME = "my-cache-v1";

const FILES_TO_CACHE = [
    "/",
    "/index.html"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});
```

### Step 3: Intercept Fetch Requests

```javascript
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                return cachedResponse ||
                    fetch(event.request);
            })
    );
});
```

This example checks the cache first and falls back to the network.

### Important Service Worker Events

| Event | Purpose |
|---|---|
| `install` | Runs during installation |
| `activate` | Runs when the worker activates |
| `fetch` | Intercepts eligible fetch requests |
| `message` | Receives messages from clients |
| `push` | Handles push messages |

### Important Points

- Service Workers generally require HTTPS.
- Localhost is treated as a secure context for development.
- They run in their own worker context.
- They do not have direct access to the DOM.
- They can be terminated by the browser when not needed.
- They must be registered from a secure context.

---

# 17. What is the Notifications API?

The Notifications API allows websites to display system-level notifications.

Example:

```javascript
new Notification("Hello Riyaz", {
    body: "Welcome to JavaScript!"
});
```

Before displaying notifications, request permission:

```javascript
async function showNotification() {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
        new Notification("Welcome!", {
            body: "You have a new message."
        });
    }
}

showNotification();
```

### Notification Permission Values

| Value | Meaning |
|---|---|
| `granted` | User allowed notifications |
| `denied` | User denied notifications |
| `default` | Permission has not been decided |

### Common Use Cases

- New messages.
- Order updates.
- System alerts.
- Reminders.
- Background updates.

**Important:** Browser and operating-system restrictions apply. Notifications generally require a secure context. For notifications associated with background push events, use Service Workers and the Push API.

---

# 18. What are Web Workers?

Web Workers allow JavaScript to execute in a background thread separate from the main UI thread.

Normally, JavaScript running on the main thread handles:

- DOM manipulation.
- Event handling.
- UI updates.
- JavaScript execution.

Long-running tasks can block the main thread and make the UI unresponsive.

Web Workers help move CPU-intensive work to another thread.

### Main Thread vs Web Worker

| Main Thread | Web Worker |
|---|---|
| Handles UI | Handles background computation |
| Can access DOM | Cannot directly access DOM |
| Can manipulate HTML | Cannot manipulate HTML |
| Can communicate with workers | Can communicate with main thread |

### Step 1: Create worker.js

```javascript
self.onmessage = (event) => {
    const number = event.data;

    const result = number * number;

    self.postMessage(result);
};
```

### Step 2: Create main.js

```javascript
const worker = new Worker("worker.js");

worker.postMessage(10);

worker.onmessage = (event) => {
    console.log("Result:", event.data);
};
```

Output:

```text
Result: 100
```

### Important Methods

| Method | Purpose |
|---|---|
| `postMessage()` | Send data |
| `onmessage` | Receive messages |
| `terminate()` | Stop worker immediately |
| `close()` | Close worker from inside itself |

### Important Use Cases

- Image processing.
- Large calculations.
- Data processing.
- Parsing large datasets.
- Computationally expensive operations.

**Important:** Web Workers communicate through message passing. Ordinary objects are generally structured-cloned; certain transferable objects can transfer ownership instead.

---

# 19. What is the Broadcast Channel API?

The Broadcast Channel API allows communication between different browsing contexts that share the same origin and channel name.

For example, two browser tabs can communicate with each other.

### Example: Tab 1

```javascript
const channel = new BroadcastChannel("my-channel");

channel.postMessage({
    message: "Hello from Tab 1"
});
```

### Example: Tab 2

```javascript
const channel = new BroadcastChannel("my-channel");

channel.onmessage = (event) => {
    console.log(event.data);
};
```

Output:

```javascript
{
    message: "Hello from Tab 1"
}
```

### Use Cases

- Synchronizing login/logout across tabs.
- Sharing application state.
- Sending notifications between tabs.
- Synchronizing updates.

### Important

Close the channel when it is no longer needed:

```javascript
channel.close();
```

---

# 20. What is Intersection Observer?

Intersection Observer allows JavaScript to detect when an element enters or leaves the viewport or another specified container.

It is commonly used for:

- Lazy loading images.
- Infinite scrolling.
- Scroll animations.
- Tracking element visibility.

### Example

HTML:

```html
<div class="box">Observe Me</div>
```

JavaScript:

```javascript
const box = document.querySelector(".box");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log("Element is visible");
            } else {
                console.log("Element is not visible");
            }
        });
    }
);

observer.observe(box);
```

### Important Properties

| Property | Purpose |
|---|---|
| `root` | Element used as the observation container |
| `rootMargin` | Margin around the root |
| `threshold` | Visibility ratio that triggers callbacks |

### Example: Lazy Loading

HTML:

```html
<img
    data-src="image.jpg"
    alt="Example"
    class="lazy-image"
>
```

JavaScript:

```javascript
const images = document.querySelectorAll(".lazy-image");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const image = entry.target;

            image.src = image.dataset.src;

            observer.unobserve(image);
        }
    });
});

images.forEach((image) => observer.observe(image));
```

The image loads when it approaches the viewport.

---

# 21. What is Mutation Observer?

Mutation Observer allows JavaScript to detect changes in the DOM.

It can observe:

- Added elements.
- Removed elements.
- Attribute changes.
- Text content changes.

### Example

HTML:

```html
<div id="container">
    <p>Hello</p>
</div>

<button id="addButton">Add Element</button>
```

JavaScript:

```javascript
const container = document.querySelector("#container");

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        console.log(mutation.type);
    });
});

observer.observe(container, {
    childList: true,
    subtree: true
});

document.querySelector("#addButton").addEventListener("click", () => {
    const paragraph = document.createElement("p");

    paragraph.textContent = "New paragraph";

    container.appendChild(paragraph);
});
```

Output after clicking:

```text
childList
```

### Configuration Options

| Option | Purpose |
|---|---|
| `childList` | Observe child additions/removals |
| `attributes` | Observe attribute changes |
| `characterData` | Observe text data changes |
| `subtree` | Observe descendants |
| `attributeFilter` | Observe specific attributes |

Stop observing:

```javascript
observer.disconnect();
```

### Use Cases

- Detect dynamically added elements.
- Monitor third-party widgets.
- Observe DOM changes in complex interfaces.
- Integrate with legacy code.

---

# 22. What is Resize Observer?

Resize Observer detects changes in the dimensions of an element.

Unlike the window `resize` event, it observes individual elements.

### Example

HTML:

```html
<div id="box">
    Resize this container
</div>
```

JavaScript:

```javascript
const box = document.querySelector("#box");

const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
        console.log("Width:", entry.contentRect.width);
        console.log("Height:", entry.contentRect.height);
    });
});

observer.observe(box);
```

### Use Cases

- Responsive components.
- Dynamic charts.
- Dashboard widgets.
- Responsive tables.
- Layout adjustments.

### Resize Event vs Resize Observer

| Window Resize Event | Resize Observer |
|---|---|
| Detects browser viewport resizing | Detects element size changes |
| Attached to `window` | Observes individual elements |
| Does not directly report every element's size change | Reports observed element dimensions |

---

# 23. What is the Performance API?

The Performance API provides tools to measure application performance.

It helps developers understand:

- Execution time.
- Page loading performance.
- Resource loading.
- Navigation timing.
- Performance bottlenecks.

### Example: Measure Execution Time

```javascript
performance.mark("start");

for (let i = 0; i < 1000000; i++) {
    // Some operation
}

performance.mark("end");

performance.measure(
    "execution-time",
    "start",
    "end"
);

const result = performance.getEntriesByName("execution-time");

console.log(result[0].duration);
```

The duration is measured in milliseconds.

### Important Methods

| Method | Purpose |
|---|---|
| `performance.now()` | High-resolution timestamp |
| `performance.mark()` | Create a performance marker |
| `performance.measure()` | Measure between markers |
| `performance.getEntries()` | Retrieve performance entries |
| `performance.clearMarks()` | Clear marks |
| `performance.clearMeasures()` | Clear measurements |

### Example: performance.now()

```javascript
const start = performance.now();

for (let i = 0; i < 1000000; i++) {
    // Operation
}

const end = performance.now();

console.log(`Execution time: ${end - start} ms`);
```

### Use Cases

- Measuring function execution.
- Identifying performance bottlenecks.
- Measuring page load.
- Monitoring resource loading.
- Optimizing web applications.

---

# 24. Important Comparison Table

| API | Main Purpose | Common Use |
|---|---|---|
| Window | Browser window access | Viewport dimensions |
| Navigator | Browser/environment information | Language and capabilities |
| Location | URL management | Navigation |
| History | Browser session history | SPA routing |
| Screen | Screen information | Display dimensions |
| Geolocation | User location | Maps |
| Clipboard | Clipboard access | Copy buttons |
| Fetch | HTTP requests | Backend communication |
| Local Storage | Persistent key-value storage | Preferences |
| Session Storage | Session-based storage | Temporary form data |
| Cookies | Small browser-managed data | Session management |
| IndexedDB | Structured local database | Offline data |
| Cache API | HTTP resource caching | Offline resources |
| Service Worker | Background network handling | PWA |
| Notifications | System notifications | Alerts |
| Web Workers | Background computation | Heavy calculations |
| Broadcast Channel | Cross-context communication | Tab synchronization |
| Intersection Observer | Visibility detection | Lazy loading |
| Mutation Observer | DOM change detection | Dynamic UI |
| Resize Observer | Element size detection | Responsive components |
| Performance API | Performance measurement | Optimization |

---

# 25. Important Interview Questions

### Q1. What are Browser APIs?

Browser APIs are built-in interfaces that allow JavaScript to interact with browser features.

### Q2. What is the difference between JavaScript and Browser APIs?

JavaScript is a programming language, while Browser APIs provide browser-specific functionality.

### Q3. What is the Window Object?

The Window object represents the browser window and provides access to browser functionality.

### Q4. What is the difference between `window.innerWidth` and `screen.width`?

`window.innerWidth` returns the viewport width, while `screen.width` returns the screen width.

### Q5. What is the History API?

It allows JavaScript to interact with browser session history using methods such as `pushState()` and `replaceState()`.

### Q6. What is the difference between pushState and replaceState?

`pushState()` creates a new history entry, whereas `replaceState()` updates the current entry.

### Q7. What is the Geolocation API?

It allows websites to request the user's geographical location with permission.

### Q8. What is the Fetch API?

It is a browser API used to make HTTP requests and handle responses asynchronously.

### Q9. Does Fetch reject on a 404 response?

No. It normally resolves with a Response object. We must check `response.ok` or the status code.

### Q10. What is CORS?

CORS is a browser security mechanism that controls cross-origin access to resources.

### Q11. What is the difference between Local Storage and Session Storage?

Local Storage persists until cleared, while Session Storage normally lasts for the page session in a particular tab.

### Q12. What is the difference between Cookies and Local Storage?

Cookies can be automatically sent with matching HTTP requests. Local Storage data is not automatically sent to the server.

### Q13. What is IndexedDB?

IndexedDB is a browser database for storing structured data asynchronously.

### Q14. What is the Cache API?

It allows applications to store and retrieve HTTP request and response objects.

### Q15. What is a Service Worker?

A Service Worker is a background script that can intercept network requests and support caching and offline functionality.

### Q16. Can a Service Worker access the DOM?

No. Service Workers do not have direct access to the DOM.

### Q17. What is a Web Worker?

A Web Worker executes JavaScript in a background thread, helping prevent long-running computations from blocking the main UI thread.

### Q18. What is Intersection Observer?

It detects when an element intersects with the viewport or another specified container.

### Q19. What is Mutation Observer?

It detects changes in the DOM.

### Q20. What is Resize Observer?

It detects changes in the dimensions of an observed element.

### Q21. What is Broadcast Channel API?

It enables communication between browsing contexts of the same origin using a shared channel name.

### Q22. What is the Performance API?

It provides tools to measure and analyze application performance.

---

# 26. Practical Exercises

Complete these exercises to strengthen your understanding.

| No. | Exercise | Difficulty |
|---|---|---|
| 1 | Display the browser viewport width and height. | Easy |
| 2 | Display the current URL and its individual components. | Easy |
| 3 | Create Back and Forward buttons using the History API. | Easy |
| 4 | Build a Copy Text button using Clipboard API. | Easy |
| 5 | Get the user's current location using Geolocation API. | Medium |
| 6 | Fetch users from a public API and display them in a table. | Medium |
| 7 | Build a theme switcher using Local Storage. | Medium |
| 8 | Create a multi-step form using Session Storage. | Medium |
| 9 | Create a simple cookie-based preference system. | Medium |
| 10 | Store and retrieve user records using IndexedDB. | Advanced |
| 11 | Build an offline page using Service Workers and Cache API. | Advanced |
| 12 | Create a background calculation using Web Workers. | Advanced |
| 13 | Synchronize logout events across multiple tabs using Broadcast Channel. | Advanced |
| 14 | Build infinite scrolling using Intersection Observer. | Advanced |
| 15 | Detect dynamically added elements using Mutation Observer. | Advanced |
| 16 | Build a responsive dashboard widget using Resize Observer. | Advanced |
| 17 | Measure the execution time of multiple JavaScript functions. | Advanced |

---

# 27. Output-Based Questions

Try predicting the output before checking the answers.

### Question 1

```javascript
console.log(typeof window);
console.log(typeof document);
```

### Question 2

```javascript
localStorage.setItem("name", "Riyaz");

console.log(localStorage.getItem("name"));
```

### Question 3

```javascript
const user = {
    name: "Riyaz"
};

localStorage.setItem("user", JSON.stringify(user));

console.log(typeof localStorage.getItem("user"));
```

### Question 4

```javascript
const user = {
    name: "Riyaz"
};

sessionStorage.setItem("user", JSON.stringify(user));

const data = JSON.parse(sessionStorage.getItem("user"));

console.log(data.name);
```

### Question 5

```javascript
fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
        console.log(response instanceof Response);
        console.log(response.ok);
    });
```

### Question 6

```javascript
console.log(window.innerWidth);
console.log(screen.width);
```

Will both values always be the same?

### Question 7

```javascript
const channel = new BroadcastChannel("test");

channel.onmessage = (event) => {
    console.log(event.data);
};

channel.postMessage("Hello");
```

Will this message be received by the same channel object?

---

## Answers

| Question | Answer |
|---|---|
| 1 | `"object"`, `"object"` |
| 2 | `"Riyaz"` |
| 3 | `"string"` |
| 4 | `"Riyaz"` |
| 5 | `true`, followed by the HTTP success status check result |
| 6 | No. Viewport width and screen width represent different dimensions. |
| 7 | No. A BroadcastChannel object does not receive its own messages. Another channel object listening on the same channel can receive it. |

---

# 28. Important Documentation

| Topic | Official Documentation |
|---|---|
| Window | [MDN Window](https://developer.mozilla.org/en-US/docs/Web/API/Window?utm_source=chatgpt.com) |
| Navigator | [MDN Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator?utm_source=chatgpt.com) |
| Location | [MDN Location](https://developer.mozilla.org/en-US/docs/Web/API/Location?utm_source=chatgpt.com) |
| History API | [MDN History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API?utm_source=chatgpt.com) |
| Geolocation | [MDN Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API?utm_source=chatgpt.com) |
| Clipboard | [MDN Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API?utm_source=chatgpt.com) |
| Fetch | [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API?utm_source=chatgpt.com) |
| Web Storage | [MDN Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API?utm_source=chatgpt.com) |
| IndexedDB | [MDN IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API?utm_source=chatgpt.com) |
| Cache API | [MDN Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache?utm_source=chatgpt.com) |
| Service Workers | [MDN Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API?utm_source=chatgpt.com) |
| Web Workers | [MDN Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API?utm_source=chatgpt.com) |
| Intersection Observer | [MDN Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API?utm_source=chatgpt.com) |
| Mutation Observer | [MDN Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver?utm_source=chatgpt.com) |
| Resize Observer | [MDN Resize Observer](https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API?utm_source=chatgpt.com) |
| Performance API | [MDN Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API?utm_source=chatgpt.com) |

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

## Next: Phase 12 – JavaScript Networking & HTTP Fundamentals

Topics we will cover:

1. What is the Internet?
2. What is HTTP?
3. What is HTTPS?
4. How does a browser communicate with a server?
5. What is a Client and Server?
6. What is Request and Response?
7. HTTP Request Methods.
8. HTTP Status Codes.
9. HTTP Headers.
10. HTTP Request Body.
11. Query Parameters vs Route Parameters.
12. What is REST API?
13. REST API Principles.
14. What is JSON?
15. JSON vs JavaScript Objects.
16. What is XML?
17. What is AJAX?
18. XMLHttpRequest (XHR).
19. Fetch API vs XMLHttpRequest.
20. What is CORS?
21. What is Preflight Request?
22. What are Authentication and Authorization?
23. Basic Authentication.
24. Token-Based Authentication.
25. What is JWT?
26. What are Access Tokens and Refresh Tokens?
27. What is WebSocket?
28. HTTP vs WebSocket.
29. What is Server-Sent Events (SSE)?
30. HTTP vs WebSocket vs SSE.

**Phase 11 completed.**