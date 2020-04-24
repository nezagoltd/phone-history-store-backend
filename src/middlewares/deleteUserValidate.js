import UserService from '../services/user.service';
import ResponseHandlers from '../helpers/responseHandlers';
import userRoles from '../helpers/userRoles';
import customMessages from '../helpers/customMessages';
import statusCodes from '../helpers/statusCodes';

const { SUPERUSER } = userRoles;
const { notFound, badRequest, forbidden } = statusCodes;
const {
  userNotExistErrorMsg,
  requestProfileUseNumberErrMsg,
  notDeleteOtherUserAccErrMsg,
  dontDeleteSuperuser,
} = customMessages;

/**
 * @class
 * @classdesc it validates deletion param
 */
class ValidateUserUserDelete extends ResponseHandlers {
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
     * @description it validate the user account deletion
     */
    validateUserDeletion = async (req, res, next) => {
      this.res = res;
      const { userId } = req.params;
      const { sessionUser } = req;
      if (userId) {
        if (!isNaN(userId)) {
          const userIdInt = parseInt(userId, 10);
          if (sessionUser.userRole === SUPERUSER) {
            const userToDelete = await UserService.getBy({ id: userIdInt });
            if (userToDelete) {
              const { dataValues } = userToDelete;
              if (dataValues.userRole === SUPERUSER) {
                this.errorResponse(this.res, forbidden, dontDeleteSuperuser);
              } else {
                req.accountToDelete = userIdInt;
                next();
              }
            } else {
              this.errorResponse(this.res, notFound, userNotExistErrorMsg);
            }
          } else if (userIdInt === sessionUser.id) {
            req.accountToDelete = sessionUser.id;
            next();
          } else {
            this.errorResponse(this.res, forbidden, notDeleteOtherUserAccErrMsg);
          }
        } else {
          this.errorResponse(this.res, badRequest, requestProfileUseNumberErrMsg);
        }
      } else {
        req.accountToDelete = sessionUser.id;
        next();
      }
    }
}

export default ValidateUserUserDelete;
