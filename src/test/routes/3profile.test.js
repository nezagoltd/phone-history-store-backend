/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mockData from '../data/mockData.test';
import server from '../../app';
import statusCode from '../../helpers/statusCodes';
import customMessages from '../../helpers/customMessages';
import userToken from './2login.test';

chai.use(chaiHttp);

const {
  invalidToken,
  updateProfileValidData,
  updateProfileInValidData,
  tokenOfUserWhoDoesnExist,
} = mockData.profile;
const {
  unAuthorized,
  badRequest,
  ok,
  notFound,
  forbidden,
} = statusCode;
const {
  tokenMissingOrInvalidErrorMsg,
  userNotExistErrorMsg,
  unAuthorizedProfileUpdate,
  requestProfileUseNumberErrMsg,
  accountDeletedSuccessfulyMsg,
  dontDeleteSuperuser,
  notDeleteOtherUserAccErrMsg,
} = customMessages;

describe('Profile tests', () => {
  it('Will retrieve user\'s profile, expect it to return a response of 200 status, and data properties', (done) => {
    chai.request(server)
      .get('/api/users/profile')
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data').to.be.an('object');
        done();
      });
  });
  it('Will retrieve user\'s profile, expect it to return a response of 200 status, and data properties', (done) => {
    chai.request(server)
      .get('/api/users/profile/1')
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data').to.be.an('object');
        done();
      });
  });
  it('Will not retrieve user\'s profile, expect it to return a response of 400 status, and error properties', (done) => {
    chai.request(server)
      .get('/api/users/profile/0')
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(notFound);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(userNotExistErrorMsg);
        done();
      });
  });
  it('Will not retrieve user\'s profile, expect it to return a response of 400 status, and error properties', (done) => {
    chai.request(server)
      .get('/api/users/profile/cool')
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(requestProfileUseNumberErrMsg);
        done();
      });
  });
  it('Will not retrieve user\'s profile, expect it to return a response of 401 status, and error properties', (done) => {
    chai.request(server)
      .get('/api/users/profile')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(unAuthorized);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(tokenMissingOrInvalidErrorMsg);
        done();
      });
  });
  it('Will not retrieve user\'s profile, expect it to return a response of 401 status, and error properties', (done) => {
    chai.request(server)
      .get('/api/users/profile')
      .set('Authorization', invalidToken)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(unAuthorized);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(tokenMissingOrInvalidErrorMsg);
        done();
      });
  });

  it('Will update my profile, expect it to return a response of 200 status, and data properties', (done) => {
    chai.request(server)
      .patch('/api/users/profile')
      .set('Authorization', userToken[0])
      .send(updateProfileValidData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data').to.be.an('array');
        done();
      });
  });
  it('Will update other user\'s profile, expect it to return a response of 200 status, and data properties', (done) => {
    chai.request(server)
      .patch('/api/users/profile/2')
      .set('Authorization', userToken[1])
      .send(updateProfileValidData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('data').to.be.an('array');
        done();
      });
  });
  it('Will not update other user\'s profile, expect it to return a response of 404 status, and error properties', (done) => {
    chai.request(server)
      .patch('/api/users/profile/0')
      .set('Authorization', userToken[1])
      .send(updateProfileValidData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(notFound);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(userNotExistErrorMsg);
        done();
      });
  });
  it('Will not update other user\'s profile, expect it to return a response of 400 status, and error properties', (done) => {
    chai.request(server)
      .patch('/api/users/profile/cool')
      .set('Authorization', userToken[1])
      .send(updateProfileValidData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(requestProfileUseNumberErrMsg);
        done();
      });
  });
  it('Will not update other users profile, expect it to return a response of 401 status, and error properties', (done) => {
    chai.request(server)
      .patch('/api/users/profile/2')
      .set('Authorization', userToken[0])
      .send(updateProfileValidData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(forbidden);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(unAuthorizedProfileUpdate);
        done();
      });
  });
  it('Will not update my profile, expect it to return a response of 400 status, and error properties', (done) => {
    chai.request(server)
      .patch('/api/users/profile/2')
      .set('Authorization', userToken[0])
      .send(updateProfileInValidData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string');
        done();
      });
  });

  it('Will not delete other user\'s account, expect it to return an object with 403 status and error props', (done) => {
    chai.request(server)
      .delete('/api/users/3')
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(forbidden);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(notDeleteOtherUserAccErrMsg);
        done();
      });
  });
  it('Will delete my account, expect it to return an object with 200 status and message props', (done) => {
    chai.request(server)
      .delete('/api/users')
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(accountDeletedSuccessfulyMsg);
        done();
      });
  });

  it('Will delete my account, expect it to return an object with 200 status and error props', (done) => {
    chai.request(server)
      .delete('/api/users/4')
      .set('Authorization', userToken[2])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string');
        done();
      });
  });
  it('Will delete other account, expect it to return an object with 200 status and message props', (done) => {
    chai.request(server)
      .delete('/api/users/3')
      .set('Authorization', userToken[1])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(accountDeletedSuccessfulyMsg);
        done();
      });
  });
  it('Will not delete superuser account, expect it to return an object with 403 status and error props', (done) => {
    chai.request(server)
      .delete('/api/users/1')
      .set('Authorization', userToken[1])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(forbidden);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(dontDeleteSuperuser);
        done();
      });
  });
  it('Will not delete unexists account, expect it to return an object with 404 status and error props', (done) => {
    chai.request(server)
      .delete('/api/users/0')
      .set('Authorization', userToken[1])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(notFound);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(userNotExistErrorMsg);
        done();
      });
  });
  it('Will not delete account, expect it to return an object with 400 status and error props', (done) => {
    chai.request(server)
      .delete('/api/users/cool')
      .set('Authorization', userToken[1])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(requestProfileUseNumberErrMsg);
        done();
      });
  });
});
