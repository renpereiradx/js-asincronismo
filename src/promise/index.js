const cows = 10;

const countCows = new Promise((resolve, reject) => {
  if (cows > 10) {
    resolve(`We have ${cows} cows in the farm`);
  } else {
    reject(`There is no cows in the farm`);
  }
});

countCows
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    console.log("Finally");
  });

function delay(time, message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${message}`);
    }, time);
  });
}

delay(2000, "Hello after 5s").then((result) => {
  console.log(result);
});
