import CrudRepository from '../repository/crudRepository';
import models from '../database/models';

const { device } = models;

/**
 * @class
 * @classdesc
 */
class DeviceService extends CrudRepository {
  /**
     * @constructor
     */
  constructor() {
    super();
    this.model = device;
  }
}

export default new DeviceService();
