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

  /**
   * Send an error response for the server
   * @function sendError
   *
   * @param {string} message - Error message
   * @param {number} status - Server Error Code
   * @param {object} res - Server response object
   *
   * @return {void}
   */
  sendError: (message, status, res) => {
    res.status(status).send({
      message
    });
  },

  /**
   * Resolve errors generated on endpoints
   * @function resolveError
   *
   * @param {object} error - Error object
   * @param {any} res - Server response object
   *
   * @return {void}
   */
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
      case userErrors.USER_INVALID_PASSWORD:
        status = 401;
        message = 'incorrect password';
        break;
      case userErrors.USER_NOT_FOUND:
        status = 404;
        message = 'user not found';
        break;
      default:
        status = 500;
        message = 'oops, our server just went rogue. please try again';
        break;
    }
    GenericHelpers.sendError(message, status, res);
  },

  /**
   * Throws a new Error with the passed error message
   * @function throwError
   *
   * @param {any} errorMessage - Error message
   *
   * @return {Error} - Error object with error message
   */
  throwError: (errorMessage) => {
    throw new Error(errorMessage);
  },
};

export default GenericHelpers;
