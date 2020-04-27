module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    storeOwner: {
      allowNull: false,
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      },

    },
    senderAddress: {
      type: Sequelize.STRING,
    },
    receiverAddress: {
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
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('sms'),
};
