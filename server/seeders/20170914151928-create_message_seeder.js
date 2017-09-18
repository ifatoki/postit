const faker = require('faker');
const lodash = require('lodash');

const idArray = [1, 2, 3];

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Messages', lodash.map(
      idArray,
      id => ({
        id,
        title: faker.company.catchPhrase(),
        content: faker.company.catchPhraseDescriptor(),
        authorId: id,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    ));
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Messages', {
      id: idArray
    });
  }
};
