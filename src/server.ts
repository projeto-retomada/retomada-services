import express from 'express';

const appRetomada = express();

appRetomada.get('/', (request, response) => {
    return response.send('200: Ok')
});

appRetomada.listen(3333);        