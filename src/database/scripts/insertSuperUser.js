import dotenv from 'dotenv';
import { hashPassword } from '../../helpers/passwordHandler';
import UserService from '../../services/user.service';

dotenv.config();

const {
  SU_FNAME, SU_LNAME, SU_EMAIL, SU_AGE, SU_PASSWORD, SU_PHNUMBER,
} = process.env;
const superUser = {
  firstName: SU_FNAME,
  lastName: SU_LNAME,
  email: SU_EMAIL,
  phoneNumber: SU_PHNUMBER,
  age: SU_AGE,
  password: hashPassword(SU_PASSWORD),
  userRole: 'super user',
  isPhoneVerified: true,
  isEmailVerified: true,
};

/**
 * @return {*} void
 * @description it insert superuser into db
 */
const insertSuperuser = async () => {
  await UserService.saveAll(superUser);
};

insertSuperuser();
