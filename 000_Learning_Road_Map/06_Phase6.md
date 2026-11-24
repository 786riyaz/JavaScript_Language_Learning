# JavaScript Complete Revision Notes
# Phase 6 – DOM & Browser APIs

This phase covers how JavaScript interacts with HTML documents, modifies webpage content, handles user interactions, and uses browser-provided features such as storage, navigation, and browser information.

---

# 1. What is DOM?

**DOM (Document Object Model)** is a programming interface provided by the browser that represents an HTML document as a tree of objects.

JavaScript uses the DOM to:
- Access HTML elements.
- Change text and HTML content.
- Modify CSS styles.
- Create and remove elements.
- Handle user interactions.
- Dynamically update webpages.

### Example

HTML:

```html
<h1 id="heading">Hello World</h1>
```

JavaScript:

```javascript
const heading = document.getElementById("heading");

heading.textContent = "Welcome to JavaScript!";
```

The browser updates the heading without reloading the page.

### Important Points

- DOM stands for Document Object Model.
- DOM is created by the browser when it parses HTML.
- JavaScript can interact with the DOM.
- DOM represents HTML as a tree structure.
- DOM is not JavaScript itself; it is a browser-provided API.

**Note:** DOM APIs such as `document` and `window` are available in browsers by default, not in a normal Node.js environment.

---

# 2. What is DOM Tree?

The DOM represents an HTML document as a hierarchical tree of nodes.

### Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Hello</h1>
    <p>Welcome to my website</p>
</body>
</html>
```

Simplified DOM Tree:

```text
Document
   |
   └── html
        |
        ├── head
        |    |
        |    └── title
        |         |
        |         └── "My Website"
        |
        └── body
             |
             ├── h1
             |    |
             |    └── "Hello"
             |
             └── p
                  |
                  └── "Welcome to my website"
```

### Important DOM Properties

| Property | Description |
|---|---|
| `document` | Represents the entire HTML document |
| `document.documentElement` | Returns the `<html>` element |
| `document.head` | Returns the `<head>` element |
| `document.body` | Returns the `<body>` element |
| `document.title` | Gets or sets the document title |

Example:

```javascript
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

document.title = "My JavaScript Website";
```

---

# 3. What is Node and Element in DOM?

A **Node** is a basic object in the DOM tree.

An **Element** is a specific type of node that represents an HTML element.

In simple terms:

- Every HTML element is a node.
- But not every node is an HTML element.

### Types of DOM Nodes

| Node Type | Example | Description |
|---|---|---|
| Document Node | `document` | Represents the complete document |
| Element Node | `<div>`, `<p>` | Represents HTML elements |
| Text Node | `Hello World` | Represents text inside elements |
| Comment Node | `<!-- comment -->` | Represents HTML comments |
| Attribute Node | `id="heading"` | Represents an attribute |

### Example

```html
<div id="container">
    Hello World
    <!-- This is a comment -->
    <p>Welcome</p>
</div>
```

In this example:

- `div` is an element node.
- `Hello World` is a text node.
- The comment is a comment node.
- `p` is an element node.

### Difference Between Node and Element

| Node | Element |
|---|---|
| General object in DOM | Specific type of node |
| Includes text, comments, document, and elements | Represents HTML elements |
| Has properties like `nodeType`, `nodeName` | Has properties like `tagName`, `id`, `className` |
| Broader concept | Subcategory of Node |

Example:

```javascript
const container = document.getElementById("container");

console.log(container.nodeType); // 1
console.log(container.nodeName); // DIV
console.log(container.tagName);  // DIV
```

Common `nodeType` values:

| Node Type | Value |
|---|---:|
| Element Node | 1 |
| Attribute Node | 2 |
| Text Node | 3 |
| Comment Node | 8 |
| Document Node | 9 |

---

# 4. Selecting DOM Elements

JavaScript provides multiple methods to select HTML elements.

### 4.1 `getElementById()`

Selects an element using its ID.

```html
<h1 id="heading">Hello</h1>
```

```javascript
const heading = document.getElementById("heading");

console.log(heading);
```

Returns:
- The matching element.
- `null` if no matching element exists.

### 4.2 `getElementsByClassName()`

Selects elements using their class name.

```html
<p class="text">First</p>
<p class="text">Second</p>
<p class="text">Third</p>
```

```javascript
const elements = document.getElementsByClassName("text");

console.log(elements);
```

Returns an **HTMLCollection**.

Access elements:

```javascript
console.log(elements[0]);
console.log(elements[1]);
console.log(elements.length);
```

### 4.3 `getElementsByTagName()`

Selects elements using their HTML tag name.

```javascript
const paragraphs = document.getElementsByTagName("p");

console.log(paragraphs);
```

Returns an HTMLCollection.

### 4.4 `querySelector()`

Selects the first element matching a CSS selector.

```javascript
const heading = document.querySelector("#heading");

const paragraph = document.querySelector(".text");

const button = document.querySelector("button");
```

Returns the first matching element or `null`.

### 4.5 `querySelectorAll()`

Selects all elements matching a CSS selector.

```javascript
const paragraphs = document.querySelectorAll(".text");

