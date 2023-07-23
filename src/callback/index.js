function sum(num1, num2) {
  return num1 + num2;
}
function res(num1, num2) {
  return num1 - num2;
}
// Para esto sirven los callback ;)
function calc(num1, num2, sumNumbers) {
  return sumNumbers(num1, num2);
}
console.log(calc(2, 2, sum));
console.log(calc(4, 2, res));

setTimeout(function () {
  console.log("Hola Mundo");
}, 3000);

function gretting(name) {
  console.log(`Hola ${name}`);
}

setTimeout(gretting, 5000, `Javascript`);
