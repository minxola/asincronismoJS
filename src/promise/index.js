/*
Para correr este archivo desde la consola se agrega a package.json:
>>> "promise": "node src/promise/index.js"
Para correr el código desde la consola usar:
>>> npm run promise
*/


//EJEMPLO 1 DE PROMESAS
const algoPasara = () => {
    return new Promise((resolve, reject) => {
        if (true) {
            resolve('Todo fue ok');
        } else {
            reject('Algo falló');
        }
    });
};

algoPasara()
    .then(response => console.log(response))
    .catch(err => console.log(err))
    .finally(i => console.log('finalizado'));

//Todo fue ok
//finalizado

//Con finally() podemos ejecutar un cógido adicional al finalizar la ejecución de la promesa

//EJEMPLO 2 DE PROMESAS
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


//EJECUTAR VARIAS PROMESAS
Promise.all([algoPasara(), promesa()])
    .then(response => {
        console.log('Array of results', response);
    })
    .catch(e => {
        console.log('final errors', e);
    });