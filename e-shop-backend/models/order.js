'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.Product, { foreignKey: 'productId' });
  };
  return Order;
};

