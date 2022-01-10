# Curso de Asincronismo con JavaScript

Profesor: Oscar Barajas Tavares

##  Apropiar los conceptos de asincronismo

### 1. Qué aprenderás sobre asincronismo en JavaScript

- Callbacks
- Promesas
- Async/Await
- Llamado de una API pública

### 2. Introducción al asincronismo

El asincronismo es básicamente una manera de aprovechar el tiempo y los recursos de nuestra aplicación, ejecutando tareas y procesos mientras otros son resueltos en background (como la llegada de la información de una API), para posteriormente continuar con las tareas que requerían esa información que no tenías de manera instantánea.

Un ejemplo fácil es comparando asincronismo vs sincronismo: En lenguajes síncronos al hacer un temporizador para ejecutar una función, todo el código se pausa hasta terminar el tiempo, mientras que en Javascript u otros lenguajes asíncronos, podemos estar aprovechando ese tiempo para ejecutar otros procesos hasta que ese tiempo finaliza.

> JavaScript es un lenguaje de programación asíncrono y no bloqueante con un manejador de eventos conocido como Event Loop implementado en un único hilo (thread) para sus interfaces de entrada y salida.

### 3. Presentación del reto: consumir APIs

Trabajaremos con la API de Rick and Morty, una serie animada.

- Cantidad de personajes que tiene la serie
- El nombre del primer personaje
- Dimensión a la cual pertenece el personaje

**Recursos**:

