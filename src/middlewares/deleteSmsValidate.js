import ValidateItemDelete from './deleteItemValidate';
import SmsService from '../services/sms.service';
import customMessages from '../helpers/customMessages';

const { smsNotExists, smsNotMine, smsIdMustBeNumber } = customMessages;
/**
 * @class
 * @classdesc it validate delete sms
 */
class ValidateSmsDelete extends ValidateItemDelete {
  /**
     * @constructor
     */
  constructor() {
    super();
    this.itemNotExistsErrMsg = smsNotExists;
    this.itemIdMustBeNumber = smsIdMustBeNumber;
    this.itemNotMine = smsNotMine;
    this.req = {};
    this.res = {};
    this.next = {};
    this.service = SmsService;
  }

    /**
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @method
     * @returns {object} next
     * @description it validate the sms deletion id
     */
    validateSmsDeleteData = async (req, res, next) => {
      this.req = req;
      this.res = res;
      this.next = next;
      const { smsId } = this.req.params;
      await this.validateItemDeleteData(smsId);
    }
}

export default ValidateSmsDelete;
