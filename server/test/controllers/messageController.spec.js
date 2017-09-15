import chai from 'chai';
import assertArrays from 'chai-arrays';
import request from 'supertest';
import faker from 'faker';
import app from '../../app';
import models from '../../models';

const { User, Message, Group } = models;
const { expect } = chai;

chai.use(assertArrays);

describe('Message Controller: ', () => {
  describe('Endpoints: Message: ', () => {
    let mockGroup1Id;
    const password = faker.internet.password();
    const mockUser1 = {
      password,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      confirmPassword: password
    };
    const mockMessage1 = {
      title: faker.company.catchPhrase(),
      content: faker.lorem.paragraph(1),
    };
    const mockGroup1 = {
      name: 'itunuloluwa',
      purpose: faker.company.catchPhrase(),
    };

    after('Clean out the newly added groups', () => {
      User.destroy({
        where: {
          username: [
            mockUser1.username
          ]
        }
      });
      Message.destroy({
        where: {
          title: [
            mockMessage1.title
          ]
        }
      });
      Group.destroy({
        where: {
          name: [
            'itunuloluwa'
          ]
        }
      });
    });
    describe('POST /api/group/:groupId/message', () => {
      it(`should return status 201 and a success message on
        successful creation`, () =>
          Group.create(mockGroup1)
            .then((group) => {
              mockGroup1Id = group.id;
              return group;
            })
            .then(() => request(app)
              .post(`/api/group/${mockGroup1Id}/message`)
              .type('form')
              .send(mockMessage1)
              .expect(201)
              .then(res =>
                expect(res.body).to.have.property('message')
                  .which.equals('message posted successfully'))));

      it(`should return status 400 and a 'groupId is invalid. enter a number'
        message when a string is entered in place of the groupId`, () =>
          request(app)
            .post('/api/group/randomString/message')
            .type('form')
            .send(mockMessage1)
            .expect(400)
            .then(res =>
              expect(res.body).to.have.property('message')
                .which.equals('groupId is invalid. enter a number\n')));

      it(`should return status 409 and a
        'message with this title already exists' error message when
        a message with duplicate title is being created`, () =>
          request(app)
            .post('/api/group/1/message')
            .type('form')
            .send(mockMessage1)
            .expect(409)
            .then(res =>
              expect(res.body).to.have.property('message')
                .which.equals('message with this title already exists')));

      it(`should return status 404 and a 'group not found' 
        error message when a group with the passed groupId is not found`, () =>
          request(app)
            .post('/api/group/0/message')
            .type('form')
            .send({
              ...mockMessage1,
              title: faker.company.catchPhrase(),
            })
            .expect(404)
            .then(res =>
              expect(res.body).to.have.property('message')
                .which.equals('group not found')));

      it(`should return status 400 and a 'title is required' error message
        when title is blank or not passed with the message`, () =>
          request(app)
            .post('/api/group/0/message')
            .type('form')
            .send({
              ...mockMessage1,
              title: '',
            })
            .expect(400)
            .then(res =>
              expect(res.body).to.have.property('message')
                .which.equals('title is required\n')));
    });

    describe('GET /api/group/:groupId/messages', () => {
      let sampleGroup;

      it(`should return status 200 and an array of the messages that have been
        broadcast to that group`, (done) => {
          Group.findById(mockGroup1Id)
            .then((group) => {
              sampleGroup = group;
              return sampleGroup;
            })
            .then(() => User.findById(1))
            .then(user => sampleGroup.addUser(user))
            .then(() =>
              request(app)
                .get(`/api/group/${sampleGroup.id}/messages`)
                .expect(200)
                .then((res) => {
                  expect(res.body).to.have.property('messages');
                  expect(res.body.messages).to.be.an('array').of.length(1);
                  done();
                }))
            .catch(err => done(err));
        });

      it(`should return status 400 and an error message 'groupId is invalid.
        enter a number' when a string is passed as the groupId`, () =>
          request(app)
            .get('/api/group/stringGroupId/messages')
            .expect(400)
            .then(res =>
              expect(res.body).to.have.property('message')
                .which.equals('groupId is invalid. enter a number\n')));

      it(`should return status 400 and an error message
        'user not member of requested group' when the current
        user is not a member of the passed group`, () =>
          request(app)
            .get('/api/group/1/messages')
            .expect(401)
            .then(res =>
              expect(res.body).to.have.property('message')
                .which.equals('user not member of requested group')));
    });
  });
});
