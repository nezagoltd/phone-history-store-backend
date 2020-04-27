/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';
import mockData from '../data/mockData.test';
import userToken from './2login.test';
import customMessages from '../../helpers/customMessages';
import statusCodes from '../../helpers/statusCodes';

chai.use(chaiHttp);

const { callDeleted, callSaved, callRetrieved } = customMessages;
const { created, ok } = statusCodes;
const { newCallData } = mockData.callData;

describe('Call tets', () => {
  it('will create a new call log', (done) => {
    chai.request(server)
      .post('/api/calls/save-call')
      .set('Authorization', userToken[0])
      .send(newCallData)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(created);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(callSaved);
        expect(res.body).to.have.property('data').to.be.an('object');
        done();
      });
  });
  it('will create read all my call logs', (done) => {
    chai.request(server)
      .get('/api/calls/read-my-calls')
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(callRetrieved);
        expect(res.body).to.have.property('data').to.be.an('object');
        expect(res.body.data).to.have.property('count').to.be.a('number');
        expect(res.body.data).to.have.property('rows').to.be.an('array');
        done();
      });
  });
  it('will read all call logs in general', (done) => {
    chai.request(server)
      .get('/api/calls/read-all-calls')
      .set('Authorization', userToken[1])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(callRetrieved);
        expect(res.body).to.have.property('data').to.be.an('object');
        expect(res.body.data).to.have.property('count').to.be.a('number');
        expect(res.body.data).to.have.property('rows').to.be.an('array');
        done();
      });
  });
  it('will delete a call log', (done) => {
    chai.request(server)
      .delete('/api/calls/delete-call/1')
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(callDeleted);
        done();
      });
  });
});
