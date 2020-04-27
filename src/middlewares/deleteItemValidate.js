import statusCodes from '../helpers/statusCodes';
import ResponseHandlers from '../helpers/responseHandlers';
import userRoles from '../helpers/userRoles';

const { badRequest, notFound, forbidden } = statusCodes;
const { SUPERUSER } = userRoles;

/**
 * @class
 * @classdesc this class contains methods to validate sms update methods
 */
class ValidateItemDelete extends ResponseHandlers {
  /**
     * @constructor
     */
  constructor() {
    super();
    this.res = {};
    this.itemNotExistsErrMsg = {};
    this.itemIdMustBeNumber = {};
    this.itemNotMine = {};
    this.req = {};
    this.res = {};
    this.next = {};
    this.service = {};
  }

    /**
     * @param {object} itemId
     * @returns {object} next
     * @method
     * @description it evaluates the delete item params
     */
    validateItemDeleteData = async (itemId) => {
      if (!isNaN(itemId)) {
        const itemToDelete = parseInt(itemId, 10);
        const itemInDb = await this.service.getBy({ id: itemToDelete });
        if (itemInDb) {
          const { dataValues } = itemInDb;
          if (this.req.sessionUser.userRole !== SUPERUSER) {
            if (dataValues.storeOwner === this.req.sessionUser.id) {
              this.req.itemToDelete = itemToDelete;
              this.next();
            } else {
              this.errorResponse(this.res, forbidden, this.itemNotMine);
            }
          } else {
            this.req.itemToDelete = itemToDelete;
            this.next();
          }
        } else {
          this.errorResponse(this.res, notFound, this.itemNotExistsErrMsg);
        }
      } else {
        this.errorResponse(this.res, badRequest, this.itemIdMustBeNumber);
      }
    }
}

export default ValidateItemDelete;
