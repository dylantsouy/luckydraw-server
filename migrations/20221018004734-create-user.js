'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING(30),
            },
            code: {
                allowNull: false,
                type: Sequelize.STRING(10),
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
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            deletedAt: {
              type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    },
};
