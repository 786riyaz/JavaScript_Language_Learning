# JavaScript Revision Notes – Phase 14
# JavaScript Design Patterns & Architecture

In this phase, we will learn how to write **maintainable, reusable, scalable, and well-structured JavaScript applications**.

You already know JavaScript fundamentals, asynchronous programming, DOM, APIs, security, and performance. Now we will focus on how to organize code properly when applications become large.

---

# 1. What Are Design Patterns?

A **Design Pattern** is a reusable solution to a commonly occurring software design problem.

It is not a ready-made piece of code. Instead, it is a proven approach or template that helps developers solve recurring problems.

### Example

Suppose you are building an e-commerce application.

You need to:
- Create different types of users.
- Manage payment methods.
- Notify users when an order is placed.
- Handle different discount strategies.
- Maintain a single database connection.

You could implement everything independently, but your code might become difficult to maintain.

Design patterns provide established approaches to these problems.

### Why Do We Need Design Patterns?

1. Code reusability.
2. Better maintainability.
3. Reduced code duplication.
4. Loose coupling.
5. Better scalability.
6. Easier testing.
7. Consistent code structure.

**Important:** Design patterns are solutions, not rules. Don't apply a pattern when a simple function or object is sufficient.

---

# 2. Types of Design Patterns

Design patterns are commonly divided into three categories.

| Category | Purpose | Examples |
|---|---|---|
| Creational | Object creation | Factory, Singleton, Constructor |
| Structural | Object and class composition | Adapter, Decorator, Facade, Proxy |
| Behavioral | Communication and behavior | Observer, Strategy, Command, State |

Let's understand each category.

---

# 3. Creational Design Patterns

Creational patterns deal with **how objects are created**.

## 3.1 Constructor Pattern

The Constructor Pattern creates multiple objects using a common structure.

### Example: Constructor Function

```javascript
function User(name, email) {
    this.name = name;
    this.email = email;
}

const user1 = new User("Riyaz", "riyaz@gmail.com");
const user2 = new User("Ahmed", "ahmed@gmail.com");

console.log(user1);
console.log(user2);
```

Output:

```javascript
User {
    name: "Riyaz",
    email: "riyaz@gmail.com"
}

User {
    name: "Ahmed",
    email: "ahmed@gmail.com"
}
```

### Using ES6 Classes

```javascript
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    getDetails() {
        return `${this.name} - ${this.email}`;
    }
}

const user = new User("Riyaz", "riyaz@gmail.com");

console.log(user.getDetails());
```

Output:

```text
Riyaz - riyaz@gmail.com
```

**Use case:** When you need to create multiple objects sharing the same structure and behavior.

---

## 3.2 Factory Pattern

The Factory Pattern creates objects without exposing the exact object-creation logic to the calling code.

### Example

Without Factory Pattern:

```javascript
const user = {
    type: "admin",
    name: "Riyaz"
};

const customer = {
    type: "customer",
    name: "Ahmed"
};
```

Using Factory Pattern:

```javascript
function createUser(type, name) {

    if (type === "admin") {
        return {
            type: "admin",
            name,
            permissions: ["read", "write", "delete"]
        };
    }

    if (type === "customer") {
        return {
            type: "customer",
            name,
            permissions: ["read"]
        };
    }

    throw new Error("Invalid user type");
}

const admin = createUser("admin", "Riyaz");
const customer = createUser("customer", "Ahmed");

console.log(admin);
console.log(customer);
```

Output:

```javascript
{
    type: "admin",
    name: "Riyaz",
    permissions: ["read", "write", "delete"]
}
```

```javascript
{
    type: "customer",
    name: "Ahmed",
    permissions: ["read"]
}
```

### Why use Factory Pattern?

Imagine your application supports:

- Google Login
- Facebook Login
- GitHub Login

Instead of exposing the creation logic everywhere, you can create a factory that returns the appropriate authentication provider.

**Use case:** When object creation depends on conditions or when you want to hide creation complexity.

---

## 3.3 Singleton Pattern

The Singleton Pattern ensures that a class or module provides one shared instance through a controlled access point.

### Example

```javascript
class Database {

    static instance = null;

    constructor() {

        if (Database.instance) {
            return Database.instance;
        }

        this.connection = "Database Connected";

        Database.instance = this;
    }

    getConnection() {
        return this.connection;
    }
}

const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2);
```

Output:

```text
true
```

Both variables reference the same object.

### Real-world examples

- Application-wide configuration.
- Shared logging service.
- A shared database connection manager.

### Important: JavaScript Modules and Singleton

JavaScript modules are generally evaluated once per resolved module identity and their exports are reused through the module cache.

For example:

**database.js**

```javascript
class Database {
    connect() {
        console.log("Database connected");
    }
}

module.exports = new Database();
```

**app.js**

```javascript
const db1 = require("./database");
const db2 = require("./database");

console.log(db1 === db2);
```

Output:

```text
true
```

This is one reason module-based singleton instances are common in Node.js.

**Important:** Avoid unnecessary global mutable singletons. They can make testing and debugging harder.

---

## 3.4 Prototype Pattern

The Prototype Pattern creates new objects by reusing or cloning an existing object's structure.

JavaScript itself is prototype-based, so this pattern is particularly natural in JavaScript.

### Example

```javascript
const userPrototype = {
    greet() {
        console.log(`Hello, ${this.name}`);
    }
};

const user1 = Object.create(userPrototype);

user1.name = "Riyaz";

user1.greet();
```

Output:

```text
Hello, Riyaz
```

Here:

- `userPrototype` contains shared behavior.
- `user1` inherits that behavior through its prototype.
- We don't need to copy the `greet()` method into `user1`.

### Object.create()

```javascript
const original = {
    name: "Riyaz",
    role: "Developer"
};

const copy = Object.create(original);

console.log(copy.name);
console.log(copy.role);
```

