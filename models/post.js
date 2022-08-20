'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
        targetKey: "userId"
      });
      this.hasMany(models.Comment, {
        foreignKey: "postId",
        sourceKey: "postId"
      });
      this.hasMany(models.Like, {
        foreignKey: "postId",
        sourceKey: "postId"
      });
      // define association here
    }
  }
  Post.init({
    postId: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    nickname: DataTypes.STRING,
    content: DataTypes.STRING,
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};