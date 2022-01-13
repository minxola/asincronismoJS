const doSomething = () => {
    return new Promise((resolve, reject) => {
        (true)
            ? setTimeout(() => resolve('Do Something'), 5000)
            : reject(new Error('Something was wrong'))
    });
};

//1. sin captura de errores
const doAsync = async () => {
    const waiting = await doSomething();
    console.log(waiting, ' 1');
};

console.log('Before 1');
doAsync();
console.log('After 1');

//2. Capturando errores
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

/*
Para ejecutar este archivo con npm agrear a package.json:
>>> "async": "node src/async/index.js"
y al momento de ejecutar en la consola usar el comando:
>>> npm run async
*/