import ResponseHandlers from '../helpers/responseHandlers';
import statusCodes from '../helpers/statusCodes';
import customMessages from '../helpers/customMessages';
import userRoles from '../helpers/userRoles';

const { SUPERUSER } = userRoles;
const { forbidden } = statusCodes;
const { onlySuperUserCanDoThat } = customMessages;

/**
 * @class
 * @classdesc it evaluates who is retrieving all sms
 */
class ValidateAllLogsRetrieve extends ResponseHandlers {
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
     * @param {object} next
     * @returns {object} next
     * @method
     * @description it validates the user requesting all sms, only super user can read all msg
     */
    validateAllLogsRetrieve = async (req, res, next) => {
      this.res = res;
      const { sessionUser } = req;
      if (sessionUser.userRole === SUPERUSER) {
        next();
      } else {
        this.errorResponse(this.res, forbidden, onlySuperUserCanDoThat);
      }
    }
}

export default ValidateAllLogsRetrieve;