Output:

```text
Riyaz
Developer
```

**Use case:** When you want objects to share behavior through prototype delegation.

---

# 4. Module Patterns

Module patterns help organize code and encapsulate private data.

## 4.1 Module Pattern

The Module Pattern uses closures to create private variables and expose only selected functionality.

### Example

```javascript
const Counter = (function () {

    let count = 0;

    function increment() {
        count++;
    }

    function decrement() {
        count--;
    }

    function getCount() {
        return count;
    }

    return {
        increment,
        decrement,
        getCount
    };

})();

Counter.increment();
Counter.increment();

console.log(Counter.getCount());
```

Output:

```text
2
```

Try this:

```javascript
console.log(Counter.count);
```

Output:

```text
undefined
```

Why?

Because `count` is a private variable inside the closure.

### Advantages

- Data encapsulation.
- Private variables.
- Controlled access.
- Better organization.

---

## 4.2 Revealing Module Pattern

The Revealing Module Pattern is a variation of the Module Pattern.

Instead of directly returning an object containing functions, we define functions privately and expose selected functions through the returned object.

```javascript
const UserModule = (function () {

    let username = "Riyaz";

    function getUsername() {
        return username;
    }

    function updateUsername(name) {
        username = name;
    }

    function privateMethod() {
        console.log("This is private");
    }

    return {
        getUsername,
        updateUsername
    };

})();

console.log(UserModule.getUsername());

UserModule.updateUsername("Ahmed");

console.log(UserModule.getUsername());
```

Output:

```text
Riyaz
Ahmed
```

`privateMethod()` cannot be accessed from outside.

### Module Pattern vs Revealing Module Pattern

| Module Pattern | Revealing Module Pattern |
|---|---|
| Encapsulates private data and behavior | Same |
| Can expose methods while defining them | Defines methods privately and reveals selected ones |
| Flexible return structure | More explicit public API |

### Modern Alternative: ES Modules

Today, JavaScript applications commonly use ES Modules.

**user.js**

```javascript
let username = "Riyaz";

export function getUsername() {
    return username;
}

export function updateUsername(name) {
    username = name;
}
```

**app.js**

```javascript
import {
    getUsername,
    updateUsername
} from "./user.js";

console.log(getUsername());

updateUsername("Ahmed");

console.log(getUsername());
```

ES Modules provide built-in module scope and explicit exports.

---

# 5. Structural Design Patterns

Structural patterns explain how different objects and classes can be combined to form larger structures.

## 5.1 Adapter Pattern

The Adapter Pattern allows two incompatible interfaces to work together.

### Real-world example

Suppose your application expects payment methods to have a `pay()` function.

But an external payment provider provides a `makePayment()` function.

You can create an adapter.

```javascript
// Existing payment interface
class PaymentService {

    pay(amount) {
        console.log(`Paid ₹${amount}`);
    }

}

// External payment provider
class ExternalPayment {

    makePayment(amount) {
        console.log(`External payment: ₹${amount}`);
    }

}

// Adapter
class PaymentAdapter {

    constructor(externalPayment) {
        this.externalPayment = externalPayment;
    }

    pay(amount) {
        this.externalPayment.makePayment(amount);
    }

}

const externalPayment = new ExternalPayment();

const adapter = new PaymentAdapter(externalPayment);

adapter.pay(500);
```

Output:

```text
External payment: ₹500
```

### Why use it?

You don't need to modify the external library or rewrite your application.

**Use case:** Integrating third-party APIs, libraries, or legacy systems with your existing interfaces.

---

## 5.2 Decorator Pattern

The Decorator Pattern adds additional behavior to an existing object without directly modifying its original implementation.

### Example

```javascript
function basicUser() {
    return {
        name: "Riyaz"
    };
}

function addAdminPermission(user) {

    return {
        ...user,
        role: "admin",
        permissions: ["read", "write", "delete"]
    };

}

const user = basicUser();

const admin = addAdminPermission(user);

console.log(user);
console.log(admin);
```

Output:

```javascript
{ name: "Riyaz" }
```

```javascript
{
    name: "Riyaz",
    role: "admin",
    permissions: ["read", "write", "delete"]
}
```

The original object remains unchanged.

### Another example: Function Decorator

```javascript
function logExecution(fn) {

    return function (...args) {

        console.log("Function started");

        const result = fn(...args);

        console.log("Function completed");

        return result;
    };

}

function add(a, b) {
    return a + b;
}

const decoratedAdd = logExecution(add);

console.log(decoratedAdd(10, 20));
```

Output:

```text
Function started
Function completed
30
```

**Use case:** Logging, caching, authorization checks, and adding behavior to existing functions.

---

## 5.3 Facade Pattern

The Facade Pattern provides a simplified interface to a complex subsystem.

### Example

Suppose an order process requires:

1. Payment processing.
2. Inventory update.
3. Email notification.

Without a facade, the client must coordinate all three operations.

```javascript
class Payment {
    process() {
        console.log("Payment processed");
    }
}

class Inventory {
    update() {
        console.log("Inventory updated");
    }
}

class Email {
    send() {
        console.log("Email sent");
    }
}
```

Create a facade:

```javascript
class OrderFacade {

    constructor() {
        this.payment = new Payment();
        this.inventory = new Inventory();
        this.email = new Email();
    }

    placeOrder() {

        this.payment.process();

        this.inventory.update();

        this.email.send();

        console.log("Order completed");
    }

}

const order = new OrderFacade();

order.placeOrder();
```

Output:

```text
Payment processed
Inventory updated
Email sent
Order completed
```

The client only needs:

```javascript
order.placeOrder();
```

**Use case:** Simplifying complex workflows behind one easy-to-use interface.

---

## 5.4 Proxy Pattern

The Proxy Pattern provides an object that controls access to another object.

