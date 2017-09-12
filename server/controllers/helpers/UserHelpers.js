import { User } from '../../models';
import Errors from '../helpers/Errors';
import GenericHelpers from './GenericHelpers';

const { userErrors } = Errors;
const UserHelpers = {
  confirmEmailUniqueness(email) {
    return User.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (user) GenericHelpers.throwError(userErrors.USER_DUPLICATE_EMAIL);
    });
  },

  filterUser({ id, username, email }) {
    return {
      id,
      username,
      email
    };
  },

  confirmUsernameUniqueness(username) {
    return User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (user) GenericHelpers.throwError(userErrors.USER_DUPLICATE_USERNAME);
    });
  },

  sendUser(user, res) {
    res.status(201).send({
      user: UserHelpers.filterUser(user)
    });
  },

  createUser(userData) {
    return User.create(userData)
      .then(user => user);
  }
};

export default UserHelpers;
