'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    booksOut: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    }, 
    memberNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Member.associate = function(models) {
  
  };
  return Member;
};