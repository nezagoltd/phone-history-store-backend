import Validators from '../validations/validators';
import UserService from '../services/user.service';
import statusCodes from '../helpers/statusCodes';
import customMessages from '../helpers/customMessages';
import { verifyPassword } from '../helpers/passwordHandler';

const { badRequest, unAuthorized } = statusCodes;
const { phoneNumberOrPasswordWrong } = customMessages;
/**
 * @class
 * @classdesc this class contains all methods of validating login data
 */
class ValidateLogin extends Validators {
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
     * @description it allows to continue if data are correct and add found user to req object
     */
    checkLoginCredentials = async (req, res, next) => {
      this.res = res;
      const { error } = this.validateUserLoginData(req.body);
      if (!error) {
        const foundUser = await UserService.getBy({ phoneNumber: req.body.phoneNumber });
        if (foundUser) {
          const { dataValues } = foundUser;
          const isPasswordValid = verifyPassword(req.body.password, dataValues.password);
          if (isPasswordValid) {
            req.gottenUser = dataValues;
            next();
          } else {
            this.errorResponse(this.res, unAuthorized, phoneNumberOrPasswordWrong);
          }
        } else {
          this.errorResponse(this.res, unAuthorized, phoneNumberOrPasswordWrong);
        }
      }
      this.displayValidationErrorMessage(this, error, this.res, badRequest);
    }
}

export default ValidateLogin;
