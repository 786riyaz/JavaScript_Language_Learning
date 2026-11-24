# JavaScript Revision Notes – Phase 10
# JavaScript Modules & Tooling

This phase covers how JavaScript code is organized into multiple files, how files communicate with each other, and the tools used in modern JavaScript development.

---

# 1. What are JavaScript Modules?

A **JavaScript Module** is a separate file that contains reusable JavaScript code, such as variables, functions, classes, or objects.

Modules allow us to divide a large application into smaller, manageable files.

### Without Modules

Imagine writing an entire application in one file:

```javascript
// app.js

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function loginUser(username) {
    console.log(`Welcome ${username}`);
}

function registerUser(username) {
    console.log(`User ${username} registered`);
}
```

As the application grows, maintaining this file becomes difficult.

### With Modules

We can divide the code into multiple files:

```text
project/
│
├── app.js
├── math.js
└── user.js
```

**math.js**

```javascript
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

**user.js**

```javascript
export function loginUser(username) {
    console.log(`Welcome ${username}`);
}
```

**app.js**

```javascript
import { add, subtract } from "./math.js";
import { loginUser } from "./user.js";

console.log(add(10, 20));
console.log(subtract(20, 10));

loginUser("Riyaz");
```

### Benefits of Modules

1. Code reusability.
2. Better code organization.
3. Easier debugging and maintenance.
4. Avoids unnecessary global variables.
5. Supports team collaboration.
6. Makes large applications easier to manage.

---

# 2. What is Module Scope?

In JavaScript, every ES module has its own scope.

Variables and functions declared inside a module are not automatically available globally or in other modules.

**math.js**

```javascript
const pi = 3.14;

function calculateArea(radius) {
    return pi * radius * radius;
}
```

**app.js**

```javascript
console.log(pi);
```

This will produce:

```text
ReferenceError: pi is not defined
```

Why?

Because `pi` belongs to the scope of `math.js`.

To access it from another module, we must export it.

**math.js**

```javascript
export const pi = 3.14;
```

**app.js**

```javascript
import { pi } from "./math.js";

console.log(pi);
```

Output:

```text
3.14
```

**Important:** ES modules automatically operate in strict mode.

You don't need to write:

```javascript
"use strict";
```

---

# 3. What are Named Exports?

Named exports allow us to export multiple variables, functions, classes, or objects from a module.

### Example

**math.js**

```javascript
export const pi = 3.14;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

We can also export declarations together:

```javascript
const name = "Riyaz";

function greet() {
    console.log("Hello");
}

export { name, greet };
```

### Important Points

- A module can have multiple named exports.
- We must import them using their exported names.
- Named imports use curly braces `{}`.

---

# 4. What are Default Exports?

A default export allows us to export one primary value from a module.

**user.js**

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

export default user;
```

Import it:

**app.js**

```javascript
import user from "./user.js";

console.log(user.name);
```

Output:

```text
Riyaz
```

### Default Export with a Function

```javascript
export default function greet() {
    console.log("Hello Riyaz");
}
```

Import:

```javascript
import greet from "./greet.js";

greet();
```

### Named Export vs Default Export

| Feature | Named Export | Default Export |
|---|---|---|
| Number per module | Multiple | Maximum one |
| Import syntax | `{ name }` | `name` |
| Import name | Must match exported name | Can choose another name |
| Curly braces | Required | Not required |
| Main purpose | Export multiple items | Export primary item |

**Important:** A module can contain both named exports and one default export.

Example:

```javascript
// user.js

export const age = 25;

export function greet() {
    console.log("Hello");
}

export default {
    name: "Riyaz"
};
```

Import:

```javascript
import user, { age, greet } from "./user.js";

console.log(user.name);
console.log(age);
greet();
```

---

# 5. What are Named Imports?

Named imports allow us to import specific exports from another module.

**math.js**

```javascript
export const pi = 3.14;

export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

**app.js**

```javascript
import { pi, add, subtract } from "./math.js";

console.log(pi);
console.log(add(10, 20));
console.log(subtract(20, 10));
```

Output:

```text
3.14
30
10
```

You can also import only the functions you need:

```javascript
import { add } from "./math.js";

console.log(add(10, 20));
```