console.log(paragraphs);
```

Returns a **NodeList**.

Access elements:

```javascript
paragraphs.forEach((element) => {
    console.log(element.textContent);
});
```

### Difference Between HTMLCollection and NodeList

| HTMLCollection | NodeList |
|---|---|
| Collection of HTML elements | Collection of DOM nodes |
| Usually contains only elements | Can contain different node types |
| Commonly returned by `getElementsByClassName()` | Returned by `querySelectorAll()` |
| Usually live | `querySelectorAll()` returns a static collection |
| Does not directly support `forEach()` in the usual collection interface | Supports `forEach()` |

**Important:**

- A live collection automatically reflects changes in the DOM.
- A static collection represents the elements selected at the time of the query.

Example:

```javascript
const liveElements = document.getElementsByClassName("box");

const staticElements = document.querySelectorAll(".box");
```

If you add another element with the `box` class:

- `liveElements` updates automatically.
- `staticElements` does not update.

---

# 5. DOM Traversing

DOM traversal means moving between related DOM elements.

You can move from:
- Parent to child.
- Child to parent.
- One sibling to another sibling.

Consider:

```html
<div id="parent">
    <p id="first">First</p>
    <p id="second">Second</p>
    <p id="third">Third</p>
</div>
```

### 5.1 Parent Selection

```javascript
const child = document.getElementById("first");

console.log(child.parentElement);
```

| Property | Description |
|---|---|
| `parentElement` | Returns the parent element |
| `parentNode` | Returns the parent node, which may not be an element |

### 5.2 Child Selection

```javascript
const parent = document.getElementById("parent");

console.log(parent.children);
console.log(parent.childNodes);
console.log(parent.firstElementChild);
console.log(parent.lastElementChild);
```

| Property | Description |
|---|---|
| `children` | Returns child elements only |
| `childNodes` | Returns all child nodes, including text and comments |
| `firstChild` | Returns the first child node |
| `lastChild` | Returns the last child node |
| `firstElementChild` | Returns the first child element |
| `lastElementChild` | Returns the last child element |

### 5.3 Sibling Selection

```javascript
const second = document.getElementById("second");

console.log(second.previousElementSibling);
console.log(second.nextElementSibling);
```

| Property | Description |
|---|---|
| `previousSibling` | Previous node |
| `nextSibling` | Next node |
| `previousElementSibling` | Previous element |
| `nextElementSibling` | Next element |

**Important:** `childNodes` and `children` are different.

For example, indentation and line breaks in HTML can create text nodes.

---

# 6. Creating and Removing DOM Elements

JavaScript can dynamically create, insert, replace, and remove HTML elements.

### 6.1 `createElement()`

Creates a new HTML element.

```javascript
const newElement = document.createElement("p");

newElement.textContent = "This is a new paragraph.";
```

### 6.2 `appendChild()`

Adds an element as the last child of another element.

```javascript
const container = document.getElementById("container");

const paragraph = document.createElement("p");

paragraph.textContent = "New Paragraph";

container.appendChild(paragraph);
```

### 6.3 `append()`

Adds one or more nodes or text to the end of an element.

```javascript
container.append("Hello");

const p = document.createElement("p");

p.textContent = "New Paragraph";

container.append(p);
```

### 6.4 `prepend()`

Adds content at the beginning of an element.

```javascript
container.prepend("This appears first");
```

### 6.5 `before()` and `after()`

Insert content before or after an element.

```javascript
const heading = document.querySelector("h1");

const paragraph = document.createElement("p");

paragraph.textContent = "New Paragraph";

heading.before(paragraph);
```

### 6.6 `remove()`

Removes an element from the DOM.

```javascript
const paragraph = document.querySelector("p");

paragraph.remove();
```

### 6.7 `replaceWith()`

Replaces an element with another element or content.

```javascript
const oldElement = document.querySelector("#old");

const newElement = document.createElement("h2");

newElement.textContent = "New Heading";

oldElement.replaceWith(newElement);
```

### Difference Between appendChild() and append()

| `appendChild()` | `append()` |
|---|---|
| Adds a single Node | Adds multiple nodes or strings |
| Returns the appended node | Returns `undefined` |
| Cannot directly append a string as a text node | Can append strings directly |
| Older API | More flexible API |

---

# 7. Modifying HTML and CSS

JavaScript can change HTML content and CSS styles dynamically.

### 7.1 `textContent`

Gets or sets the text content of an element.

```html
<h1 id="heading">Hello World</h1>
```

```javascript
const heading = document.getElementById("heading");

console.log(heading.textContent);

heading.textContent = "Welcome!";
```

It returns text from the element and its descendants, including text that CSS may hide.

### 7.2 `innerText`

Gets or sets the rendered text of an element.

```javascript
console.log(heading.innerText);
```

Difference:

| `textContent` | `innerText` |
|---|---|
| Returns text from DOM descendants | Returns rendered, human-readable text |
| Includes hidden text | Generally excludes hidden text |
| Does not depend on layout | Can depend on CSS and layout |
| Usually faster | May trigger layout calculations |

### 7.3 `innerHTML`

Gets or sets the HTML content inside an element.

```html
<div id="container"></div>
```

```javascript
const container = document.getElementById("container");

