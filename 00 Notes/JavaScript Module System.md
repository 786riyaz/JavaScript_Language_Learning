# JavaScript Module Systems, Dynamic Loading, Bundling & Tree Shaking

## 📌 1. Module Systems in Node.js

JavaScript in Node.js supports two module systems:

### 1.1 ES Modules (ESM)

```js
import readline from "node:readline";
````

#### Features

* Modern JavaScript standard
* Uses `import` / `export`
* Static loading (resolved before execution)
* Supports tree shaking
* Works with:

  * `"type": "module"` in `package.json`
  * `.mjs` files

---

### 1.2 CommonJS (CJS)

```js
const readline = require("node:readline");
```

#### Features

* Older Node.js module system
* Uses `require()` and `module.exports`
* Dynamic loading (executed at runtime)
* Default in older Node.js setups

---

## ⚡ Key Differences

| Feature      | ES Modules (ESM) | CommonJS (CJS)         |
| ------------ | ---------------- | ---------------------- |
| Loading      | Static           | Dynamic                |
| Syntax       | import/export    | require/module.exports |
| Tree shaking | ✅ Yes            | ❌ No                   |
| Analysis     | Easy             | Hard                   |
| Execution    | Before runtime   | During runtime         |

---

## 📌 2. Dynamic Loading

### Definition

Dynamic loading means:

> Modules are loaded at runtime when the code reaches that line.

---

### Example

```js
if (userRole === "admin") {
  const adminTools = require("./admin-tools");
}
```

---

### Benefits

* Conditional loading
* Lazy loading (performance optimization)
* Plugin systems
* Reduced initial memory usage

---

### Drawbacks

* No static analysis
* Harder debugging
* Runtime errors instead of build-time errors
* No tree shaking
* Unpredictable execution flow

---

### Static vs Dynamic

| Type                | When Loaded      |
| ------------------- | ---------------- |
| Static (`import`)   | Before execution |
| Dynamic (`require`) | During execution |

---

## 📌 3. Bundling

### Definition

> Bundling = Combining multiple files into one optimized file

---

### Example

Before bundling:

```
index.js
math.js
utils.js
```

After bundling:

```
bundle.js
```

---

### Why Bundling?

* Reduces HTTP requests
* Improves load time
* Optimizes code
* Required for frontend frameworks

---

### Where Used

* Frontend apps (React, Angular, Vue)
* Backend (serverless environments)
* Library publishing

---

## 📌 4. Tree Shaking

### Definition

> Tree shaking = Removing unused code from the final bundle

---

### Example

```js
// math.js
export function add() {}
export function subtract() {}
```

```js
// app.js
import { add } from "./math.js";
```

---

### Result

* `add` → included ✅
* `subtract` → removed ❌

---

### Requirements

* Works best with ES Modules (ESM)
* Requires static imports

---

## 📌 5. Bundling vs Tree Shaking

| Concept      | Purpose            |
| ------------ | ------------------ |
| Bundling     | Combine files      |
| Tree shaking | Remove unused code |

---

## 📌 6. ESM vs CJS in Performance & Bundling

### 6.1 Tree Shaking

| ESM         | CJS             |
| ----------- | --------------- |
| ✅ Supported | ❌ Not supported |

---

### 6.2 Bundling Efficiency

| ESM             | CJS                  |
| --------------- | -------------------- |
| Smaller bundles | Larger bundles       |
| Optimizable     | Limited optimization |

---

### 6.3 Performance

#### ESM

* Faster startup
* Better optimization
* Supports modern features

#### CJS

* Runtime overhead
* Less efficient bundling

---

## 📌 7. Key Insight

> Modern JavaScript tooling is built around ES Modules.

---

## 📌 8. Rule of Thumb

| Use Case            | Recommendation      |
| ------------------- | ------------------- |
| New projects        | Use ESM ✅          |
| Legacy systems      | Use CJS             |
| Conditional loading | Use dynamic loading |
| Large scalable apps | Prefer ESM          |

---

## 📌 9. Simple Analogy

* Bundling = Packing everything into one suitcase
* Tree shaking = Removing unnecessary items before packing

---

## 🚀 Final Summary

* `import` (ESM) = modern, optimized, preferred
* `require` (CJS) = flexible, but less efficient
* Tree shaking reduces bundle size
* Bundling improves performance
* ESM enables better optimization than CJS
