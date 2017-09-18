import { User } from '../../models';
import Errors from '../helpers/Errors';
import GenericHelpers from './GenericHelpers';

const { userErrors } = Errors;
const UserHelpers = {
  /**
   * Confirm if email is unique
   * @function confirmEmailUniqueness
   *
   * @param {string} email - Email Address to check
   *
   * @return {void}
   *
   * @throws {Error} - Error indicating duplication
   */
  confirmEmailUniqueness: email =>
    User.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (user) GenericHelpers.throwError(userErrors.USER_DUPLICATE_EMAIL);
    }),

  /**
   * Confirm the existence of a user with the passed id
   * @function confirmUserExists
   *
   * @param {number} id - User id to be validated
   *
   * @returns {Promise} - Resolves to user or an error.
   */
  confirmUserExists: id =>
    User.findById(id)
      .then((user) => {
        if (!user) GenericHelpers.throwError(userErrors.USER_NOT_FOUND);
        return user;
      }),

  /**
   * Confirm uniqueness of username
   * @function confirmUsernameUniqueness
   *
   * @param {string} username - Username to be confirmed
   *
   * @throws {Error} - A duplicate username error
   *
   * @return {void}
   */
  confirmUsernameUniqueness: username =>
    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (user) GenericHelpers.throwError(userErrors.USER_DUPLICATE_USERNAME);
    }),

  /**
   * Creates new user in the database
   * @function createUser
   *
   * @param {object} userData - Userdata for creating new user
   * @param {string} hashedPassword - Encrypted user password
   *
   * @returns {Promise} - Resolves to User object or Error
   */
  createUser: (userData, hashedPassword) => {
    userData.password = hashedPassword;
    return User.create(userData);
  },

  /**
   * Filter the user object before returning it
   * @function filterUser
   *
   * @param {object} userData - User data to be filtered
   *
   * @return {object} - Filtered user object
   */
  filterUser: ({ id, username, email }) => ({
    id,
    username,
    email
  }),

  /**
   * Get a user by email or username
   * @function getUserByIdentifier
   *
   * @param {string} identifier - User email or username
   *
   * @return {Promise} - Resolves to user or error
   */
  getUserByIdentifier: identifier =>
    User.findOne({
      where: {
        $or: {
          username: identifier,
          email: identifier
        }
      }
    })
      .then((user) => {
        if (!user) GenericHelpers.throwError(userErrors.USER_NOT_FOUND);
        return user;
      }),

  /**
   * Send the user object with the response object from the server
   * @function sendUser
   *
   * @param {object} user - User object to be sent
   * @param {number} status - Server status
   * @param {object} res - Server response object
   *
   * @return {void}
   */
  sendUser: (user, status, res) =>
    res.status(status).send({
      user: UserHelpers.filterUser(user)
    }),
};

export default UserHelpers;