---

# 6. What are Import Aliases?

Import aliases allow us to rename imported variables or functions.

We use the `as` keyword.

**math.js**

```javascript
export function add(a, b) {
    return a + b;
}
```

**app.js**

```javascript
import { add as addition } from "./math.js";

console.log(addition(10, 20));
```

Output:

```text
30
```

### Why do we need aliases?

Suppose two modules export functions with the same name.

```javascript
import { getData as getUserData } from "./user.js";

import { getData as getProductData } from "./product.js";
```

Now there is no naming conflict.

### Renaming during Export

```javascript
function greet() {
    console.log("Hello");
}

export { greet as sayHello };
```

Import:

```javascript
import { sayHello } from "./greet.js";
```

---

# 7. What is Re-exporting Modules?

Re-exporting means importing functionality from one module and exporting it through another module.

It is useful when a project contains many files.

### Project Structure

```text
project/
│
├── index.js
│
├── math/
│   ├── add.js
│   └── subtract.js
│
└── utils.js
```

**math/add.js**

```javascript
export function add(a, b) {
    return a + b;
}
```

**math/subtract.js**

```javascript
export function subtract(a, b) {
    return a - b;
}
```

**utils.js**

```javascript
export { add } from "./math/add.js";

export { subtract } from "./math/subtract.js";
```

**index.js**

```javascript
import { add, subtract } from "./utils.js";

console.log(add(10, 20));
console.log(subtract(20, 10));
```

Output:

```text
30
10
```

### Export Everything

```javascript
export * from "./math/add.js";
export * from "./math/subtract.js";
```

Note: `export *` does not automatically re-export the default export.

To re-export a default export:

```javascript
export { default as user } from "./user.js";
```

---

# 8. What is Dynamic Import?

Normally, we import modules using static imports.

```javascript
import { add } from "./math.js";
```

But sometimes we want to load a module only when required.

For this, JavaScript provides **dynamic import** using `import()`.

### Example

```javascript
async function loadMath() {
    const math = await import("./math.js");

    console.log(math.add(10, 20));
}

loadMath();
```

Output:

```text
30
```

### Dynamic Import with Promise

```javascript
import("./math.js")
    .then((math) => {
        console.log(math.add(10, 20));
    })
    .catch((error) => {
        console.log(error);
    });
```

### When do we use Dynamic Import?

1. Loading large modules only when required.
2. Improving initial application loading.
3. Lazy loading components.
4. Loading features conditionally.

Example:

```javascript
const button = document.querySelector("#loadButton");

button.addEventListener("click", async () => {
    const module = await import("./heavyFeature.js");

    module.runFeature();
});
```

The module loads when the user clicks the button.

### Static Import vs Dynamic Import

| Feature | Static Import | Dynamic Import |
|---|---|---|
| Syntax | `import { x } from "./file.js"` | `import("./file.js")` |
| Loading | Statically declared | Loaded when executed |
| Return value | No Promise returned | Returns a Promise |
| Conditional loading | No | Yes |
| Common use | Normal dependencies | Lazy loading |

---

# 9. What are CommonJS Modules?

CommonJS is a module system traditionally used in Node.js.

It uses:

- `require()` to import.
- `module.exports` to export.

### Example

**math.js**

```javascript
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    add,
    subtract
};
```

**app.js**

```javascript
const math = require("./math");

console.log(math.add(10, 20));
console.log(math.subtract(20, 10));
```

Output:

```text
30
10
```

### Import Specific Functions

```javascript
const { add, subtract } = require("./math");

console.log(add(10, 20));
```

### Export a Single Function

```javascript
// greet.js

function greet() {
    console.log("Hello Riyaz");
}

module.exports = greet;
```

Import:

```javascript
const greet = require("./greet");

greet();
```

---

# 10. ES Modules vs CommonJS

JavaScript has two major module systems.

1. ES Modules (ESM)
2. CommonJS (CJS)

| Feature | ES Modules | CommonJS |
|---|---|---|
| Import | `import` | `require()` |
| Export | `export` | `module.exports` |
| Standard | JavaScript standard | Traditionally Node.js |
| Loading model | Static imports | Runtime `require()` |
| Default behavior | Strict mode | Not automatically strict |
| Browser support | Native support | Requires bundling or tooling |
| File extensions | `.js`, `.mjs` | `.js`, `.cjs` |
| Dynamic loading | `import()` | `require()` |

