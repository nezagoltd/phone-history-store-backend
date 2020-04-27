import CallService from '../services/call.service';
import statusCodes from '../helpers/statusCodes';
import ResponseHandlers from '../helpers/responseHandlers';
import customMessages from '../helpers/customMessages';

const {
  created, ok,
} = statusCodes;
const { callSaved, callDeleted, callRetrieved } = customMessages;

/**
 * @description this class sms controller will work with req, and response to interact with db
 */
class CallController extends ResponseHandlers {
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
     * @description it saves call in db
     */
    saveNewCall = async (req, res) => {
      this.res = res;
      req.body.storeOwner = req.sessionUser.id;
      const savedCall = await CallService.saveAll(req.body);
      this.successResponse(this.res, created, callSaved, undefined, savedCall);
    }

    /**
     * @param {object} req
     * @param {object} res
     * @method
     * @returns {object} response to user
     * @description it sends the retrieved call to user if they are authenticated
     */
  retrieveMyCall = async (req, res) => {
    this.res = res;
    const currUserId = req.sessionUser.id;
    const gottenCall = await CallService.getAll({ storeOwner: currUserId });
    this.successResponse(this.res, ok, callRetrieved, undefined, gottenCall);
  }

  /**
     * @param {object} req
     * @param {object} res
     * @method
     * @returns {object} response to user
     * @description it sends the retrieved call to user if they are authenticated
     */
  retrieveAllCall = async (req, res) => {
    this.res = res;
    const gottenCall = await CallService.getAll();
    this.successResponse(this.res, ok, callRetrieved, undefined, gottenCall);
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} next
   * @method
   * @description it deletes temporary the call
   */
  temporaryDeleteCall = async (req, res) => {
    this.res = res;
    await CallService.temporaryDelete({ id: req.itemToDelete });
    this.successResponse(this.res, ok, callDeleted, undefined, undefined);
  }
}

export default new CallController();
