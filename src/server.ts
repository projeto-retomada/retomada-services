import express from 'express';
import routes from './routes';
import cors from 'cors';
import errorMiddleware from './error/ErrorMiddleware';

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
 }

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(routes);
app.use(errorMiddleware)
app.listen(3333);        