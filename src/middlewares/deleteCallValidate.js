import ValidateItemDelete from './deleteItemValidate';
import CallService from '../services/call.service';
import customMessages from '../helpers/customMessages';

const { callNotExists, callNotMine, callIdMustBeNumber } = customMessages;
/**
 * @class
 * @classdesc it validate delete call
 */
class ValidateCallDelete extends ValidateItemDelete {
  /**
     * @constructor
     */
  constructor() {
    super();
    this.itemNotExistsErrMsg = callNotExists;
    this.itemIdMustBeNumber = callIdMustBeNumber;
    this.itemNotMine = callNotMine;
    this.req = {};
    this.res = {};
    this.next = {};
    this.service = CallService;
  }

    /**
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @method
     * @returns {object} next
     * @description it validate the sms deletion id
     */
    validateCallDeleteData = async (req, res, next) => {
      this.req = req;
      this.res = res;
      this.next = next;
      const { callId } = this.req.params;
      await this.validateItemDeleteData(callId);
    }
}

export default ValidateCallDelete;
