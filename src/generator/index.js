const API = "https://api.escuelajs.co/api/v1";

async function fetchData(urlApi) {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}

async function* processData(urlApi) {
  try {
    const products = await fetchData(`${urlApi}/products/`);
    for (let product in products) {
      yield await fetchData(`${urlApi}/products/${product.id}`);
    }
  } catch (error) {
    yield await error;
  }
}

const generator = processData(API);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);
