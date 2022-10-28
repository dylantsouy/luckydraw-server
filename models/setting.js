'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Setting.init({
    background: DataTypes.STRING,
    title: DataTypes.STRING,
    subTitle: DataTypes.STRING,
    bgColor: DataTypes.STRING,
    textColor: DataTypes.STRING
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', 
    sequelize,
    modelName: 'Setting',
  });
  return Setting;
};