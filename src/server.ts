import express from 'express';
import routes from './routes';
import cors from 'cors';
import errorMiddleware from './error/ErrorMiddleware';
import { QuestionnaireRepo } from './repositories/questionnaire/QuestionnaireRepo';
import { QuestionnaireMapper } from './mappers/QuestionnaireMapper';
import QuestionnaireRoutine from './services/QuestionnaireRoutine';
const cron = require('node-cron');
const questRoutine = new QuestionnaireRoutine(new QuestionnaireRepo, new QuestionnaireMapper) 

// cron.schedule('0 9 * * 6', async() => {
//     console.log(" =========== Questionnaire Routine ============ ")
//     await questRoutine.executeRoutine()    
//     console.log(" =========== End Routine ============ ")

// });

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