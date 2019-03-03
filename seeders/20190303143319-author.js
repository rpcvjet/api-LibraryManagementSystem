'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('Authors', [{
        name: 'JK Rowiling',
        createdAt: new Date(),
        updatedAt:new Date()
      }, {
        name: 'Alice Walker',
        createdAt: new Date(),
        updatedAt:new Date()

      },{
        name: 'Tom Clancy',
        createdAt: new Date(),
        updatedAt:new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Author', null, {});
    
  }
};
