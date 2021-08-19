'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class share extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //share.hasMany(models.user);
      share.belongsToMany(models.user, {
        through: 'share_owner',
        unique: false,
        foreignKey: 'shareCode',
      });
    }
  }
  share.init(
    {
      code: { type: DataTypes.STRING(3), primaryKey: true },
      rate: DataTypes.DECIMAL(3, 2),
    },
    {
      sequelize,
      modelName: 'share',
    }
  );
  return share;
};
