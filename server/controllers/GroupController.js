import Validator from '../utils/Validator';
import GroupHelpers from './helpers/GroupHelpers';
import UserHelpers from './helpers/UserHelpers';
import GenericHelpers from './helpers/GenericHelpers';

const { stringifyValidationErrors, sendMessage } = GenericHelpers;

const GroupController = {
  /**
   * Adds a user to a group
   * @function addUserToGroup
   *
   * @param {object} req - Server request object
   * @param {object} res - Server response object
   *
   * @return {void}
   */
  addUserToGroup: (req, res) => {
    let user;
    const { userId } = req.body;
    const { groupId } = req.params;
    const validator = Validator.validateAddUserToGroup({
      userId,
      groupId
    });

    if (validator.isValid) {
      UserHelpers.confirmUserExists(userId)
        .then((existingUser) => {
          user = existingUser;
          return GroupHelpers.confirmGroupExists(groupId);
        })
        .then(existingGroup => GroupHelpers.addUserToGroup(existingGroup, user))
        .then(message => GenericHelpers.sendMessage(message, 200, res))
        .catch(error => GenericHelpers.resolveError(error, res));
    } else {
      sendMessage(stringifyValidationErrors(validator.errors), 400, res);
    }
  },

  /**
   * Create a new Group
   * @function newGroup
   *
   * @param {object} req - Server request object
   * @param {object} res - Server response object
   *
   * @return {void}
   */
  newGroup: (req, res) => {
    const validator = Validator.validateNewGroup(req.body);

    if (validator.isValid) {
      GroupHelpers.confirmGroupNameUniqueness(req.body.name)
        .then(() => GroupHelpers.createGroup(req.body, req.user))
        .then(group => GroupHelpers.sendGroup(group, 201, res))
        .catch(error => GenericHelpers.resolveError(error, res));
    } else {
      sendMessage(stringifyValidationErrors(validator.errors), 400, res);
    }
  }
};

export default GroupController;
