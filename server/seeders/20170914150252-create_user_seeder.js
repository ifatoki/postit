const faker = require('faker');
const lodash = require('lodash');

const idArray = [1, 2, 3];

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', lodash.map(
      idArray,
      id => ({
        id,
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    ));
  },

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', {
      id: idArray
    });
  }
};
