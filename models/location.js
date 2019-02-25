'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    branch: {
      type: DataTypes.STRING,
      allowNull:false
    },
    address:{
      type: DataTypes.STRING,
      allowNull:false
    } 
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.Employee, {
      as: 'employees'
    })
  };
  return Location;
};