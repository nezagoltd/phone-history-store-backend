module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    address: {
      type: Sequelize.STRING,
    },
    dateTime: {
      type: Sequelize.DATE,
    },
    smsType: {
      type: Sequelize.STRING,
    },
    smsContent: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('sms'),
};
