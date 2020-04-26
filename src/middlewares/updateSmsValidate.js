import statusCodes from '../helpers/statusCodes';
import customMessages from '../helpers/customMessages';
import smsAndCallTypes from '../helpers/smsAndCallTypes';
import SmsService from '../services/sms.service';
import ResponseHandlers from '../helpers/responseHandlers';

const { badRequest, notFound } = statusCodes;
const {
  smsIdEmpty,
  editDraftSmsOnly,
  smsIdMustBeNumber,
  smsNotExists, smsUpdateDataEmpty,
} = customMessages;
const { DRAFT_MSG } = smsAndCallTypes;

/**
 * @class
 * @classdesc this class contains methods to validate sms update methods
 */
class ValidateSmsUpdate extends ResponseHandlers {
  /**
     * @constructor
     */
  constructor() {
    super();
    this.res = {};
  }

  /**
   *@param {object} req
   *@param {object} next
   *@returns {object} next
   */
  contentToUpdate = (req, next) => {
    const { smsContent } = req.body;
    if (smsContent) {
      req.smsContent = smsContent;
      next();
    } else {
      this.errorResponse(this.res, badRequest, smsUpdateDataEmpty);
    }
  }

    /**
     * @param {object} req
     * @param {object} next
     * @return {object} next
     */
    smsExists = async (req, next) => {
      const smsInDb = await SmsService.getBy({ id: req.smsToUpdate });
      if (smsInDb) {
        const { dataValues } = smsInDb;
        if (dataValues.smsType === DRAFT_MSG) {
          this.contentToUpdate(req, next);
        } else {
          this.errorResponse(this.res, badRequest, editDraftSmsOnly);
        }
      } else {
        this.errorResponse(this.res, notFound, smsNotExists);
      }
    }

    /**
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} next
     * @method
     * @description it takes the submitted data and evaluates and then
     * it sends next or error response
     */
    validateSmsUpdateData = async (req, res, next) => {
      this.res = res;
      const { smsId } = req.params;
      if (!isNaN(smsId)) {
        req.smsToUpdate = parseInt(smsId, 10);
        this.smsExists(req, next);
      } else {
        this.errorResponse(this.res, badRequest, smsIdMustBeNumber);
      }
    }
}

export default ValidateSmsUpdate;
