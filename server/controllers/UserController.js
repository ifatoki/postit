import Validator from '../utils/Validator';
import UserHelpers from './helpers/UserHelpers';
import GenericHelpers from './helpers/GenericHelpers';
import AuthenticationHelpers from './helpers/AuthenticationHelpers';

const { stringifyValidationErrors, sendError } = GenericHelpers;

const UserController = {
  signUp(req, res) {
    const validator = Validator.validateSignUp(req.body);

    if (validator.isValid) {
      UserHelpers.confirmEmailUniqueness(req.body.email)
        .then(() => UserHelpers.confirmUsernameUniqueness(req.body.username))
        .then(() => AuthenticationHelpers.encryptPassword(req.body.password))
        .then(hashPassword => UserHelpers.createUser(req.body, hashPassword))
        .then(user => UserHelpers.sendUser(user, 201, res))
        .catch(error => GenericHelpers.resolveError(error, res));
    } else {
      sendError(stringifyValidationErrors(validator.errors), 400, res);
    }
  },

  signIn(req, res) {
    const validator = Validator.validateSignIn(req.body);

    if (validator.isValid) {
      UserHelpers.getUserByIdentifier(req.body.identifier)
        .then(user => AuthenticationHelpers
          .comparePassword(req.body.password, user))
        .then(user => UserHelpers.sendUser(user, 200, res))
        .catch(error => GenericHelpers.resolveError(error, res));
    } else {
      sendError(stringifyValidationErrors(validator.errors), 400, res);
    }
  }
};

export default UserController;
