import Validators from '../validations/validators';
import statusCodes from '../helpers/statusCodes';
import customMessages from '../helpers/customMessages';
import userRoles from '../helpers/userRoles';
import UserService from '../services/user.service';

const { badRequest, forbidden, notFound } = statusCodes;
const {
  unAuthorizedProfileUpdate,
  requestProfileUseNumberErrMsg,
  userNotExistErrorMsg,
} = customMessages;
const { SUPERUSER } = userRoles;

/**
 * @class
 * @classdesc this class contains methods to validate user update methods
 */
class ValidateUserUpdate extends Validators {
  /**
     * @constructor
     */
  constructor() {
    super();
    this.res = {};
    this.isUpdate = true;
  }

  /**
   * @param {object} sessionUser
   * @param {*} profileToUpdate
   * @param {object} req
   * @param {object} next
   * @returns {*} void
   */
  midMeth = async (sessionUser, profileToUpdate, req, next) => {
    if (sessionUser.userRole === SUPERUSER) {
      const userFromDb = await UserService.getBy({ id: parseInt(profileToUpdate, 10) });
      if (userFromDb) {
        req.profileToUpdate = parseInt(profileToUpdate, 10);
        next();
      } else {
        this.errorResponse(this.res, notFound, userNotExistErrorMsg);
      }
    } else {
      this.errorResponse(this.res, forbidden, unAuthorizedProfileUpdate);
    }
  }

    /**
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @return {object} next
     */
    validateUserUpdateData = async (req, res, next) => {
      this.res = res;
      const { error } = this
        .validateUserRegisterOrUpdateData({ user: req.body, isUpdate: this.isUpdate });
      if (!error) {
        const { sessionUser } = req;
        const { profileToUpdate } = req.params;
        if (profileToUpdate) {
          if (!isNaN(profileToUpdate)) {
            await this.midMeth(sessionUser, profileToUpdate, req, next);
          } else {
            this.errorResponse(this.res, badRequest, requestProfileUseNumberErrMsg);
          }
        } else {
          req.profileToUpdate = sessionUser.id;
          next();
        }
      } else {
        this.displayValidationErrorMessage(this, error, this.res, badRequest);
      }
    }
}

export default ValidateUserUpdate;