JavaScript provides a built-in `Proxy` constructor.

### Syntax

```javascript
const proxy = new Proxy(target, handler);
```

### Example: Validation

```javascript
const user = {
    name: "Riyaz",
    age: 25
};

const userProxy = new Proxy(user, {

    set(target, property, value) {

        if (property === "age" && value < 0) {
            throw new Error("Age cannot be negative");
        }

        target[property] = value;

        return true;
    }

});

userProxy.age = 26;

console.log(userProxy.age);
```

Output:

```text
26
```

Invalid assignment:

```javascript
userProxy.age = -5;
```

Throws:

```text
Error: Age cannot be negative
```

### Common uses

- Validation.
- Logging.
- Access control.
- Lazy loading.
- Observing object operations.
- Implementing reactive systems.

**Important:** A Proxy intercepts operations; it does not automatically make code faster or more secure.

---

## 5.5 Composite Pattern

The Composite Pattern allows individual objects and groups of objects to be treated through a common interface.

### Example: File and Folder Structure

```javascript
class File {
    constructor(name) {
        this.name = name;
    }

    show() {
        console.log(`File: ${this.name}`);
    }
}

class Folder {

    constructor(name) {
        this.name = name;
        this.children = [];
    }

    add(item) {
        this.children.push(item);
    }

    show() {

        console.log(`Folder: ${this.name}`);

        this.children.forEach(child => {
            child.show();
        });

    }

}

const folder = new Folder("Documents");

const file1 = new File("resume.pdf");
const file2 = new File("notes.txt");

folder.add(file1);
folder.add(file2);

folder.show();
```

Output:

```text
Folder: Documents
File: resume.pdf
File: notes.txt
```

**Use case:**

- File systems.
- Nested menus.
- Organization structures.
- UI component trees.

---

# 6. Behavioral Design Patterns

Behavioral patterns focus on communication and interaction between objects.

## 6.1 Observer Pattern

The Observer Pattern allows one object to notify multiple dependent objects whenever its state changes.

### Real-world example

Imagine a YouTube channel.

When a channel uploads a video, all subscribers receive a notification.

The channel is the Subject, and subscribers are Observers.

### Example

```javascript
class YouTubeChannel {

    constructor() {
        this.subscribers = [];
    }

    subscribe(user) {
        this.subscribers.push(user);
    }

    unsubscribe(user) {
        this.subscribers = this.subscribers.filter(
            subscriber => subscriber !== user
        );
    }

    uploadVideo(video) {

        console.log(`New video uploaded: ${video}`);

        this.subscribers.forEach(subscriber => {
            subscriber.notify(video);
        });

    }

}

class Subscriber {

    constructor(name) {
        this.name = name;
    }

    notify(video) {
        console.log(`${this.name} received notification: ${video}`);
    }

}

const channel = new YouTubeChannel();

const user1 = new Subscriber("Riyaz");
const user2 = new Subscriber("Ahmed");

channel.subscribe(user1);
channel.subscribe(user2);

channel.uploadVideo("JavaScript Tutorial");
```

Output:

```text
New video uploaded: JavaScript Tutorial

Riyaz received notification: JavaScript Tutorial

Ahmed received notification: JavaScript Tutorial
```

**Use case:**

- Event listeners.
- UI updates.
- Notification systems.
- Real-time applications.

---

## 6.2 Pub/Sub Pattern

Pub/Sub stands for **Publish/Subscribe**.

It allows publishers and subscribers to communicate through a central event system or message broker.

Unlike a typical Observer implementation, publishers do not need direct references to their subscribers.

### Example

```javascript
class EventBus {

    constructor() {
        this.events = {};
    }

    subscribe(eventName, callback) {

        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);
    }

    publish(eventName, data) {

        const subscribers = this.events[eventName] || [];

        subscribers.forEach(callback => {
            callback(data);
        });

    }

}

const eventBus = new EventBus();

// Subscriber 1
eventBus.subscribe("orderPlaced", (order) => {
    console.log("Send email:", order.id);
});

// Subscriber 2
eventBus.subscribe("orderPlaced", (order) => {
    console.log("Update inventory:", order.id);
});

// Publisher
eventBus.publish("orderPlaced", {
    id: 101,
    amount: 500
});
```

Output:

```text
Send email: 101
Update inventory: 101
```

### Observer vs Pub/Sub

| Observer | Pub/Sub |
|---|---|
| Subject maintains observer references | Uses an event channel or broker |
| Observers generally subscribe directly to a subject | Publishers and subscribers are decoupled |
| Direct communication relationship | Indirect communication |
| Common in UI event systems | Common in event-driven applications |

**Real-world examples:** EventEmitter, message brokers, event buses.

---

## 6.3 Mediator Pattern

The Mediator Pattern introduces a central object that coordinates communication between multiple objects.

Instead of objects communicating directly with each other, they communicate through the mediator.

### Example: Chat Room

```javascript
class ChatRoom {

    constructor() {
        this.users = [];
    }

    register(user) {
        this.users.push(user);
        user.chatRoom = this;
    }

    sendMessage(message, sender) {

        this.users.forEach(user => {

            if (user !== sender) {
                user.receive(message, sender.name);
            }

        });

    }

}

class User {

    constructor(name) {
        this.name = name;
        this.chatRoom = null;
    }

    send(message) {
        this.chatRoom.sendMessage(message, this);
    }

    receive(message, sender) {
        console.log(`${sender}: ${message}`);
    }

}

const chatRoom = new ChatRoom();

const user1 = new User("Riyaz");
const user2 = new User("Ahmed");

chatRoom.register(user1);
chatRoom.register(user2);

user1.send("Hello!");
```

Output:

```text
Riyaz: Hello!
```

The ChatRoom coordinates communication.

**Use case:** Chat systems, form workflows, UI component coordination, and complex interactions.

