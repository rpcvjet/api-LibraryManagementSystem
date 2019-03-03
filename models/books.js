'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {

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
    },
    authorId : {
      type:DataTypes.INTEGER,
    },
    shelfLocationId : {
      type:DataTypes.INTEGER,
    }
    
  }, {});
  Book.associate = function(models) {
    Book.belongsTo(models.Author)
    Book.belongsTo(models.shelfLocation)
  };
  return Book;
};