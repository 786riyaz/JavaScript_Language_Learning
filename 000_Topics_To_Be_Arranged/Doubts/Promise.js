// Please explain the below code how the output is "Error 1 Success 3" and also explain the concept of promise chaining in JavaScript. how the second then is executed after catch.
function performTask() {
  return new Promise((resolve, reject) => {
    reject();
  });
}

let taskPromise = performTask();

taskPromise
  .then(() => {
    console.log("Success 1");
  })
  .then(() => {
    console.log("Success 2");
  })
  .catch(() => {
    console.log("Error 1");
  })
  .then(() => {
    console.log("Success 3");
  });
