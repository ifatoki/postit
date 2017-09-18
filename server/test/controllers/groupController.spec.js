import chai from 'chai';
import assertArrays from 'chai-arrays';
import request from 'supertest';
import faker from 'faker';
import app from '../../app';
import models from '../../models';

const { Group, User } = models;
const { expect } = chai;

chai.use(assertArrays);

describe('Group Controller: ', () => {
  describe('Endpoints: Group: ', () => {
    let mockGroup1Id;
    const mockGroup1 = {
      name: 'itunuloluwa',
      purpose: faker.company.catchPhrase(),
    };
    const mockUser1 = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    after('Clean out the newly added groups', () => {
      Group.destroy({
        where: {
          name: [
            mockGroup1.name
          ]
        },
        cascade: true,
        restartIdentity: true
      });
      User.destroy({
        where: {
          username: [
            mockUser1.username
          ]
        }
      });
    });
    describe('POST /api/group route', () => {
      it('should create and return a new group when successful', (done) => {
        request(app)
          .post('/api/group')
          .type('form')
          .send(mockGroup1)
          .expect(201)
          .then((res) => {
            mockGroup1Id = res.body.group.id;
            expect(res.body)
              .to.have.property('group')
              .which.has.property('name')
              .which.equals(mockGroup1.name);
            expect(res.body)
              .to.have.property('group')
              .which.has.property('purpose')
              .which.equals(mockGroup1.purpose);
            expect(res.body)
              .to.have.property('group')
              .which.does.not.have.property('createdAt');
            done();
          })
          .catch(err => done(err));
      });

      it(`should throw a 409 error when attempting to create a group with
      duplicate name`, (done) => {
        request(app)
          .post('/api/group')
          .type('form')
          .send(mockGroup1)
          .expect(409)
          .then((res) => {
            expect(res.body)
              .to.have.property('message')
              .which.equals('group with this name already exists');
            done();
          })
          .catch(err => done(err));
      });

      it(`should throw a 400 error when trying to create a new group without
      a name`, (done) => {
        const tempNameStore = mockGroup1.name;
        mockGroup1.name = '';
        request(app)
          .post('/api/group')
          .type('form')
          .send(mockGroup1)
          .expect(400)
          .then((res) => {
            expect(res.body)
              .to.have.property('message')
              .which.equals('group name is required\n');
            mockGroup1.name = tempNameStore;
            done();
          })
          .catch(err => done(err));
      });
    });

    describe('POST /api/group/:groupId/user route', () => {
      it(`should add the passed user to the passed group and return a 200
      status and success message`, (done) => {
        const expectedMessage =
          `${mockUser1.username} added successfully to ${mockGroup1.name}`;

        User.create(mockUser1)
          .then(user => request(app)
            .post(`/api/group/${mockGroup1Id}/user`)
            .type('form')
            .send({
              userId: user.id
            })
            .expect(200))
          .then((res) => {
            expect(res.body)
              .to.have.property('message').which
              .equals(expectedMessage);
            done();
          })
          .catch(err => done(err));
      });

      it(`should return message 'groupId is invalid. enter a number' with code
      400 when a string is entered as the groupId`, (done) => {
        request(app)
          .post('/api/group/stringGroup/user')
          .type('form')
          .send({
            userId: 1
          })
          .expect(400)
          .then((res) => {
            expect(res.body)
              .to.have.property('message').which
              .equals('groupId is invalid. enter a number\n');
            done();
          })
          .catch(err => done(err));
      });

      it(`should return message 'group not found' with code
      404 when a group with passed groupId is not found`, (done) => {
        request(app)
          .post('/api/group/0/user')
          .type('form')
          .send({
            userId: 1
          })
          .expect(404)
          .then((res) => {
            expect(res.body)
              .to.have.property('message').which
              .equals('group not found');
            done();
          })
          .catch(err => done(err));
      });

      it(`should return message 'userId is required' with code
      400 when userId is not passed`, (done) => {
        request(app)
          .post('/api/group/1/user')
          .type('form')
          .send({})
          .expect(400)
          .then((res) => {
            expect(res.body)
              .to.have.property('message').which
              .equals('userId is required\n');
            done();
          })
          .catch(err => done(err));
      });

      it(`should return message 'userId is invalid. enter a number' with code
      400 when the userId passed is not a number`, (done) => {
        request(app)
          .post('/api/group/1/user')
          .type('form')
          .send({
            userId: 'stringUserId'
          })
          .expect(400)
          .then((res) => {
            expect(res.body)
              .to.have.property('message').which
              .equals('userId is invalid. enter a number\n');
            done();
          })
          .catch(err => done(err));
      });
    });
  });
});
