const faker = require('faker');
const lodash = require('lodash');

const idArray = [1, 2, 3];

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Groups', lodash.map(
      idArray,
      id => ({
        id,
        name: faker.company.companyName(),
        purpose: faker.company.catchPhraseDescriptor(),
        creatorId: id,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    ));
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Groups', {
      id: idArray
    });
  }
};
