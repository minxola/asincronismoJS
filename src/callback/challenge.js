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

            //Estado de la petición (200 correctamente)
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