container.innerHTML = `
    <h2>Hello</h2>
    <p>Welcome to JavaScript</p>
`;
```

**Important Security Warning:**

Avoid inserting untrusted user input using `innerHTML`.

It can introduce Cross-Site Scripting (XSS) vulnerabilities.

Prefer `textContent` when you only need to insert text.

### 7.4 Modifying CSS Using `style`

```javascript
const heading = document.querySelector("h1");

heading.style.color = "red";
heading.style.backgroundColor = "yellow";
heading.style.fontSize = "30px";
```

CSS property names written in kebab-case become camelCase in JavaScript.

| CSS | JavaScript |
|---|---|
| `background-color` | `backgroundColor` |
| `font-size` | `fontSize` |
| `border-radius` | `borderRadius` |
| `margin-top` | `marginTop` |

### 7.5 `classList`

Used to manage CSS classes.

```html
<div id="box" class="container"></div>
```

```javascript
const box = document.getElementById("box");
```

| Method | Description |
|---|---|
| `classList.add()` | Adds a class |
| `classList.remove()` | Removes a class |
| `classList.toggle()` | Adds or removes a class |
| `classList.contains()` | Checks whether a class exists |
| `classList.replace()` | Replaces one class with another |

Example:

```javascript
box.classList.add("active");

box.classList.remove("container");

box.classList.toggle("hidden");

console.log(box.classList.contains("active"));
```

### 7.6 `getComputedStyle()`

Returns the computed CSS styles of an element.

```javascript
const heading = document.querySelector("h1");

const styles = getComputedStyle(heading);

console.log(styles.color);
console.log(styles.fontSize);
```

**Difference:**

- `element.style` reads inline styles.
- `getComputedStyle(element)` reads the final computed styles applied by the browser.

---

# 8. HTML Attributes vs DOM Properties

HTML attributes and DOM properties are related but different.

### HTML Attributes

Attributes are defined in HTML markup.

```html
<input id="username" type="text" value="Riyaz">
```

Here:
- `id`
- `type`
- `value`

are HTML attributes.

### DOM Properties

Properties are values available on the JavaScript DOM object.

```javascript
const input = document.getElementById("username");

console.log(input.id);
console.log(input.type);
console.log(input.value);
```

### Difference Between Attributes and Properties

| Attribute | Property |
|---|---|
| Defined in HTML markup | Available on DOM objects |
| Represents the markup value | Represents the current DOM object value |
| Accessed using `getAttribute()` | Accessed using object properties |
| Can be modified using `setAttribute()` | Can be modified using direct assignment |

Example:

```javascript
const input = document.querySelector("input");

// Attribute
console.log(input.getAttribute("value"));

// Property
console.log(input.value);
```

If the user changes the input value, the `value` property reflects the current value, while the original HTML attribute generally remains unchanged.

### Common Attribute Methods

```javascript
input.getAttribute("type");

input.setAttribute("placeholder", "Enter your name");

input.removeAttribute("required");

input.hasAttribute("required");
```

### Boolean Attributes

Some HTML attributes represent true/false states.

Examples:

```html
<input type="text" disabled>
<input type="checkbox" checked>
<input type="text" required>
```

JavaScript:

```javascript
const input = document.querySelector("input");

input.disabled = true;
input.required = true;
```

---

# 9. JavaScript Events

An event is an action or occurrence that happens in the browser.

Examples:
- Mouse click.
- Keyboard press.
- Form submission.
- Page loading.
- Input value change.
- Mouse movement.

JavaScript can respond to these events using event handlers.

### 9.1 Inline Event Handling

```html
<button onclick="showMessage()">Click Me</button>

<script>
function showMessage() {
    alert("Button Clicked!");
}
</script>
```

This approach works, but it is generally not recommended for modern applications because it mixes HTML and JavaScript.

### 9.2 DOM Event Property

```javascript
const button = document.querySelector("button");

button.onclick = function () {
    alert("Button Clicked!");
};
```

Assigning another function to `onclick` replaces the previous handler.

### 9.3 `addEventListener()`

The recommended approach for handling events.

```javascript
const button = document.querySelector("button");

button.addEventListener("click", function () {
    alert("Button Clicked!");
});
```

You can attach multiple event listeners to the same element.

```javascript
button.addEventListener("click", function () {
    console.log("First Event");
});

button.addEventListener("click", function () {
    console.log("Second Event");
});
```

### Common JavaScript Events

| Event | Description |
|---|---|
| `click` | Element clicked |
| `dblclick` | Element double-clicked |
| `mouseover` | Pointer enters an element |
| `mouseout` | Pointer leaves an element |
| `mouseenter` | Pointer enters an element, without bubbling |
| `mouseleave` | Pointer leaves an element, without bubbling |
| `keydown` | Keyboard key pressed |
| `keyup` | Keyboard key released |
| `input` | Input value changes |
| `change` | Value change is committed |
| `submit` | Form submitted |
| `focus` | Element receives focus |
| `blur` | Element loses focus |
| `load` | Resource or page finishes loading |
| `DOMContentLoaded` | HTML parsing is complete |

### Example: Keyboard Event

```javascript
document.addEventListener("keydown", function (event) {
    console.log("Key pressed:", event.key);
});
```

### Example: Input Event

```javascript
const input = document.querySelector("input");

