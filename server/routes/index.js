import express from 'express';
import AuthenticationHelpers from
  '../controllers/helpers/AuthenticationHelpers';
import GroupController from '../controllers/GroupController';
import MessageController from '../controllers/MessageController';
import UserController from '../controllers/UserController';

const apiEndPoints = express.Router();
const { injectMockUser } = AuthenticationHelpers;

apiEndPoints.get('/', (req, res) => {
  res.status(200).send({
    message: "Welcome Mr Dev, c'mon lets build shiii"
  });
});

apiEndPoints.post(
  '/user/signup',
  UserController.signUp
);

apiEndPoints.post(
  '/user/signin',
  UserController.signIn
);

apiEndPoints.post(
  '/group',
  injectMockUser,
  GroupController.newGroup
);

apiEndPoints.post(
  '/group/:groupId/user',
  injectMockUser,
  GroupController.addUserToGroup
);

apiEndPoints.post(
  '/group/:groupId/message',
  injectMockUser,
  MessageController.broadcastMessageToGroup
);

apiEndPoints.get(
  '/group/:groupId/messages',
  injectMockUser,
  MessageController.fetchGroupMessages
);

/**
 * Handles all backend endpoints.
 * @function index
 *
 * @param {object} app - Instance of an express App
 *
 * @return {void}
 */
const index = (app) => {
  app.use('/api', apiEndPoints);
  /* GET home page. */
  app.get('/*', (req, res) => {
    res.status(200).send({
      message: 'Welcome to Postit'
    });
  });
};

export default index;