---

## 6.4 Strategy Pattern

The Strategy Pattern allows you to define multiple algorithms and switch between them without changing the code that uses them.

### Example: Discount System

```javascript
const regularDiscount = (amount) => {
    return amount * 0.05;
};

const premiumDiscount = (amount) => {
    return amount * 0.20;
};

const noDiscount = (amount) => {
    return 0;
};

function calculatePrice(amount, strategy) {

    const discount = strategy(amount);

    return amount - discount;
}

console.log(calculatePrice(1000, regularDiscount));

console.log(calculatePrice(1000, premiumDiscount));

console.log(calculatePrice(1000, noDiscount));
```

Output:

```text
950
800
1000
```

### Why use it?

Without Strategy Pattern, you might write:

```javascript
function calculatePrice(amount, userType) {

    if (userType === "regular") {
        return amount - amount * 0.05;
    }

    if (userType === "premium") {
        return amount - amount * 0.20;
    }

    return amount;
}
```

As the number of strategies increases, conditional logic can become difficult to maintain.

Strategy Pattern separates each algorithm into its own implementation.

**Use case:**

- Payment methods.
- Discount calculations.
- Sorting algorithms.
- Authentication strategies.
- Shipping cost calculations.

---

## 6.5 Command Pattern

The Command Pattern encapsulates an action or request into a separate object.

This makes it easier to execute, queue, log, or undo operations.

### Example

```javascript
class Light {

    turnOn() {
        console.log("Light ON");
    }

    turnOff() {
        console.log("Light OFF");
    }

}

class TurnOnCommand {

    constructor(light) {
        this.light = light;
    }

    execute() {
        this.light.turnOn();
    }

}

class TurnOffCommand {

    constructor(light) {
        this.light = light;
    }

    execute() {
        this.light.turnOff();
    }

}

class RemoteControl {

    executeCommand(command) {
        command.execute();
    }

}

const light = new Light();

const remote = new RemoteControl();

const turnOn = new TurnOnCommand(light);

const turnOff = new TurnOffCommand(light);

remote.executeCommand(turnOn);
remote.executeCommand(turnOff);
```

Output:

```text
Light ON
Light OFF
```

**Use case:**

- Undo/Redo functionality.
- Task queues.
- Background jobs.
- Transaction processing.
- User action history.

---

## 6.6 Iterator Pattern

The Iterator Pattern provides a standard way to traverse elements of a collection without exposing its internal implementation.

JavaScript already supports iteration through:

- `for...of`
- `Symbol.iterator`
- Iterables
- Generators

### Example

```javascript
const numbers = [10, 20, 30];

const iterator = numbers[Symbol.iterator]();

console.log(iterator.next());

console.log(iterator.next());

console.log(iterator.next());

console.log(iterator.next());
```

Output:

```javascript
{ value: 10, done: false }

{ value: 20, done: false }

{ value: 30, done: false }

{ value: undefined, done: true }
```

### Custom Iterator

```javascript
const myCollection = {

    items: ["A", "B", "C"],

    [Symbol.iterator]() {

        let index = 0;

        return {

            next: () => {

                if (index < this.items.length) {

                    return {
                        value: this.items[index++],
                        done: false
                    };

                }

                return {
                    value: undefined,
                    done: true
                };

            }

        };

    }

};

for (const item of myCollection) {
    console.log(item);
}
```

Output:

```text
A
B
C
```

**Use case:** Custom collections, lazy data processing, and sequential data traversal.

---

## 6.7 State Pattern

The State Pattern allows an object to change its behavior depending on its current internal state.

### Example: Order Status

An order may have these states:

- Pending
- Confirmed
- Shipped
- Delivered

Different actions are allowed in different states.

```javascript
class Order {

    constructor() {
        this.status = "pending";
    }

    confirm() {

        if (this.status === "pending") {
            this.status = "confirmed";
        }

    }

    ship() {

        if (this.status === "confirmed") {
            this.status = "shipped";
        }

    }

    deliver() {

        if (this.status === "shipped") {
            this.status = "delivered";
        }

    }

}

const order = new Order();

order.confirm();

order.ship();

order.deliver();

console.log(order.status);
```

Output:

```text
delivered
```

This example uses simple conditional state transitions.

In a larger implementation, each state can be represented by a separate object with its own behavior.

**Use case:**

- Order management.
- Authentication workflows.
- Payment processing.
- Traffic lights.
- Game character states.

---

# 7. Dependency Injection (DI)

Dependency Injection is a technique where an object receives the dependencies it needs from outside instead of creating them internally.

### Without Dependency Injection

```javascript
class UserService {

    constructor() {
        this.database = new MySQLDatabase();
    }

    getUsers() {
        return this.database.getUsers();
    }

}
```

Problem:

`UserService` is tightly coupled to `MySQLDatabase`.

If you want to switch to MongoDB or use a mock database during testing, you need to modify the implementation.

### With Dependency Injection

```javascript
class UserService {

    constructor(database) {
        this.database = database;
    }

    getUsers() {
        return this.database.getUsers();
    }

}
```

Now create different implementations:

```javascript
class MySQLDatabase {

    getUsers() {
        return ["Riyaz", "Ahmed"];
    }

}

class MongoDatabase {

    getUsers() {
        return ["John", "David"];
    }

}
```

Inject the dependency:

```javascript
const database = new MySQLDatabase();

const userService = new UserService(database);

console.log(userService.getUsers());
```

Output:

```javascript
["Riyaz", "Ahmed"]
```

### Benefits

1. Loose coupling.
2. Easier testing.
3. Better flexibility.
4. Easier replacement of dependencies.
5. Improved maintainability.

### DI vs Dependency Inversion Principle

These concepts are related but different.

