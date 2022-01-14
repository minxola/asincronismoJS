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
            console.log('Total: ', data1.info.count);

            //Mostrar el nombre del personaje (data2)
            console.log('First: ', data2.name);

            //Mostrar la dimensión del personaje (data3)
            console.log('Dimension: ', data3.dimension);

        })
    })
})

//El resultado será
/*
Total: 826
First: Rick Sanchez
Dimension: Dimension C-137
*/


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

El objeto **`Promise`** (Promesa) es usado para computaciones asíncronas. Una promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca.

#### Sintaxis de una Promesa

```js
new Promise( /* ejecutor */ function(resolver, rechazar) { ... } );
```

#### Ejecutor

Una función con los argumentos `resolver` y `rechazar`. La función `ejecutor` es ejecutada inmediatamente por la implementación de la Promesa, pasándole las funciones `resolver` y `rechazar` (el ejecutor es llamado incluso antes de que el constructor de la `Promesa` devuelva el objeto creado). Las funciones `resolver` y `rechazar`, al ser llamadas, resuelven o rechazan la promesa, respectivamente. Normalmente el ejecutor inicia un trabajo asíncrono, y luego, una vez que es completado, llama a la función `resolver` para resolver la promesa o la rechaza si ha ocurrido un error.
Si un error es lanzado en la función ejecutor, la promesa es rechazada y el valor de retorno del ejecutor es rechazado.

Una `Promesa` se encuentra en uno de los siguientes estados:

- *pendiente (pending)*: estado inicial, no cumplida o rechazada.
- *cumplida (fulfilled)*: significa que la operación se completó satisfactoriamente.
- *rechazada (rejected)*: significa que la operación falló.

#### Estructura de las promesas

La estructura básica de una promesa es:

```js
const algoPasara = () => {
    //El método es con mayuscula Promise()
    return new Promise((resolve, reject) => {
        if(true){
            resolve('Everything is ok');
        } else {
            reject('Something was wrong');
        }
    });
};

//Para ejecutar la promesa
algoPasara()
	.then(resolve => console.log(resolve))
	.catch(error => console.log(error));

//Everything is ok
```

Los parámetros pasados a la función dentro de `Promise()` son genéricos, no son palabras claves, se puede pasar cualquier palabra. La primera esta asociado a una respuesta exitosa y la segunda a un error.

El **resolve** pasado a `then()` puede ser cualquiera, ya que `then()` obtendrá el valor devuelto por la promesa. `.then(x => console.log(x))` daría el mismo resultado.

Lo mismo sucede con `catch()`, pues este captura el reject o error, por lo que se le puede pasar cualquier otro valor: `.cathc(e => console.log(e))` daría el mismo resultado.

El siguiente código tendría el mismo comportamiento:

```js
const promise = () => {
    return new Promise((r, j) => {
        if(true){
            r('Excellent');
        } else {
            j('Error');
        }
    });
};
//ejecutar la promesa
promise()
	.then(j => console.log(j))
	.catch(e => console.log(e));

//Excellent
```

Otro ejemplo de promesa:

```js
const promesa = () => {
    return new Promise((response, reject) => {
        if(true){
            setTimeout(() => {
                response('Todo OK');
            }, 5000);
        } else {
            const error = new Error('Algo malo pasó');
            reject(error);
        }
    });
};

promesa()
    .then(respuesta => console.log(respuesta))
    .then(() => console.log('Mensaje cualquiera'))
    .catch(e => console.log(e));
//Todo OK
//Mensaje cualquiera

//Usando then(), podemos ejecutar mensajes o codigos adicionales durante la ejecución de la promesa
```

Es una buena práctica crear los errores con el método `Error()` ya que esto nos brindará mucho mas información en caso suceda un error al momento de ejecutar nuestro código.

#### Ejecutar varias promesas

```js
Promise.all([algoPasara(), promesa()])
    .then(response => {
        console.log('Array of results', response);
    })
    .catch(e => {
        console.log('Arrary of errors', err);
    });
```

Las respuestas resolve se mostrarán en un array al igual que los errores.

> :warning: **ATENCIÓN**:
>
> El asignar la promesa a una variable se puede hacer de dos maneras:
>
> ```js
> const promise = new Promise((resolve, reject) => {
>     //code here
> });
> ```
>
> De esta manera al ejecutarse el código la promesa se ejecutará también al ejecutarse el archivo sin esperar al llamado de la función.
>
> Entonces para que no se ejecute y generar una ejecución asíncrona la promesa se encapsula según los ejemplos mostrados, lo cual sería una buena práctica y para que sea asíncrona nuestra función:
>
> ```js
> //código de la promesa encapsulado, solo ejecutará al momento de llamar a la función
> const promise = () => {
>     return new Promise((response, reject) => {
>        //code here 
>     });
> }
> ```

### 8. Resolver problema con Promesas

Ahora usaremos las promesas para resolver el problema anterior el cual se hizo con callbacks:

```js
//Instanciar xmlhttprequest
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//Función que permite traer información desde la API
const fetchData = (url_api) => {
    //crear la promesa
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url_api, true);
        xhttp.onreadystatechange = (() => {
            if(xhttp.readyState === 4){
                (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error ', url_api));
            }
        });
        xhttp.send();
    });
}

//Ahora resolvemos el problema usando Promesas
const API = 'https://rickandmortyapi.com/api/character/';

fetchData(API)
    .then(data => {
        console.log(data.info.count);
        return fetchData(`${API}${data.results[0].id}`)
    })
    .then(data => {
        console.log(data.name);
        return fetchData(data.origin.url);
    })
    .then(data => {
        console.log(data.dimension);
    })
    .catch(error => console.log(error));

//El resultado de la ejecución al igual que con callbacks será
/*
826
Rick Sanchez
Dimension C-137
*/

```

