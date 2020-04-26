import statusCodes from '../helpers/statusCodes';
import customMessages from '../helpers/customMessages';
import smsAndCallTypes from '../helpers/smsAndCallTypes';
import SmsService from '../services/sms.service';
import ResponseHandlers from '../helpers/responseHandlers';
import userRoles from '../helpers/userRoles';

const { badRequest, notFound, forbidden } = statusCodes;
const {
  smsIdEmpty,
  editDraftSmsOnly,
  smsIdMustBeNumber,
  smsNotExists, smsUpdateDataEmpty, smsNotMine,
} = customMessages;
const { SUPERUSER } = userRoles;

/**
 * @class
 * @classdesc this class contains methods to validate sms update methods
 */
class ValidateSmsDelete extends ResponseHandlers {
  /**
     * @constructor
     */
  constructor() {
    super();
    this.res = {};
  }

    /**
     * @param {object} req
     * @param {object} next
     * @returns {object} next
     * @method
     * @description it returns next or error response if the params are okay
     */
    smsExists = async (req, next) => {
      const smsToDelete = parseInt(req.params.smsId, 10);
      const smsInDb = await SmsService.getBy({ id: smsToDelete });
      if (smsInDb) {
        const { dataValues } = smsInDb;
        if (req.sessionUser.userRole !== SUPERUSER) {
          if (dataValues.storeOwner === req.sessionUser.id) {
            req.smsToDelete = smsToDelete;
            next();
          } else {
            this.errorResponse(this.res, forbidden, smsNotMine);
          }
        } else {
          req.smsToDelete = smsToDelete;
          next();
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
     * @description it evaluates the delete sms params
     */
    validateSmsDeleteData = async (req, res, next) => {
      this.res = res;
      const { smsId } = req.params;
      if (!isNaN(smsId)) {
        this.smsExists(req, next);
      } else {
        this.errorResponse(this.res, badRequest, smsIdMustBeNumber);
      }
    }
}

export default ValidateSmsDelete;
