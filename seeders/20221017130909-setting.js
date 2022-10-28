'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'Settings',
            [
                {
                    id: 0,
                    title: '',
                    subTitle: '',
                    textColor: '',
                    bgColor: '',
                    background: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {}
        );
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Settings', null, {});
    },
};
