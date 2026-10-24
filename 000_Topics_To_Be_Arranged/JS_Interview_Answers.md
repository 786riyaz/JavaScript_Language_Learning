# JavaScript Interview Q&A — Quick Revision (with code)

---

## 1. Fundamentals

**What is JavaScript?**
A high-level, interpreted, single-threaded, dynamically-typed scripting language used to make web pages interactive. Runs in browsers (via engines like V8) and on servers (Node.js).

**Why "Loosely Typed"?**
You don't declare a variable's type — it's decided at runtime and can change.
```js
let x = 5;
x = "hello"; // valid, no error
```

**Primitive vs Non-Primitive**
- Primitive: stored by value — `string, number, boolean, null, undefined, symbol, bigint`
- Non-Primitive (Reference): stored by reference — `object, array, function`
```js
let a = 10; let b = a; b = 20; // a stays 10
let obj1 = {val:1}; let obj2 = obj1; obj2.val = 2; // obj1.val also becomes 2
```

**Mutable vs Immutable**
- Immutable: can't be changed once created (primitives, strings).
- Mutable: can be changed in place (objects, arrays).
```js
let str = "hi"; str[0] = "H"; console.log(str); // "hi" - unchanged
let arr = [1,2]; arr[0] = 99; console.log(arr); // [99,2] - changed
```

**Variables** — containers to store data (`var`, `let`, `const`).

**var vs let vs const**
| | Scope | Redeclare | Reassign | Hoisting |
|---|---|---|---|---|
| var | function | yes | yes | hoisted, initialized as `undefined` |
| let | block | no | yes | hoisted, in TDZ |
| const | block | no | no | hoisted, in TDZ |

**When to use which?** Use `const` by default, `let` when reassignment is needed, avoid `var` (function-scoped, causes bugs).

---

## 2. Execution Context & Memory

**Execution Context (EC)** — an environment where JS code is evaluated and executed. Has two phases: Memory Creation and Execution.

**Types:**
- Global EC — created once when script starts.
- Function EC — created every time a function is called.
- Eval EC — created inside `eval()` (rarely used).

**Creation Phase** — JS allocates memory for variables (`undefined`) and functions (full function body) before executing code.

**Execution Phase** — code runs line by line, values get assigned.

**Hoisting** — variable and function declarations are moved to the top of their scope during the creation phase.
```js
console.log(a); // undefined (not error)
var a = 5;

console.log(foo()); // works, function hoisted fully
function foo(){ return "hi"; }
```

**Temporal Dead Zone (TDZ)** — the time between entering scope and the actual declaration of a `let`/`const` variable, where accessing it throws a ReferenceError.
```js
console.log(b); // ReferenceError
let b = 10;
```

**Scope**
- Global Scope: accessible everywhere.
- Local/Function Scope: accessible only inside function.
- Block Scope: accessible only inside `{ }` (for let/const).

**Lexical Environment** — structure that holds variable bindings + reference to parent environment (determines scope chain).

**Scope Chain** — mechanism where JS looks up a variable in current scope, then parent, then grandparent, etc.
```js
function outer(){
  let x = 10;
  function inner(){ console.log(x); } // finds x via scope chain
  inner();
}
outer();
```

**Variable Shadowing** — inner scope variable has same name as outer scope variable, "hiding" it locally.
```js
let x = 1;
function test(){
  let x = 2; // shadows outer x
  console.log(x); // 2
}
```

---

## 3. Errors

**Syntax Error** — invalid code structure, caught before execution.
```js
let a = ; // SyntaxError
```

**Reference Error** — accessing a variable that doesn't exist.
```js
console.log(notDefined); // ReferenceError
```

**Type Error** — performing an invalid operation on a value type.
```js
let n = 5;
n(); // TypeError: n is not a function
```

**try...catch** — handles runtime errors gracefully.
```js
try {
  JSON.parse("invalid json");
} catch(err) {
  console.log("Error caught:", err.message);
}
```

