import dotenv from 'dotenv';
import { hashPassword } from '../../helpers/passwordHandler';

dotenv.config();

const {
  SU_FNAME, SU_LNAME, SU_EMAIL, SU_AGE, SU_PASSWORD, SU_PHNUMBER,
} = process.env;

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    firstName: SU_FNAME,
    lastName: SU_LNAME,
    email: SU_EMAIL,
    age: SU_AGE,
    password: hashPassword(SU_PASSWORD),
    phoneNumber: SU_PHNUMBER,
    userRole: 'super user',
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};
