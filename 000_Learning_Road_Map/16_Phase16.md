# JavaScript Revision Notes – Phase 16
# TypeScript – From Fundamentals to Advanced Concepts

In this phase, we will learn TypeScript from the beginning and understand how it improves JavaScript development.

Since you already work with React, Next.js, Node.js, and Express, TypeScript is an important skill for writing reliable, maintainable applications.

---

# 1. What Is TypeScript?

**TypeScript is a strongly typed programming language built on top of JavaScript.**

It was developed and is maintained by Microsoft.

TypeScript extends JavaScript by adding features such as:

- Static type checking.
- Interfaces.
- Type aliases.
- Generics.
- Enums.
- Advanced type system.
- Compile-time error detection.

TypeScript code is compiled into JavaScript, which can run in browsers and Node.js.

### Example: JavaScript

```javascript
function add(a, b) {
    return a + b;
}

console.log(add(10, 20)); // 30

console.log(add("10", 20)); // "1020"
```

JavaScript allows different types of values to be passed.

This can sometimes create unexpected results.

### Same Example in TypeScript

```typescript
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(10, 20));

// Compile-time error
console.log(add("10", 20));
```

Here:

- `a: number` means `a` must be a number.
- `b: number` means `b` must be a number.
- `: number` after the parentheses specifies the return type.

TypeScript detects the incorrect argument before the program runs.

**Important:** TypeScript types are primarily checked at compile time. They are generally removed during compilation and do not automatically validate runtime data.

---

# 2. JavaScript vs TypeScript

| Feature | JavaScript | TypeScript |
|---|---|---|
| Type system | Dynamic | Static type checking |
| Type declarations | Not required | Supported |
| Compilation | Usually executed directly | Usually transpiled to JavaScript |
| Interfaces | Not natively available as TS-style interfaces | Supported |
| Type aliases | Not supported | Supported |
| Generics | Not supported as a language feature | Supported |
| Error detection | Many errors appear at runtime | Many type errors can be detected during development |
| Learning curve | Relatively easy | Requires understanding the type system |
| File extension | `.js` | `.ts` |
| React support | Yes | Yes, using `.tsx` |

### Important Difference

JavaScript is dynamically typed.

```javascript
let value = 100;

value = "Hello";

value = true;
```

This is valid JavaScript.

TypeScript can restrict the variable to a particular type.

```typescript
let value: number = 100;

value = 200;

// Error
value = "Hello";
```

---

# 3. Static Typing vs Dynamic Typing

## Dynamic Typing

In dynamically typed languages, the type of a variable is determined at runtime.

JavaScript is dynamically typed.

```javascript
let data = 100;

console.log(typeof data);

data = "Hello";

console.log(typeof data);
```

Output:

```text
number
string
```

The same variable can hold different types of values.

## Static Type Checking

Static type checking checks types before the program executes.

TypeScript provides static type checking.

```typescript
let age: number = 25;

age = 30;

// Error
age = "Twenty Five";
```

The TypeScript compiler reports the incorrect assignment.

### Important

TypeScript is not a completely statically typed runtime language.

It provides static type checking during development and compilation, but the resulting JavaScript is dynamically typed.

---

# 4. TypeScript Environment Setup

Let's configure TypeScript in a Node.js project.

## Step 1: Create a Project

```bash
mkdir typescript-learning

cd typescript-learning

npm init -y
```

## Step 2: Install TypeScript

```bash
npm install -D typescript
```

## Step 3: Initialize Configuration

```bash
npx tsc --init
```

This creates:

```text
tsconfig.json
```

## Step 4: Create a TypeScript File

**app.ts**

```typescript
const message: string = "Hello TypeScript";

console.log(message);
```

## Step 5: Compile TypeScript

```bash
npx tsc app.ts
```

This generates:

```text
app.js
```

## Step 6: Run JavaScript

```bash
node app.js
```

Output:

```text
Hello TypeScript
```

### Understanding the Flow

```text
       app.ts
          |
          v
   TypeScript Compiler
          |
          v
        app.js
          |
          v
     JavaScript Runtime
          |
          v
        Output
```

### Important Commands

| Command | Purpose |
|---|---|
| `npx tsc --init` | Creates TypeScript configuration |
| `npx tsc` | Compiles the project |
| `npx tsc app.ts` | Compiles a specific file |
| `npx tsc --watch` | Watches files and recompiles changes |
| `npx tsc --noEmit` | Performs type checking without generating JavaScript |

**Note:** Modern TypeScript execution tools such as `tsx` can execute TypeScript files directly during development, but this does not mean Node.js itself performs TypeScript type checking.

---

# 5. Type Annotations

A Type Annotation explicitly tells TypeScript what type of value a variable, parameter, or return value should have.

### Syntax

```typescript
let variableName: type = value;
```

### Example

```typescript
let username: string = "Riyaz";

let age: number = 25;

let isDeveloper: boolean = true;
```

You can also annotate function parameters:

```typescript
function greet(name: string): string {
    return `Hello ${name}`;
}

console.log(greet("Riyaz"));
```

Output:

```text
Hello Riyaz
```

---

# 6. Type Inference

Type Inference means TypeScript automatically determines the type based on the assigned value.

### Example

```typescript
let username = "Riyaz";

let age = 25;

let isActive = true;
```

TypeScript automatically infers:

```typescript
username: string

age: number

isActive: boolean
```

Therefore, you don't always need to write type annotations.

### Another Example

```typescript
function add(a: number, b: number) {
    return a + b;
}
```

TypeScript infers the return type as `number`.

### When Should You Use Type Annotations?

Use explicit annotations when:

- Defining function parameters.
- Defining function return contracts.
- Defining object structures.
- Defining API response types.
- Defining public interfaces.

