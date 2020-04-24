import DataHelper from '../helpers/dataHelper';

const { removeUnexpectedInput } = DataHelper;
/**
 * @description this class CrudRepository contains Create, Read, Update, methods which work with
 * database immediately, it can be extended or called from services, controllers, or routes
 */
export default class CrudRepository {
  /**
     * @param {object} model
     * @description returns the model name
     */
  constructor() {
    this.model = {};
  }

  /**
     * @param {object} inputData
     * @returns {object} savedData
     * @description it returns the saved data
     */
  saveAll = async (inputData) => {
    const acceptedSave = removeUnexpectedInput(this.tableAttributes, inputData);
    const savedData = await this.model.create(acceptedSave);
    return savedData;
  }

  /**
   * @param {object} whereCondition
   * @returns {object} foundRes
   * @method
   * @description it gets whereCondition which should be an object containing the attribute of the
   * table and its value, example if you want to get by phoneNumber, ypu will pass the
   * whereCondition as this {phoneNumber:"+250722792371"} then it returns the object containing a
   * user with that phoneNumber
   */
  getBy = async (whereCondition) => {
    const foundRes = await this.model.findOne({ where: whereCondition });
    return foundRes;
  }

  /**
   * @param {object} dataToUpdate
   * @param {object} whereCondition
   * @returns {object} updatedData
   * @method
   * @description it gets the data to update as argument and where condition and it returns the
   * updated data
   */
  updateBy = async (dataToUpdate, whereCondition) => {
    const validDataToUpdate = removeUnexpectedInput(this.tableAttributes, dataToUpdate);
    const updatedData = await this.model.update(validDataToUpdate, {
      where: whereCondition, returning: true,
    });
    return updatedData;
  }

  /**
   * @param {object} whereCondition
   * @returns {string} deleteEntry
   * @method
   * @description it deletes the entry from a model
   */
  temporaryDelete = async (whereCondition) => {
    const deletedEntry = await this.model.destroy({ where: whereCondition });
    return deletedEntry;
  }
}
