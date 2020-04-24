import CrudRepository from '../repository/crudRepository';
import models from '../database/models';

const { user } = models;
/**
 * @description this class user service contains all methods regarding creating user
 * updating user, reading user and deleting a user
 */
class UserService extends CrudRepository {
  /**
     * @description a constructor and a super methods to call parent class methods
     */
  constructor() {
    super();
    this.model = user;
    this.tableAttributes = Object.keys(this.model.rawAttributes);
  }
}

export default new UserService();
