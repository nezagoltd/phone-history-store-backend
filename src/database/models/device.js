export default (sequelize, DataTypes) => {
  const device = sequelize.define('device', {
    deviceOwner: DataTypes.INTEGER,
    deviceUniqueId: DataTypes.STRING,
    deviceName: DataTypes.STRING,
  }, {
    paranoid: true,
    timestamp: true,
  });
  device.associate = (models) => {
    device.belongsTo(models.user, {
      foreignKey: 'deviceOwner',
      onUpdate: 'CASCADE',
    });
    device.hasMany(models.call, {
      foreignKey: 'deviceId',
      onUpdate: 'CASCADE',
    });
    device.hasMany(models.sms, {
      foreignKey: 'deviceId',
      onUpdate: 'CASCADE',
    });
  };
  return device;
};
