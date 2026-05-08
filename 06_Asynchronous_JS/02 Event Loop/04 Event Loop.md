Here is your **1-page, crisp, interview-ready Event Loop Revision Cheat Sheet**
— short, clean, and perfect for last-minute revision.

---

# 📄 **1-PAGE EVENT LOOP CHEAT SHEET (INTERVIEW READY)**

## ✅ **1. setTimeout()**

* Runs **after at least the given delay**.
* Placed in **Macrotask Queue**.
* Even `setTimeout(0)` waits for microtasks to finish first.

---

## ✅ **2. setImmediate()** (Node.js)

* Runs **after the current I/O events complete**.
* Often runs **before** `setTimeout(0)`.
* Inside I/O callbacks → **guaranteed to run first**.

---

## ✅ **3. process.nextTick()** (Node.js)

* **Highest priority async task** in Node.js.
* Runs **before promises** and **before the event loop continues**.
* Can block the event loop if overused.

---

## 🔥 **4. Task Priority Order (Most Important)**

```
1. Synchronous Code
2. process.nextTick()
3. Promises (Microtasks)
4. setTimeout / setInterval / setImmediate (Macrotasks)
```

---

## 🚀 **5. Quick Output Patterns**

### Normal environment:

```
Sync → nextTick → Promises → Timeout → Immediate
```

### Inside I/O (e.g., fs.readFile):

```
... → setImmediate → setTimeout(0)
```

---

## 🎯 **6. Key Differences**

| Feature  | setTimeout  | setImmediate | nextTick                    |
| -------- | ----------- | ------------ | --------------------------- |
| Priority | Low         | Medium       | **Highest**                 |
| Queue    | Macrotask   | Check phase  | Microtask                   |
| Timing   | After delay | After I/O    | Before event loop continues |

---

## 🧠 **7. Most Common Interview Trick**

```js
console.log("A");
process.nextTick(()=>console.log("B"));
Promise.resolve().then(()=>console.log("C"));
setTimeout(()=>console.log("D"),0);
console.log("E");
```

✔ **Output:**

```
A
E
B
C
D
```

---

## ⭐ **8. One-Line Memory Rule**

👉 **nextTick > Promises > Timeout > Immediate**

---