'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name:  {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Author.associate = function(models) {
    Author.hasMany(models.Book, {
      foreignKey:'authorId'
    })
  };
  return Author;
};