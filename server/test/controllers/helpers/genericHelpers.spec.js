import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import faker from 'faker';
import GenericHelpers from
  '../../../controllers/helpers/GenericHelpers';

const { expect } = chai;
const {
  stringifyValidationErrors,
  throwError,
} = GenericHelpers;

chai.use(chaiAsPromised);

describe('Generic Helpers: ', () => {
  describe('stringifyValidationErrors: ', () => {
    const mockErrorsObject = {
      password: 'invalid password',
      username: 'username is required',
    };
    const concatenatedErrors =
      `${mockErrorsObject.username}\n${mockErrorsObject.password}\n`;

    it(
      'should return all the errors concatenated with a linebreak between them',
      () => expect(stringifyValidationErrors(mockErrorsObject))
        .to.equal(concatenatedErrors)
    );
  });

  describe('throwError: ', () => {
    const randomErrorMessage = faker.company.bsAdjective();

    it('should throw an error with the message in randomErrorMessage', () => {
      expect(() => throwError(randomErrorMessage)).to.throw(randomErrorMessage);
    });
  });
});
