import CrudRepository from '../repository/crudRepository';
import models from '../database/models';

const { call } = models;
/**
 * @description this class call service contains all methods regarding creating call
 * updating call, reading call and deleting and call from the inheritance to CrudRepository
 */
class CallService extends CrudRepository {
  /**
     * @description a constructor and a super methods to call parent class methods
     */
  constructor() {
    super();
    this.model = call;
  }
}

export default new CallService();