input.addEventListener("input", function (event) {
    console.log(event.target.value);
});
```

---

# 10. Event Object

When an event occurs, the browser provides an event object containing information about that event.

```javascript
const button = document.querySelector("button");

button.addEventListener("click", function (event) {
    console.log(event);
});
```

### Important Event Object Properties

| Property | Description |
|---|---|
| `event.type` | Event name |
| `event.target` | Element where the event originated |
| `event.currentTarget` | Element whose listener is currently executing |
| `event.key` | Keyboard key |
| `event.clientX` | Mouse X position relative to viewport |
| `event.clientY` | Mouse Y position relative to viewport |
| `event.timeStamp` | Time when event was created |
| `event.bubbles` | Whether event bubbles |
| `event.defaultPrevented` | Whether default action was prevented |

### Example: `target` vs `currentTarget`

```html
<div id="parent">
    <button id="child">Click Me</button>
</div>
```

```javascript
const parent = document.getElementById("parent");

parent.addEventListener("click", function (event) {
    console.log("Target:", event.target);
    console.log("Current Target:", event.currentTarget);
});
```

If you click the button:

- `event.target` refers to the button.
- `event.currentTarget` refers to the parent div.

**Remember:**

`target` = Where the event originated.

`currentTarget` = Where the current event listener is attached.

---

# 11. Event Bubbling and Capturing

Event propagation describes how an event travels through the DOM tree.

There are three main phases:

1. Capturing Phase.
2. Target Phase.
3. Bubbling Phase.

### 11.1 Event Bubbling

In event bubbling, the event travels from the target element upward toward its ancestors.

Example:

```html
<div id="parent">
    <button id="child">Click Me</button>
</div>
```

```javascript
const parent = document.getElementById("parent");
const child = document.getElementById("child");

parent.addEventListener("click", function () {
    console.log("Parent Clicked");
});

child.addEventListener("click", function () {
    console.log("Child Clicked");
});
```

When clicking the button:

```text
Child Clicked
Parent Clicked
```

The event starts at the button and bubbles up to the parent.

### 11.2 Event Capturing

In event capturing, the event travels from the outer ancestors toward the target element.

```javascript
parent.addEventListener(
    "click",
    function () {
        console.log("Parent Capturing");
    },
    true
);

child.addEventListener(
    "click",
    function () {
        console.log("Child Clicked");
    }
);
```

When clicking the button:

```text
Parent Capturing
Child Clicked
```

The third argument `true` enables capturing.

You can also use:

```javascript
parent.addEventListener("click", handler, {
    capture: true
});
```

### Event Propagation Diagram

```text
        Capturing Phase
              |
              v
          Document
              |
              v
            Body
              |
              v
           Parent
              |
              v
            Child
              |
         Target Phase
              |
              v
           Parent
              |
              v
            Body
              |
              v
          Document
              |
              v
         Bubbling Phase
```

### 11.3 `stopPropagation()`

Stops an event from propagating further.

```javascript
child.addEventListener("click", function (event) {
    event.stopPropagation();

    console.log("Child Clicked");
});
```

Now the event will not bubble to the parent.

### 11.4 `stopImmediatePropagation()`

Stops propagation and also prevents other listeners on the same element from executing.

```javascript
button.addEventListener("click", function (event) {
    event.stopImmediatePropagation();

    console.log("First Listener");
});

button.addEventListener("click", function () {
    console.log("Second Listener");
});
```

The second listener will not execute.

---

# 12. Event Delegation

Event delegation is a technique where we attach a single event listener to a parent element instead of attaching separate listeners to multiple child elements.

It works because of event bubbling.

### Without Event Delegation

```html
<ul id="list">
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
```

```javascript
const items = document.querySelectorAll("li");

items.forEach((item) => {
    item.addEventListener("click", function () {
        console.log(this.textContent);
    });
});
```

Here, each `li` gets its own event listener.

### With Event Delegation

```javascript
const list = document.getElementById("list");

list.addEventListener("click", function (event) {
    if (event.target.matches("li")) {
        console.log(event.target.textContent);
    }
});
```

Now only one listener is attached to the parent.

### Advantages of Event Delegation

1. Reduces the number of event listeners.
2. Improves memory efficiency in suitable cases.
3. Works with dynamically added child elements.
4. Makes event handling easier for large lists.

### Example: Dynamically Added Elements

```javascript
const list = document.getElementById("list");

list.addEventListener("click", function (event) {
    if (event.target.matches("li")) {
        console.log(event.target.textContent);
    }
});

const newItem = document.createElement("li");

newItem.textContent = "React";

list.appendChild(newItem);
```

The newly added `li` also works with the existing listener.

**Important:** `event.target` may be a nested element inside the intended child. In those cases, use `closest()`.

```javascript
list.addEventListener("click", function (event) {
    const item = event.target.closest("li");

    if (item && list.contains(item)) {
        console.log(item.textContent);
    }
});
```

---

# 13. `preventDefault()` vs `stopPropagation()`

These methods are frequently asked about in JavaScript interviews.

### `preventDefault()`

Prevents the browser's default action for an event.

Example:

```html
<a href="https://example.com" id="link">Visit Website</a>
```

```javascript
const link = document.getElementById("link");

