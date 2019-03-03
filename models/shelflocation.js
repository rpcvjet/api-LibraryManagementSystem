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
    shelfLocation.hasMany(models.Book, {
      foreignKey:'shelfLocationId'
    })
  };
  return shelfLocation;
}; 