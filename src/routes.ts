import * as Router from 'koa-router';
import controller = require('./controller');

const router = new Router();

// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);

// AUTHENT ROUTES
router.post('/auth/login', controller.authent.login);
router.get('/auth/me', controller.authent.getJwtPayload);

// WORKER ROUTES
router.get('/worker/hello', controller.worker.hello);
router.get('/worker/:workerId/task', controller.worker.getTask);
router.put('/worker/:workerId/task/:taskId', controller.worker.updateTask);

// CHARACTER ROUTES
// router.get('/public/characters', controller.character.getCharacters);
// router.post('/characters', controller.character.createCharacter);
// router.put('/characters/:id', controller.character.updateCharacter);
//
// // TEAM ROUTES
// router.get('/public/teams', controller.team.getTeams);
// router.post('/teams', controller.team.createTeam);
//
// // PLAYER CHARACTER ROUTES
// router.get('/players-characters', controller.playersCharacter.getCharacters);
// router.post('/players-characters', controller.playersCharacter.createCharacter);
// router.put('/players-characters/:id', controller.playersCharacter.updateCharacter);
//
// // PLAYER TEAM ROUTES
// router.get('/players-teams', controller.playersTeam.getTeams);
// router.post('/players-teams', controller.playersTeam.createTeam);
//
// // RAIDS ROUTES
// router.get('/raids', controller.raid.getRaids);
// router.post('/raids', controller.raid.createRaid);

export { router };
