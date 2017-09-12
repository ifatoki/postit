import lodash from 'lodash';
import Errors from './Errors';

const { userErrors } = Errors;
const GenericHelpers = {
  /**
   * Create a string representation of a validation error object.
   * @function stringifyValidationErrors
   *
   * @param {object} errorsObject - validation error object
   *
   * @return {string} - A string containing validation errors
   */
  stringifyValidationErrors: errorsObject => (
    lodash.reduce(
      errorsObject,
      (error, cummulator) => `${cummulator}\n${error}`,
      ''
    )),

  sendError: (message, status, res) => {
    res.status(status).send({
      message
    });
  },

  resolveError: (error, res) => {
    let message;
    let status;
    switch (parseInt(error.message, 10)) {
      case userErrors.USER_INVALID_ID:
        message = 'invalid user id';
        status = 400;
        break;
      case userErrors.USER_DUPLICATE_EMAIL:
        message = 'user with this email already exists';
        status = 400;
        break;
      case userErrors.USER_DUPLICATE_USERNAME:
        status = 400;
        message = 'user with this username already exists';
        break;
      default:
        status = 500;
        message = 'oops, our server just went rogue. please try again';
        break;
    }
    GenericHelpers.sendError(message, status, res);
  },

  throwError: (errorMessage) => {
    throw new Error(errorMessage);
  },
};

export default GenericHelpers;
