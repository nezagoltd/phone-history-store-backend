import Joi from '@hapi/joi';
import customMessages from '../helpers/customMessages';
import { displayValidationErrorMessage, createValidationErrorMessage } from './validationRules';
import ResponseHandlers from '../helpers/responseHandlers';

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,15}$/;
const NAMES_REGEX = /^[A-Za-z]+$/;
const {
  namesErrorMessage,
  passwordErrorMessage,
  emailErrorMessage,
  phoneNumberErrorMessage,
  ageErrorMessage,
  phoneNumberEmpty,
  passwordEmpty,
} = customMessages;

/**
 *@classdesc contains all of validations, means some data needs to have specific format
 *otherwise we show error
 */
class Validators extends ResponseHandlers {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.res = {};
    this.displayValidationErrorMessage = displayValidationErrorMessage;
  }

  /**
   * @param {object} regex
   * @param {object} message
   * @param {object} isUpdate
   * @returns {object} string
   * @method
   * @description it returns the cleared string to validate
   */
  clearToValidate = (regex, message, isUpdate) => (isUpdate ? Joi.string().regex(regex).trim()
    .messages(createValidationErrorMessage('string', message)) : Joi.string().regex(regex).trim().required()
    .messages(createValidationErrorMessage('string', message)));

  /**
   * @param {object} userData
   * @returns {object} errorMessage
   * @description it takes userData and validate them, and after it returns the error messages
   * if something is wrong
   */
  validateUserRegisterOrUpdateData = (userData) => {
    const { isUpdate, user } = userData;
    const schema = Joi.object({
      firstName: this.clearToValidate(NAMES_REGEX, namesErrorMessage, isUpdate),
      lastName: this.clearToValidate(NAMES_REGEX, namesErrorMessage, isUpdate),
      password: this.clearToValidate(PASSWORD_REGEX, passwordErrorMessage, isUpdate),
      email: this.clearToValidate(EMAIL_REGEX, emailErrorMessage, isUpdate),
      phoneNumber: isUpdate ? Joi.string().messages(createValidationErrorMessage('string', phoneNumberErrorMessage))
        : Joi.string().required().messages(createValidationErrorMessage('string', phoneNumberErrorMessage)),
      age: isUpdate ? Joi.number().messages(createValidationErrorMessage('string', ageErrorMessage))
        : Joi.number().required().messages(createValidationErrorMessage('string', ageErrorMessage)),
    });
    return schema.validate(user, { abortEarly: false, allowUnknown: true });
  }

  /**
   * @param {object} userData
   * @returns {object} errors
   * @method
   * @description it returns error if there are any
   */
  validateUserLoginData = (userData) => {
    const schema = Joi.object({
      phoneNumber: Joi.string().required().messages(createValidationErrorMessage('string', phoneNumberEmpty)),
      password: Joi.string().required().messages(createValidationErrorMessage('string', passwordEmpty)),
    });
    return schema.validate(userData, { abortEarly: false, allowUnknown: false });
  }
}

export default Validators;
