import { Message } from '../../models';
import Errors from '../helpers/Errors';
import GenericHelpers from './GenericHelpers';

const { messageErrors } = Errors;

const MessageHelpers = {
  /**
   * Confirm if passed title is unique
   * @function confirmTitleUniqueness
   *
   * @param {string} title - Title to be verified
   *
   * @return {void}
   *
   * @throws {Error} - An error containing title duplicate message
   */
  confirmTitleUniqueness: title =>
    Message.findOne({
      where: {
        title
      }
    })
      .then((message) => {
        if (message) {
          GenericHelpers.throwError(messageErrors.MESSAGE_DUPLICATE_TITLE);
        }
      }),

  /**
   * Create a message using the passed data
   * @function createMessage
   *
   * @param {object} messageData - Data to be used to create message
   *
   * @return {Promise} - Resolves to new message or error
   */
  createMessage: messageData => Message.create(messageData),

  /**
   * Post the passed message to the passed group
   * @function postMessageToGroup
   *
   * @param {object} message - Message object to be posted
   * @param {object} group - Group to which message should be posted
   *
   * @return {Promise} - Resolves to a success message or an error
   */
  postMessageToGroup: (message, group) => group.addMessage(message)
};

export default MessageHelpers;
