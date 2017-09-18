import chai from 'chai';
import assertArrays from 'chai-arrays';
import request from 'supertest';
import faker from 'faker';
import app from '../../app';
import models from '../../models';

const { User } = models;
const { expect } = chai;

chai.use(assertArrays);

describe('User Controller: ', () => {
  describe('Endpoints: User: ', () => {
    const password = faker.internet.password();
    const mockUser1 = {
      password,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      confirmPassword: password
    };

    after('Clean out the newly added groups', () => {
      User.destroy({
        where: {
          username: [
            mockUser1.username
          ]
        }
      });
    });
    describe('POST /api/user/signup', () => {
      it(`should return status 201 and the created user on
        successful creation`, () =>
          request(app)
            .post('/api/user/signup')
            .type('form')
            .send(mockUser1)
            .expect(201)
            .then(res =>
              expect(res.body).to.have.property('user')
                .which.has.property('username')
                .which.equals(mockUser1.username)));

      it(`should return 400 error and
      'password is required\nemail is required\nusername is required\n'
      message when blank userData is passed`, (done) => {
        const expectedMessage =
          'password is required\nemail is required\nusername is required\n';
        request(app)
          .post('/api/user/signup')
          .type('form')
          .send({})
          .expect(400)
          .then((res) => {
            expect(res.body).to.have.property('message')
              .which.equals(expectedMessage);
            done();
          })
          .catch(err => done(err));
      });

      it(`should return 400 error and
      'email is invalid\n'
      message when an invalid email address is passed`, (done) => {
        const expectedMessage = 'email is invalid\n';
        request(app)
          .post('/api/user/signup')
          .type('form')
          .send({
            ...mockUser1,
            email: 'invalidemailadrress.com'
          })
          .expect(400)
          .then((res) => {
            expect(res.body).to.have.property('message')
              .which.equals(expectedMessage);
            done();
          })
          .catch(err => done(err));
      });

      it(`should return 400 error and
      'confirmation password is required\n' message when confirmation
      password is omitted or blank but password is passed`, (done) => {
        const expectedMessage = 'confirmation password is required\n';
        request(app)
          .post('/api/user/signup')
          .type('form')
          .send({
            ...mockUser1,
            confirmPassword: ''
          })
          .expect(400)
          .then((res) => {
            expect(res.body).to.have.property('message')
              .which.equals(expectedMessage);
            done();
          })
          .catch(err => done(err));
      });

      it(`should return 400 error and
      "passwords don't match" message when confirmation
      password doesn't match password that is passed`, (done) => {
        const expectedMessage = "passwords don't match\n";
        request(app)
          .post('/api/user/signup')
          .type('form')
          .send({
            ...mockUser1,
            confirmPassword: 'definitely not a match'
          })
          .expect(400)
          .then((res) => {
            expect(res.body).to.have.property('message')
              .which.equals(expectedMessage);
            done();
          })
          .catch(err => done(err));
      });

      it(`should return 409 error and 'user with this email already exists'
        message when an existing email is passed`, () =>
          request(app)
            .post('/api/user/signup')
            .type('form')
            .send(mockUser1)
            .expect(409)
            .then(res =>
              expect(res.body).to.have.property('message')
                .which.equals('user with this email already exists')));

      it(`should return 409 error and 'user with this username already exists'
        message when an existing username is passed`, () =>
          request(app)
            .post('/api/user/signup')
            .type('form')
            .send({
              ...mockUser1,
              email: 'itunu@alpha.com'
            })
            .expect(409)
            .then(res =>
              expect(res.body).to.have.property('message')
                .which.equals('user with this username already exists')));
    });

    describe('POST /api/user/signin', () => {
      it(`should return status 201 and the created user on
        successful creation`, () =>
          request(app)
            .post('/api/user/signin')
            .type('form')
            .send({
              ...mockUser1,
              identifier: mockUser1.email
            })
            .expect(200)
            .then(res =>
              expect(res.body).to.have.property('user')
                .which.has.property('username')
                .which.equals(mockUser1.username)));

      it(`should return status 400 and an error message 
      'email or username is required/n'
      when property identifier isn't sent`, (done) => {
        const expectedMessage =
          'password is required\nemail or username is required\n';
        request(app)
          .post('/api/user/signin')
          .type('form')
          .send({
            ...mockUser1,
            password: ''
          })
          .expect(400)
          .then((res) => {
            expect(res.body).to.have.property('message')
              .which.equals(expectedMessage);
            done();
          })
          .catch(err => done(err));
      });

      it(`should return status 400 and an error message 'user not found'
      when property identifier is not recognized as a username or email`, () =>
          request(app)
            .post('/api/user/signin')
            .type('form')
            .send({
              ...mockUser1,
              identifier: 'itunu'
            })
            .expect(404)
            .then(res =>
              expect(res.body).to.have.property('message')
                .which.equals('user not found')));
    });
  });
});
