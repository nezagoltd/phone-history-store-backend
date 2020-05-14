
module.exports = (sequelize, DataTypes) => {
  const deviceInfo = sequelize.define('deviceInfo', {
    userId: DataTypes.INTEGER,
    deviceId: DataTypes.STRING,
  }, {});
  deviceInfo.associate = (models) => {
    // associations can be defined here
  };
  return deviceInfo;
};
