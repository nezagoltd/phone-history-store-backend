export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'calls',
      'deviceId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        references: {
          model: 'devices',
          key: 'id',
        },
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.removeColumn('calls', 'deviceId'),
  ]),
};
