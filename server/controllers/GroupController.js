import Validator from '../utils/Validator';
import GroupHelpers from './helpers/GroupHelpers';
import GenericHelpers from './helpers/GenericHelpers';

const { stringifyValidationErrors, sendError } = GenericHelpers;

const GroupController = {
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
      sendError(stringifyValidationErrors(validator.errors), 400, res);
    }
  }
};

export default GroupController;
