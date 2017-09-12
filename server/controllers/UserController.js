import Validator from '../utils/Validator';
import UserHelpers from './helpers/UserHelpers';
import GenericHelpers from './helpers/GenericHelpers';

const { stringifyValidationErrors, sendError } = GenericHelpers;

const UserController = {
  signUp(req, res) {
    const validator = Validator.validateSignUp(req.body);

    if (validator.isValid) {
      UserHelpers.confirmEmailUniqueness(req.body.email)
        .then(() => UserHelpers.confirmUsernameUniqueness(req.body.username))
        .then(() => UserHelpers.createUser(req.body))
        .then(user => UserHelpers.sendUser(user, res))
        .catch(error => GenericHelpers.resolveError(error, res));
    } else {
      sendError(stringifyValidationErrors(validator.errors), 400, res);
    }
  }
};

export default UserController;
