/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import customMessages from '../../helpers/customMessages';
import statusCodes from '../../helpers/statusCodes';

chai.use(chaiHttp);
const { notFound } = statusCodes;
const { resourceNotFound } = customMessages;

describe('Page not found case', () => {
  it('Requesting a Not found page will respond with a custom error message', (done) => {
    chai.request(server)
      .get('/--@@@@@@333333333ddddddd')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(notFound);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.equal(resourceNotFound);
        done();
      });
  });
});
