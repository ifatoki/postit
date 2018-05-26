import lodash from 'lodash';
import Errors from './Errors';

const { userErrors, groupErrors, messageErrors } = Errors;
const GenericHelpers = {
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
      case groupErrors.GROUP_DUPLICATE_NAME:
        message = 'group with this name already exists';
        status = 409;
        break;
      case groupErrors.GROUP_NOT_FOUND:
        message = 'group not found';
        status = 404;
        break;
      case groupErrors.GROUP_NOT_MEMBER:
        message = 'user not member of requested group';
        status = 401;
        break;
      case messageErrors.MESSAGE_DUPLICATE_TITLE:
        message = 'message with this title already exists';
        status = 409;
        break;
      case userErrors.USER_DUPLICATE_EMAIL:
        message = 'user with this email already exists';
        status = 409;
        break;
      case userErrors.USER_DUPLICATE_USERNAME:
        status = 409;
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
    GenericHelpers.sendMessage(message, status, res);
  },

  /**
   * Send a message response for the server
   * @function sendMessage
   *
   * @param {string} message - Response message
   * @param {number} status - Server response code
   * @param {object} res - Server response object
   *
   * @return {void}
   */
  sendMessage: (message, status, res) => {
    res.status(status).send({
      message
    });
  },

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
   * Throws a new Error with the passed error message
   * @function throwError
   *
   * @param {any} errorMessage - Error message
   *
   * @return {void}
   *
   * @throws {Error} - Error object with error message
   */
  throwError: (errorMessage) => {
    throw new Error(errorMessage);
  },
};

export default GenericHelpers;
