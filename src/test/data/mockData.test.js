import dotenv from 'dotenv';

dotenv.config();

const { SU_PHNUMBER, SU_PASSWORD } = process.env;

export default {
  signup: {
    signupValidData: {
      firstName: 'Phone',
      lastName: 'History',
      email: 'phonehistorystore@nezastore.neza',
      phoneNumber: '+123456789',
      password: 'Phonehistory1.',
      age: 25,
    },
    signupThirdPartyData: {
      firstName: 'Phone',
      lastName: 'History',
      email: 'phonehistorystore@nezastore.neza',
      phoneNumber: '+123456780',
      password: 'Phonehistory1.',
      age: 25,
    },
    signupWithSomeOtherUnnecessaryData: {
      firstName: 'PhoneHistory',
      nickname: 'PhoneHistory1',
      country: 'PhoneHistory1',
      manager: 'PhoneHistory1',
      lastName: 'Store',
      email: 'phonehistorystore@nezastore.neza',
      phoneNumber: '+122345678',
      password: 'Phonehistory1.',
      age: 25,
    },
    signupDuplicateData: {
      firstName: 'PhoneHistory',
      lastName: 'Store',
      email: 'phonehistorystore@nezastore.neza',
      phoneNumber: '+123456789',
      password: 'Phonehistory1.',
      age: 25,
    },
    signupFirstNameBadFormatData: {
      firstName: 'PhoneHistory132w',
      lastName: 'Store',
      email: 'phonehistorystore@nezastore.neza',
      phoneNumber: '+112345678',
      password: 'Phonehistory1.',
      age: 25,
    },
    signupLastNameBadFormatData: {
      firstName: 'PhoneHistory1',
      lastName: 'Store',
      email: 'phonehistorystore@nezastore.neza',
      phoneNumber: '+112345678',
      password: 'Phonehistory1.',
      age: 25,
    },
    signupEmailFormatData: {
      firstName: 'PhoneHistory',
      lastName: 'Store',
      email: 'phonecoool',
      phoneNumber: '+112345678',
      password: 'Phonehistory1.',
      age: 25,
    },
    signupPasswordBadFormatData: {
      firstName: 'PhoneHistory',
      lastName: 'Store',
      email: 'phonehistorystore@nezastore.neza',
      phoneNumber: '+112345678',
      password: 'Phonehistory',
      age: 25,
    },
    signupAgeEmpty: {
      firstName: 'PhoneHistory',
      lastName: 'Store',
      email: 'phonehistorystore@nezastore.neza',
      phoneNumber: '+112345678',
      password: 'Phonehistory1.',
    },
    signupPhoneNumberEmpty: {
      firstName: 'PhoneHistory',
      lastName: 'Store',
      email: 'phonehistorystore@nezastore.neza',
      password: 'Phonehistory1.',
      age: 24,
    },
    signupFirstNameEmpty: {
      lastName: 'Store',
      email: 'phonehistorystore@nezastore.neza',
      password: 'Phonehistory1.',
      phoneNumber: '+12345675',
      age: 24,
    },
    signupLastNameEmpty: {
      firstName: 'Store',
      email: 'phonehistorystore@nezastore.neza',
      password: 'Phonehistory1.',
      phoneNumber: '+12345566',
      age: 24,
    },
    signupEmailEmpty: {
      lastName: 'Phone',
      firstName: 'Store',
      password: 'Phonehistory1.',
      phoneNumber: '+212234445',
      age: 24,
    },
    signupPasswordEmpty: {
      lastName: 'Phone',
      firstName: 'Store',
      email: 'phonehistorystore@nezastore.neza',
      phoneNumber: '+1234567',
      age: 24,
    },
    signupFirstNameAndLastNameEmpty: {
      email: 'phonehistorystore@nezastore.neza',
      password: 'Phone1.',
      age: 24,
    },
    signupPasswordAndEmailEmpty: {
      lastName: 'Phone',
      firstName: 'Store',
      Age: 24,
    },
  },
  login: {
    loginValidData: {
      phoneNumber: '+123456789',
      password: 'Phonehistory1.',
    },
    superuserLogin: {
      phoneNumber: SU_PHNUMBER,
      password: SU_PASSWORD,
    },
    loginThirdParty: {
      phoneNumber: '+123456780',
      password: 'Phonehistory1.',
    },
    loginInValidData: {
      phoneNumber: '+0000000000',
      password: 'Phonehistory1.',
    },
    loginInValidPassword: {
      phoneNumber: '+123456789',
      password: '+0000000000',
    },
    loginPasswordEmpty: {
      phoneNumber: '+123456789',
    },
    loginPhoneNumberEmpty: {
      password: 'Phonehistory1.',
    },
    loginPhoneNumberAndPasswordEmpty: {
    },
  },
  profile: {
    invalidToken: 'emma',
    tokenOfUserWhoDoesnExist: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiZW1tYSIsImxhc3ROYW1lIjoiZW1tYSIsImVtYWlsIjoiZW1tYUBuZXphc3RvcmUubmV6YSIsInBob25lTnVtYmVyIjoiKzAwMCIsImFnZSI6MTIsInVwZGF0ZWRBdCI6IjIwMjAtMDQtMjBUMTA6MTE6MjEuNjMxWiIsImNyZWF0ZWRBdCI6IjIwMjAtMDQtMjBUMTA6MTE6MjEuNjMxWiIsImlzUGhvbmVWZXJpZmllZCI6dHJ1ZSwiaXNFbWFpbFZlcmlmaWVkIjp0cnVlLCJ1c2VyUm9sZSI6ImJhc2ljIHVzZXIiLCJkZWxldGVkQXQiOm51bGwsImlhdCI6MTU4NzM3NzQ4MSwiZXhwIjoxNTg3NDYzODgxfQ.6_0CL3u6QHcpgVYrQEdYkLAi5wJ4lioFy2pmv5Jf5GM',
    updateProfileValidData: {
      firstName: 'phone',
      lastName: 'history',
    },
    updateProfileInValidData: {
      firstName: 'phone123',
      lastName: 'history222',
    },
  },
};