Allow inference when TypeScript can determine the type clearly.

---

# 7. Primitive Types in TypeScript

TypeScript supports several primitive types.

| Type | Description | Example |
|---|---|---|
| `string` | Text | `"Hello"` |
| `number` | Numeric values | `100`, `10.5` |
| `boolean` | True or false | `true` |
| `null` | Intentional absence of value | `null` |
| `undefined` | Unassigned or missing value | `undefined` |
| `bigint` | Large integers | `100n` |
| `symbol` | Unique identifiers | `Symbol("id")` |

### Example

```typescript
let name: string = "Riyaz";

let age: number = 25;

let isLoggedIn: boolean = true;

let emptyValue: null = null;

let notAssigned: undefined = undefined;

let largeNumber: bigint = 100n;

let uniqueId: symbol = Symbol("id");
```

### Important

TypeScript uses lowercase primitive types:

```typescript
string
number
boolean
```

Avoid using wrapper object types such as:

```typescript
String
Number
Boolean
```

Prefer primitive types.

---

# 8. The `any` Type

`any` disables most TypeScript type checking for a particular value.

### Example

```typescript
let data: any = 100;

data = "Hello";

data = true;

data = {
    name: "Riyaz"
};
```

All these assignments are allowed.

You can also call methods without type checking:

```typescript
let value: any = "Hello";

value.someUnknownMethod();
```

TypeScript will not report an error for this operation, even though it may fail at runtime.

### Why Avoid `any`?

Because it removes many of the benefits of TypeScript.

Use it only when necessary, such as when temporarily migrating legacy JavaScript code.

---

# 9. The `unknown` Type

`unknown` is similar to `any`, but it is safer.

You can assign any value to an `unknown` variable, but you must check its type before performing type-specific operations.

### Example

```typescript
let data: unknown = "Hello";
```

This is allowed:

```typescript
data = 100;

data = true;
```

But this is not allowed without checking:

```typescript
// TypeScript error
data.toUpperCase();
```

### Correct Approach

```typescript
let data: unknown = "Hello";

if (typeof data === "string") {
    console.log(data.toUpperCase());
}
```

Output:

```text
HELLO
```

### `any` vs `unknown`

| Feature | any | unknown |
|---|---|---|
| Accepts any value | Yes | Yes |
| Type checking | Mostly disabled | Required before unsafe operations |
| Safer | No | Yes |
| Recommended | Avoid when possible | Prefer for uncertain values |

**Practical use case:** Handling API responses, external input, and values whose type is not known in advance.

---

# 10. The `void` Type

`void` is generally used as the return type of a function that does not return a meaningful value.

### Example

```typescript
function greet(name: string): void {
    console.log(`Hello ${name}`);
}
```

The function performs an operation but doesn't return a value.

### Another Example

```typescript
function logMessage(): void {
    console.log("Welcome");
}
```

**Important:** A function with a `void` return type can technically return `undefined`. The key idea is that callers should not rely on a meaningful returned value.

---

# 11. The `never` Type

`never` represents values that never occur.

It is commonly used for:

- Functions that never return.
- Functions that always throw errors.
- Exhaustive type checking.

### Example: Infinite Loop

```typescript
function infiniteLoop(): never {
    while (true) {
        console.log("Running");
    }
}
```

The function never completes normally.

### Example: Throwing Error

```typescript
function throwError(message: string): never {
    throw new Error(message);
}
```

### `void` vs `never`

| void | never |
|---|---|
| Function completes without a meaningful return value | Function never completes normally |
| Common for logging functions | Common for throwing functions |
| May return `undefined` | Has no normal return value |

---

# 12. Arrays in TypeScript

You can define the type of array elements.

### Syntax 1

```typescript
let numbers: number[] = [10, 20, 30];
```

### Syntax 2

```typescript
let numbers: Array<number> = [10, 20, 30];
```

Both are valid.

### String Array

```typescript
let users: string[] = [
    "Riyaz",
    "Ahmed",
    "John"
];
```

### Boolean Array

```typescript
let statuses: boolean[] = [
    true,
    false,
    true
];
```

### Mixed Array

You can use union types:

```typescript
let data: (string | number)[] = [
    "Riyaz",
    25,
    "Ahmed",
    30
];
```

### Important

This is invalid:

```typescript
let numbers: number[] = [10, 20, "Hello"];
```

Because `"Hello"` is not a number.

---

# 13. Tuples

A Tuple is an array with a fixed structure in which each position has a specific type.

### Example

```typescript
let user: [number, string, boolean];

user = [1, "Riyaz", true];
```

Here:

- Index 0 must be a number.
- Index 1 must be a string.
- Index 2 must be a boolean.

Invalid:

```typescript
user = ["Riyaz", 1, true];
```

### Tuple with Optional Elements

```typescript
let user: [number, string, boolean?];

user = [1, "Riyaz"];

user = [1, "Riyaz", true];
```

### Tuple vs Array

| Array | Tuple |
|---|---|
| Usually stores multiple values of the same type | Stores values with specific positional types |
| Length is generally flexible | Intended to have a fixed structure |
| `number[]` | `[number, string, boolean]` |

**Important:** TypeScript tuples can still be mutated using array methods. Their positional typing does not automatically make them immutable.

---

# 14. Object Types

TypeScript allows you to define the structure of objects.

### Example

```typescript
let user: {
    name: string;
    age: number;
    isActive: boolean;
};

user = {
    name: "Riyaz",
    age: 25,
    isActive: true
};
```

If you provide an incorrect type, TypeScript reports an error.

```typescript
user = {
    name: "Riyaz",
    age: "Twenty Five",
    isActive: true
};
```

