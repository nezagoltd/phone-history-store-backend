export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'sms', 'deviceSource',
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
    queryInterface.removeColumn('sms', 'deviceSource'),
  ]),
};
