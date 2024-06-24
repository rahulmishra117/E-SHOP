'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.Order, { foreignKey: 'productId' });
  };
  return Product;
};

