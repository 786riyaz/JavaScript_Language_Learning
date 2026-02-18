let x = 10;
(function() {
  console.log(x);           // ReferenceError: Cannot access 'x' before initialization
    let x = 20;
})();


// Ways to Fix the Error:
// ✔ Option 1: Remove inner let
let x = 10;

(function() {
  console.log(x); // 10
})();


// ✔ Option 2: Move console.log below declaration
let x = 10;

(function() {
  let x = 20;
  console.log(x); // 20
})();

// ✔ Option 3: Use different variable name
let x = 10;

(function() {
  let y = 20;
  console.log(x); // 10
})();
