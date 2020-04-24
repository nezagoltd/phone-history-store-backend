/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import customMessages from '../../helpers/customMessages';
import statusCodes from '../../helpers/statusCodes';
import mockData from '../data/mockData.test';

chai.use(chaiHttp);

const { badRequest, conflict, created } = statusCodes;
const {
  phoneNumberAlreadyExists,
  namesErrorMessage,
  emailErrorMessage,
  passwordErrorMessage,
  ageErrorMessage,
  phoneNumberErrorMessage,
} = customMessages;
const {
  signupValidData,
  signupDuplicateData,
  signupFirstNameBadFormatData,
  signupWithSomeOtherUnnecessaryData,
  signupLastNameBadFormatData,
  signupEmailFormatData,
  signupPasswordBadFormatData,
  signupAgeEmpty,
  signupPhoneNumberEmpty,
  signupFirstNameEmpty,
  signupEmailEmpty,
  signupLastNameEmpty,
  signupPasswordEmpty,
  signupFirstNameAndLastNameEmpty,
  signupPasswordAndEmailEmpty,
  signupThirdPartyData,
} = mockData.signup;

describe('Signup test', () => {
  it('Will create a new user, expect it to return an object with status code of 201, and response body containing a token', (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupValidData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(created);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token').to.be.a('string');
        done();
      });
  });
  it('Will create a new user, expect it to return an object with status code of 201, and response body containing a token', (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupWithSomeOtherUnnecessaryData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(created);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token').to.be.a('string');
        done();
      });
  });
  it('Will create a new user, expect it to return an object with status code of 201, and response body containing a token', (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupThirdPartyData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(created);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('token').to.be.a('string');
        done();
      });
  });
  it('Will not create a new user because that user exists already, expect it to return an object with status code of 201, and response body containing a token', (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupDuplicateData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(conflict);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(phoneNumberAlreadyExists);
        done();
      });
  });
  it(`Will not create a new user because that user exists already, expect it to return an object with status code of 409, 
  and response body containing an error message`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupDuplicateData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(conflict);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(phoneNumberAlreadyExists);
        done();
      });
  });
  it(`Will not create a new user because the firstname is in bad format, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupFirstNameBadFormatData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(namesErrorMessage);
        done();
      });
  });
  it(`Will not create a new user because lastname is in bad format, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupLastNameBadFormatData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(namesErrorMessage);
        done();
      });
  });
  it(`Will not create a new user because email is invalid, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupEmailFormatData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(emailErrorMessage);
        done();
      });
  });
  it(`Will not create a new user because password is invalid, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupPasswordBadFormatData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(passwordErrorMessage);
        done();
      });
  });
  it(`Will not create a new user because age is empty, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupAgeEmpty)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(ageErrorMessage);
        done();
      });
  });
  it(`Will not create a new user because phonenumber is empty, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupPhoneNumberEmpty)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(phoneNumberErrorMessage);
        done();
      });
  });
  it(`Will not create a new user because firstname is empty, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupFirstNameEmpty)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(namesErrorMessage);
        done();
      });
  });
  it(`Will not create a new user because email is empty, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupEmailEmpty)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(emailErrorMessage);
        done();
      });
  });
  it(`Will not create a new user because password is empty, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupPasswordEmpty)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(passwordErrorMessage);
        done();
      });
  });
  it(`Will not create a new user because lastname is empty, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupLastNameEmpty)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(namesErrorMessage);
        done();
      });
  });
  it(`Will not create a new user, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupPasswordAndEmailEmpty)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it(`Will not create a new user, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send(signupFirstNameAndLastNameEmpty)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it(`Will not create a new user, expect it to return an object with status code of 400,
   and response body containing an error`, (done) => {
    chai.request(server)
      .post('/api/users/signup')
      .set('Accept', 'Application/json')
      .send({})
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
