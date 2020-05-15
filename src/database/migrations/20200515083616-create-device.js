export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('devices', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    deviceOwner: {
      type: Sequelize.INTEGER,
    },
    deviceUniqueId: {
      type: Sequelize.STRING,
    },
    deviceName: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('devices'),
};