### Important Difference

ES modules use static import declarations.

```javascript
import { add } from "./math.js";
```

CommonJS loads modules using `require()` at runtime.

```javascript
const math = require("./math.js");
```

CommonJS `require()` is synchronous in normal Node.js CommonJS execution.

Dynamic `import()` is asynchronous and returns a Promise.

---

# 11. What is the Difference Between `require()` and `import`?

### Using require()

```javascript
const fs = require("fs");

console.log(fs);
```

### Using import

```javascript
import fs from "node:fs";

console.log(fs);
```

| `require()` | `import` |
|---|---|
| CommonJS loading function | ES module syntax |
| Can be called conditionally | Static imports must be at module top level |
| Synchronous in CommonJS | Static dependencies are resolved as part of module loading |
| Runtime loading | Statically analyzed |
| Used in CommonJS files | Used in ES modules |

**Important:** You can use dynamic `import()` inside both CommonJS and ES module code.

```javascript
async function loadModule() {
    const module = await import("./math.js");
}
```

---

# 12. What is the Difference Between `module.exports` and `exports`?

Both are related to exporting modules in CommonJS.

### Using module.exports

```javascript
function greet() {
    console.log("Hello");
}

module.exports = greet;
```

### Using exports

```javascript
exports.greet = function () {
    console.log("Hello");
};
```

Both approaches can export functionality.

### Important Difference

Initially, Node.js makes `exports` refer to the same object as `module.exports`.

Conceptually:

```javascript
exports = module.exports;
```

Therefore:

```javascript
exports.greet = function () {
    console.log("Hello");
};
```

Works because we are adding a property to the shared object.

But this does not work as intended:

```javascript
exports = function () {
    console.log("Hello");
};
```

Why?

Because now `exports` points to a different object, while Node.js uses `module.exports` as the actual exported value.

### Correct Approach

```javascript
module.exports = function () {
    console.log("Hello");
};
```

**Remember:** `module.exports` determines what `require()` receives.

---

# 13. What is package.json?

`package.json` is the main configuration file of a Node.js project.

It contains project information, dependencies, scripts, and other configuration.

### Example

```json
{
    "name": "my-project",
    "version": "1.0.0",
    "description": "My JavaScript application",
    "main": "index.js",
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    },
    "dependencies": {
        "express": "^5.0.0"
    },
    "devDependencies": {
        "nodemon": "^3.0.0"
    }
}
```

### Important Properties

| Property | Purpose |
|---|---|
| `name` | Project name |
| `version` | Project version |
| `description` | Project description |
| `main` | Package entry point in applicable CommonJS resolution contexts |
| `scripts` | Custom commands |
| `dependencies` | Packages required by the application |
| `devDependencies` | Packages used during development |
| `type` | Controls how Node.js interprets `.js` files |
| `engines` | Specifies supported runtime versions |

### What is the `type` property?

It controls whether Node.js treats `.js` files as ES modules or CommonJS modules.

ES Modules:

```json
{
    "type": "module"
}
```

CommonJS:

```json
{
    "type": "commonjs"
}
```

You can also explicitly use:

- `.mjs` for ES modules.
- `.cjs` for CommonJS.

---

# 14. What is npm?

**npm stands for Node Package Manager.**

It is used to install, manage, and maintain JavaScript packages.

For example, if you want to use Express in your project:

```bash
npm install express
```

This installs Express and adds it to your `dependencies`.

### Common npm Commands

| Command | Purpose |
|---|---|
| `npm init` | Create package.json interactively |
| `npm init -y` | Create package.json with defaults |
| `npm install` | Install project dependencies |
| `npm install express` | Install Express |
| `npm uninstall express` | Remove Express |
| `npm install -D nodemon` | Install as a development dependency |
| `npm update` | Update dependencies within allowed version ranges |
| `npm run dev` | Execute the dev script |
| `npm start` | Execute the start script |
| `npm list` | List installed packages |
| `npm list -g` | List globally installed packages |

