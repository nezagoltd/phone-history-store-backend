/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import statusCode from '../../helpers/statusCodes';
import customMessages from '../../helpers/customMessages';
import mockData from '../data/mockData.test';
import server from '../../app';

chai.use(chaiHttp);

const { phoneNumber } = mockData.login.loginValidData;
const {
  ok, notFound, badRequest,
} = statusCode;
const {
  userFound, userNotFound, phoneNumberEmpty,
} = customMessages;

describe('Check user tests', () => {
  it('Will check an exists user, expect to get a 200 response', (done) => {
    chai.request(server)
      .get(`/api/users/check-user/${phoneNumber}`)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.a('string');
        expect(res.body.message).to.equal(userFound);
        done();
      });
  });
  it('Will check user but who does not exits, expect to get a 404 response', (done) => {
    chai.request(server)
      .get('/api/users/check-user/0')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(notFound);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.a('string');
        expect(res.body.error).to.equal(userNotFound);
        done();
      });
  });
});
