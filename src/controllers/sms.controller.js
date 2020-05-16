import SmsService from '../services/sms.service';
import statusCodes from '../helpers/statusCodes';
import ResponseHandlers from '../helpers/responseHandlers';
import customMessages from '../helpers/customMessages';

const {
  created, ok,
} = statusCodes;
const {
  smsSaved,
  smsRetrieved,
  smsUpdated,
  smsDeleted,
} = customMessages;

/**
 * @description this class sms controller will work with req, and response to interact with db
 */
class SmsController extends ResponseHandlers {
  /**
     * @constructor
     */
  constructor() {
    super();
    this.res = {};
  }

  /**
     * @param {object} req
     * @param {object} res
     * @returns {object} next
     * @method
     * @description it saves sms in db
     */
    saveNewSms = async (req, res) => {
      this.res = res;
      req.body.storeOwner = req.sessionUser.id;
      const savedSms = await SmsService.saveAll(req.body);
      this.successResponse(this.res, created, smsSaved, undefined, savedSms);
    }

    /**
     * @param {object} req
     * @param {object} res
     * @method
     * @returns {object} response to user
     * @description it sends an authentication token to user if they are authenticated
     */
  retrieveMySms = async (req, res) => {
    this.res = res;
    const currUserId = req.sessionUser.id;
    const gottenSms = await SmsService.getAll({ storeOwner: currUserId });
    this.successResponse(this.res, ok, smsRetrieved, undefined, gottenSms);
  }

  /**
     * @param {object} req
     * @param {object} res
     * @method
     * @returns {object} response to user
     * @description it sends an authentication token to user if they are authenticated
     */
    retrieveSmsByDeviceSource = async (req, res) => {
      this.res = res;
      const { deviceSource } = req.params;
      const gottenSms = await SmsService.getAll({ deviceSource });
      this.successResponse(this.res, ok, smsRetrieved, undefined, gottenSms);
    }

  /**
     * @param {object} req
     * @param {object} res
     * @method
     * @returns {object} response to user
     * @description it sends an authentication token to user if they are authenticated
     */
  retrieveAllSms = async (req, res) => {
    this.res = res;
    const gottenSms = await SmsService.getAll();
    this.successResponse(this.res, ok, smsRetrieved, undefined, gottenSms);
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} updatedData
   * @method
   * @description it sends updatedData to user if the update is successful
   */
  updateSms = async (req, res) => {
    this.res = res;
    const { smsToUpdate, smsContent } = req;
    const updatedData = await SmsService.updateBy({ smsContent }, { id: smsToUpdate });
    this.successResponse(this.res, ok, smsUpdated, undefined, updatedData);
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} next
   * @method
   * @description it deletes temporary the sms
   */
  temporaryDeleteSms = async (req, res) => {
    this.res = res;
    await SmsService.temporaryDelete({ id: req.itemToDelete });
    this.successResponse(this.res, ok, smsDeleted, undefined, undefined);
  }
}

export default new SmsController();