**throw** — manually throws a custom error.
```js
throw new Error("Something went wrong");
```

**finally** — block that always runs, whether error occurs or not.
```js
try { throw new Error("x"); }
catch(e){ console.log("caught"); }
finally { console.log("always runs"); }
```

---

## 4. Operators

**Arithmetic** `+ - * / % **`
**Comparison** `== === != !== > < >= <=`
**Logical** `&& || !`
**Assignment** `= += -= *= /=`
**Ternary** `condition ? val1 : val2`
```js
let age = 20;
let result = age >= 18 ? "Adult" : "Minor";
```

**Bit Manipulation**
```js
5 & 1   // AND -> 1
5 | 1   // OR  -> 5
5 ^ 1   // XOR -> 4
~5      // NOT -> -6
5 << 1  // left shift -> 10
5 >> 1  // right shift -> 2
```

---

## 5. Conditional Statements
```js
if (x > 10) { ... }
else if (x === 10) { ... }
else { ... }

switch(fruit){
  case "apple": console.log("Apple"); break;
  default: console.log("Unknown");
}
```

---

## 6. Loops
```js
for(let i=0;i<5;i++){}
let i=0; while(i<5){ i++; }
let j=0; do{ j++; }while(j<5);
for(const val of [1,2,3]){ console.log(val); } // values
for(const key in {a:1,b:2}){ console.log(key); } // keys
```
`break` exits the loop; `continue` skips current iteration.

---

## 7. Functions

**Function Declaration vs Expression**
```js
function greet(){ return "hi"; }      // declaration - hoisted fully
const greet2 = function(){ return "hi"; }; // expression - not hoisted
```

**Arrow Function** — shorter syntax, no own `this`.
```js
const add = (a,b) => a+b;
```

**Anonymous Function** — function without a name, usually used as a value.
```js
setTimeout(function(){ console.log("done"); }, 1000);
```

**IIFE** — runs immediately after being defined.
```js
(function(){ console.log("IIFE ran"); })();
```

**Parameters vs Arguments** — parameters are placeholders in function definition; arguments are actual values passed during a call.

**Default Parameters**
```js
function greet(name="Guest"){ return `Hi ${name}`; }
```

**Rest Parameters** — collects remaining args into an array.
```js
function sum(...nums){ return nums.reduce((a,b)=>a+b,0); }
```

**Spread Operator** — expands array/object into individual elements.
```js
let arr = [1,2,3];
console.log(...arr); // 1 2 3
let obj2 = {...obj1, extra:true};
```

**Recursion** — function calling itself.
```js
function factorial(n){ return n<=1 ? 1 : n*factorial(n-1); }
```

---

## 8. Strings

Strings are **immutable** — methods return new strings, original unchanged.
```js
let s = "Hello World";
s.charAt(0)          // "H"
s.split(" ")          // ["Hello","World"]
["a","b"].join("-")   // "a-b"
s.slice(0,5)          // "Hello"
s.substring(0,5)      // "Hello"
s.replace("World","JS") // "Hello JS"
s.replaceAll("l","L")  // "HeLLo WorLd"
s.toUpperCase()
s.toLowerCase()
"  hi  ".trim()       // "hi"
s.includes("World")   // true
```

---

## 9. Arrays

**Array** — ordered list of values under one variable.
**Dynamic Array** — JS arrays can grow/shrink in size automatically (unlike fixed-size arrays in C).
**How stored** — JS engines store arrays as objects internally; contiguous memory is used when possible (fast path for numeric arrays), but engine can switch to a hash-map-like structure for sparse/mixed-type arrays.
**Dynamic support** — engine over-allocates memory and resizes/copies to a new bigger block when array grows beyond capacity (similar to how ArrayList works in Java).

**Subarray** — a contiguous portion of an array (via `slice`).
**2D Array** — array of arrays: `[[1,2],[3,4]]`
**3D Array** — array of 2D arrays: `[[[1],[2]],[[3],[4]]]`

