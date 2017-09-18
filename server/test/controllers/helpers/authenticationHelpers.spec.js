import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import faker from 'faker';
import Errors from '../../../controllers/helpers/Errors';
import AuthenticationHelpers from
  '../../../controllers/helpers/AuthenticationHelpers';

const { expect } = chai;
const {
  comparePassword,
  encryptPassword,
} = AuthenticationHelpers;

chai.use(chaiAsPromised);

describe('Authentication Helpers:', () => {
  describe('encryptPassword: ', () => {
    it('should return a string on successful encryption', () =>
      expect(encryptPassword(faker.internet.password()))
        .to.eventually.be.a('string'));
  });

  describe('comparePassword: ', () => {
    const samplePassword = faker.internet.password();
    const wrongPassword = faker.internet.password();
    it('should return the user object passed if passwords match', () =>
      encryptPassword(samplePassword)
        .then((password) => {
          const sampleUser = {
            password
          };
          return expect(comparePassword(samplePassword, sampleUser))
            .to.eventually.equal(sampleUser);
        }));

    it(`should be rejected with userError USER_INVALID_PASSWORD when 
    password doesn't match encrypted text`, () =>
      encryptPassword(samplePassword)
        .then((password) => {
          const sampleUser = {
            password
          };
          return expect(comparePassword(wrongPassword, sampleUser))
            .to.be.rejectedWith(
              Error,
              Errors.userErrors.USER_INVALID_PASSWORD.toString()
            );
        }));
  });
});
