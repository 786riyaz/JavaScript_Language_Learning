// Promise Constructor run immediatly when it is created
console.log("start");

const promise1 = new Promise((resolve, reject) => {
  console.log(1);
});

console.log("end");
