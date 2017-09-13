import { Group } from '../../models';
import Errors from '../helpers/Errors';
import GenericHelpers from './GenericHelpers';

const { groupErrors } = Errors;

const GroupHelpers = {
  /**
   * Add a user to a group
   * @function addUserToGroup
   *
   * @param {object} group - Group object to which user should be added
   * @param {object} user - User object to be added to group
   *
   * @returns {Promise} - Resolves to a success message or an error
   */
  addUserToGroup: (group, user) =>
    group.addUser(user)
      .then(() => `${user.username} added successfully to ${group.name}`),

  /**
   * Confirm existence of a group with the passed id
   * @function confirmGroupExists
   *
   * @param {number} id - groupId to be validated
   *
   * @returns {Promise} - Resolves to a group or a group not found error.
   */
  confirmGroupExists: id =>
    Group.findById(id)
      .then((group) => {
        if (!group) GenericHelpers.throwError(groupErrors.GROUP_NOT_FOUND);
        return group;
      }),

  /**
   * Check uniqueness of groupname against existing group names
   * @function confirmGroupNameUniqueness
   *
   * @param {string} name - Group name to check
   *
   * @return {void}
   *
   * @throws {Error} - Error containing duplicate group name message
   */
  confirmGroupNameUniqueness: name =>
    Group.findOne({
      where: {
        name
      }
    })
      .then((group) => {
        if (group) GenericHelpers.throwError(groupErrors.GROUP_DUPLICATE_NAME);
      }),

  /**
   * Create a new Group with passed data
   * @function createGroup
   *
   * @param {object} groupData - data to create new group with
   * @param {object} user - current logged in user
   *
   * @returns {Promise} - Resolves to new Group or Error
   */
  createGroup: (groupData, user) => {
    groupData.creatorId = user.id;
    return Group.create(groupData);
  },

  /**
   * Filter the group object before returning it
   * @function filterGroup
   *
   * @param {object} GroupData - group data to be filtered
   *
   * @return {object} - Filtered group object
   */
  filterGroup: ({
    id, name, purpose, creatorId
  }) => ({
    id,
    name,
    purpose,
    creatorId
  }),

  /**
   * Send the Group object with the response object from the server
   * @function sendGroup
   *
   * @param {object} group - Group object to be sent
   * @param {number} status - Server status
   * @param {object} res - Server response object
   *
   * @return {void}
   */
  sendGroup: (group, status, res) =>
    res.status(status).send({
      group: GroupHelpers.filterGroup(group)
    }),
};

export default GroupHelpers;
