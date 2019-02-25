'use strict';

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    employee_id: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Employee.associate = function(models) {
    Employee.belongsTo(models.Location, {
      foreignKey:'locationId',
    })
  };
  return Employee;
};