The `age` property must be a number.

### Optional Properties

Use `?` to make a property optional.

```typescript
let user: {
    name: string;
    age?: number;
};

user = {
    name: "Riyaz"
};
```

Both are valid:

```typescript
user = {
    name: "Riyaz"
};

user = {
    name: "Riyaz",
    age: 25
};
```

### Readonly Properties

Use `readonly` to prevent reassignment of a property.

```typescript
let user: {
    readonly id: number;
    name: string;
};

user = {
    id: 1,
    name: "Riyaz"
};

user.name = "Ahmed";

// Error
user.id = 2;
```

---

# 15. Type Aliases

A Type Alias allows you to create a reusable name for a type.

Use the `type` keyword.

### Example

```typescript
type User = {
    id: number;
    name: string;
    email: string;
};

const user1: User = {
    id: 1,
    name: "Riyaz",
    email: "riyaz@gmail.com"
};

const user2: User = {
    id: 2,
    name: "Ahmed",
    email: "ahmed@gmail.com"
};
```

Instead of writing the same object structure repeatedly, you can reuse `User`.

### Type Alias with Primitive Types

```typescript
type UserId = number;

let id: UserId = 101;
```

### Type Alias with Union

```typescript
type Status = "pending" | "success" | "failed";

let paymentStatus: Status = "success";
```

### Type Alias with Function Types

```typescript
type AddFunction = (a: number, b: number) => number;

const add: AddFunction = (a, b) => {
    return a + b;
};
```

---

# 16. Interfaces

An Interface defines the expected structure of an object.

Interfaces are particularly useful when defining contracts for objects and classes.

### Example

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

const user: User = {
    id: 1,
    name: "Riyaz",
    email: "riyaz@gmail.com"
};
```

If the object doesn't satisfy the interface, TypeScript reports an error.

### Optional Properties

```typescript
interface User {
    id: number;
    name: string;
    age?: number;
}
```

### Readonly Properties

```typescript
interface User {
    readonly id: number;
    name: string;
}
```

### Methods Inside Interfaces

```typescript
interface User {
    name: string;

    greet(): void;
}

const user: User = {
    name: "Riyaz",

    greet() {
        console.log(`Hello ${this.name}`);
    }
};
```

### Extending Interfaces

One interface can extend another.

```typescript
interface Person {
    name: string;
    age: number;
}

interface Employee extends Person {
    employeeId: number;
    salary: number;
}

const employee: Employee = {
    name: "Riyaz",
    age: 25,
    employeeId: 101,
    salary: 50000
};
```

### Multiple Interface Extension

```typescript
interface Person {
    name: string;
}

interface Developer {
    skills: string[];
}

interface Employee extends Person, Developer {
    employeeId: number;
}
```

---

# 17. Interface vs Type Alias

This is one of the most common TypeScript interview questions.

| Feature | Interface | Type Alias |
|---|---|---|
| Object structure | Yes | Yes |
| Primitive aliases | No | Yes |
| Union types | No | Yes |
| Intersection types | No | Yes |
| Extending | `extends` | Intersections using `&` |
| Declaration merging | Supported | Not supported |
| Classes can implement | Yes | Object-shaped aliases can also be implemented |

### Interface Example

```typescript
interface User {
    name: string;
    age: number;
}
```

### Type Alias Example

```typescript
type User = {
    name: string;
    age: number;
};
```

Both define the structure of a user object.

### Declaration Merging

Interfaces can be declared multiple times with the same name.

TypeScript combines their properties.

```typescript
interface User {
    name: string;
}

interface User {
    age: number;
}

const user: User = {
    name: "Riyaz",
    age: 25
};
```

This is called **Declaration Merging**.

The same approach is not supported for duplicate type aliases.

### When Should You Use Which?

Use interfaces when defining object contracts, especially for class implementations and extensible public object structures.

Use type aliases when defining unions, intersections, tuples, primitives, and more complex type expressions.

Both are useful for object shapes.

---

# 18. Union Types

A Union Type allows a variable to hold one of several specified types.

Use the `|` operator.

### Example

```typescript
let value: string | number;

value = "Hello";

value = 100;
```

Invalid:

```typescript
value = true;
```

### Function Example

```typescript
function printId(id: string | number) {
    console.log(id);
}

printId(101);

printId("USER-101");
```

### Literal Union Types

```typescript
type Status = "pending" | "success" | "failed";

let status: Status = "pending";

status = "success";

// Error
status = "completed";
```

This is useful for controlling allowed values.

---

# 19. Intersection Types

Intersection Types combine multiple types into one.

Use the `&` operator.

### Example

```typescript
type Person = {
    name: string;
    age: number;
};

type Developer = {
    skills: string[];
};

type Employee = Person & Developer;
```

Now an `Employee` must satisfy both structures.

```typescript
const employee: Employee = {
    name: "Riyaz",
    age: 25,
    skills: ["JavaScript", "React", "Node.js"]
};
```

### Union vs Intersection

| Union `|` | Intersection `&` |
|---|---|
| One of the specified types | Must satisfy all combined types |
| Either/or | Combined requirements |
| Useful for alternatives | Useful for combining structures |

---

# 20. Type Narrowing

Type Narrowing means reducing a broad type into a more specific type using checks.

### Example

```typescript
function printValue(value: string | number) {

    if (typeof value === "string") {

        console.log(value.toUpperCase());

    } else {

        console.log(value.toFixed(2));

    }

}
```

Here:

- Inside the `if` block, TypeScript knows `value` is a string.
- Inside the `else` block, TypeScript knows `value` is a number.

### Common Narrowing Techniques

1. `typeof`
2. `instanceof`
3. `in` operator.
4. Equality checks.
5. Truthiness checks.
6. Custom type guards.

---

# 21. Type Guards

A Type Guard is a condition or function that helps TypeScript determine the actual type of a value.

### 1. typeof

```typescript
function processValue(value: string | number) {

    if (typeof value === "string") {
        return value.toUpperCase();
    }

    return value.toFixed(2);

}
```

### 2. instanceof

```typescript
class Admin {
    deleteUser() {
        console.log("User deleted");
    }
}

