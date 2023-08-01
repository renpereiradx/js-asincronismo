const API = "https://api.escuelajs.co/api/v1";

async function fetchData(urlApi) {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}

async function* processData(urlApi) {
  try {
    const products = await fetchData(`${urlApi}/products/`);
    for (let product of products) {
      const productData = await fetchData(`${urlApi}/products/${product.id}`);
      yield productData.title;
    }
  } catch (error) {
    yield error;
  }
}

const generator = processData(API);
console.log(await generator.next());
console.log(await generator.next());
console.log(await generator.next());
console.log(await generator.next());
generator.next().then((response) => console.log(response.value));
generator.next().then((response) => console.log(response.value));
generator.next().then((response) => console.log(response.value));
generator.next().then((response) => console.log(response.value));