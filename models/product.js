'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
  
    static associate(models) {
      Product.belongsTo(models.Category)
      Product.hasMany(models.Image)
      Product.belongsToMany(models.Cart,{through: models.CartItem})
      Product.hasMany(models.CartItem)
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};