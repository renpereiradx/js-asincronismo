/*
  Primero debemos declarar e importar el paquete de XMLHttpRequest, que nos permite utilizar objetos (XHR) para interactuar con servidores (en este caso la API de Platzi) para esto hacemos:
*/
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
/*
  Lo que hace aquí “require()” es importar el módulo del id que le pasemos, además puede importar JSON y archivos locales.
  Pero necesitamos trabajar con XMLHttpRequest para manipular la API.
*/
const API = "https://api.escuelajs.co/api/v1";
const DONE = 4;
const OK = 200;

function fetchData(urlApi, callback) {
  /*
    El parámetro ‘urlApi’ hace referencia a cualquier API con la cuál estemos trabajando, en este caso la FakeStore de Platzi.
    El segundo parámetro ‘callback’ es donde posteriormente vamos a pasar una función como argumento para poder controlar el flujo de información de la API.
    Necesitamos alguna manera de poder manipular las solicitudes que haremos para consultar los datos, para ello vamos a crear un espacio en memoria (una variable) en donde guardar el objeto (XHR) que importamos y gracias a los métodos ya construídos nos será mil veces más fácil desarrollar nuestra funcíon.
  */ 
  let xhttp = new XMLHttpRequest();
  /*
    Muy bien, ya podemos utilizar nuestra variable ‘xhttp’ (en conjunto al callback) como un objeto para acceder y manipular la API.
    Primero debemos abrir una solicitud (un request) esto lo hacemos con el método ‘.open()’
  */
  xhttp.open("GET", urlApi, true);
  /*
    Ahora bien el primer parámetro es el tipo de solicitud que vamos a realizar, pudo haber sido “POST”, “PUT”, “DELETE”.
    Pero vamos a utilizar “GET” 😎
    El segundo parámetro es la url de la API a la cuál le vamos a realizar el request.
    Último y tercer parámetro recibe un booleano para indicarle si vamos a utilizar asíncronismo o no, tal simple como TRUE o FALSE según el caso.
  */
 /*
  Vamos a hacer una función anónima para verificar que el request de los datos ha salido con éxito y en caso de un tener error hacer registro de éste.
  Para ello nos vamos a apoyar de la propiedad de ‘.onreadystatechange’ ésta llamará a la función cada que el readyState cambie (readyState retorna el número del estado en dónde se encuentra el request)
 */
  xhttp.onreadystatechange = (event) => {
    if (xhttp.readyState === DONE) {
      /*
        Una vez completado con éxito necesitamos saber que tipo de respuesta nos entregó el servidor, así que volvemos a verificar con un ’ if ’ la propiedad ‘.status’ según el tipo de respuestas:
      */
      if (xhttp.status === OK) {
        /*
          ¡Ya comprobamos que tanto el request como el response hayan sido exitosos! Ahora podemos invocar nuestro callback (función por definir más tarde para manipular los datos)
        */
        callback(null, JSON.parse(xhttp.responseText));
        /*
          El primero vamos a utilizarlo en caso de que se presente un error, pero como ya hemos verificado eso podemos simplemente dejarlo como un ‘null’.En el segundo usamos la función ‘JSON.parse()’ para convertir en datos que podamos controlar el texto que nos retorna la propiedad ‘.responseText’ después de hacer el request.
        */
      }
    } else {
      /*
         en caso de haber un error registrarlo y enviarlo al callback (donde antes habiamos puesto ‘null’) y ahora pasar el null en la parte de los datos, ya que nunca pudo consultarlos.
      */
      const error = new Error("Error", urlApi);
      return callback(error, null);
    }
  };
  /*
    Ya solo resta utilizar el método ‘.send()’ después de procesar los datos para enviar el request al server (API)
  */
  xhttp.send();
}

/*
  //se invoca el metodo fetchData() pasandole como argumentos la varible API concatenada con la cadena 'products' para acceder a la URL de la API deseada, y una función anónima que recibe 2 parámetros (un objeto de error y un arreglo que almacena todos los objetos traidos por la API).
*/
fetchData(`${API}/products`, (error1, data1) => {
  //se valida si existe un error, en caso de que exista se detiene el proceso y se imprime el error.
  if (error1) return console.error(error1);
  /*
    se invoca nuevamente la función fetchData con el fin de acceder a un objeto puntual del arreglo data1, se envia como parámetros la url de la API apuntando al atributo del primer objeto de arreglo data1 y nuevamente una función anónima.
  */
  fetchData(`${API}/products/${data1[0].id}`, (error2, data2) => {
    //si en este punto se identifica un error se imprime en consola y se detiene el proceso
    if (error2) return console.error(error2);
    /*
       Se invoca nuevamente la funcion fetchData con el fin de acceder a la categoria, se envían como parametros la url de la API con la concatenación de 'Categories' y el atributo Id de categoria del objeto data2 de la función anterior
        //en este caso puntual se hace uso de Optional Caining el cual hace una evalucación de las propiedades de un objeto y en vez de arrojar un error devuelve undefined en caso que la propiedad no exista o sea null.
        //igual que las anteriores e envia una funcion anonima con 2 argumentos, un objeto Error y un objeto de datos
    */
    fetchData(`${API}/categories/${data2?.category?.id}`, (error3, data3) => {
      //se valida si existe error, en caso de que exista se detiene el proceso y se imprime el error
      if (error3) return console.error(error3);
       //Se imprime el objeto en la posición 1 del arreglo de los objetos obtenidos en el metodo invocado inicialmente
      console.log(data1[0]);
       //Se imprime el titulo del objeto que se consultó en la seguna invocación de la función
      console.log(data2.title);
        //Se imprime el nombre de la categoria a la que pertenece el objeto que se consultó en la seguna invocación del método.
      console.log(data3.name);
    });
  });
});
