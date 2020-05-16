export default {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'calls',
      'deviceSource',
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
    queryInterface.removeColumn('calls', 'deviceSource'),
  ]),
};
