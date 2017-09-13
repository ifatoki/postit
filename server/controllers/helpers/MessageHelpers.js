import lodash from 'lodash';
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
   * Fetch messages from a group
   * @function fetchGroupMessages
   *
   * @param {object} group - Group to fetch messages for
   *
   * @return {Promise} - Resolves to an array of messages or error
   */
  fetchGroupMessages: group =>
    group.getMessages(),

  /**
   * Filter the message object before returning it
   * @function filterMessage
   *
   * @param {object} messageData - Message data to be filtered
   *
   * @return {object} - Filtered message object
   */
  filterMessage: ({
    id, title, content, createdAt
  }) => ({
    id,
    title,
    content,
    createdAt
  }),

  /**
   * Filter out fetched messages before returning them
   * @function filterMessages
   *
   * @param {array} messages - Array of messages
   *
   * @return {array} An array of filtered messages
   */
  filterMessages: messages =>
    lodash.map(messages, message => MessageHelpers.filterMessage(message)),

  /**
   * Post the passed message to the passed group
   * @function postMessageToGroup
   *
   * @param {object} message - Message object to be posted
   * @param {object} group - Group to which message should be posted
   *
   * @return {Promise} - Resolves to a success message or an error
   */
  postMessageToGroup: (message, group) => group.addMessage(message),

  /**
   * Send the fetched messages with the server response
   * @function sendMessages
   *
   * @param {array} messages - fetched messages
   * @param {number} status - Server status code
   * @param {object} res - Server response object
   *
   * @return {void}
   */
  sendMessages: (messages, status, res) =>
    res.status(200).send({ messages }),
};

export default MessageHelpers;