class Customer {
    placeOrder() {
        console.log("Order placed");
    }
}

function processUser(user: Admin | Customer) {

    if (user instanceof Admin) {
        user.deleteUser();
    } else {
        user.placeOrder();
    }

}
```

### 3. in Operator

```typescript
type Admin = {
    name: string;
    permissions: string[];
};

type Customer = {
    name: string;
    cart: string[];
};

function printDetails(user: Admin | Customer) {

    if ("permissions" in user) {
        console.log(user.permissions);
    } else {
        console.log(user.cart);
    }

}
```

### 4. Custom Type Guard

You can create your own type guard using a function that returns a type predicate.

```typescript
type User = {
    name: string;
};

function isUser(value: unknown): value is User {

    return (
        typeof value === "object" &&
        value !== null &&
        "name" in value &&
        typeof value.name === "string"
    );

}

const data: unknown = {
    name: "Riyaz"
};

if (isUser(data)) {
    console.log(data.name);
}
```

The syntax:

```typescript
value is User
```

tells TypeScript that when the function returns `true`, the value can be treated as a `User`.

---

# 22. Enums

Enums allow you to define a collection of named constants.

### Numeric Enum

```typescript
enum Status {
    Pending,
    Success,
    Failed
}

console.log(Status.Pending);
console.log(Status.Success);
console.log(Status.Failed);
```

Output:

```text
0
1
2
```

By default, numeric enums start from zero.

### String Enum

```typescript
enum Status {
    Pending = "PENDING",
    Success = "SUCCESS",
    Failed = "FAILED"
}

let paymentStatus: Status = Status.Success;

console.log(paymentStatus);
```

Output:

```text
SUCCESS
```

### Alternative: Union Types

For many simple status definitions, a union type is sufficient.

```typescript
type Status = "pending" | "success" | "failed";

let paymentStatus: Status = "success";
```

### Enum vs Union

| Enum | Union |
|---|---|
| Defines named constants | Defines allowed values |
| Exists at runtime in common enum forms | Usually removed during compilation |
| Supports numeric and string enums | Supports literal types |
| Useful for named constant groups | Useful for simple restricted values |

**Important:** TypeScript enums have runtime behavior. `const enum` has different compilation behavior and should be used with awareness of compiler and tooling settings.

---

# 23. Functions in TypeScript

You can define parameter and return types.

### Example

```typescript
function add(a: number, b: number): number {
    return a + b;
}
```

### Optional Parameters

Use `?`.

```typescript
function greet(name: string, age?: number): string {

    if (age !== undefined) {
        return `Hello ${name}, Age: ${age}`;
    }

    return `Hello ${name}`;

}

console.log(greet("Riyaz"));

console.log(greet("Riyaz", 25));
```

### Default Parameters

```typescript
function greet(name: string = "Guest"): string {
    return `Hello ${name}`;
}
```

### Rest Parameters

```typescript
function sum(...numbers: number[]): number {

    return numbers.reduce((total, number) => {
        return total + number;
    }, 0);

}

console.log(sum(10, 20, 30));
```

Output:

```text
60
```

### Function Type

```typescript
type Operation = (a: number, b: number) => number;

const multiply: Operation = (a, b) => {
    return a * b;
};
```

---

# 24. Generics

Generics allow you to create reusable functions, classes, and interfaces that work with different types while preserving type safety.

### Problem Without Generics

```typescript
function getValue(value: any): any {
    return value;
}

const result = getValue(100);
```

The return type is `any`, so type information is lost.

### Using Generics

```typescript
function getValue<T>(value: T): T {
    return value;
}

const numberValue = getValue<number>(100);

const stringValue = getValue<string>("Hello");
```

Here:

- `<T>` defines a generic type parameter.
- `T` represents a type that will be supplied or inferred.
- The function returns the same type it receives.

### Type Inference with Generics

You don't always need to specify the type explicitly.

```typescript
const numberValue = getValue(100);

const stringValue = getValue("Hello");
```

TypeScript infers the generic type from the arguments.

### Generic Array

```typescript
function getFirst<T>(items: T[]): T | undefined {
    return items[0];
}

console.log(getFirst<number>([10, 20, 30]));

console.log(getFirst<string>(["A", "B", "C"]));
```

### Generic Interface

```typescript
interface ApiResponse<T> {
    success: boolean;
    data: T;
}

type User = {
    id: number;
    name: string;
};

const response: ApiResponse<User> = {
    success: true,
    data: {
        id: 1,
        name: "Riyaz"
    }
};
```

### Generic Constraints

You can restrict which types are accepted by a generic.

```typescript
function getLength<T extends { length: number }>(value: T): number {
    return value.length;
}

console.log(getLength("Hello"));

console.log(getLength([10, 20, 30]));
```

The generic must have a `length` property of type `number`.

---

# 25. Utility Types

TypeScript provides built-in utility types that help transform existing types.

These are very useful in real-world applications.

Let's start with an interface:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}
```

## 25.1 Partial

Makes all properties optional.

```typescript
type UpdateUser = Partial<User>;
```

Equivalent conceptually to:

```typescript
type UpdateUser = {
    id?: number;
    name?: string;
    email?: string;
    age?: number;
};
```

Useful for update operations.

