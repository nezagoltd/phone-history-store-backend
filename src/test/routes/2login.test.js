/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import mockData from '../data/mockData.test';
import statusCodes from '../../helpers/statusCodes';
import customMessages from '../../helpers/customMessages';

chai.use(chaiHttp);

const {
  unAuthorized,
  ok,
  badRequest,
} = statusCodes;
const {
  phoneNumberEmpty,
  passwordEmpty,
  phoneNumberOrPasswordWrong,
} = customMessages;
const {
  loginValidData,
  loginInValidData,
  loginInValidPassword,
  loginPasswordEmpty,
  loginPhoneNumberEmpty,
  loginPhoneNumberAndPasswordEmpty,
  superuserLogin,
  loginThirdParty,
} = mockData.login;

const userToken = [];

describe('Login tests', () => {
  it('Will login a user, expect it to return a response with status 200, and a token', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .set('Accept', 'Application/json')
      .send(loginValidData)
      .end((err, res) => {
        if (err) done(err);
        userToken.push(`Bearer ${res.body.token}`);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token').to.be.a('string');
        done();
      });
  });
  it('Will login a super user, expect it to return a response with status 200, and a token', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .set('Accept', 'Application/json')
      .send(superuserLogin)
      .end((err, res) => {
        if (err) done(err);
        userToken.push(`Bearer ${res.body.token}`);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token').to.be.a('string');
        done();
      });
  });
  it('Will login a third party user, expect it to return a response with status 200, and a token', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .set('Accept', 'Application/json')
      .send(loginThirdParty)
      .end((err, res) => {
        if (err) done(err);
        userToken.push(`Bearer ${res.body.token}`);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token').to.be.a('string');
        done();
      });
  });
  it('Will not login a user because password is wrong, expect it to return a response with status 401, and an error msg', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .set('Accept', 'Application/json')
      .send(loginInValidData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(unAuthorized);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(phoneNumberOrPasswordWrong);
        done();
      });
  });
  it('Will not login a user because password is empty, expect it to return a response with status 400, and an error msg', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .set('Accept', 'Application/json')
      .send(loginPasswordEmpty)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(passwordEmpty);
        done();
      });
  });
  it('Will not login a user because password is empty, expect it to return a response with status 400, and an error msg', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .set('Accept', 'Application/json')
      .send(loginPhoneNumberEmpty)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(phoneNumberEmpty);
        done();
      });
  });
  it('Will not login a user because password and phoneNumber are empty, expect it to return a response with status 400, and an error msg', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .set('Accept', 'Application/json')
      .send(loginPhoneNumberAndPasswordEmpty)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(`${phoneNumberEmpty}, ${passwordEmpty}`);
        done();
      });
  });
  it('Will not login a user because password and phoneNumber are empty, expect it to return a response with status 400, and an error msg', (done) => {
    chai.request(server)
      .post('/api/users/login')
      .set('Accept', 'Application/json')
      .send(loginInValidPassword)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(unAuthorized);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(phoneNumberOrPasswordWrong);
        done();
      });
  });
});

export default userToken;
