
export default (sequelize, DataTypes) => {
  const sms = sequelize.define('sms', {
    storeOwner: DataTypes.INTEGER,
    senderAddress: DataTypes.STRING,
    receiverAddress: DataTypes.STRING,
    dateTime: DataTypes.DATE,
    smsType: DataTypes.STRING,
    smsContent: DataTypes.TEXT,
  }, {
    paranoid: true,
    timestamp: true,
  });
  sms.associate = (models) => {
    sms.belongsTo(models.user, {
      foreignKey: 'storeOwner',
      onUpdate: 'CASCADE',
    });
  };
  return sms;
};
