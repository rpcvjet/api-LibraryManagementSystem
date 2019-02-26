'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {

    isbn: {
      type:DataTypes.STRING,
      allowNull: false
    },
    title: {
      type:DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type:DataTypes.STRING,
      allowNull: false
    },
    volume: {
      type:DataTypes.STRING,
      allowNull: true
    },
    edition: {
      type:DataTypes.STRING,
      allowNull: true
    },
    publicationYear: {
      type:DataTypes.STRING,
      allowNull: false
    },
    available: {
      type:DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
    
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};