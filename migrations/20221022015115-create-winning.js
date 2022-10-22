'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Winnings', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      rewardId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'NO ACTION',
        references: {
          model: 'Rewards',
          key: 'id',
          as: 'rewardId',
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: 'NO ACTION',
        onUpdate:"CASCADE",
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId',
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
    await queryInterface.dropTable('Winnings');
  }
};