## 25.2 Required

Makes all properties required.

```typescript
interface User {
    name: string;
    age?: number;
}

type RequiredUser = Required<User>;
```

Now `age` is required.

## 25.3 Pick

Selects specific properties.

```typescript
type UserPreview = Pick<User, "id" | "name">;
```

Result:

```typescript
{
    id: number;
    name: string;
}
```

## 25.4 Omit

Removes specific properties.

```typescript
type PublicUser = Omit<User, "email">;
```

## 25.5 Readonly

Makes properties readonly.

```typescript
type ReadonlyUser = Readonly<User>;
```

## 25.6 Record

Creates an object type with specified keys and values.

```typescript
type UserRoles = Record<string, string>;

const roles: UserRoles = {
    admin: "Full Access",
    customer: "Limited Access"
};
```

## 25.7 Exclude

Removes members from a union.

```typescript
type Status = "pending" | "success" | "failed";

type FinalStatus = Exclude<Status, "pending">;
```

Result:

```typescript
"success" | "failed"
```

## 25.8 Extract

Keeps only matching members.

```typescript
type Status = "pending" | "success" | "failed";

type SuccessfulStatus = Extract<Status, "success" | "failed">;
```

Result:

```typescript
"success" | "failed"
```

## 25.9 ReturnType

Extracts the return type of a function.

```typescript
function getUser() {
    return {
        id: 1,
        name: "Riyaz"
    };
}

type User = ReturnType<typeof getUser>;
```

## 25.10 Parameters

Extracts the parameter types of a function as a tuple.

```typescript
function createUser(name: string, age: number) {}

type CreateUserParams = Parameters<typeof createUser>;
```

Result:

```typescript
[string, number]
```

### Utility Types Summary

| Utility Type | Purpose |
|---|---|
| `Partial<T>` | Makes all properties optional |
| `Required<T>` | Makes all properties required |
| `Pick<T, K>` | Selects properties |
| `Omit<T, K>` | Removes properties |
| `Readonly<T>` | Makes properties readonly |
| `Record<K, T>` | Creates key-value object type |
| `Exclude<T, U>` | Removes union members |
| `Extract<T, U>` | Keeps matching union members |
| `ReturnType<T>` | Extracts function return type |
| `Parameters<T>` | Extracts function parameter types |

---

# 26. Type Assertions

Type Assertion tells TypeScript to treat a value as a particular type.

It does not perform runtime conversion or validation.

### Example

```typescript
let value: unknown = "Hello TypeScript";

let length = (value as string).length;

console.log(length);
```

Output:

```text
16
```

### Alternative Syntax

```typescript
let length = (<string>value).length;
```

This angle-bracket syntax is not suitable inside TSX files because it conflicts with JSX syntax.

Prefer `as`.

### Important

Type assertions don't change the actual value.

```typescript
const value: unknown = 100;

const text = value as string;

console.log(typeof text);
```

Output:

```text
number
```

Although TypeScript treats `text` as a string, the runtime value remains a number.

Therefore, use type assertions carefully.

---

# 27. Classes in TypeScript

TypeScript supports classes similar to JavaScript, with additional type-related features.

### Example

```typescript
class User {

    name: string;

    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getDetails(): string {
        return `${this.name} - ${this.age}`;
    }

}

const user = new User("Riyaz", 25);

console.log(user.getDetails());
```

### Parameter Properties

TypeScript provides shorthand syntax for declaring and initializing class properties.

```typescript
class User {

    constructor(
        public name: string,
        public age: number
    ) {}

}

const user = new User("Riyaz", 25);
```

This is equivalent to declaring properties separately and assigning them in the constructor.

---

# 28. Access Modifiers

TypeScript provides three common access modifiers.

| Modifier | Meaning |
|---|---|
| `public` | Accessible from anywhere |
| `private` | Accessible only within the declaring class |
| `protected` | Accessible within the declaring class and subclasses |

### Public

```typescript
class User {

    public name: string = "Riyaz";

}

const user = new User();

console.log(user.name);
```

### Private

```typescript
class User {

    private password: string = "secret";

}

const user = new User();

// Error
console.log(user.password);
```

### Protected

```typescript
class User {

    protected name: string = "Riyaz";

}

class Admin extends User {

    showName() {
        console.log(this.name);
    }

}
```

`protected` members are accessible in subclasses.

### Important: TypeScript Private vs JavaScript `#private`

TypeScript's `private` is primarily a compile-time restriction.

JavaScript's native private fields use `#`.

```typescript
class User {

    #password = "secret";

    getPassword() {
        return this.#password;
    }

}
```

Native `#private` fields enforce runtime privacy.

---

# 29. Inheritance

Inheritance allows one class to extend another class.

```typescript
class Person {

    constructor(public name: string) {}

    greet() {
        console.log(`Hello ${this.name}`);
    }

}

class Developer extends Person {

    constructor(
        name: string,
        public skills: string[]
    ) {
        super(name);
    }

    showSkills() {
        console.log(this.skills);
    }

}

const developer = new Developer(
    "Riyaz",
    ["React", "Node.js", "TypeScript"]
);

developer.greet();

developer.showSkills();
```

### Important Concepts

- `extends`: Inherits from another class.
- `super()`: Calls the parent constructor.
- `override`: Explicitly marks a method that overrides an inherited method.

Example:

```typescript
class Person {

    greet() {
        console.log("Hello");
    }

}

class Developer extends Person {

    override greet() {
        console.log("Hello Developer");
    }

}
```

---

# 30. Abstract Classes

An Abstract Class is a class that cannot be instantiated directly.

It is used as a base class for other classes.

### Example