| Dependency Injection | Dependency Inversion Principle |
|---|---|
| A technique | A design principle |
| Supplies dependencies from outside | High-level modules should depend on abstractions, not concrete implementations |
| Helps achieve loose coupling | Guides how dependencies should be structured |

---

# 8. Important Software Design Principles

Now let's understand the principles that help us write maintainable code.

## 8.1 Separation of Concerns (SoC)

Separation of Concerns means dividing an application into different sections, where each section handles a specific responsibility.

### Bad Example

```javascript
function registerUser(user) {

    // Validate user
    if (!user.email) {
        throw new Error("Email required");
    }

    // Save user to database
    // Send email
    // Generate token
    // Update UI

}
```

This function handles too many responsibilities.

### Better Approach

```javascript
function validateUser(user) {
    // Validation logic
}

function saveUser(user) {
    // Database logic
}

function sendWelcomeEmail(user) {
    // Email logic
}

function generateToken(user) {
    // Token logic
}
```

Each function handles a separate concern.

**Benefits:** Easier testing, debugging, modification, and code reuse.

---

## 8.2 DRY Principle

DRY stands for:

**Don't Repeat Yourself.**

It means avoiding unnecessary duplication of knowledge and logic.

### Without DRY

```javascript
function calculatePrice1(price) {
    return price + price * 0.18;
}

function calculatePrice2(price) {
    return price + price * 0.18;
}
```

### With DRY

```javascript
function calculatePrice(price) {
    return price + price * 0.18;
}

console.log(calculatePrice(100));
console.log(calculatePrice(200));
```

**Important:** DRY doesn't mean every repeated line must become a function. Avoid creating unnecessary abstractions just to eliminate a small amount of repetition.

---

## 8.3 KISS Principle

KISS stands for:

**Keep It Simple, Stupid.**

It means solving problems using the simplest reasonable implementation.

### Complex Approach

```javascript
function isAdult(age) {

    if (age >= 18) {
        return true;
    } else {
        return false;
    }

}
```

### Simple Approach

```javascript
function isAdult(age) {
    return age >= 18;
}
```

Both produce the same result, but the second implementation is simpler.

**Important:** Simplicity does not mean removing necessary validation, error handling, or security checks.

---

# 9. SOLID Principles

SOLID is a collection of five object-oriented design principles.

These principles help developers build flexible and maintainable software.

| Letter | Principle | Meaning |
|---|---|---|
| S | Single Responsibility | One responsibility per module or class |
| O | Open/Closed | Open for extension, closed for modification |
| L | Liskov Substitution | Subtypes should be usable wherever their base type is expected |
| I | Interface Segregation | Prefer smaller, focused interfaces |
| D | Dependency Inversion | Depend on abstractions, not concrete implementations |

Let's understand them individually.

## 9.1 Single Responsibility Principle (SRP)

A class or module should have one primary responsibility, or one reason to change.

### Bad Example

```javascript
class User {

    saveToDatabase() {
        // Database logic
    }

    sendEmail() {
        // Email logic
    }

    generateReport() {
        // Report logic
    }

}
```

This class handles several unrelated responsibilities.

### Better Approach

```javascript
class UserRepository {
    save(user) {
        // Database logic
    }
}

class EmailService {
    send(user) {
        // Email logic
    }
}

class ReportService {
    generate(user) {
        // Report logic
    }
}
```

Each class has a focused responsibility.

---

## 9.2 Open/Closed Principle (OCP)

Software entities should be open for extension but closed for modification.

In simple terms:

You should be able to add new functionality without repeatedly modifying existing, stable code.

### Example

```javascript
class CreditCardPayment {

    pay(amount) {
        console.log(`Credit card payment: ${amount}`);
    }

}

class UpiPayment {

    pay(amount) {
        console.log(`UPI payment: ${amount}`);
    }

}

function processPayment(paymentMethod, amount) {
    paymentMethod.pay(amount);
}
```

Usage:

```javascript
processPayment(new CreditCardPayment(), 1000);

processPayment(new UpiPayment(), 500);
```

You can add another payment implementation without changing `processPayment()`.

---

## 9.3 Liskov Substitution Principle (LSP)

Objects of a subclass should be usable wherever objects of the parent class are expected, without breaking the expected behavior.

### Problematic Example

```javascript
class Bird {

    fly() {
        console.log("Flying");
    }

}

class Penguin extends Bird {

    fly() {
        throw new Error("Penguins cannot fly");
    }

}
```

A Penguin violates the expected behavior of the Bird abstraction.

### Better Approach

```javascript
class Bird {
    eat() {
        console.log("Eating");
    }
}

class FlyingBird extends Bird {
    fly() {
        console.log("Flying");
    }
}

class Penguin extends Bird {
    swim() {
        console.log("Swimming");
    }
}
```

Now only birds that can fly implement `FlyingBird`.

---

## 9.4 Interface Segregation Principle (ISP)

Clients should not be forced to depend on methods they do not use.

JavaScript doesn't have traditional interfaces in the same way TypeScript does, but the principle still applies.

### Bad Design

```javascript
class Worker {

    work() {}

    eat() {}

    sleep() {}

}
```

A robot worker might not need `eat()` or `sleep()`.

### Better Design

```javascript
class Workable {
    work() {
        console.log("Working");
    }
}

class Eatable {
    eat() {
        console.log("Eating");
    }
}

class Human {
    constructor() {
        this.workable = new Workable();
        this.eatable = new Eatable();
    }
}

class Robot {
    constructor() {
        this.workable = new Workable();
    }
}
```

This example uses composition to demonstrate the idea.

---

## 9.5 Dependency Inversion Principle (DIP)

High-level modules should not depend directly on low-level implementation details. Both should depend on abstractions.

### Example

Instead of directly depending on MySQL:

```javascript
class UserService {

    constructor(repository) {
        this.repository = repository;
    }

    getUsers() {
        return this.repository.getUsers();
    }

}
```

