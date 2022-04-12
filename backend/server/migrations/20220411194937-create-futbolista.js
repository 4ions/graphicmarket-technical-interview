'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Futbolista', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      team_id: {
        type:Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Equipo',
          key: 'id',
          as: 'team_id'
        },
      },
      squad_number: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Futbolista');
  }
};