```typescript
abstract class Payment {

    abstract pay(amount: number): void;

    showMessage() {
        console.log("Processing payment");
    }

}

class UpiPayment extends Payment {

    pay(amount: number): void {
        console.log(`Paid ₹${amount} using UPI`);
    }

}

const payment = new UpiPayment();

payment.showMessage();

payment.pay(500);
```

You cannot do:

```typescript
const payment = new Payment();
```

Because `Payment` is abstract.

### Abstract Class vs Normal Class

| Abstract Class | Normal Class |
|---|---|
| Cannot be instantiated directly | Can be instantiated |
| Can contain abstract methods | Cannot contain abstract methods |
| Can contain implemented methods | Can contain implemented methods |
| Intended as a base class | Can be used directly |

---

# 31. Interface vs Abstract Class

| Interface | Abstract Class |
|---|---|
| Defines a contract | Defines a base class |
| Cannot contain instance implementation in the usual interface model | Can contain implemented methods |
| A class can implement multiple interfaces | A class can extend only one class |
| No constructor | Can have a constructor |
| Useful for describing object capabilities | Useful for sharing base implementation |

### Interface Example

```typescript
interface Payment {
    pay(amount: number): void;
}

class UpiPayment implements Payment {

    pay(amount: number): void {
        console.log(`Paid ₹${amount}`);
    }

}
```

### Abstract Class Example

```typescript
abstract class Payment {

    abstract pay(amount: number): void;

    showMessage() {
        console.log("Payment started");
    }

}
```

---

# 32. Static Properties and Methods

Static members belong to the class itself rather than individual instances.

### Example

```typescript
class MathHelper {

    static PI = 3.14159;

    static add(a: number, b: number): number {
        return a + b;
    }

}

console.log(MathHelper.PI);

console.log(MathHelper.add(10, 20));
```

You don't need to create an object.

```typescript
MathHelper.add(10, 20);
```

---

# 33. TypeScript Modules

TypeScript supports JavaScript's ES Module system.

### Export

**user.ts**

```typescript
export interface User {
    id: number;
    name: string;
}

export function getUser(): User {
    return {
        id: 1,
        name: "Riyaz"
    };
}
```

### Import

**app.ts**

```typescript
import { User, getUser } from "./user";

const user: User = getUser();

console.log(user);
```

### Default Export

**calculator.ts**

```typescript
export default function add(a: number, b: number): number {
    return a + b;
}
```

**app.ts**

```typescript
import add from "./calculator";

console.log(add(10, 20));
```

### Named Export vs Default Export

| Named Export | Default Export |
|---|---|
| Can export multiple values | One default export per module |
| Import uses the exported name | Import can choose its local name |
| Uses `{}` when importing | Doesn't require `{}` |

---

# 34. What Is `tsconfig.json`?

`tsconfig.json` is the configuration file for a TypeScript project.

It controls how the TypeScript compiler checks and compiles your code.

### Example

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "strict": true,
        "esModuleInterop": true,
        "skipLibCheck": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "noEmitOnError": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules"]
}
```

### Important Compiler Options

| Option | Purpose |
|---|---|
| `target` | JavaScript version to generate |
| `module` | Module format |
| `moduleResolution` | How modules are resolved |
| `strict` | Enables strict type-checking options |
| `esModuleInterop` | Improves interoperability with CommonJS modules |
| `skipLibCheck` | Skips checking declaration files |
| `outDir` | Output directory |
| `rootDir` | Root source directory |
| `noEmitOnError` | Prevents emitting output when errors exist |

### What Is Strict Mode?

```json
{
    "compilerOptions": {
        "strict": true
    }
}
```

Strict mode enables several stricter type-checking options.

For example, it helps detect:

- Implicit `any`.
- Incorrect null handling.
- Unsafe function parameter assumptions.
- Other type-related issues.

**Recommendation:** Use strict mode for new TypeScript projects whenever practical.

---

# 35. TypeScript with React

TypeScript works very well with React.

React components generally use `.tsx` files when they contain JSX.

### `.ts` vs `.tsx`

| Extension | Usage |
|---|---|
| `.ts` | TypeScript without JSX |
| `.tsx` | TypeScript with JSX |

### Example: Typed Props

**User.tsx**

```tsx
interface UserProps {
    name: string;
    age: number;
}

function User({ name, age }: UserProps) {

    return (
        <div>
            <h2>{name}</h2>
            <p>{age}</p>
        </div>
    );

}

export default User;
```

Usage:

```tsx
<User name="Riyaz" age={25} />
```

Invalid:

```tsx
<User name="Riyaz" age="Twenty Five" />
```

### Optional Props

```tsx
interface UserProps {
    name: string;
    age?: number;
}
```

### Children Props

```tsx
import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
}

function Card({ children }: CardProps) {

    return (
        <div className="card">
            {children}
        </div>
    );

}
```

Usage:

```tsx
<Card>
    <h1>Hello Riyaz</h1>
</Card>
```

### Typing useState

```tsx
import { useState } from "react";

function Counter() {

    const [count, setCount] = useState<number>(0);

    return (
        <button onClick={() => setCount(count + 1)}>
            Count: {count}
        </button>
    );

}
```

TypeScript can often infer the type of `count` automatically.

### Typing useState with Union

```tsx
type Status = "idle" | "loading" | "success" | "error";

const [status, setStatus] = useState<Status>("idle");
```

### Typing Event Handlers

```tsx
function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
) {
    console.log(event.target.value);
}
```

Usage:

```tsx
<input onChange={handleChange} />
```

### Typing Button Click

```tsx
function handleClick(
    event: React.MouseEvent<HTMLButtonElement>
) {
    console.log("Button clicked");
}
```

### Typing Form Submission

```tsx
function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
) {
    event.preventDefault();

    console.log("Form submitted");
}
```

---

# 36. TypeScript with Node.js and Express

TypeScript is commonly used in backend applications.

Let's understand a basic Express setup.

## Step 1: Create Project

```bash
mkdir express-typescript

