'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      background: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      subTitle: {
        type: Sequelize.STRING
      },
      bgColor: {
        type: Sequelize.STRING
      },
      textColor: {
        type: Sequelize.STRING
      },
      companyId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'Companies',
          key: 'id',
          as: 'companyId',
        }
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
    await queryInterface.dropTable('Settings');
  }
};