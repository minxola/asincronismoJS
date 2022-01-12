//Trabajará sobre nodejs, se debe instalar dependencia xmlhttprequest

//Instalar en la terminal: npm install xmlhttprequest --save

//Instanciar xmlhttprequest
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//Establecer la API (debe terminar en "/")
let API = 'https://rickandmortyapi.com/api/character/'


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

            //Estado de la petición (200 correctamente)
            if(xhttp.status === 200){

                //callback (error, resultado)
                //El resultado es texto (string), por lo que se tiene que parsear a formato JSON
                callback(null, JSON.parse(xhttp.responseText));

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

//Luego de la ejecución se obtiene:
/*
Total: 826
First: Rick Sanchez
Dimension: Dimension C-137
*/

//Se debe agregar en package.json un nuevo script para ejecutar este archivo
//"callback:challenge": "node src/callback/challenge.js"
//para llamar desde consola ejecutar:
//npm run callback:challenge
