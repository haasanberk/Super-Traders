'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //user.hasMany(models.share);
      user.belongsToMany(models.share, {
        through: 'share_owner',
        unique: false,
        foreignKey: 'ownerId',
      });
    }
  }
  user.init(
    {
      username: DataTypes.STRING,
      budget: DataTypes.DECIMAL(13, 2),
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return user;
};
