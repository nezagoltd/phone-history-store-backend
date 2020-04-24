
export default (sequelize, DataTypes) => {
  const sms = sequelize.define('sms', {
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
    // associations can be defined here
  };
  return sms;
};
