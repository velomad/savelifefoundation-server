'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Case.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    disease: DataTypes.STRING,
    rate: DataTypes.STRING,
    current: DataTypes.STRING,
    donationRequirement: DataTypes.INTEGER,
    needersName: DataTypes.STRING,
    imageUrl:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Case',
  });
  return Case;
};