link.addEventListener("click", function (event) {
    event.preventDefault();

    console.log("Navigation prevented");
});
```

The browser will not navigate to the link.

### `stopPropagation()`

Stops the event from travelling through the DOM.

```javascript
button.addEventListener("click", function (event) {
    event.stopPropagation();
});
```

### Difference

| `preventDefault()` | `stopPropagation()` |
|---|---|
| Prevents default browser behavior | Stops event propagation |
| Does not stop bubbling by itself | Does not prevent default behavior |
| Used for form submission, links, etc. | Used to control event propagation |

Example:

```javascript
form.addEventListener("submit", function (event) {
    event.preventDefault();

    console.log("Form submission handled using JavaScript");
});
```

---

# 14. Forms and Form Validation

JavaScript can read form values, validate user input, and control form submission.

### HTML

```html
<form id="myForm">
    <input type="text" id="username" placeholder="Enter name">

    <input type="email" id="email" placeholder="Enter email">

    <button type="submit">Submit</button>
</form>
```

### JavaScript

```javascript
const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;

    console.log(username);
    console.log(email);
});
```

### Important Form Properties

| Property | Description |
|---|---|
| `value` | Current input value |
| `checked` | Checkbox or radio selection state |
| `disabled` | Whether the input is disabled |
| `required` | Whether input is mandatory |
| `validity` | Provides validation state |
| `form` | Associated form element |

### Built-in HTML Validation

HTML provides built-in validation attributes.

```html
<form>
    <input type="text" required minlength="3">

    <input type="email" required>

    <input type="number" min="18" max="60">

    <button type="submit">Submit</button>
</form>
```

### JavaScript Validation

```javascript
const email = document.getElementById("email");

if (email.value.trim() === "") {
    console.log("Email is required");
} else {
    console.log("Valid input");
}
```

### Using `checkValidity()`

```javascript
const form = document.querySelector("form");

console.log(form.checkValidity());
```

Returns:
- `true` if all associated form controls satisfy their constraints.
- `false` otherwise.

### Using `reportValidity()`

```javascript
form.reportValidity();
```

Checks validity and asks the browser to display validation messages.

**Important:** Client-side validation improves user experience, but it is not a security mechanism. Always validate data on the backend too.

---

# 15. Local Storage

`localStorage` is a browser storage API that allows websites to store data persistently.

The stored data remains available even after:
- Page refresh.
- Browser tab closure.
- Browser restart.

It is associated with the website's origin.

### Store Data

```javascript
localStorage.setItem("username", "Riyaz");
```

### Get Data

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

To store an object, use `JSON.stringify()`.

```javascript
const user = {
    name: "Riyaz",
    age: 25,
    city: "Ahmedabad"
};

localStorage.setItem("user", JSON.stringify(user));
```

Retrieve the object using `JSON.parse()`.

```javascript
const storedUser = JSON.parse(localStorage.getItem("user"));

console.log(storedUser.name);
```

### Important Local Storage Methods

| Method | Description |
|---|---|
| `setItem(key, value)` | Stores data |
| `getItem(key)` | Retrieves data |
| `removeItem(key)` | Removes a specific key |
| `clear()` | Removes all keys |
| `key(index)` | Returns the key at a specific index |

### Important Points

- Stores data as strings.
- Data persists across browser sessions.
- Storage is limited in size and varies by browser.
- Data is accessible to JavaScript running on the same origin.
- Do not store passwords, authentication secrets, or sensitive information in localStorage.

---

# 16. Session Storage

`sessionStorage` is similar to `localStorage`, but its data is associated with a particular browser tab's page session.

Data generally remains available until that tab or window session ends.

### Example

```javascript
sessionStorage.setItem("username", "Riyaz");

const username = sessionStorage.getItem("username");

console.log(username);
```

Remove data:

```javascript
sessionStorage.removeItem("username");
```

Clear all data:

```javascript
sessionStorage.clear();
```

### Local Storage vs Session Storage

| Local Storage | Session Storage |
|---|---|
| Persistent storage | Session-based storage |
| Survives browser restart | Normally ends when the tab session ends |
| Shared by same-origin pages across tabs | Separate for each tab's page session |
| Larger storage capacity than cookies in typical browsers | Similar capacity to localStorage |
| Stores strings | Stores strings |

### Practical Examples

**Local Storage:**
- Theme preference.
- Language preference.
- Non-sensitive user settings.
- Shopping cart data.

**Session Storage:**
- Temporary form data.
- Temporary navigation state.
- Data needed only during a particular tab session.

---

# 17. Cookies

Cookies are small pieces of data stored by the browser and commonly used for communication between the browser and server.

They are often used for:
- Session management.
- Authentication.
- User preferences.
- Tracking.

### Creating a Cookie

```javascript
document.cookie = "username=Riyaz";
```

### Reading Cookies

```javascript
console.log(document.cookie);
```

### Setting Expiration

```javascript
document.cookie = "username=Riyaz; max-age=3600";
```

This cookie expires after 3600 seconds, or one hour.

### Setting a Cookie with Path and SameSite

```javascript
document.cookie =
    "username=Riyaz; max-age=3600; path=/; SameSite=Lax";
