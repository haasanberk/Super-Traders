'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  logs.init(
    {
      transaction: DataTypes.STRING,
      ownerId: DataTypes.INTEGER,
      shareCode: DataTypes.STRING(3),
      quantity: DataTypes.INTEGER,
      price: DataTypes.DECIMAL(3, 2),
    },
    {
      sequelize,
      modelName: 'logs',
    }
  );
  return logs;
};
