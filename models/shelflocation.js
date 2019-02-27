'use strict';
module.exports = (sequelize, DataTypes) => {
  const shelfLocation = sequelize.define('shelfLocation', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    description: {
      type: DataTypes.STRING,
      allowNull: false
    } 
  }, {});
  shelfLocation.associate = function(models) {
    // associations can be defined here
  };
  return shelfLocation;
};