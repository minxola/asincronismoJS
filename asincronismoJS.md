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

### 7. Implementando Promesas

### 8. Resolver problema con Promesas

### 9. Conociendo Async/Await

### 10. Resolver problema con Async/Await

## Comprender las diferencias entre las estructuras asincrónicas

### 11. Callbacks vs Promesas vs Async/Await

### 12. Conclusiones

