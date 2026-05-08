# 📘 Frontend JavaScript Frameworks – Detailed Guide

This document provides a clear and structured overview of the most popular JavaScript frontend frameworks: **React**, **Angular**, and **Vue**.

---

## ⚛️ React JS

**Definition**
A JavaScript library used to build interactive user interfaces, especially for single-page applications.

### 🔹 Core Concepts

* **Components**
  Reusable, independent building blocks of a UI. Each component represents a part of the webpage.

* **Virtual DOM**
  A lightweight copy of the real DOM. React updates only the changed parts, improving performance.

* **JSX (JavaScript XML)**
  A syntax extension that allows writing HTML-like code inside JavaScript.

  ```jsx
  const element = <h1>Hello, World!</h1>;
  ```

* **State**
  A built-in object used to manage dynamic data within a component.

  ```jsx
  const [count, setCount] = useState(0);
  ```

* **Props (Properties)**
  Used to pass data from one component to another.

  ```jsx
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```

---

## 🅰️ Angular JS

**Definition**
A full-featured frontend framework developed by Google for building dynamic web applications.

> Note: AngularJS (v1) and Angular (v2+) are different. Modern development uses Angular (v2+).

### 🔹 Core Concepts

* **Two-Way Data Binding**
  Synchronizes data between the model and the view automatically.

* **Directives**
  Special markers in HTML that extend its functionality.

  ```html
  <div *ngIf="isVisible">Content</div>
  ```

* **Dependency Injection (DI)**
  Automatically provides required dependencies to components and services.

* **Controllers / Components**
  Handle logic and manage data for specific parts of the UI.

* **SPA Support (Single Page Application)**
  Enables navigation without reloading the entire page.

---

## 🟢 Vue JS

**Definition**
A progressive JavaScript framework used to build user interfaces and single-page applications.

### 🔹 Core Concepts

* **Components**
  Modular and reusable parts of the UI, similar to React and Angular.

* **Reactivity**
  Automatically updates the UI when underlying data changes.

* **Directives**
  Special attributes in HTML that provide dynamic behavior.

  ```html
  <p v-if="seen">Now you see me</p>
  ```

* **Vuex (State Management)**
  Centralized store for managing shared application state.

* **Single File Components (SFC)**
  Combines HTML, JavaScript, and CSS in one file.

  ```vue
  <template>
    <h1>Hello Vue</h1>
  </template>

  <script>
  export default {
    name: "App"
  }
  </script>

  <style>
  h1 {
    color: blue;
  }
  </style>
  ```

---

## 📊 Comparison Overview

| Feature          | React JS      | Angular           | Vue JS    |
| ---------------- | ------------- | ----------------- | --------- |
| Type             | Library       | Full Framework    | Framework |
| Learning Curve   | Moderate      | Steep             | Easy      |
| Data Binding     | One-way       | Two-way           | Two-way   |
| State Management | Hooks / Redux | Built-in Services | Vuex      |
| Flexibility      | High          | Moderate          | High      |
| Performance      | High          | High              | High      |

---

## ✅ Conclusion

* **React** → Best for flexibility and component-driven architecture
* **Angular** → Best for large-scale enterprise applications
* **Vue** → Best for simplicity and quick development
