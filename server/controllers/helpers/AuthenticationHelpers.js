import bcrypt from 'bcryptjs';
import faker from 'faker';
import Errors from './Errors';
import GenericHelpers from './GenericHelpers';

const { userErrors } = Errors;

const AuthenticationHelpers = {
  /**
   * Compare string with hashed password
   * @function comparePassword
   *
   * @param {string} userPassword - Password string to be matched with hash
   * @param {object} user - User object containing hashed password
   *
   * @return {Promise} - Promise resolving to user or invalid password error
   */
  comparePassword: (userPassword, user) =>
    bcrypt.compare(userPassword, user.password)
      .then((match) => {
        if (!match) GenericHelpers.throwError(userErrors.USER_INVALID_PASSWORD);
        return user;
      }),

  /**
   * Encrypt password before writing it to database.
   * @function encryptPassword
   *
   * @param {string} password - Password to be encrypted
   *
   * @return {Promise} - Promise resolving to the encrypted password or an error
   */
  encryptPassword: password =>
    new Promise((resolve) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          resolve(hash);
        });
      });
    }),

  /**
   * Simulate inserting user in req after authentication
   * @function injectMockuser
   *
   * @param {object} req - Server request object
   * @param {object} res - Server response object
   * @param {function} next
   * =
   * @returns {void}
   */
  injectMockUser: (req, res, next) => {
    req.user = {
      id: 1,
      username: faker.internet.userName()
    };
    next();
  }
};

export default AuthenticationHelpers;