**Methods**
```js
let arr = [1,2,3];
arr.push(4);       // [1,2,3,4]
arr.pop();         // removes last -> [1,2,3]
arr.shift();       // removes first -> [2,3]
arr.unshift(0);    // adds first -> [0,2,3]
arr.concat([4,5]); // [0,2,3,4,5]
arr.slice(1,2);    // returns portion, doesn't mutate
arr.splice(1,1,"x"); // mutates: removes/inserts at index
arr.toSpliced(1,1,"x"); // like splice but returns new array (no mutation)
arr.sort();
arr.reverse();
arr.includes(2);   // true/false
arr.indexOf(2);    // index or -1
```

---

## 10. Objects

```js
const person = { name:"Riyaz", age:25 };
person.name;          // property access
person.greet = function(){ return "hi"; }; // method
const {name, age} = person; // destructuring
const nested = { address: { city:"Ahmedabad" } };
nested.address.city;
```
```js
Object.keys(person);    // ["name","age"]
Object.values(person);  // ["Riyaz",25]
Object.entries(person); // [["name","Riyaz"],["age",25]]
Object.assign({}, person, {age:30}); // merges/copies
```

---

## 11. ES6+ Features

```js
const x = 10;                          // let/const
const add = (a,b)=>a+b;                // arrow fn
`Hello ${x}`;                          // template literal
const {a,b} = {a:1,b:2};              // destructuring
function f(y=5){}                      // default params
function g(...args){}                  // rest
[...arr];                              // spread
obj?.address?.city;                    // optional chaining
let val = null ?? "default";           // nullish coalescing -> "default"
import { x } from './file.js';         // modules
export default x;
```

---

## 12. Collections

**Set** — collection of unique values.
```js
const s = new Set([1,2,2,3]); // {1,2,3}
```
**Map** — key-value pairs, keys can be any type.
```js
const m = new Map();
m.set("name","Riyaz");
```
**WeakSet/WeakMap** — like Set/Map but hold objects weakly (garbage-collected if no other reference), keys must be objects, not iterable.

**HashMap** — general CS term for key-value structure with O(1) average lookup; JS `Map`/`Object` serve this role.

**Object vs Map** — Map keys can be any type (object, function) and maintains insertion order reliably; Object keys are coerced to strings. Map has better performance for frequent additions/removals.

**Array vs Set** — Array allows duplicates and is ordered by index; Set stores only unique values.

---

## 13. Higher Order Array Methods

```js
const nums = [1,2,3,4];
nums.forEach(n => console.log(n));       // just iterates
nums.map(n => n*2);                      // [2,4,6,8]
nums.filter(n => n%2===0);               // [2,4]
nums.reduce((acc,n)=>acc+n, 0);          // 10
nums.find(n => n>2);                     // 3 (first match)
nums.findIndex(n => n>2);                // 2
nums.some(n => n>3);                     // true
nums.every(n => n>0);                    // true
[1,[2,3],[4]].flat();                    // [1,2,3,4]
nums.flatMap(n => [n, n*2]);             // [1,2,2,4,3,6,4,8]
```

---

## 14. Functions (Advanced)

**First-Class Function** — functions treated as values (can be assigned, passed, returned).

**Higher-Order Function** — a function that takes another function as argument or returns one.
```js
function higherOrder(fn){ return fn(5); }
```

**Callback Function** — a function passed into another function to be executed later.
```js
setTimeout(()=>console.log("done"), 1000);
```

**Callback Hell** — deeply nested callbacks making code hard to read.
```js
step1(()=>{ step2(()=>{ step3(()=>{ /* pyramid */ }); }); });
```

**Closure** — a function that "remembers" variables from its outer scope even after that scope has finished executing.
```js
function counter(){
  let count = 0;
  return () => ++count;
}
const inc = counter();
inc(); inc(); // count = 2, retained via closure
```

**Closure & Lexical Environment** — closures work because each function keeps a reference to the lexical environment in which it was created, not just where it's called.

