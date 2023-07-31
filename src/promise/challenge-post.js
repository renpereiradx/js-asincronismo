const API = "https://api.escuelajs.co/api/v1";

function postData(urlApi, data) {
  const promise = fetch(urlApi, {
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return promise;
}

const data = {
  title: "Xbox XS Controller",
  price: 65,
  description: "A controller so you can play on the Xbox Console",
  categoryId: 2,
  images: ["https://placeimg.com/640/480/any"],
};

postData(`${API}/products`, data)
  .then((response) => response.json())
  .then((data) => console.log(data));