The service depends on the expected behavior of a repository, not a specific database implementation.

Both MySQL and MongoDB repositories can satisfy that contract.

---

# 10. Clean Code Principles

Clean Code means writing code that is easy to read, understand, test, and maintain.

### 1. Use meaningful variable names

Bad:

```javascript
const x = 500;
```

Good:

```javascript
const productPrice = 500;
```

### 2. Keep functions focused

Bad:

```javascript
function processData() {
    // 100 lines of unrelated operations
}
```

Better:

```javascript
function validateData() {}

function transformData() {}

function saveData() {}
```

### 3. Avoid magic numbers

Bad:

```javascript
if (age >= 18) {
    // ...
}
```

Better:

```javascript
const MINIMUM_AGE = 18;

if (age >= MINIMUM_AGE) {
    // ...
}
```

### 4. Handle errors properly

```javascript
async function getUsers() {

    try {

        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        return await response.json();

    } catch (error) {

        console.error(error.message);

        throw error;
    }

}
```

### 5. Avoid unnecessary comments

Bad:

```javascript
// Increment count by 1
count++;
```

Good:

```javascript
// Retry count is incremented after a failed request.
retryCount++;
```

Comments should explain why something is done when the reason isn't obvious.

---

# 11. Separation of Business Logic and UI Logic

This is particularly important in React and Next.js applications.

**Business Logic:** Rules and operations related to the application.

**UI Logic:** How information is displayed and how users interact with it.

### Bad Example

```jsx
function Product() {

    const [price, setPrice] = useState(1000);

    function calculateDiscount() {

        if (price > 500) {
            return price * 0.10;
        }

        return 0;
    }

    return (
        <div>
            <h1>Product</h1>

            <p>Discount: {calculateDiscount()}</p>
        </div>
    );

}
```

This is manageable for a tiny component, but as business rules grow, the component becomes harder to maintain.

### Better Approach

**discountService.js**

```javascript
export function calculateDiscount(price) {

    if (price > 500) {
        return price * 0.10;
    }

    return 0;

}
```

**Product.jsx**

```jsx
import { calculateDiscount } from "./discountService";

function Product() {

    const price = 1000;

    const discount = calculateDiscount(price);

    return (
        <div>
            <h1>Product</h1>

            <p>Discount: {discount}</p>
        </div>
    );

}

export default Product;
```

Now:

- Business logic is in `discountService.js`.
- UI logic is in `Product.jsx`.

This makes the business logic reusable and easier to test.

---

# 12. MVC Architecture

MVC stands for:

- Model
- View
- Controller

It is an architectural pattern that separates application responsibilities.

### 1. Model

Handles data and domain-related operations.

Example:

```javascript
const users = [
    {
        id: 1,
        name: "Riyaz"
    }
];

module.exports = users;
```

### 2. View

Responsible for presenting information to the user.

In a traditional MVC application, this could be an HTML template.

In an API-based React application, React often acts as the frontend presentation layer, although that is not exactly the same as server-rendered MVC.

### 3. Controller

Receives requests, coordinates operations, and sends responses.

```javascript
const users = require("./users");

function getUsers(req, res) {
    res.json(users);
}

module.exports = {
    getUsers
};
```

### MVC Flow

```text
User Request
     |
     v
Controller
     |
     v
Model
     |
     v
Database
     |
     v
Model
     |
     v
Controller
     |
     v
View / Response
```

### Example Express Structure

```text
project/
│
├── models/
│   └── user.model.js
│
├── controllers/
│   └── user.controller.js
│
├── routes/
│   └── user.routes.js
│
├── views/
│
└── app.js
```

**Use case:** Traditional web applications and applications organized around model, controller, and presentation responsibilities.

---

# 13. Layered Architecture

Layered Architecture divides an application into logical layers.

A common backend architecture contains:

| Layer | Responsibility |
|---|---|
| Route | Defines API endpoints |
| Controller | Handles HTTP requests and responses |
| Service | Contains business logic |
| Repository | Handles database operations |
| Database | Stores persistent data |

### Architecture Diagram

```text
          Client
             |
             v
           Routes
             |
             v
         Controller
             |
             v
          Service
             |
             v
         Repository
             |
             v
          Database
```

### Example Project Structure

```text
src/
│
├── routes/
│   └── user.routes.js
│
├── controllers/
│   └── user.controller.js
│
├── services/
│   └── user.service.js
│
├── repositories/
│   └── user.repository.js
│
├── models/
│   └── user.model.js
│
└── app.js
```

### Example Implementation

**user.routes.js**

```javascript
const express = require("express");

const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);

module.exports = router;
```

**user.controller.js**

```javascript
const userService = require("../services/user.service");

async function getUsers(req, res, next) {

    try {

        const users = await userService.getUsers();

        res.json(users);

    } catch (error) {

        next(error);

    }

}

module.exports = {
    getUsers
};
```

**user.service.js**

```javascript
const userRepository = require("../repositories/user.repository");

async function getUsers() {

    const users = await userRepository.findAll();

    return users;

}

module.exports = {
    getUsers
};
```

**user.repository.js**

```javascript
const User = require("../models/user.model");

async function findAll() {

    return await User.findAll();

}

module.exports = {
    findAll
};
```

### Why use Layered Architecture?

1. Separation of concerns.
2. Easier testing.
3. Reusable business logic.
4. Database implementation can be changed more easily.
5. Easier maintenance.

### MVC vs Layered Architecture

| MVC | Layered Architecture |
|---|---|
| Organizes around Model, View, Controller | Organizes around application responsibilities |
| Often focuses on request and presentation flow | Focuses on separating technical and business layers |
| May have business logic in models or services | Typically has a dedicated service layer |
| Can be part of a layered architecture | Can include MVC components |

