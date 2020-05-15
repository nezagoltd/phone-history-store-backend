export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'sms',
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
    queryInterface.removeColumn('sms', 'deviceId'),
  ]),
};
