'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class share_owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //models.user.belongsToMany(models.share, { through: share_owner });
      //models.share.belongsToMany(models.user, { through: share_owner });
    }
  }
  share_owner.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      shareCode: {
        type: DataTypes.STRING(3),
        references: { model: 'shares', key: 'code' },
      },
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'share_owner',
    }
  );
  return share_owner;
};