### What is npx?

`npx` is a command-line tool bundled with modern npm versions.

It allows us to execute package commands without manually installing the package globally.

Example:

```bash
npx create-next-app@latest my-app
```

This executes the `create-next-app` package.

### npm vs npx

| npm | npx |
|---|---|
| Installs and manages packages | Executes package commands |
| `npm install express` | `npx create-next-app` |
| Manages dependencies | Useful for running CLI tools |

---

# 15. What is package-lock.json?

`package-lock.json` is automatically generated by npm.

It records the exact dependency tree and resolved package versions used by the project.

### Example

Your `package.json`:

```json
{
    "dependencies": {
        "express": "^5.0.0"
    }
}
```

The caret (`^`) allows compatible updates.

Suppose npm installs Express version `5.1.0`.

The lock file records the exact resolved version and other dependency details.

### Why is package-lock.json important?

1. Maintains consistent dependency versions.
2. Helps reproduce the same dependency tree.
3. Makes team collaboration easier.
4. Helps avoid unexpected dependency changes.
5. Supports more reliable deployments.

### What is npm ci?

```bash
npm ci
```

It performs a clean installation using the lock file.

Important characteristics:

- Removes the existing `node_modules` directory.
- Installs the exact dependency versions recorded in `package-lock.json`.
- Does not update the lock file.
- Requires the lock file to match `package.json`.

It is commonly used in CI/CD pipelines.

### package.json vs package-lock.json

| package.json | package-lock.json |
|---|---|
| Defines dependencies and version ranges | Records exact resolved dependency versions |
| Usually maintained by developers | Generated and updated by npm |
| Contains project metadata | Contains detailed dependency tree |
| Specifies allowed versions | Records installed resolutions |

---

# 16. What is Semantic Versioning?

Semantic Versioning is a standard used to represent software package versions.

Format:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
5.2.3
```

| Part | Meaning |
|---|---|
| MAJOR | Breaking changes |
| MINOR | New backward-compatible features |
| PATCH | Backward-compatible bug fixes |

### Example

Suppose a library has version:

```text
2.3.4
```

- `3` is the major version.
- `3` is the minor version.
- `4` is the patch version.

Examples of changes:

```text
2.3.4 → 3.0.0
```

Major update.

```text
2.3.4 → 2.4.0
```

Minor update.

```text
2.3.4 → 2.3.5
```

Patch update.

### What are `^` and `~` in package.json?

Suppose:

```json
{
    "dependencies": {
        "express": "^5.1.0",
        "lodash": "~4.17.21"
    }
}
```

**Caret (`^`)**

```text
^5.1.0
```

Allows compatible updates that do not change the major version.

Generally:

```text
>=5.1.0 <6.0.0
```

**Tilde (`~`)**

```text
~4.17.21
```

Allows patch updates within the same minor version.

Generally:

```text
>=4.17.21 <4.18.0
```

### Important Note

For versions below `1.0.0`, caret behavior is more restrictive.

For example:

```text
^0.2.3
```

Generally allows:

```text
>=0.2.3 <0.3.0
```

---

# 17. Dependencies vs DevDependencies

When installing npm packages, we can install them as either dependencies or development dependencies.

### Dependencies

These are packages required by the application to run.

Example:

```bash
npm install express
```

This adds Express under `dependencies`.

Examples:

- Express
- React
- Mongoose
- Axios

### DevDependencies

These are packages used during development, testing, or building.

Example:

```bash
npm install -D nodemon
```

This adds Nodemon under `devDependencies`.

Examples:

- Nodemon
- ESLint
- Prettier
- Jest
- TypeScript (in many JavaScript projects)

### Comparison

| Dependencies | DevDependencies |
|---|---|
| Required at runtime | Primarily required during development/build |
| Installed under `dependencies` | Installed under `devDependencies` |
| Used by application | Used by developers and build tools |

**Important:** Some development dependencies are still required during production builds. For example, TypeScript or a bundler may be needed to compile the application before deployment.

---

# 18. What are Environment Variables?

Environment variables are external configuration values provided to an application at runtime or build time.

They help us separate configuration from source code.

### Example

Suppose your database connection string is:

```javascript
const DB_URL = "mongodb://localhost:27017/mydb";
```

Hardcoding configuration is not recommended.

Instead, use an environment variable.

**.env**

```env
PORT=5000
DB_URL=mongodb://localhost:27017/mydb
JWT_SECRET=my-secret-key
```

In Node.js:

```javascript
const port = process.env.PORT;

