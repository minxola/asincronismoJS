function sum(n1, n2){
    return n1 + n2;
}

function calc(n1, n2, callback){
    return callback(n1, n2);
}

console.log(calc(5, 2, sum));
//Para ejecutar el codigo desde consola, se agrega el script
//a package.json del proyecto
//Se agrega un nuevo script "callback"
// "callback": "node src/callback/index.js"
// Para ejecutar desde consola usar: npm run callback


function date(callback){
    console.log('date', new Date);
    setTimeout(() => {
        let date = new Date;
        callback(date);

        setTimeout(() => {
            let a = new Date;
            callback(a);
        }, 5000);

    }, 3000);

    setTimeout(() => {
        let date2 = new Date;
        callback(date2);
    }, 5000);
}

function printDate(dateNow){
    console.log('Print date', dateNow);
}

date(printDate);

//Cada setTimeout hace un llamado a la función callback que
//sería la función printDate, la cual se ejecutará según
//el tiempo pasado a cada setTimeout