- API de Rick and Morty: [https://rickandmortyapi.com/](https://rickandmortyapi.com/)
- Curso de Postman (API de cursos Platzi): [https://platzi.com/clases/postman/](https://platzi.com/clases/postman/)
- Lista de APIs públicas: [https://github.com/public-apis/public-apis](https://github.com/public-apis/public-apis)

## Desarrollar soluciones utilizando asincronismo

### 4. Definición estructura Callback

Una **función de callback** es una función que se pasa a otra función como un argumento, que luego se invoca dentro de la función externa para completar algún tipo de rutina o acción.

Es una convención llamarla callback (*Llamar de vuelta*), no es una palabra reservada.

Una función de callback  puede ser:

- Síncrona: Se ejecuta inmediatamente

  ```js
  //callback síncrono
  function sum(n1, n2){
      return n1 + n2;
  }
  
  function calc(n1, n2, callback){
      return callback(n1, n2);
  }
  
  console.log(calc(5, 2, sum));
  ```

  

- Asíncrona: Se ejecuta después de haber completado una operación

  ```js
  function date(callback){
      console.log(new Date);
      setTimeout(() => {
          let date = new Date;
          callback(date);
      }, 3000);
  }
  
  function printDate(dateNow){
      console.log(dateNow);
  }
  
  date(printDate);
  ```



### 5. Peticiones a APIs usando Callbacks

Primero instalar paquete `xmlhttprequest` des la consola correr el código:

`npm install xmlhttprequest --save`

**Herramientas**:

API: [https://rickandmortyapi.com/api/character/](https://rickandmortyapi.com/api/character/)

POSTMAN: [https://www.postman.com/](https://www.postman.com/), para ver APIs

JSON Viewer Extention for chrome: [Extensión](https://chrome.google.com/webstore/detail/json-viewer/gbmdgpbipfallnflgajpaliibnhdgobh)



**Estados de readyState (XMLHttpRequest):**

| Valor | Estado        | Descripción                                                  |
| ----- | ------------- | ------------------------------------------------------------ |
| 0     | UNINITIALIZED | Todavía no se llamó a `open()`                               |
| 1     | LOADING       | Todavía no se llamó a `send()`                               |
| 2     | LOADED        | `send()` ya fue invocado, y los encabezados y el estado están disponibles |
| 3     | INTERACTIVE   | Descargando; `responseText` contiene información parcial     |
| 4     | COMPLETED     | La operación está terminada                                  |

**XMLHttpRequest status y statusText:**

| HTTP Response Status    | Code      |
| ----------------------- | --------- |
| Informational responses | 100 - 199 |
| Successful responses    | 200 - 299 |
| Redirection messages    | 300 - 399 |
| Client error responses  | 400 - 499 |
| Server error responses  | 500 - 599 |

Mas comunes:

- 200: OK
- 404: Not found
- 500: Internal Server Error

**Métodos comunes de petición HTTP**:

- GET: *solicita una representación de un recurso específico. Las peticiones que usan GET solo deben recuperar datos*
- POST: *enviar una entidad a un recurso en específico, generando cambio de estado o efectos secundarios en el servideo*
- PUT: *reemplaza la representación actual del recurso con carga útil de la petición*
- DELETE: *borra un recurso específico*

```js
//Trabajará sobre nodejs, se debe instalar dependencia xmlhttprequest
//Instalar en la terminal: npm install xmlhttprequest --save

//Instanciar xmlhttprequest
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//Función que permite traer información desde la API
function fetchData(url_api, callback){

    //Generar la referencia al objeto que se necesita
    let xhttp = new XMLHttpRequest();

    //Hacer llamado a la URL (url_api), true es para que se maneje asincronamente
    xhttp.open('GET', url_api, true);

    //Escuchar la petición
    xhttp.onreadystatechange = function(event){

        //Validación del readyState (4 completado)
        if(xhttp.readyState === 4){

            //Validación Estado de la petición (200 correctamente)
            if(xhttp.status === 200){

                //callback (error, resultado)
                //El resultado es texto (string), por lo que se tiene que parsear a formato JSON
                callback(null, JSON.parse(xhttp.responseText);

            } else{

                //Buena practica llamar else con un error
                const error = new Error('Error ' + url_api + 'Status: ' + xhttp.status);

                //callback (error, resultado)
                //error si se envia, no hay resultado:null
                return callback(error, null);
            }
        }
    }
    //Enviar la solicitud
    xhttp.send();
}
```

### 6. Múltiples peticiones a un API con Callbacks

Luego de haber creado la función principal que recibe a la función callback, ahora se debe hacer las peticiones a la API usando la función `fetchData` que hemos creado y pasándole una función callback.

```js
//Multiples peticiones a un API con callbacks
//Primero se trabajo con la API (url principal)
fetchData(API, function(erro1, data1){

    //Validación en caso haya error
    if  (erro1) return console.log(error1);

    //Nuevamente se llama el callback para obtener data del primer personaje
    //como url se pasa la del perosnaje [0] (primer personaje)
    fetchData(API + data1.results[0].id, function(error2, data2){

        //Validación del error
        if (error2) return console.log(error2);

        //Llamar al callback para obtener el origen del primer personaje
        fetchData(data2.origin.url, function(error3, data3){

            //validación del error
            if (error3) return console.log(erro3);

            //Mostrar la cantidad de elementos (data1)
            console.log('Total:', data1.info.count);

            //Mostrar el nombre del personaje (data2)
            console.log('First:', data2.name);

            //Mostrar la dimensión del personaje (data3)
            console.log('Dimension:', data3.dimension);

        })
    })
})

//Se debe agregar en package.json un nuevo script para ejecutar este archivo
//"callback:challenge": "node src/callback/challenge.js"
//para llamar desde consola ejecutar:
//npm run callback:challenge
```

Se hace tres peticiones ya que son tres datos que se quieren obtener:

1. La cantidad total de personajes, se obtiene de la primer petición (data1)
2. El nombre del primer personaje, obtenido de la segunda petición (data2)
3. La dimensión del primer personaje, se obtiene de la tercera petición (data3)

### 7. Implementando Promesas

### 8. Resolver problema con Promesas

### 9. Conociendo Async/Await

### 10. Resolver problema con Async/Await

## Comprender las diferencias entre las estructuras asincrónicas

### 11. Callbacks vs Promesas vs Async/Await

### 12. Conclusiones