cd express-typescript

npm init -y
```

## Step 2: Install Dependencies

```bash
npm install express
```

Development dependencies:

```bash
npm install -D typescript @types/node @types/express tsx
```

## Step 3: Configure TypeScript

Create `tsconfig.json`:

```json
{
    "compilerOptions": {
        "target": "ES2022",
        "module": "NodeNext",
        "moduleResolution": "NodeNext",
        "strict": true,
        "esModuleInterop": true,
        "outDir": "./dist",
        "rootDir": "./src",
        "skipLibCheck": true
    },
    "include": ["src/**/*"]
}
```

## Step 4: Create Project Structure

```text
project/
│
├── src/
│   ├── controllers/
│   │   └── user.controller.ts
│   │
│   ├── routes/
│   │   └── user.routes.ts
│   │
│   └── app.ts
│
├── package.json
└── tsconfig.json
```

## Step 5: Create Express Server

**app.ts**

```typescript
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("TypeScript Express Server");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

## Step 6: Create User Interface

**user.controller.ts**

```typescript
import { Request, Response } from "express";

interface User {
    id: number;
    name: string;
    email: string;
}

const users: User[] = [
    {
        id: 1,
        name: "Riyaz",
        email: "riyaz@gmail.com"
    }
];

export function getUsers(req: Request, res: Response) {
    res.json(users);
}
```

## Step 7: Create Route

**user.routes.ts**

```typescript
import express from "express";

import { getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);

export default router;
```

## Step 8: Register Route

Update `app.ts`:

```typescript
import express from "express";

import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

The `.js` extensions in relative imports are intentional for this NodeNext-style ESM example. The TypeScript compiler resolves the corresponding `.ts` source files and emits JavaScript imports.

## Step 9: Configure Scripts

In `package.json`, use:

```json
{
    "scripts": {
        "dev": "tsx watch src/app.ts",
        "build": "tsc",
        "start": "node dist/app.js"
    }
}
```

Run development server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Run production build:

```bash
npm start
```

**Important:** TypeScript types do not validate incoming HTTP request bodies at runtime. Use a runtime validation library such as Zod for external input.

---

# 37. TypeScript with API Responses

When working with APIs, defining response types is particularly useful.

### Example

```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
```

Now define the expected response:

```typescript
type UserResponse = ApiResponse<User>;

type UsersResponse = ApiResponse<User[]>;
```

Example:

```typescript
const response: UsersResponse = {
    success: true,
    message: "Users fetched successfully",
    data: [
        {
            id: 1,
            name: "Riyaz",
            email: "riyaz@gmail.com"
        },
        {
            id: 2,
            name: "Ahmed",
            email: "ahmed@gmail.com"
        }
    ]
};
```

This is especially useful when building reusable API response structures.

**Important:** An interface describes the expected structure. It does not prove that an actual server response matches that structure. Validate external data at runtime.

---

# 38. TypeScript with Zod

Zod is a TypeScript-friendly schema validation library.

It validates data at runtime and can infer TypeScript types from schemas.

### Install

```bash
npm install zod
```

### Example

```typescript
import { z } from "zod";

const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    age: z.number().min(18)
});
```

Validate data:

```typescript
const result = userSchema.safeParse({
    name: "Riyaz",
    email: "riyaz@gmail.com",
    age: 25
});

if (result.success) {

    console.log(result.data);

} else {

    console.log(result.error.issues);

}
```

### Infer Type from Schema

```typescript
type User = z.infer<typeof userSchema>;
```

Now the TypeScript type is derived from the schema.

### Why Use Zod?

- Runtime validation.
- Type inference.
- API request validation.
- Form validation.
- Environment variable validation.
- Preventing invalid external data from entering business logic.

This is a particularly useful combination:

**Zod validates at runtime; TypeScript checks types during development.**

---

# 39. Common TypeScript Mistakes

| Mistake | Better Approach |
|---|---|
| Using `any` everywhere | Prefer specific types or `unknown` |
| Overusing type assertions | Use type narrowing and validation |
| Ignoring strict mode | Enable strict checking |
| Assuming interfaces validate runtime data | Use Zod or another validator |
| Using `String` instead of `string` | Use primitive types |
| Duplicating object types | Create reusable interfaces or aliases |
| Making everything optional | Define required fields accurately |
| Overusing enums | Consider union types for simple values |
| Ignoring null and undefined | Handle them explicitly |
| Writing overly complex generic types | Prefer simpler, understandable types |

---

# 40. Important TypeScript Interview Questions

### Basic Questions

1. What is TypeScript?
2. What is the difference between JavaScript and TypeScript?
3. What is static typing?
4. What is type inference?
5. What are type annotations?
6. What is the difference between `any` and `unknown`?
7. What is the difference between `void` and `never`?
8. What are tuples?
9. What are interfaces?
10. What are type aliases?

### Intermediate Questions

11. What is the difference between Interface and Type Alias?
12. What are Union Types?
13. What are Intersection Types?
14. What is Type Narrowing?
15. What are Type Guards?
16. What are Enums?
17. What are Generics?
18. What are Generic Constraints?
19. What are Utility Types?
20. What is Type Assertion?

### Advanced Questions

21. What is the difference between `private` and `#private`?
22. What is the difference between Interface and Abstract Class?
23. What is Declaration Merging?
24. What is the purpose of `tsconfig.json`?
25. What does strict mode do?
26. What is the difference between `.ts` and `.tsx`?
27. How do you type React props?
28. How do you type React event handlers?
29. How do you use TypeScript with Express?
30. Why do we need runtime validation libraries such as Zod?

