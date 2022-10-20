'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: uuidv4(),
      name: '陳大名',
      code: 'A0001',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: uuidv4(),
      name: '陳阿名',
      code: 'A0002',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: uuidv4(),
      name: '州大俠',
      code: 'A0003',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: uuidv4(),
      name: '王老闆',
      code: 'A0004',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: uuidv4(),
      name: '林大哥',
      code: 'A0005',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
