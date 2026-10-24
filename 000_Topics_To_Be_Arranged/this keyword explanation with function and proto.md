Bahut accha question hai. Isme **`new`**, **`this`**, aur **regular function invocation** tino ka concept ek saath aa raha hai.

Sabse pehle code dekhte hain:

```javascript
var student = function (name) {
  this.name = name;

  function printName() {
    console.log(this.name);
  }

  printName();
};

var yash = new student("yash");
```

## Step 1: `new student("yash")` kya karta hai?

Jab `new` lagate ho to JavaScript internally ye karta hai:

```javascript
var obj = {};
obj.__proto__ = student.prototype;

student.call(obj, "yash");

return obj;
```

Isliye constructor ke andar

```javascript
this.name = name;
```

ka matlab hota hai

```javascript
obj.name = "yash";
```

Ab object ban gaya:

```javascript
{
   name: "yash"
}
```

Yaha tak sab sahi hai.

---

## Step 2: Ab `printName()` call hua

```javascript
function printName() {
    console.log(this.name);
}

printName();
```

Dhyan do.

Tumne **sirf function call kiya hai**

```javascript
printName();
```

Na ki

```javascript
obj.printName();
```

Ya

```javascript
this.printName();
```

---

## Rule of `this`

`this` ka value function **kaise call hua hai** uspar depend karta hai.

### Case 1

```javascript
obj.printName();
```

```
this = obj
```

---

### Case 2

```javascript
printName();
```

Ye **regular function call** hai.

Yaha

* Browser non-strict mode me

```javascript
this === window
```

* Strict mode me

```javascript
this === undefined
```

---

## To output undefined kyu?

Jab

```javascript
printName();
```

execute hua to actually ye hua

```javascript
window.name
```

ya strict mode me

```javascript
undefined.name
```

Agar browser non-strict mode hai to

```javascript
window.name
```

print karega.

Aur **window.name by default empty string ya undefined jaisa behave kar sakta hai**, lekin **ye `student` wale `this.name` se alag hai**.

---

## Sabse bada misconception

Tumne likha:

> this keyword k wajah se name to pure windows object k saath attach ho jana chahiye tha

❌ Ye sirf tab hota jab tum aise call karte:

```javascript
student("yash");
```

Without `new`.

Tab

```javascript
this === window
```

Aur

```javascript
window.name = "yash";
```

ho jata.

Lekin tumne use kiya hai

```javascript
new student("yash");
```

To

```javascript
this !== window
```

Ye newly created object hai.

---

## Iska visualization

```
new student("yash")

          this
           |
           V
+-----------------+
| name : "yash"   |
+-----------------+
```

Lekin

```
printName()

this
 |
 V
window
```

Ye completely alag object hai.

Isliye

```
this.name
```

constructor me

↓

```
new object ka name
```

Aur

```
this.name
```

printName me

↓

```
window.name
```

---

## Agar tum aise likho

```javascript
var student = function(name) {

    this.name = name;

    this.printName = function() {
        console.log(this.name);
    }

    this.printName();
}

new student("yash");
```

Output

```
yash
```

Kyuki ab call ho raha hai

```javascript
this.printName();
```

Yani

```
object.printName();
```

To

```
this = object
```

---

## Ya phir arrow function use karo

```javascript
var student = function(name) {
    this.name = name;

    const printName = () => {
        console.log(this.name);
    }

    printName();
}

new student("yash");
```

Output

```
yash
```

Kyuki arrow function apna `this` nahi banata. Wo constructor ka hi `this` use karta hai.

---

### Yaad rakhne layak rule

`this` **function kahan define hua hai** isse decide nahi hota, balki **function kaise call hua hai** isse decide hota hai.

* `new Student()` → `this` = naya object
* `obj.method()` → `this` = `obj`
* `func()` → `this` = `window` (non-strict) ya `undefined` (strict mode)
* `arrowFunction()` → `this` outer scope se inherit hota hai.
