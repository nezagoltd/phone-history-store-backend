import CrudRepository from '../repository/crudRepository';
import models from '../database/models';

const { device, call, sms } = models;

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
    this.associateTable = [call, sms];
  }
}

export default new DeviceService();