**Currying** — transforming a function with multiple args into a sequence of functions each taking one arg.
```js
const add = a => b => c => a+b+c;
add(1)(2)(3); // 6
```

**Memoization** — caching results of expensive function calls to avoid recomputation.
```js
function memoize(fn){
  const cache = {};
  return (n) => cache[n] ?? (cache[n] = fn(n));
}
```

---

## 15. `this` Keyword

**Window/Global Object** — in browsers, `window` is the global object; in Node.js, it's `global`.

**this behavior:**
```js
console.log(this); // global scope -> window (browser) / {} (module in Node)

function normal(){ console.log(this); } // undefined (strict) or window
normal();

const arrow = () => console.log(this); // inherits from enclosing lexical scope

const obj = {
  name:"Riyaz",
  greet(){ console.log(this.name); } // "this" = obj
};

class Person {
  constructor(){ this.name="Riyaz"; } // this = instance
}
```
**Explicit Binding** — manually setting `this` using `call`, `apply`, or `bind`.

---

## 16. Call, Apply & Bind

```js
function greet(greeting){ console.log(greeting+", "+this.name); }
const user = {name:"Riyaz"};

greet.call(user, "Hello");        // Hello, Riyaz  (args comma-separated)
greet.apply(user, ["Hi"]);        // Hi, Riyaz     (args as array)
const bound = greet.bind(user);   // returns new function
bound("Hey");                     // Hey, Riyaz
```
**Difference:** `call`/`apply` invoke immediately (differ only in argument format), `bind` returns a new function for later use.

---

## 17. Object-Oriented JavaScript

**Constructor Function**
```js
function Person(name){ this.name = name; }
const p1 = new Person("Riyaz");
```
**`new` keyword does:**
1. Creates a new empty object.
2. Sets `this` to that object.
3. Links object's prototype to the constructor's `prototype`.
4. Returns the object (unless constructor explicitly returns another object).

**Constructor Function vs Class** — Classes are syntactic sugar over constructor functions + prototypes; classes enforce `new`, have cleaner inheritance syntax (`extends`/`super`), and body always runs in strict mode.

**Prototype** — an object from which other objects inherit properties/methods.
**Prototype Chain** — the lookup chain JS follows (`obj -> obj.__proto__ -> ... -> null`) to find a property.
```js
Person.prototype.sayHi = function(){ return "Hi "+this.name; };
p1.sayHi(); // found via prototype chain
```
**Inheritance internally** — objects don't copy methods; they reference parent via `[[Prototype]]`, so shared methods live in one place (memory efficient).

**ES6 Class**
```js
class Animal {
  static count = 0;                 // static property
  constructor(name){ this.name = name; Animal.count++; }
  speak(){ return `${this.name} makes a sound`; }
  static info(){ return "Animal class"; } // static method
}
class Dog extends Animal {
  speak(){ return super.speak() + " (bark)"; } // inheritance + super
}
new Dog("Rex").speak();
```

**OOP Principles**
- Encapsulation: bundling data + methods, restricting direct access (private fields `#x`).
- Abstraction: hiding internal complexity, exposing only necessary parts.
- Inheritance: child class reuses parent class properties/methods.
- Polymorphism: same method behaves differently in different classes (method overriding).

---

## 18. DOM Manipulation

**DOM** — Document Object Model, a tree-like structure representing the HTML page that JS can manipulate.
```js
document.getElementById("id");
document.getElementsByClassName("cls");
document.getElementsByTagName("div");
document.querySelector(".cls");
document.querySelectorAll("div");

const el = document.createElement("p");
el.textContent = "Hello";
document.body.appendChild(el);   // create
el.remove();                     // remove
el.textContent = "Updated";      // update
el.style.color = "red";          // styling
el.classList.add("active");
el.innerHTML = "<b>bold</b>";    // parses HTML
el.textContent = "plain text";   // no HTML parsing
el.innerText = "visible text";   // respects CSS visibility
```

---

## 19. Events

