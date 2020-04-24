
export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    age: DataTypes.INTEGER,
    isPhoneVerified: DataTypes.BOOLEAN,
    isEmailVerified: DataTypes.BOOLEAN,
    userRole: DataTypes.STRING,
  }, {
    paranoid: true,
    timestamp: true,
  });
  return user;
};