**Important:** MVC and Layered Architecture are not mutually exclusive. An application can use both.

---

# 14. Event-Driven Architecture

Event-Driven Architecture is a software architecture in which different parts of an application communicate through events.

An event represents something that has happened.

Examples:

- User registered.
- Order placed.
- Payment completed.
- File uploaded.
- Email requested.

### Basic Flow

```text
Event Producer
      |
      v
    Event
      |
      v
 Event System
      |
      v
 Event Consumers
      |
      ├── Send Email
      |
      ├── Update Inventory
      |
      └── Generate Invoice
```

### Node.js Example Using EventEmitter

```javascript
const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

// Consumer 1
eventEmitter.on("orderPlaced", (order) => {

    console.log("Sending email:", order.id);

});

// Consumer 2
eventEmitter.on("orderPlaced", (order) => {

    console.log("Updating inventory:", order.id);

});

// Producer
eventEmitter.emit("orderPlaced", {
    id: 101,
    amount: 1000
});
```

Output:

```text
Sending email: 101
Updating inventory: 101
```

### Advantages

- Loose coupling.
- Independent components.
- Easier extension.
- Suitable for asynchronous workflows.
- Useful for distributed systems.

### Disadvantages

- Event ordering can become complicated.
- Debugging can be difficult.
- Error handling needs careful design.
- Duplicate events may need to be handled.
- Observability becomes important.

**Important:** Node.js `EventEmitter` is an in-process event mechanism. Distributed event-driven systems commonly use message brokers such as RabbitMQ or Kafka.

---

# 15. Component-Based Architecture

Component-Based Architecture divides an application into reusable, independent components.

This is the foundation of frameworks and libraries such as React.

### Example

Consider an e-commerce page:

```text
App
│
├── Header
│
├── Sidebar
│
├── ProductList
│   │
│   ├── ProductCard
│   │
│   ├── ProductCard
│   │
│   └── ProductCard
│
└── Footer
```

Each component handles a particular UI responsibility.

### React Example

```jsx
function Header() {
    return <h1>My Store</h1>;
}

function ProductCard({ name, price }) {

    return (
        <div>
            <h2>{name}</h2>
            <p>₹{price}</p>
        </div>
    );

}

function ProductList() {

    const products = [
        {
            id: 1,
            name: "Laptop",
            price: 50000
        },
        {
            id: 2,
            name: "Mobile",
            price: 20000
        }
    ];

    return (
        <div>
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    name={product.name}
                    price={product.price}
                />
            ))}
        </div>
    );

}

function App() {

    return (
        <>
            <Header />
            <ProductList />
        </>
    );

}

export default App;
```

### Advantages

1. Reusability.
2. Maintainability.
3. Independent development.
4. Easier testing.
5. Better UI organization.

### Important Concepts

- Component composition.
- Props.
- State.
- Reusable components.
- Component boundaries.
- Single responsibility.

---

# 16. Common JavaScript Architecture Mistakes

Even experienced developers make architectural mistakes.

| Mistake | Explanation |
|---|---|
| God Object | One class or module handles too many responsibilities |
| Tight Coupling | Components depend heavily on specific implementations |
| Premature Abstraction | Creating unnecessary abstractions before they are needed |
| Overengineering | Making simple functionality unnecessarily complex |
| Global State Abuse | Keeping too much application data in global variables |
| Circular Dependencies | Two or more modules depend on each other |
| Mixed Responsibilities | UI, database, and business logic are mixed together |
| Duplicate Business Logic | Same business rule implemented in multiple places |
| Poor Error Handling | Errors are ignored or handled inconsistently |
| Pattern Overuse | Applying design patterns when simpler solutions are sufficient |

### Example: God Function

```javascript
function processOrder() {

    // Validate user

    // Validate product

    // Calculate price

    // Process payment

    // Save order

    // Update inventory

    // Send email

    // Generate invoice

}
```

A better approach is to divide these responsibilities into focused functions or services.

---

# 17. Important Design Pattern Comparison

Use this table for quick revision.

| Pattern | Main Purpose | Typical Example |
|---|---|---|
| Constructor | Create instances | User objects |
| Factory | Centralize object creation | Payment provider creation |
| Singleton | Shared single instance | Configuration service |
| Prototype | Reuse object behavior | Shared methods |
| Module | Encapsulate private state | Counter module |
| Adapter | Make incompatible interfaces work together | Third-party API integration |
| Decorator | Add behavior | Logging wrapper |
| Facade | Simplify complex operations | Order processing |
| Proxy | Control object access | Validation |
| Composite | Represent tree structures | File and folder system |
| Observer | Notify dependent objects | Subscribers |
| Pub/Sub | Decouple publishers and subscribers | Event bus |
| Mediator | Coordinate multiple objects | Chat room |
| Strategy | Switch algorithms | Discount calculation |
| Command | Encapsulate actions | Undo/Redo |
| Iterator | Traverse collections | `for...of` |
| State | Change behavior based on state | Order lifecycle |

---

# 18. Interview Questions

### Basic Questions

1. What is a Design Pattern?
2. Why do we need Design Patterns?
3. What are the three categories of Design Patterns?
4. What is the difference between Factory and Constructor Pattern?
5. What is the Singleton Pattern?
6. What is the Module Pattern?
7. What is the difference between Module Pattern and ES Modules?
8. What is the Adapter Pattern?
9. What is the Decorator Pattern?
10. What is the Facade Pattern?

### Intermediate Questions

11. What is the difference between Observer and Pub/Sub?
12. What is the Strategy Pattern?
13. What is the Command Pattern?
14. What is the State Pattern?
15. What is Dependency Injection?
16. What is Dependency Inversion?
17. What is the difference between DI and DIP?
18. What is the difference between MVC and Layered Architecture?
19. What is Event-Driven Architecture?
20. What is Component-Based Architecture?