```js
button.addEventListener("click", function(e){
  console.log(e.target); // event object -> element clicked
});
```
**Event Bubbling** — event triggers on target then bubbles up to ancestors.
**Event Capturing** — event travels down from root to target first (opposite of bubbling; enable with `{capture:true}`).
**Event Delegation** — attaching one listener to a parent to handle events on children (uses bubbling), efficient for dynamic lists.
```js
document.getElementById("list").addEventListener("click", (e)=>{
  if(e.target.tagName === "LI") console.log(e.target.textContent);
});
```
`e.preventDefault()` — stops default browser action (like form submit/link nav).
`e.stopPropagation()` — stops event from bubbling/capturing further.

---

## 20. Browser Storage

| | Persistence | Sent to server | Size |
|---|---|---|---|
| localStorage | forever until cleared | no | ~5-10MB |
| sessionStorage | until tab closes | no | ~5MB |
| Cookies | configurable expiry | yes (every request) | ~4KB |

```js
localStorage.setItem("token","abc");
sessionStorage.setItem("temp","xyz");
document.cookie = "user=Riyaz; expires=Fri, 31 Dec 2026 23:59:59 GMT";
```

---

## 21. Asynchronous JavaScript

**Sync vs Async** — sync code runs line by line, blocking; async code lets long tasks (API calls, timers) run in background without blocking main thread.

**Call Stack** — where JS keeps track of function calls (LIFO).
**Web APIs** — browser-provided features (setTimeout, DOM, fetch) that run outside the JS engine.
**Callback Queue (Macrotask Queue)** — holds callbacks from setTimeout, events, etc.
**Microtask Queue** — holds Promise callbacks (`.then`), runs before macrotasks.
**Event Loop** — continuously checks if call stack is empty, then pushes tasks from microtask queue (first), then macrotask queue.

**Execution order:** Sync code → all Microtasks → one Macrotask → repeat.
```js
console.log("1");
setTimeout(()=>console.log("2"), 0);   // macrotask
Promise.resolve().then(()=>console.log("3")); // microtask
console.log("4");
// Output: 1 4 3 2
```

---

## 22. Promises

**Promise** — object representing eventual completion/failure of an async operation.
**States** — pending, fulfilled, rejected.
```js
const promise = new Promise((resolve, reject)=>{
  setTimeout(()=> resolve("done"), 1000);
});
promise.then(res => console.log(res)).catch(err => console.log(err));
```
**Promise Chaining**
```js
fetchUser()
  .then(user => fetchOrders(user.id))
  .then(orders => console.log(orders))
  .catch(err => console.log(err));
```
**Promise APIs**
```js
Promise.all([p1,p2]);       // waits for all, fails if any fails
Promise.race([p1,p2]);      // resolves/rejects with first settled
Promise.any([p1,p2]);       // resolves with first fulfilled, ignores rejections
Promise.allSettled([p1,p2]);// waits for all, gives status of each
```
**Dependent Promises** — one promise depends on the result of another (chained sequentially).
**Independent Promises** — run in parallel, don't depend on each other (use `Promise.all`).

---

## 23. Async / Await

**async** — marks a function to always return a Promise.
**await** — pauses execution until the Promise resolves (only inside async functions).
```js
async function getData(){
  try {
    const res = await fetch("/api/data");
    const data = await res.json();
    console.log(data);
  } catch(err){
    console.log("Error:", err);
  }
}
```
**Callback vs Promise vs Async/Await** — callbacks nest deeply (callback hell); Promises flatten with `.then` chaining; async/await makes async code read like synchronous code (most readable, easiest to debug).

---

## 24. API Calls

**CRUD** — Create, Read, Update, Delete.
**HTTP Methods** — GET (read), POST (create), PUT (replace whole resource), PATCH (partial update), DELETE (remove).
**Status Codes** — 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error.

```js
// Fetch
fetch("/api/users")
  .then(res => res.json())
  .then(data => console.log(data));

// Axios
axios.get("/api/users").then(res => console.log(res.data));
```
**Fetch vs Axios** — Fetch is built-in but needs manual JSON parsing and doesn't reject on HTTP error status; Axios auto-parses JSON, rejects on error status, and supports interceptors out of the box.

