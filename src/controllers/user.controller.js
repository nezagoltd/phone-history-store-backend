import _ from 'lodash';
import UserService from '../services/user.service';
import statusCodes from '../helpers/statusCodes';
import ResponseHandlers from '../helpers/responseHandlers';
import { generateToken } from '../helpers/tokenHandler';
import { hashPassword } from '../helpers/passwordHandler';
import customMessages from '../helpers/customMessages';

const {
  created, ok, notFound, badRequest,
} = statusCodes;
const {
  userNotExistErrorMsg,
  requestProfileUseNumberErrMsg,
  accountDeletedSuccessfulyMsg,
} = customMessages;

/**
 * @description this class user controller will work with req, and response to interact with db
 */
export default class UserController extends ResponseHandlers {
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
     * @returns {object} response to user
     */
  saveNewUser = async (req, res) => {
    this.res = res;
    req.body.password = hashPassword(req.body.password);
    const { dataValues } = await UserService.saveAll(req.body);
    this.successResponse(this.res, created, null, generateToken(dataValues), null);
  }

  /**
     * @param {object} req
     * @param {object} res
     * @method
     * @returns {object} response to user
     * @description it sends an authentication token to user if they are authenticated
     */
  retrieveUser = async (req, res) => {
    this.res = res;
    const { gottenUser } = req;
    this.successResponse(this.res, ok, null, generateToken(gottenUser), null);
  }

  /**
   * @param {object} req
   * @param {object} res
   * @return {object} retrievedProfile
   * @method
   * @description it returns the retrieved profile
   */
  retrieveUserProfile = async (req, res) => {
    this.res = res;
    const { requestedProfile } = req.params;
    let retrievedProfile;
    if (requestedProfile) {
      if (!isNaN(requestedProfile)) {
        const userFromDb = await UserService.getBy({ id: parseInt(requestedProfile, 10) });
        if (userFromDb) {
          const { dataValues } = userFromDb;
          retrievedProfile = _.omit(dataValues, 'password');
        } else {
          return this.errorResponse(this.res, notFound, userNotExistErrorMsg);
        }
      } else {
        return this.errorResponse(this.res, badRequest, requestProfileUseNumberErrMsg);
      }
    }
    const { dataValues } = req.sessionUser;
    retrievedProfile = _.omit(dataValues, 'password');
    return this.successResponse(this.res, ok, null, null, retrievedProfile);
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} updatedData
   * @method
   * @description it sends updatedData to user if the update is successful
   */
  updateUserProfile = async (req, res) => {
    this.res = res;
    const dataToUpdate = req.body; // data to submit for update
    const { profileToUpdate } = req; // id of profile to update
    const updatedData = await UserService.updateBy(dataToUpdate, { id: profileToUpdate });
    this.successResponse(this.res, ok, null, null, updatedData);
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} next
   * @method
   * @description it deletes temporary the account
   */
  temporaryDeleteAccount = async (req, res) => {
    this.res = res;
    const { accountToDelete } = req;
    await UserService.temporaryDelete({ id: accountToDelete });
    this.successResponse(this.res, ok, accountDeletedSuccessfulyMsg, null, null);
  }
}
