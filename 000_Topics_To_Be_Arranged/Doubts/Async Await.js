// Explain me this code, why the B and C is printed after E, according to my understanding of async, await, the code should wait for the promise to resolve before moving to the next line, but in this case, it seems like the code is not waiting for the promise to resolve before moving to the next line. Can you explain me this behavior?

async function foo() {
  console.log("A");

  await Promise.resolve();

  console.log("B");

  await new Promise((resolve) => setTimeout(resolve, 0));

  console.log("C");
}

console.log("D");

foo();

console.log("E");
