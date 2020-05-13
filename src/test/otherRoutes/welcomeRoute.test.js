/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import customMessages from '../../helpers/customMessages';
import statusCodes from '../../helpers/statusCodes';

chai.use(chaiHttp);
const { ok } = statusCodes;
const { welcomeToPhoneHistoryStore } = customMessages;

describe('Welcome Route test cases', () => {
  it('Welcome route will return an object with message property', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.equal(welcomeToPhoneHistoryStore);
        done();
      });
  });
});