console.log(port);
```

### How to Load `.env` in Node.js

With modern Node.js versions, you can use:

```bash
node --env-file=.env index.js
```

Alternatively, use the `dotenv` package:

```bash
npm install dotenv
```

```javascript
require("dotenv").config();

console.log(process.env.PORT);
```

For an ES module project:

```javascript
import "dotenv/config";

console.log(process.env.PORT);
```

### Important Security Rules

1. Never commit secret environment variables to GitHub.
2. Add `.env` to `.gitignore`.
3. Keep a `.env.example` file containing placeholder values.
4. Use environment variables for database credentials, API keys, and secrets.
5. Never expose private secrets to frontend code.

### Frontend Environment Variables

Some frontend tools expose variables to browser code.

For example, Vite uses the `VITE_` prefix:

```env
VITE_API_URL=http://localhost:5000
```

Access it:

```javascript
console.log(import.meta.env.VITE_API_URL);
```

**Important:** Any variable exposed to browser code is publicly accessible. Never put database passwords, private API keys, or JWT secrets in client-exposed variables.

---

# 19. What is a Bundler?

A bundler is a development tool that combines and processes application resources into files suitable for deployment.

For example, your application might contain:

```text
src/
│
├── index.js
├── app.js
├── math.js
├── styles.css
└── images/
    └── logo.png
```

A bundler analyzes dependencies and processes the required files.

It can generate optimized output such as:

```text
dist/
│
├── assets/
│   ├── index.js
│   ├── index.css
│   └── logo.png
```

### What does a bundler do?

1. Combines modules.
2. Processes CSS and assets.
3. Performs code splitting.
4. Supports tree shaking.
5. Minifies JavaScript and CSS.
6. Optimizes production output.

### What is Code Splitting?

Code splitting divides application code into smaller chunks.

Instead of loading everything initially, the browser can load certain chunks only when required.

Example:

```javascript
const module = await import("./dashboard.js");
```

This can allow the dashboard code to load only when the user opens the dashboard.

### What is Tree Shaking?

Tree shaking removes unused code from the production bundle when the bundler can determine that it is safe to remove.

Example:

**math.js**

```javascript
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

**app.js**

```javascript
import { add } from "./math.js";

console.log(add(10, 20));
```

If `subtract()` is unused and the module has no relevant side effects, a bundler may remove it from the production output.

**Important:** ES module syntax makes static dependency analysis easier, which helps tree shaking.

---

# 20. What is Webpack?

Webpack is a JavaScript module bundler.

It analyzes the dependency graph of an application and generates bundles.

It can process:

- JavaScript
- CSS
- Images
- Fonts
- Other assets

### Basic Webpack Workflow

```text
Source Files
     |
     v
Webpack
     |
     v
Dependency Analysis
     |
     v
Loaders and Plugins
     |
     v
Optimized Bundle
     |
     v
dist/
```

### Important Webpack Concepts

| Concept | Meaning |
|---|---|
| Entry | Starting point of the application |
| Output | Location of generated bundles |
| Loaders | Transform files into modules Webpack can process |
| Plugins | Extend Webpack's functionality |
| Mode | Development or production |
| Module | Individual file or dependency handled by Webpack |

Webpack is commonly used in complex frontend applications and existing projects.

---

# 21. What is Vite?

Vite is a modern frontend build tool.

It provides a fast development server and a production build system.

It is commonly used with:

- React
- Vue
- Svelte
- Vanilla JavaScript

### Create a React Application with Vite

```bash
npm create vite@latest my-app
```

Choose React when prompted.

Then:

```bash
cd my-app
npm install
npm run dev
```

### Why is Vite popular?

1. Fast development server startup.
2. Fast Hot Module Replacement (HMR).
3. Modern ES module support.
4. Production build optimization.
5. Simple configuration.

### What is HMR?

