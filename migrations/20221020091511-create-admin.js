'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(64),
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(64),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      role: {
          allowNull: false,
          type: Sequelize.INTEGER,
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
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Admins');
  }
};