### Advanced Questions

21. Explain SOLID principles with examples.
22. How does the Proxy object work in JavaScript?
23. How would you implement an Observer Pattern?
24. How would you design a notification system?
25. How would you separate business logic from UI logic?
26. How would you structure a large Node.js application?
27. What are the disadvantages of Singleton Pattern?
28. What is tight coupling?
29. What is loose coupling?
30. What is the difference between composition and inheritance?

---

# 19. Practical Exercises

Try implementing these yourself.

### Exercise 1: Factory Pattern

Create a factory that generates different types of users:

- Admin
- Customer
- Manager

Each user should have different permissions.

### Exercise 2: Singleton Pattern

Create a Logger class that provides one shared instance.

It should have:

- `info()`
- `error()`
- `warning()`

### Exercise 3: Observer Pattern

Create a notification system.

When an order is placed:

- Send an email notification.
- Send an SMS notification.
- Update the inventory.

### Exercise 4: Strategy Pattern

Create a payment system supporting:

- UPI
- Credit Card
- Debit Card
- Cash on Delivery

Use a separate strategy for each payment method.

### Exercise 5: Proxy Pattern

Create a user object with validation.

Rules:

- Name cannot be empty.
- Age cannot be negative.
- Email must contain `@`.

### Exercise 6: Layered Architecture

Build a simple Express CRUD application using:

- Routes
- Controllers
- Services
- Repositories
- Models

Use an in-memory array initially. You can integrate MongoDB or MySQL later.

---

# 20. Output-Based Questions

Try to predict the output before executing the code.

### Question 1

```javascript
function User(name) {
    this.name = name;
}

const user1 = new User("Riyaz");
const user2 = new User("Ahmed");

console.log(user1 === user2);
```

### Question 2

```javascript
const Counter = (function () {

    let count = 0;

    return {
        increment() {
            count++;
        },

        getCount() {
            return count;
        }
    };

})();

Counter.increment();
Counter.increment();

console.log(Counter.getCount());
console.log(Counter.count);
```

### Question 3

```javascript
const target = {
    age: 25
};

const proxy = new Proxy(target, {

    get(target, property) {
        console.log(`Accessing ${property}`);

        return target[property];
    }

});

console.log(proxy.age);
```

### Question 4

```javascript
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function calculate(a, b, strategy) {
    return strategy(a, b);
}

console.log(calculate(10, 5, add));
console.log(calculate(10, 5, multiply));
```

### Question 5

```javascript
const user = {
    name: "Riyaz"
};

const proxy = new Proxy(user, {

    set(target, property, value) {

        if (property === "name" && value.length < 3) {
            return false;
        }

        target[property] = value;

        return true;
    }

});

proxy.name = "Ahmed";

console.log(user.name);
```

---

# 21. Official Documentation & Learning Resources

1. **JavaScript Objects:** [MDN JavaScript Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects?utm_source=chatgpt.com)
2. **JavaScript Classes:** [MDN Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes?utm_source=chatgpt.com)
3. **JavaScript Modules:** [MDN JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules?utm_source=chatgpt.com)
4. **JavaScript Proxy:** [MDN Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy?utm_source=chatgpt.com)
5. **JavaScript Iterators:** [MDN Iterators and Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_generators?utm_source=chatgpt.com)
6. **Node.js Events:** [Node.js Events Documentation](https://nodejs.org/api/events.html?utm_source=chatgpt.com)
7. **Design Patterns:** [Refactoring.Guru Design Patterns](https://refactoring.guru/design-patterns?utm_source=chatgpt.com)

---

# 22. Phase 14 – Revision Checklist

Before moving to the next phase, make sure you understand:

- [ ] What are Design Patterns?
- [ ] Creational, Structural, and Behavioral Patterns.
- [ ] Constructor, Factory, Singleton, and Prototype.
- [ ] Module and Revealing Module Patterns.
- [ ] Adapter, Decorator, Facade, Proxy, and Composite.
- [ ] Observer, Pub/Sub, Mediator, Strategy, Command, Iterator, and State.
- [ ] Dependency Injection and Dependency Inversion.
- [ ] DRY, KISS, and Separation of Concerns.
- [ ] SOLID Principles.
- [ ] Clean Code.
- [ ] MVC Architecture.
- [ ] Layered Architecture.
- [ ] Event-Driven Architecture.
- [ ] Component-Based Architecture.
- [ ] Common architecture mistakes.

---

# JavaScript Roadmap Progress

| Phase | Topic | Status |
|---|---|---|
| 1–5 | Fundamentals to Core Concepts | Completed |
| 6 | DOM & Browser APIs | Completed |
| 7 | Asynchronous JavaScript | Completed |
| 8 | Modern JavaScript (ES6+) | Completed |
| 9 | Advanced JavaScript | Completed |
| 10 | Modules & Tooling | Completed |
| 11 | Browser APIs & Web Storage | Completed |
| 12 | Networking & HTTP | Completed |
| 13 | Security & Performance | Completed |
| **14** | **Design Patterns & Architecture** | **Completed** |

## Next Phase – Phase 15: JavaScript Testing & Debugging

We will cover:

1. What is Software Testing?
2. Manual vs Automated Testing.
3. Unit Testing.
4. Integration Testing.
5. End-to-End Testing.
6. Test Pyramid.
7. Jest.
8. Vitest.
9. Assertions.
10. Test Suites and Test Cases.
11. Mocking.
12. Spies.
13. Stubs.
14. Code Coverage.
15. Testing Async Functions.
16. API Testing.
17. React Component Testing.
18. Debugging JavaScript.
19. Chrome DevTools Debugger.
20. Node.js Debugging.
21. Breakpoints and Watch Expressions.
22. Error Stack Traces.
23. Debugging Memory and Performance Issues.

**Phase 14 is complete.**