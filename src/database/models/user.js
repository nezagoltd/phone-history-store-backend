
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
  user.associate = (models) => {
    user.hasMany(models.sms, {
      foreignKey: 'storeOwner',
      onUpdate: 'CASCADE',
    });
    user.hasMany(models.call, {
      foreignKey: 'storeOwner',
      onUpdate: 'CASCADE',
    });
  };
  return user;
};