### 9. Conociendo Async/Await

#### Función async

La declaración de función `async` define una función asíncrona, la cual devuelve un objeto  `async function`.

**Sintaxis de una función async**

```js
async function name(/*parametros*/){
    //statemens (enunciados)
}
```

Cuando se llama a una función `async`, esta devuelve un elemento [`Promise`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Promise). Cuando la función `async` devuelve un valor, `Promise` se resolverá con el valor devuelto. Si la función `async` genera una excepción o algún valor, `Promise` se rechazará con el valor generado.

Una función `async` puede contener una expresión [`await`](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await), la cual pausa la ejecución de la función asíncrona y espera la resolución de la `Promise` pasada y, a continuación, reanuda la ejecución de la función `async` y devuelve el valor resuelto

#### Operador await

El operador `await` es usado para esperar una `Promise`. Solo puede ser usado dentro de la función `async function`.

La expresión `await` provoca que la ejecución de una función `async` sea pausada hasta que una `Promise` sea terminada o rechazada, y regresa a la ejecución de la función `async` después del término. Al regreso de la ejecución, el valor de la expresión `await` es la regresada por una promesa terminada.

Si la `Promise` es rechazada, el valor de la expresión `await` tendrá el valor de rechazo.

Si el valor de la expresión seguida del operador `await` no es una promesa, será convertido a una `resolved Promise`.

> La finalidad de las funciones `async`/`await` es simplificar el comportamiento del uso síncrono de promesas y realizar algún comportamiento específico en un grupo de `Promises`. Del mismo modo que las `Promises` son semejantes a las devoluciones de llamadas estructuradas, `async`/`await` se asemejan a una combinación de generadores y promesas.

#### formas de declarar funciones async

```js
async function myAsyncFunction(){
    //code here
}

//otra forma
const myAsyncFunction = async function (){
    //code here
};

//o también usando arrow functions
const myAsyncFunction = async () => {
    //code here
}
```

**Ejemplos con async function**:

```js
//Generando una promesa
const doSomething = () => {
    return new Promise((resolve, reject) => {
        (true)
            ? setTimeout(() => resolve('Do Something'), 5000)
            : reject(new Error('Something was wrong'))
    });
};

//1. sin captura de errores
const doAsync = async () => {
    //await pausa hasta que se resuelva la promesa
    const waiting = await doSomething();
    console.log(waiting, ' 1');
};

console.log('Before 1');
doAsync();
console.log('After 1');

//2. Capturando errores con try y catch
const bestFunction = async () => {
    try {
        const waiting = await doSomething();
        console.log(waiting, ' 2');
    } catch (error) {
        console.log(error);
    }
}

console.log('Before 2');
bestFunction();
console.log('After 2');
```

### 10. Resolver problema con Async/Await

Para resolver el problema planteado se hace uso del siguiente código:

```js
//Instanciar xmlhttprequest
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//Función que permite traer información desde la API
const fetchData = (url_api) => {
    //crear la promesa
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', url_api, true);
        xhttp.onreadystatechange = (() => {
            if(xhttp.readyState === 4){
                (xhttp.status === 200)
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error ', url_api));
            }
        });
        xhttp.send();
    });
}

//Haciendo uso de async/await
const API = 'https://rickandmortyapi.com/api/character/';

const getData = async (url_api) => {
    try {
        const data = await fetchData(url_api);
        const caracter = await fetchData(`${url_api}${data.results[0].id}`);
        const origin = await fetchData(caracter.origin.url);

        console.log('Cantidad: ', data.info.count);
        console.log('Primer Personaje: ', caracter.name);
        console.log('Dimension: ', origin.dimension);
    } catch (error) {
        console.error(error);
    }
}

console.info('Before');
getData(API);
console.info('After');

//El resultado en la consola será
/*
Before
After
Cantidad:  826
Primer Personaje:  Rick Sanchez
Dimension:  Dimension C-137
*/
```

## Comprender las diferencias entre las estructuras asincrónicas

### 11. Callbacks vs Promesas vs Async/Await

#### Callbacks

- **Ventajas:**
  - Simpleza: sintaxis simple y fácil de entender
  - Compatibilidad: Su código funciona en todos los navegadores
- **Desventajas:**
  - Estructura robusta, poco intuitivo cuando hay demasiadas anidaciones (callback hell)
  - No tiene un camino claro para el manejo de errores

#### Promesas

- **Ventajas:**
  - Flujo fluido: maneja flujos complejos, anidar llamadas y su sintaxis es clara
  - Manejo de errores: Nos brinda la posibilidad de manejar los errores
- **Desventajas:**
  - Polyfill: No son compatibles con todos los navegadores
  - Para explorer 11, se necesita transpilar el código para que funcione correctamente

#### Async/Await

- **Ventajas:**
  - Sintaxis: Simple y clara de leer. Su funcionamiento es sencillo de entender.
  - Try/Catch: Nos permiten tener una sintaxis clara para el manejo de errores.
- **Desventajas:**
  - Polyfill: No tienen toda la compatibilidad con navegadores desfasados, es necesario transpilar el código antes de utilizarlos en estos navegadores.

### 12. Conclusiones

Ahora que entiendes las ventajas y desventajas de los callbacks, promesas y async/await puedes tomar la decisión de cuál implementar en tus proyectos, teniendo en cuenta su uso, así como las implementaciones que estés realizando. En lo particular he dejado atrás a los Callbacks para pasar mi lógica que maneje asincronismo a las promesas y en casos particulares utilizar Async/Await.

Cuéntame, ¿cuáles han sido tus observaciones y cómo implementarías mejor estos recursos que dispones para manejar el asincronismo en JavaScript?
