'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Post, {
        foreignKey: "userId",
        sourceKey: "userId"
      });
      this.hasMany(models.Comment, {
        foreignKey: "userId",
        sourceKey: "userId"
      });
      this.hasMany(models.Like, {
        foreignKey: "userId",
        sourceKey: "userId"
      });
      // define association here
    }
  }
  User.init({
    userId: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    nickname: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};