---

# 41. Practical Exercises

Try implementing these yourself.

### Exercise 1: User Management

Create a `User` interface containing:

- `id`
- `name`
- `email`
- `age`
- `isActive`

Create five users using this interface.

### Exercise 2: Product Management

Create a `Product` type.

Properties:

- `id`
- `name`
- `price`
- `category`
- `stock`

Create a function that accepts a product and returns its total stock value.

### Exercise 3: Union Types

Create a payment status type supporting:

- `pending`
- `processing`
- `completed`
- `failed`

Create a function that accepts only these statuses.

### Exercise 4: Generics

Create a generic function:

```typescript
getFirst<T>(items: T[]): T | undefined
```

It should work with:

- Number arrays.
- String arrays.
- Object arrays.

### Exercise 5: Utility Types

Given:

```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}
```

Create:

- `UserUpdate` using `Partial`.
- `UserPreview` using `Pick`.
- `PublicUser` using `Omit`.
- `ReadonlyUser` using `Readonly`.

### Exercise 6: React with TypeScript

Create a React component with:

- Typed props.
- `useState`.
- Input event handling.
- Button click handling.
- Optional props.

### Exercise 7: Express with TypeScript

Create an Express CRUD API with:

```text
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
DELETE /users/:id
```

Use:

- Interfaces.
- Typed request and response objects.
- Controllers.
- Services.
- Repositories.
- Zod validation.

---

# 42. Output-Based Questions

Predict the output or identify the TypeScript error before running the code.

### Question 1

```typescript
let value: string | number = 100;

value = "Hello";

console.log(value);
```

### Question 2

```typescript
function getValue<T>(value: T): T {
    return value;
}

const result = getValue(100);

console.log(typeof result);
```

### Question 3

```typescript
type User = {
    name: string;
    age: number;
};

type Admin = User & {
    permissions: string[];
};

const admin: Admin = {
    name: "Riyaz",
    age: 25,
    permissions: ["read", "write"]
};

console.log(admin.name);
```

### Question 4

```typescript
interface User {
    name: string;
}

interface User {
    age: number;
}

const user: User = {
    name: "Riyaz",
    age: 25
};

console.log(user);
```

### Question 5

```typescript
function printValue(value: string | number) {

    if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else {
        console.log(value.toFixed(2));
    }

}

printValue("hello");

printValue(100);
```

---

# 43. Official Documentation & Learning Resources

1. [TypeScript Official Documentation](https://www.typescriptlang.org/docs/?utm_source=chatgpt.com)
2. [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html?utm_source=chatgpt.com)
3. [TypeScript Playground](https://www.typescriptlang.org/play/?utm_source=chatgpt.com)
4. [TypeScript Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html?utm_source=chatgpt.com)
5. [TypeScript with React](https://react.dev/learn/typescript?utm_source=chatgpt.com)
6. [Node.js Documentation](https://nodejs.org/docs/latest/api/?utm_source=chatgpt.com)
7. [Zod Documentation](https://zod.dev/?utm_source=chatgpt.com)
8. [Express Documentation](https://expressjs.com/?utm_source=chatgpt.com)

---

# 44. Phase 16 – Revision Checklist

Before moving to the next phase, make sure you understand:

- [ ] What is TypeScript?
- [ ] JavaScript vs TypeScript.
- [ ] Static vs Dynamic Typing.
- [ ] Type Annotations.
- [ ] Type Inference.
- [ ] Primitive Types.
- [ ] `any`, `unknown`, `void`, and `never`.
- [ ] Arrays and Tuples.
- [ ] Object Types.
- [ ] Optional and Readonly Properties.
- [ ] Type Aliases.
- [ ] Interfaces.
- [ ] Interface vs Type Alias.
- [ ] Union and Intersection Types.
- [ ] Type Narrowing.
- [ ] Type Guards.
- [ ] Enums.
- [ ] Functions.
- [ ] Generics.
- [ ] Generic Constraints.
- [ ] Utility Types.
- [ ] Type Assertions.
- [ ] Classes and Access Modifiers.
- [ ] Inheritance.
- [ ] Abstract Classes.
- [ ] Interface vs Abstract Class.
- [ ] Static Members.
- [ ] Modules.
- [ ] `tsconfig.json`.
- [ ] TypeScript with React.
- [ ] TypeScript with Node.js and Express.
- [ ] TypeScript with Zod.

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
| 14 | Design Patterns & Architecture | Completed |
| 15 | Testing & Debugging | Completed |
| **16** | **TypeScript** | **Completed** |

## Next Phase – Phase 17: JavaScript Runtime & Internals

We will cover:

1. How JavaScript Executes.
2. JavaScript Engine Architecture.
3. V8 Engine.
4. JavaScript Runtime Environment.
5. Call Stack.
6. Memory Heap.
7. Execution Context.
8. Global Execution Context.
9. Function Execution Context.
10. Creation Phase and Execution Phase.
11. Lexical Environment.
12. Environment Records.
13. Scope Chain.
14. Variable Environment.
15. Hoisting Internals.
16. Temporal Dead Zone.
17. Closures Internals.
18. Garbage Collection.
19. Mark-and-Sweep Algorithm.
20. Event Loop Internals.
21. Microtask Queue.
22. Macrotask/Task Queue.
23. Rendering and Event Loop.
24. Web APIs.
25. Node.js Runtime Architecture.
26. Libuv.
27. Thread Pool.
28. Event-Driven and Non-Blocking I/O.
29. JavaScript Memory Management.

**Phase 16 is complete.**