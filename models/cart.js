'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
  
    static associate(models) {
      Cart.belongsTo(models.User)
      Cart.belongsToMany(models.Product,{through: models.CartItem})
      Cart.hasMany(models.CartItem)
    }
  }
  Cart.init({
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};