```

### Deleting a Cookie

Set its expiration date in the past.

```javascript
document.cookie =
    "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
```

### Important Cookie Attributes

| Attribute | Description |
|---|---|
| `Expires` | Specifies the expiration date |
| `Max-Age` | Specifies lifetime in seconds |
| `Path` | Controls the URL path where the cookie is sent |
| `Domain` | Controls the domain scope |
| `Secure` | Sends cookie only over secure HTTPS connections |
| `HttpOnly` | Prevents JavaScript access to the cookie |
| `SameSite` | Controls cross-site cookie sending behavior |

### Important: HttpOnly Cookies

An HttpOnly cookie cannot be accessed using JavaScript.

For example:

```javascript
document.cookie;
```

Will not return HttpOnly cookies.

This is useful for protecting session cookies from being read by JavaScript in the event of an XSS attack.

### Local Storage vs Session Storage vs Cookies

| Feature | Local Storage | Session Storage | Cookies |
|---|---|---|---|
| Storage size | Usually several MB | Usually several MB | Usually around 4 KB per cookie |
| Expiration | Until removed | Tab session | Configurable |
| Sent automatically to server | No | No | Yes, when applicable |
| JavaScript access | Yes | Yes | Usually yes, unless HttpOnly |
| Storage format | Strings | Strings | Name-value pairs |
| Common use | Preferences | Temporary tab data | Sessions and server communication |

**Security Note:** Never store sensitive authentication tokens in JavaScript-accessible storage without carefully considering XSS risks. Secure, HttpOnly, appropriately configured cookies are commonly used for session management.

---

# 18. What is BOM?

**BOM (Browser Object Model)** refers to browser-provided objects that allow JavaScript to interact with the browser environment outside the document's DOM content.

The main entry point is the `window` object.

Examples:
- `window`
- `navigator`
- `location`
- `history`
- `screen`

### DOM vs BOM

| DOM | BOM |
|---|---|
| Represents the webpage/document | Provides access to the browser environment |
| Used to manipulate HTML | Used to interact with browser features |
| Main object: `document` | Main object: `window` |
| Example: `document.querySelector()` | Example: `window.location.href` |

**Note:** BOM is a commonly used term, but it is not one single formal specification in the same way that the DOM is. Browser APIs are defined across multiple web standards.

---

# 19. Window Object

The `window` object represents the browser window or browsing context.

It is the global object in a browser's classic script environment.

### Example

```javascript
console.log(window);
```

You can access many browser features through `window`.

### Common Window Methods

| Method | Description |
|---|---|
| `alert()` | Displays an alert message |
| `confirm()` | Displays a confirmation dialog |
| `prompt()` | Asks the user for input |
| `setTimeout()` | Executes a function after a delay |
| `setInterval()` | Executes a function repeatedly |
| `clearTimeout()` | Cancels a timeout |
| `clearInterval()` | Cancels an interval |
| `open()` | Opens a browsing context, subject to browser restrictions |
| `close()` | Closes a script-closable browsing context |

### Example: Alert

```javascript
window.alert("Hello World");
```

You can also write:

```javascript
alert("Hello World");
```

Because many `window` properties and methods are available as global identifiers in browser scripts.

### Example: Confirm

```javascript
const result = confirm("Are you sure?");

if (result) {
    console.log("User clicked OK");
} else {
    console.log("User clicked Cancel");
}
```

### Example: Prompt

```javascript
const name = prompt("Enter your name");

console.log(name);
```

---

# 20. Navigator Object

The `navigator` object provides information about the browser and its environment.

```javascript
console.log(navigator);
```

### Common Navigator Properties

| Property | Description |
|---|---|
| `navigator.userAgent` | Browser user-agent string |
| `navigator.language` | Preferred browser language |
| `navigator.languages` | List of preferred languages |
| `navigator.onLine` | Browser's online-status indication |
| `navigator.platform` | Platform information |
| `navigator.cookieEnabled` | Indicates whether cookies are enabled |

### Example

```javascript
console.log(navigator.language);

console.log(navigator.onLine);

console.log(navigator.userAgent);
```

**Important:** `navigator.onLine` does not guarantee that the internet is actually reachable. It only provides an indication of the browser's network connectivity state.

---

# 21. Location Object

The `location` object provides information about the current URL and allows navigation to other URLs.

```javascript
console.log(window.location);
```

Suppose the current URL is:

```text
https://example.com:8080/products?id=10#details
```

### Important Location Properties

| Property | Example |
|---|---|
| `href` | `https://example.com:8080/products?id=10#details` |
| `protocol` | `https:` |
| `hostname` | `example.com` |
| `port` | `8080` |
| `pathname` | `/products` |
| `search` | `?id=10` |
| `hash` | `#details` |
| `origin` | `https://example.com:8080` |

### Example

