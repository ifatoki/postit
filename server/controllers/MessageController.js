import Validator from '../utils/Validator';
import MessageHelpers from './helpers/MessageHelpers';
import GenericHelpers from './helpers/GenericHelpers';
import GroupHelpers from './helpers/GroupHelpers';

const { stringifyValidationErrors, sendMessage } = GenericHelpers;

const MessageController = {
  /**
   * Create and broadcast message to group
   * @function broadcastMessageToGroup
   *
   * @param {object} req - Server request object
   * @param {object} res - Server response object
   *
   * @return {void}
   */
  broadcastMessageToGroup: (req, res) => {
    let group;
    const successMessage = 'message posted successfully';
    const { title } = req.body;
    const { groupId } = req.params;
    const validator = Validator.validateAddNewMessageToGroup({
      title,
      groupId
    });
    req.body.authorId = req.user.id;

    if (validator.isValid) {
      MessageHelpers.confirmTitleUniqueness(title)
        .then(() => GroupHelpers.confirmGroupExists(groupId))
        .then((existingGroup) => {
          group = existingGroup;
          return MessageHelpers.createMessage(req.body);
        })
        .then(message => MessageHelpers.postMessageToGroup(message, group))
        .then(() => GenericHelpers.sendMessage(successMessage, 201, res))
        .catch(error => GenericHelpers.resolveError(error, res));
    } else {
      sendMessage(stringifyValidationErrors(validator.errors), 400, res);
    }
  }
};

export default MessageController;