HMR stands for Hot Module Replacement.

It allows a development server to update changed modules without requiring a full page reload in many situations.

For example:

You modify a React component, save the file, and the browser updates the component quickly.

### Webpack vs Vite

| Webpack | Vite |
|---|---|
| Traditional module bundler | Modern frontend build tool |
| Uses bundling-based development workflows | Uses native browser ESM for development where possible |
| Configuration can be extensive | Generally simpler initial setup |
| Mature ecosystem | Modern development experience |
| Common in established applications | Popular for new frontend projects |

**Note:** Vite uses a different production build pipeline from its development server. Its underlying bundling implementation can vary across versions.

---

# 22. What is Babel?

Babel is a JavaScript compiler, commonly used to transform modern JavaScript syntax into code compatible with older JavaScript environments.

### Example

Modern JavaScript:

```javascript
const greet = (name) => {
    console.log(`Hello ${name}`);
};
```

Babel can transform this into older-style syntax:

```javascript
var greet = function (name) {
    console.log("Hello " + name);
};
```

### Why do we need Babel?

Different browsers support JavaScript features at different times.

Babel helps developers write modern JavaScript while supporting older environments.

### Important Point

Babel transforms JavaScript syntax, but it does not automatically provide every missing JavaScript API.

For example, transforming:

```javascript
const result = arr.includes(10);
```

does not necessarily provide an implementation of `Array.prototype.includes()` in an older browser.

For missing APIs, you may need a polyfill.

### Babel vs Polyfill

| Babel | Polyfill |
|---|---|
| Transforms JavaScript syntax | Provides missing runtime functionality |
| Example: Arrow functions to regular functions | Example: Adding support for a missing API |
| Works during compilation | Usually executes as part of the application |

---

# 23. What is ESLint?

ESLint is a JavaScript linting tool.

It analyzes code and identifies potential errors, suspicious patterns, and code-quality issues.

### Example

```javascript
const name = "Riyaz";

console.log(Name);
```

Here, `Name` and `name` are different identifiers.

ESLint can detect the undefined variable.

### Another Example

```javascript
if (true) {
    var age = 25;
}
```

ESLint can flag certain patterns depending on the configured rules.

### Why use ESLint?

1. Find potential bugs.
2. Maintain consistent coding practices.
3. Detect unused variables.
4. Identify problematic patterns.
5. Improve code quality.

---

# 24. What is Prettier?

Prettier is a code formatter.

It automatically formats code according to configured style rules.

### Before Formatting

```javascript
function greet(name){console.log("Hello "+name)}
```

### After Formatting

```javascript
function greet(name) {
    console.log("Hello " + name);
}
```

### ESLint vs Prettier

| ESLint | Prettier |
|---|---|
| Finds code-quality problems | Formats code |
| Detects potential bugs | Adjusts spacing, indentation, quotes, etc. |
| Uses linting rules | Uses formatting rules |
| Focuses on code correctness and consistency | Focuses on code presentation |

**Remember:**

- ESLint helps identify problematic code.
- Prettier makes code formatting consistent.

They can be used together.

---

# 25. What is Browser Compatibility?

Browser compatibility means ensuring that your application works correctly across different browsers and browser versions.

For example:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

Not every browser supports every JavaScript feature at the same time.

### Example

A modern JavaScript feature may work in Chrome but not in an older browser.

This can cause compatibility issues.

### How to Check Compatibility?

You can use:

- MDN Browser Compatibility Data.
- Can I Use.

References:

- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript?utm_source=chatgpt.com)
- [Can I Use](https://caniuse.com/?utm_source=chatgpt.com)

### How to Improve Browser Compatibility?

1. Use Babel to transform unsupported syntax.
2. Use polyfills for missing APIs.
3. Check browser compatibility before using newer features.
4. Test applications in multiple browsers.
5. Define supported browsers using project configuration when necessary.

---

# 26. What are Polyfills?

A polyfill is JavaScript code that provides functionality that is missing in an older environment.

### Example

Suppose an environment does not support `Array.prototype.includes()`.

A simplified polyfill:

```javascript
if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement) {
        return this.indexOf(searchElement) !== -1;
    };
}
```

Now:

```javascript
const numbers = [10, 20, 30];

console.log(numbers.includes(20));
```

Output:

```text
true
```

**Important:** This is a simplified example. A fully standards-compliant polyfill must handle additional cases, such as `NaN`, sparse arrays, and `fromIndex`.

### Polyfill vs Transpiler

| Polyfill | Transpiler |
|---|---|
| Adds missing functionality | Converts code syntax |
| Runtime functionality | Source-code transformation |
| Example: `Array.includes()` | Example: Arrow functions |
| Helps support older environments | Helps support older JavaScript syntax environments |

---

# 27. Practical Project: Create Your Own Module System

Let's create a small project using ES modules.

### Project Structure

```text
javascript-modules/
│
├── package.json
│
└── src/
    │
    ├── index.js
    ├── math.js
    ├── user.js
    └── calculator.js
```

### Step 1: Initialize the Project

```bash
npm init -y
```

Add this to `package.json`:

```json
{
    "name": "javascript-modules",
    "version": "1.0.0",
    "type": "module",
    "scripts": {
        "start": "node src/index.js"
    }
}
```

### Step 2: Create math.js

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

### Step 3: Create user.js

```javascript
const user = {
    name: "Riyaz",
    role: "Developer"
};

export default user;
```

### Step 4: Create calculator.js

```javascript
export function calculate(operation, a, b) {
    switch (operation) {
        case "add":
            return a + b;

        case "subtract":
            return a - b;

        case "multiply":
            return a * b;

        default:
            return "Invalid operation";
    }
}
```

### Step 5: Create index.js

```javascript
import user from "./user.js";

import {
    add,
    subtract,
    multiply
} from "./math.js";

import { calculate } from "./calculator.js";

console.log("User:", user.name);

console.log("Addition:", add(10, 20));

console.log("Subtraction:", subtract(20, 10));

console.log("Multiplication:", multiply(10, 5));

console.log("Calculator:", calculate("add", 50, 50));
```

### Step 6: Run the Project

```bash
npm start
```

Expected output:

```text
User: Riyaz
Addition: 30
Subtraction: 10
Multiplication: 50
Calculator: 100
```

This project demonstrates how multiple modules communicate with each other.

---

# 28. Important Interview Questions

### Q1. What are JavaScript modules?

Modules are separate files containing reusable JavaScript code. They help organize and maintain large applications.

### Q2. What is the difference between named and default exports?

Named exports allow multiple exports from a module and require matching import names. A default export represents the primary export and can be imported using any local name.

### Q3. Can we use named and default exports together?

Yes.

```javascript
export const age = 25;

export default function greet() {
    console.log("Hello");
}
```

### Q4. What is dynamic import?

Dynamic import loads a module when required and returns a Promise.

```javascript
const module = await import("./math.js");
```

### Q5. What is CommonJS?

CommonJS is a module system traditionally used in Node.js. It uses `require()` and `module.exports`.

### Q6. What is the difference between npm and npx?

npm manages packages, while npx executes package commands.

### Q7. What is package-lock.json?

It records the exact resolved dependency tree, helping maintain consistent installations.

### Q8. What is semantic versioning?

It is a versioning convention using MAJOR.MINOR.PATCH.

### Q9. What is a bundler?

A bundler processes application modules and assets and produces optimized output for deployment.

### Q10. What is tree shaking?

Tree shaking removes unused code from a production bundle when it is safe to do so.

### Q11. What is Vite?

Vite is a modern frontend build tool providing a development server and production build pipeline.

### Q12. What is Babel?

Babel transforms modern JavaScript syntax into syntax compatible with older JavaScript environments.

### Q13. What is the difference between Babel and a polyfill?

Babel transforms syntax, while polyfills provide missing runtime functionality.

### Q14. What is ESLint?

ESLint analyzes JavaScript code to detect potential problems and enforce coding rules.

### Q15. What is Prettier?

Prettier automatically formats source code according to configured formatting rules.

### Q16. What is the difference between dependencies and devDependencies?

Dependencies are required by the application at runtime. DevDependencies are primarily used for development, testing, and building.

### Q17. What is the difference between `exports` and `module.exports`?

`module.exports` determines the value returned by `require()`. `exports` initially references the same object, but reassigning `exports` alone does not replace `module.exports`.

### Q18. Why should we use environment variables?

They separate configuration and sensitive values from application source code. However, client-exposed environment variables are not secret.

---

# 29. Practical Exercises

Try completing these exercises yourself.

| No. | Exercise | Difficulty |
|---|---|---|
| 1 | Create a module that exports addition, subtraction, multiplication, and division. | Easy |
| 2 | Create a user module using default export. | Easy |
| 3 | Import multiple functions using named imports. | Easy |
| 4 | Rename imported functions using aliases. | Easy |
| 5 | Create a central `index.js` file that re-exports multiple modules. | Medium |
| 6 | Load a module using dynamic import when a button is clicked. | Medium |
| 7 | Create a Node.js project using CommonJS. | Medium |
| 8 | Convert the CommonJS project into ES modules. | Medium |
| 9 | Create npm scripts for development and production. | Medium |
| 10 | Configure environment variables using dotenv. | Medium |
| 11 | Install ESLint and Prettier in a project. | Medium |
| 12 | Create a small React application using Vite. | Advanced |

---

# 30. Output-Based Questions

Try predicting the output before checking the answers.

### Question 1

```javascript
// math.js

export const number = 100;
```

```javascript
// app.js

import { number } from "./math.js";

console.log(number);
```

What is the output?

### Question 2

```javascript
// user.js

export default {
    name: "Riyaz"
};
```

```javascript
// app.js

import person from "./user.js";

console.log(person.name);
```

What is the output?

### Question 3

```javascript
// math.js

export function add(a, b) {
    return a + b;
}
```

```javascript
// app.js

import { add as sum } from "./math.js";

console.log(sum(5, 10));
```

What is the output?

### Question 4

```javascript
// math.js

export const a = 10;
export const b = 20;
```

```javascript
// app.js

import * as math from "./math.js";

console.log(math.a);
console.log(math.b);
```

What is the output?

### Question 5

```javascript
const module = await import("./math.js");

console.log(typeof module);
```

What is the output?

---

## Answers

| Question | Answer |
|---|---|
| 1 | `100` |
| 2 | `Riyaz` |
| 3 | `15` |
| 4 | `10`, then `20` |
| 5 | `"object"` |

---

# 31. Important Documentation

Use these official resources for further learning.

| Topic | Documentation |
|---|---|
| JavaScript Modules | [MDN JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules?utm_source=chatgpt.com) |
| Node.js Modules | [Node.js Modules](https://nodejs.org/api/modules.html?utm_source=chatgpt.com) |
| Node.js ES Modules | [Node.js ECMAScript Modules](https://nodejs.org/api/esm.html?utm_source=chatgpt.com) |
| npm | [npm Documentation](https://docs.npmjs.com/?utm_source=chatgpt.com) |
| Vite | [Vite Documentation](https://vite.dev/guide/?utm_source=chatgpt.com) |
| Webpack | [Webpack Documentation](https://webpack.js.org/concepts/?utm_source=chatgpt.com) |
| Babel | [Babel Documentation](https://babeljs.io/docs/?utm_source=chatgpt.com) |
| ESLint | [ESLint Documentation](https://eslint.org/docs/latest/?utm_source=chatgpt.com) |
| Prettier | [Prettier Documentation](https://prettier.io/docs/?utm_source=chatgpt.com) |

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

## Next: Phase 11 – JavaScript Browser APIs & Web Storage

Topics we will cover:

1. What are Browser APIs?
2. What is the Window Object?
3. What is the Navigator Object?
4. What is the Location Object?
5. What is the History API?
6. What is the Screen Object?
7. What is the Geolocation API?
8. What is the Clipboard API?
9. What is the Fetch API?
10. What is the Web Storage API?
11. Local Storage.
12. Session Storage.
13. Cookies.
14. Local Storage vs Session Storage vs Cookies.
15. IndexedDB.
16. Cache API.
17. Service Workers.
18. Notifications API.
19. Web Workers.
20. Broadcast Channel API.
21. Intersection Observer.
22. Mutation Observer.
23. Resize Observer.
24. Performance API.

**Phase 10 completed.**