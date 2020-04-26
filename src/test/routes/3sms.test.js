/* eslint-disable no-undef */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mockData from '../data/mockData.test';
import server from '../../app';
import statusCodes from '../../helpers/statusCodes';
import customMessages from '../../helpers/customMessages';
import userToken from './2login.test';
import smsAndCallTypes from '../../helpers/smsAndCallTypes';

chai.use(chaiHttp);

const {
  created, ok, badRequest, notFound, forbidden,
} = statusCodes;
const {
  smsSaved,
  smsRetrieved,
  smsUpdateDataEmpty,
  smsDeleted,
  smsUpdated,
  editDraftSmsOnly,
  smsNotExists,
  smsIdMustBeNumber,
  smsNotMine,
  onlySuperUserCanDoThat,
} = customMessages;
const { DRAFT_MSG } = smsAndCallTypes;
let otherSmsId;
let draftSmsId;

const {
  saveSmsDraft,
  saveSmsSent,
  updateSmsDraft,
} = mockData.smsData;

describe('Sms sync tests', () => {
  it('will save a new draft sms in db, expect to get 201', (done) => {
    chai.request(server)
      .post('/api/sms/save-sms')
      .set('Authorization', userToken[0])
      .send(saveSmsDraft)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(created);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(smsSaved);
        expect(res.body).to.have.property('data').to.be.an('object');
        done();
      });
  });
  it('will save a new sent sms in db, expect to get 201', (done) => {
    chai.request(server)
      .post('/api/sms/save-sms')
      .set('Authorization', userToken[0])
      .send(saveSmsSent)
      .end((err, res) => {
        if (err) done(err);
        done();
      });
  });
  it('will retrieve all saved sms from the db, expect to get 200', (done) => {
    chai.request(server)
      .get('/api/sms/read-my-sms')
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        const allSavedSms = res.body.data.rows;
        for (let i = 0; i < allSavedSms.length; i += 1) {
          if (allSavedSms[i].smsType === DRAFT_MSG) {
            draftSmsId = allSavedSms[i].id;
          } else {
            otherSmsId = allSavedSms[i].id;
          }
        }
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(smsRetrieved);
        expect(res.body).to.have.property('data').to.be.a('object');
        expect(res.body.data).to.have.property('count').to.be.an('number');
        expect(res.body.data).to.have.property('rows').to.be.an('array');
        done();
      });
  });
  it('will retrieve all saved sms from the db, expect to get 200', (done) => {
    chai.request(server)
      .get('/api/sms/read-all-sms')
      .set('Authorization', userToken[1])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(smsRetrieved);
        expect(res.body).to.have.property('data').to.be.a('object');
        expect(res.body.data).to.have.property('count').to.be.an('number');
        expect(res.body.data).to.have.property('rows').to.be.an('array');
        done();
      });
  });
  it('will retrieve all saved sms from the db, expect to get 200', (done) => {
    chai.request(server)
      .get('/api/sms/read-all-sms')
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(forbidden);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(onlySuperUserCanDoThat);
        done();
      });
  });
  it('will update sms, expect to get 200 status', (done) => {
    chai.request(server)
      .patch(`/api/sms/edit-sms/${draftSmsId}`)
      .set('Authorization', userToken[0])
      .send(updateSmsDraft)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(smsUpdated);
        expect(res.body).to.have.property('data').to.be.an('array').to.have.length(2);
        done();
      });
  });
  it('will not update sms because it is not a draft sms, expect to get 400 status', (done) => {
    chai.request(server)
      .patch(`/api/sms/edit-sms/${otherSmsId}`)
      .set('Authorization', userToken[0])
      .send(updateSmsDraft)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(editDraftSmsOnly);
        done();
      });
  });
  it('will not update sms because the sms does not exist, expect to get 400 status', (done) => {
    chai.request(server)
      .patch('/api/sms/edit-sms/0')
      .set('Authorization', userToken[0])
      .send(updateSmsDraft)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(notFound);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(smsNotExists);
        done();
      });
  });
  it('will not update sms because it is not a draft sms, expect to get 400 status', (done) => {
    chai.request(server)
      .patch('/api/sms/edit-sms/cool')
      .set('Authorization', userToken[0])
      .send(updateSmsDraft)
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(smsIdMustBeNumber);
        done();
      });
  });
  it('will not update sms because it is not a draft sms, expect to get 400 status', (done) => {
    chai.request(server)
      .patch(`/api/sms/edit-sms/${draftSmsId}`)
      .set('Authorization', userToken[0])
      .send({})
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(smsUpdateDataEmpty);
        done();
      });
  });

  it('will not delete sms because the sms is not mine, expect to get 403 status', (done) => {
    chai.request(server)
      .delete(`/api/sms/delete-sms/${draftSmsId}`)
      .set('Authorization', userToken[2])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(forbidden);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(smsNotMine);
        done();
      });
  });
  it('will delete sms, expect to get 200 status', (done) => {
    chai.request(server)
      .delete(`/api/sms/delete-sms/${draftSmsId}`)
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(smsDeleted);
        done();
      });
  });
  it('will not delete sms because smsId is not a number, expect to get 400 status', (done) => {
    chai.request(server)
      .delete('/api/sms/delete-sms/cool')
      .set('Authorization', userToken[0])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(badRequest);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(smsIdMustBeNumber);
        done();
      });
  });
  it('will not delete sms because the sms does not exist, expect to get 404 status', (done) => {
    chai.request(server)
      .delete(`/api/sms/delete-sms/${draftSmsId}`)
      .set('Authorization', userToken[2])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(notFound);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error').to.be.a('string').to.equal(smsNotExists);
        done();
      });
  });
  it('will delete any sms as a super user, expect to get 200 status', (done) => {
    chai.request(server)
      .delete(`/api/sms/delete-sms/${otherSmsId}`)
      .set('Authorization', userToken[1])
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(ok);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message').to.be.a('string').to.equal(smsDeleted);
        done();
      });
  });
});
