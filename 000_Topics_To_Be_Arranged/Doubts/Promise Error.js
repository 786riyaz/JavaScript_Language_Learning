var p = new Promise((resolve, reject) => {
  return Promise.reject(Error("The Fails!"));
});

p.catch((error) => console.log(error.message));

p.catch((error) => console.log(error.message));
