'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('shelfLocations', [{
      name: "brown bookcase",
      description:"in the main bedroom",
      createdAt: new Date(),
      updatedAt:new Date()
      
    }], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('shelfLocations', null, {});
  }
};
