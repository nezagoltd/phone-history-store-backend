import Validators from '../validations/validators';
import UserService from '../services/user.service';
import statusCodes from '../helpers/statusCodes';
import customMessages from '../helpers/customMessages';

const { badRequest, conflict } = statusCodes;
const { phoneNumberAlreadyExists } = customMessages;
/**
 * @class
 * @classdesc it validate signup data
 */
class ValidateSignup extends Validators {
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
 * @description it allows to continue if the signup data are valid otherwise
 * it sends error response to user
 */
validateSignupData = async (req, res, next) => {
  this.res = res;
  const userData = req.body;
  const { error } = this.validateUserRegisterOrUpdateData({ user: userData });
  if (!error) {
    const existingUser = await UserService.getBy({ phoneNumber: userData.phoneNumber });
    if (!existingUser) {
      next();
    } else {
      this.errorResponse(this.res, conflict, phoneNumberAlreadyExists);
    }
  } else {
    this.displayValidationErrorMessage(this, error, this.res, badRequest);
  }
};
}

export default ValidateSignup;
