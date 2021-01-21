import { UsergroupController } from './controllers/UsergroupController';
import { PlaceInput } from './models/PlaceInput';
import express from 'express';
import LoginController from './controllers/LoginController';
import { authenticateMiddleware, validationMiddleware } from './error/ValidationMiddleware';

import UserController from './controllers/UserController';
import { UsersRepo } from './repositories/users/UsersRepo';
import UserInput from './models/UserInput';
import { UserMapper } from './mappers/UserMapper';

import OrganizationController from './controllers/OrganizationController';
import { OrganizationRepo } from './repositories/organization/OrganizationRepo';
import { OrganizationMapper } from './mappers/OrganizationMapper';
import OrganizationInput from './models/OrganizationInput';
import { PlacesController } from './controllers/PlacesController';
import { PlacesRepo } from './repositories/places/PlacesRepo';

import QuestionnaireController from './controllers/QuestionnaireController';
import { QuestionnaireRepo } from './repositories/questionnaire/QuestionnaireRepo';
import { QuestionnaireMapper } from './mappers/QuestionnaireMapper';
import QuestionnaireInput from './models/QuestionnaireInput';

import { UsergroupRepo } from './repositories/usergroup/UsergroupRepo';
import UsergroupInput from './models/UsergroupInput';
import { UserUsergroupRelationRepo } from './repositories/userUsergroupRelation/UserUsergroupRelationRepo';
import DashController from './controllers/DashController';


import { ActivityController } from './controllers/ActivityController';
import { ActivityRepo } from './repositories/activity/ActivityRepo';
import { ActivityMapper } from './mappers/ActivityMapper';
import ActivityInput from './models/ActivityInput';

import { ActivityInteractionController } from './controllers/ActivityInteractionController';
import { ActivityInteractionRepo } from './repositories/activityInteraction/ActivityInteractionRepo';
import { ActivityInteractionMapper } from './mappers/ActivityInteractionMapper';
import ActivityInteractionInput from './models/ActivityInteractionInput';

const routes = express.Router();

const userController = new UserController(new UsersRepo(new UserUsergroupRelationRepo), new UserMapper());
const loginController = new LoginController(new UsersRepo(new UserUsergroupRelationRepo), new UserMapper(), new OrganizationRepo());
const organizationController = new OrganizationController(new OrganizationRepo(), new OrganizationMapper());
const placesController = new PlacesController(new PlacesRepo(new OrganizationRepo()));
const questionnaireController = new QuestionnaireController(new QuestionnaireRepo(), new QuestionnaireMapper());
const usergroupController = new UsergroupController(new UsergroupRepo(new OrganizationRepo()));
const dashController = new DashController();
const activityController = new ActivityController(new ActivityRepo(), new ActivityMapper());
const activityInteractionController = new ActivityInteractionController(new ActivityInteractionRepo(), new ActivityInteractionMapper());



routes.get('/', (request, response) => {
    return response.send('200: OK');
});

routes.get('/users', userController.getAll);
routes.get('/users/:id', userController.getAll);
routes.post('/users', validationMiddleware(UserInput), userController.create);
routes.put('/users/:id', validationMiddleware(UserInput), userController.update);
routes.delete('/users/:id', userController.delete);
routes.get('/users/:username/activities', userController.getActivities);
routes.get('/users/:username/last-places', userController.getUserLastPlaces);

routes.get('/login', loginController.login);

routes.get('/organizations', organizationController.getAll);
routes.get('/organizations/:id', organizationController.getAll);
routes.post('/organizations', validationMiddleware(OrganizationInput), organizationController.create);
routes.put('/organizations/:id', validationMiddleware(OrganizationInput), organizationController.update);

// Places routes
routes.get('/organizations/:idOrganization/places', placesController.get);
routes.get('/organizations/:idOrganization/places/:idPlace', placesController.get);
routes.post('/organizations/:idOrganization/places', validationMiddleware(PlaceInput), placesController.create);
routes.put('/organizations/:idOrganization/places/:idPlace', validationMiddleware(PlaceInput), placesController.update);
routes.delete('/organizations/:idOrganization/places/:idPlace', placesController.delete);

// Questionnaire routes
routes.get('/questionnaire/', questionnaireController.getByParameters);
routes.get('/questionnaire/:role/:idOrganization', authenticateMiddleware, questionnaireController.getAllQuestsByRole);
routes.post('/questionnaire', authenticateMiddleware, validationMiddleware(QuestionnaireInput), questionnaireController.create);
routes.put('/questionnaire/:id', authenticateMiddleware, validationMiddleware(QuestionnaireInput), questionnaireController.update);
routes.delete('/questionnaire/:id', authenticateMiddleware, questionnaireController.delete);

// Usergroup routes
routes.get('/organizations/:idOrganization/usergroups', usergroupController.get);
routes.get('/organizations/:idOrganization/usergroups/:idUsergroup', usergroupController.get);
routes.post('/organizations/:idOrganization/usergroups', validationMiddleware(UsergroupInput), usergroupController.create);
routes.put('/organizations/:idOrganization/usergroups/:idUsergroup', validationMiddleware(UsergroupInput), usergroupController.update);

// Dash Routes
routes.get('/dash/positive-students', dashController.getStudentPositiveCount);
routes.get('/dash/positive-teachers', dashController.getTeacherPositiveCount);
routes.get('/dash/positive-admins', dashController.getAdminPositiveCount);
routes.get('/dash/covid-timeseries', dashController.getTimeSeriesCovid);
routes.get('/dash/last-students-cases', dashController.getLastStudentsCases);
routes.get('/dash/last-teachers-cases', dashController.getLastTeachersCases);
routes.get('/dash/cases-by-usergroup', dashController.getCasesByUsergroup);

// Activity routes
routes.get('/activity/', activityController.get);
routes.post('/activity', authenticateMiddleware, validationMiddleware(ActivityInput), activityController.create);
routes.put('/activity/:id', authenticateMiddleware, validationMiddleware(ActivityInput), activityController.update);
routes.delete('/activity/:id', authenticateMiddleware, activityController.delete);

// Activity Interaction
routes.get('/interaction/:id', activityInteractionController.get);
routes.post('/interaction', authenticateMiddleware, validationMiddleware(ActivityInteractionInput), activityInteractionController.create);
routes.put('/interaction/:id', authenticateMiddleware, validationMiddleware(ActivityInteractionInput), activityInteractionController.update);
routes.delete('/interaction/:id', authenticateMiddleware, activityInteractionController.delete);

export default routes;