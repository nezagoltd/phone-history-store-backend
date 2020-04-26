import CrudRepository from '../repository/crudRepository';
import models from '../database/models';

const { sms } = models;
/**
 * @description this class sms service contains all methods regarding creating sms
 * updating sms, reading sms and deleting and sms
 */
class SmsService extends CrudRepository {
  /**
     * @description a constructor and a super methods to call parent class methods
     */
  constructor() {
    super();
    this.model = sms;
  }
}

export default new SmsService();
