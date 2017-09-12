import express from 'express';

const apiEndPoints = express.Router();

apiEndPoints.get('/', (req, res) => {
  res.status(200).send({
    message: "Welcome Mr Dev, c'mon lets build shiii"
  });
});

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
