const fnAsync = () => {
  return new Promise((resolve, reject) => {
    true
      ? setTimeout(() => resolve("Async Promise!!"), 2000)
      : reject(new Error("Error"));
  });
};

const anotherFunction = async () => {
    console.log("Before Async/Await");
    const something = await fnAsync();
    console.log(something);
    console.log("After Async/Await");
}

console.log("Before");
anotherFunction();
console.log("After");