**Axios Interceptors** — functions that run before a request is sent or after a response is received (e.g., attaching auth tokens, global error handling).
```js
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

---

## 25. Advanced JavaScript

**Generator Functions** — functions that can pause/resume execution using `yield`.
```js
function* gen(){ yield 1; yield 2; yield 3; }
const it = gen();
it.next(); // {value:1, done:false}
```
**Iterators** — objects with a `next()` method that returns `{value, done}`, used to loop through data.

**Polyfills** — code that implements a feature in older environments that don't support it natively.
```js
if(!Array.prototype.myMap){
  Array.prototype.myMap = function(cb){
    const result = [];
    for(let i=0;i<this.length;i++) result.push(cb(this[i], i));
    return result;
  };
}
```
**Debouncing** — delays function execution until after a pause in triggering events (e.g., search input — waits till user stops typing).
```js
function debounce(fn, delay){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(()=>fn(...args), delay);
  };
}
```
**Throttling** — ensures function runs at most once every fixed interval, regardless of how many times it's triggered (e.g., scroll events).
```js
function throttle(fn, limit){
  let wait = false;
  return (...args) => {
    if(!wait){
      fn(...args);
      wait = true;
      setTimeout(()=> wait = false, limit);
    }
  };
}
```

---

## Quick One-Liners for the "Must Know" Round

- **Execution Context** — the environment (memory + code) in which JS code runs; created for global code and every function call.
- **Hoisting** — declarations moved to top of scope in memory phase; `var`→undefined, `let/const`→TDZ, functions→fully hoisted.
- **TDZ** — time between scope start and `let/const` declaration where access throws error.
- **Closures** — function + its remembered lexical scope, even after outer function returns.
- **Lexical Scope** — scope determined by where code is physically written, not where it's called from.
- **Event Loop** — coordinates call stack, microtask queue, and macrotask queue so async callbacks run without blocking.
- **Microtask vs Macrotask** — microtasks (Promises) always run before macrotasks (setTimeout) once stack is empty.
- **Callback Hell** — deeply nested callbacks; solved by Promises/async-await.
- **Promises & Chaining** — represent async results; `.then` chains sequential async steps.
- **Async/Await** — syntactic sugar over Promises for synchronous-looking async code.
- **this** — depends on how a function is called: global/undefined, object method (the object), arrow (lexical/inherited), class (instance).
- **Call/Apply/Bind** — set `this` explicitly; call/apply invoke immediately (args list vs array), bind returns a reusable bound function.
- **Prototype Chain** — lookup mechanism for inherited properties/methods via `[[Prototype]]` links.
- **Constructor vs Class** — class is cleaner syntax over the same prototype-based mechanism.
- **Event Bubbling/Capturing/Delegation** — bubbling goes child→parent, capturing parent→child, delegation attaches one listener on parent to manage children events.
- **Debounce vs Throttle** — debounce waits for a pause before running; throttle runs at fixed intervals regardless of frequency.
- **Currying** — breaking multi-arg function into chained single-arg functions.
- **Memoization** — caching function results by input to skip recomputation.
- **Polyfill** — custom implementation of a modern feature for older engines.
- **First-Class/Higher-Order/Callback** — functions as values / functions taking-returning functions / functions passed to run later.
- **Map vs Object** — Map: any key type, ordered, better for frequent add/remove; Object: string/symbol keys only.
- **Set vs Array** — Set: unique values only, no index; Array: ordered, allows duplicates.
- **LocalStorage vs SessionStorage vs Cookies** — persistence duration and whether sent to server (cookies only).
- **Fetch vs Axios** — Axios has auto JSON parsing, error rejection on bad status, and interceptors; Fetch is more manual but built-in.
- **HTTP Methods/Status Codes** — CRUD mapped to GET/POST/PUT/PATCH/DELETE; 2xx success, 4xx client error, 5xx server error.
