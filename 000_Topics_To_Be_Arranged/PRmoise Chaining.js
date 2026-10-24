function task1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 1 completed");
      resolve();
    }, 2000);
  });
}

function task2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Task 2 completed");
      resolve();
    }, 1000);
  });
}

function allTasksCompleted() {
  console.log("All tasks completed");
}

let promise3 = Promise.resolve();

let promise2 = Promise.resolve(promise3);

let promise1 = Promise.resolve(promise2);

promise1
  .then(task1)
  .then(task2)
  .then(allTasksCompleted)
  .catch((e) => console.log(e));