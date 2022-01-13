const fetchData = require('../utils/fetchData');
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