module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('calls', {
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
    callerName: {
      type: Sequelize.STRING,
    },
    callType: {
      type: Sequelize.STRING,
    },
    callDuration: {
      type: Sequelize.INTEGER,
    },
    callingTime: {
      type: Sequelize.DATE,
    },
    callerPhNumber: {
      type: Sequelize.STRING,
    },
    callReceiverPhNumber: {
      type: Sequelize.STRING,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('calls'),
};
