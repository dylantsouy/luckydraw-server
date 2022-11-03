'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Rewards', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            size: {
                type: Sequelize.INTEGER,
            },
            count: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            order: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            url: {
                type: Sequelize.STRING,
            },
            winning: {
                type: Sequelize.JSON,
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
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Rewards');
    },
};