```javascript
console.log(location.href);
console.log(location.hostname);
console.log(location.pathname);
console.log(location.search);
console.log(location.hash);
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

**Difference:**

- `location.href = URL` navigates to a new URL and generally creates a history entry.
- `location.replace(URL)` navigates without keeping the current page as a new history entry.

---

# 22. History Object

The `history` object provides access to the browser's session history.

```javascript
console.log(window.history);
```

### Common Methods

| Method | Description |
|---|---|
| `history.back()` | Goes to the previous history entry |
| `history.forward()` | Goes to the next history entry |
| `history.go()` | Moves a specified number of history entries |
| `history.pushState()` | Adds a new history entry |
| `history.replaceState()` | Replaces the current history entry |

### Example: Back

```javascript
history.back();
```

### Example: Forward

```javascript
history.forward();
```

### Example: Go

```javascript
history.go(-2);
```

Moves back two entries.

### Example: pushState()

```javascript
history.pushState(
    { page: "products" },
    "",
    "/products"
);
```

This changes the URL and adds a new history entry without reloading the page.

### Example: replaceState()

```javascript
history.replaceState(
    { page: "home" },
    "",
    "/home"
);
```

This changes the current history entry instead of creating a new one.

### Important

`pushState()` and `replaceState()` do not automatically load a new page or fetch new content. Your JavaScript application must handle the URL change and update the UI.

---

# 23. Screen Object

The `screen` object provides information about the user's display screen.

```javascript
console.log(screen);
```

### Common Properties

| Property | Description |
|---|---|
| `screen.width` | Screen width |
| `screen.height` | Screen height |
| `screen.availWidth` | Available screen width |
| `screen.availHeight` | Available screen height |
| `screen.colorDepth` | Color depth of the screen |

Example:

```javascript
console.log(screen.width);
console.log(screen.height);
```

**Note:** Screen dimensions and viewport dimensions are different.

- `screen.width` describes the screen.
- `window.innerWidth` describes the browser viewport width.

---

# 24. DOMContentLoaded vs Load Event

These two events are commonly used when executing JavaScript after a webpage loads.

### DOMContentLoaded

Fires when the HTML document has been completely parsed and the DOM has been built.

It does not wait for all images and other external resources to finish loading.

```javascript
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM is ready");
});
```

### Load

Fires when the page and its dependent resources have finished loading.

```javascript
window.addEventListener("load", function () {
    console.log("Page and resources are loaded");
});
```

### Difference

| DOMContentLoaded | Load |
|---|---|
| Waits for HTML parsing to complete | Waits for the page's dependent resources |
| Does not wait for images to finish loading | Generally waits for images, stylesheets, scripts, and other load-dependent resources |
| Usually fires earlier | Usually fires later |
| Attached to `document` | Commonly attached to `window` |

---

# 25. Browser APIs vs DOM

The DOM is one of several APIs available in modern browsers.

Other browser APIs include:

| API | Purpose |
|---|---|
| DOM API | Manipulates HTML documents |
| Fetch API | Makes HTTP requests |
| Storage API | Stores browser-side data |
| Geolocation API | Gets location with user permission |
| Canvas API | Draws graphics |
| Web Workers API | Runs scripts in background threads |
| WebSocket API | Enables two-way communication |
| Clipboard API | Interacts with clipboard |
| History API | Manages session history |
| Notification API | Displays browser notifications |

Example: Geolocation API

```javascript
navigator.geolocation.getCurrentPosition(
    function (position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
    },
    function (error) {
        console.log(error.message);
    }
);
```

This generally requires user permission and a secure context such as HTTPS.

---

# 26. Important DOM Methods – Quick Reference

| Method / Property | Purpose |
|---|---|
| `getElementById()` | Select by ID |
| `getElementsByClassName()` | Select by class |
| `getElementsByTagName()` | Select by tag |
| `querySelector()` | Select first matching element |
| `querySelectorAll()` | Select all matching elements |
| `createElement()` | Create an element |
| `appendChild()` | Append a node |
| `append()` | Append nodes or text |
| `prepend()` | Insert at beginning |
| `remove()` | Remove an element |
| `replaceWith()` | Replace an element |
| `setAttribute()` | Set an attribute |
| `getAttribute()` | Get an attribute |
| `removeAttribute()` | Remove an attribute |
| `classList.add()` | Add CSS class |
| `classList.remove()` | Remove CSS class |
| `classList.toggle()` | Toggle CSS class |
| `addEventListener()` | Attach event listener |
| `removeEventListener()` | Remove event listener |
| `preventDefault()` | Prevent default browser action |
| `stopPropagation()` | Stop event propagation |
| `closest()` | Find nearest matching ancestor |
| `matches()` | Check whether an element matches a selector |

---

# 27. Interview Questions

### Basic Questions

1. What is DOM?
2. What is the difference between DOM and HTML?
3. What is a DOM tree?
4. What is the difference between Node and Element?
5. What are the different types of DOM nodes?
6. What is the difference between `getElementById()` and `querySelector()`?
7. What is the difference between `querySelector()` and `querySelectorAll()`?
8. What is the difference between HTMLCollection and NodeList?
9. What is DOM traversal?
10. What is the difference between `children` and `childNodes`?

### Intermediate Questions

11. What is the difference between `innerHTML`, `innerText`, and `textContent`?
12. What is the difference between `append()` and `appendChild()`?
13. What is the difference between attributes and properties?
14. What is `classList`?
15. What is `addEventListener()`?
16. What is an event object?
17. What is the difference between `target` and `currentTarget`?
18. What is event bubbling?
19. What is event capturing?
20. What is event delegation?
21. What is the difference between `preventDefault()` and `stopPropagation()`?
22. What is the difference between `stopPropagation()` and `stopImmediatePropagation()`?
23. What is the difference between `DOMContentLoaded` and `load`?

### Advanced Questions

24. What is the difference between localStorage and sessionStorage?
25. What are cookies?
26. What is the difference between cookies and localStorage?
27. What is an HttpOnly cookie?
28. What is the BOM?
29. What is the difference between DOM and BOM?
30. What is the purpose of the window object?
31. What is the difference between `location.href` and `location.replace()`?
32. What is the History API?
33. What is the difference between `history.pushState()` and `history.replaceState()`?
34. Why should we avoid inserting untrusted input using `innerHTML`?
35. Is DOM available in Node.js by default?

---

# 28. Practical Exercises

Practice these tasks without looking at the solution.

| No. | Exercise | Concepts |
|---|---|---|
| 1 | Select an element using ID, class, and tag name | DOM Selection |
| 2 | Change an element's text dynamically | `textContent` |
| 3 | Change the background color of a div | CSS Manipulation |
| 4 | Add and remove CSS classes | `classList` |
| 5 | Create a new paragraph and append it to a div | `createElement()` |
| 6 | Create a list dynamically using an array | DOM Manipulation |
| 7 | Remove an element when a button is clicked | Events |
| 8 | Build a counter with increment and decrement buttons | Events |
| 9 | Build a show/hide password feature | DOM + Events |
| 10 | Build a dynamic todo list | DOM + Event Delegation |
| 11 | Create a form with validation | Form Handling |
| 12 | Save username in localStorage | Local Storage |
| 13 | Build a theme switcher using localStorage | Storage + CSS |
| 14 | Build a temporary form using sessionStorage | Session Storage |
| 15 | Display the current URL and hostname | Location API |
| 16 | Build a simple browser back/forward navigation demo | History API |

---

# 29. Quick Revision

| Concept | Remember |
|---|---|
| DOM | Programming interface for HTML documents |
| DOM Tree | Hierarchical representation of a document |
| Node | Basic object in the DOM tree |
| Element | Node representing an HTML element |
| `querySelector()` | Returns first matching element |
| `querySelectorAll()` | Returns a static NodeList |
| HTMLCollection | Usually a live collection of elements |
| `textContent` | Gets or sets text content |
| `innerText` | Gets or sets rendered text |
| `innerHTML` | Gets or sets HTML content |
| `classList` | Manages CSS classes |
| Event | Action or occurrence in the browser |
| Bubbling | Event travels from child to parent |
| Capturing | Event travels from parent to child |
| Event Delegation | Parent handles child events |
| `preventDefault()` | Prevents default browser behavior |
| `stopPropagation()` | Stops event propagation |
| localStorage | Persistent browser storage |
| sessionStorage | Tab-session storage |
| Cookies | Small data sent with applicable HTTP requests |
| BOM | Browser environment APIs |
| `window` | Main browser browsing-context object |
| `navigator` | Browser and environment information |
| `location` | Current URL and navigation |
| `history` | Session history management |
| `screen` | Display screen information |
| `DOMContentLoaded` | HTML parsing completed |
| `load` | Page resources loaded |

---

# 30. Official Documentation

Use these resources for deeper learning and practical examples.

1. [MDN – Document Object Model (DOM)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model?utm_source=chatgpt.com)
2. [MDN – Introduction to Events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events?utm_source=chatgpt.com)
3. [MDN – Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events?utm_source=chatgpt.com)
4. [MDN – Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API?utm_source=chatgpt.com)
5. [MDN – Document API](https://developer.mozilla.org/en-US/docs/Web/API/Document?utm_source=chatgpt.com)
6. [MDN – Window API](https://developer.mozilla.org/en-US/docs/Web/API/Window?utm_source=chatgpt.com)

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
| Phase 7 | Asynchronous JavaScript | Next |
| Phase 8 | Modern JavaScript (ES6+) | Upcoming |
| Phase 9 | Advanced JavaScript | Upcoming |
| Phase 10 | JavaScript Modules & Tooling | Upcoming |
| Phase 11 | JavaScript Projects & Interview Preparation | Upcoming |

## Next: Phase 7 – Asynchronous JavaScript

Topics will include:

1. Synchronous vs Asynchronous JavaScript.
2. Blocking vs Non-blocking Code.
3. JavaScript Runtime.
4. Call Stack.
5. Web APIs.
6. Callback Functions.
7. Callback Hell.
8. Promises.
9. Promise States.
10. Promise Chaining.
11. `then()`, `catch()`, and `finally()`.
12. `Promise.all()`.
13. `Promise.allSettled()`.
14. `Promise.race()`.
15. `Promise.any()`.
16. `async` and `await`.
17. Error Handling with `try...catch`.
18. Event Loop.
19. Microtask Queue vs Macrotask Queue.
20. `setTimeout()` and `setInterval()`.
21. Fetch API.
22. HTTP Requests and Responses.
23. `AbortController`.

**Recommendation:** Before moving to Phase 7, build a small Todo List application using DOM manipulation, events, event delegation, and localStorage. This will help reinforce the concepts covered in Phase 6.