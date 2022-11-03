'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Company.hasMany(models.User, {
                foreignKey: 'companyId',
                onUpdate: 'CASCADE',
            });
            Company.hasMany(models.Reward, {
                foreignKey: 'companyId',
                onUpdate: 'CASCADE',
            });
            Company.hasMany(models.Admin, {
                foreignKey: 'companyId',
                onUpdate: 'CASCADE',
            });
            Company.hasMany(models.Setting, {
                foreignKey: 'companyId',
                onUpdate: 'CASCADE',
            });
            Company.hasMany(models.Winning, {
                foreignKey: 'companyId',
                onUpdate: 'CASCADE',
            });
        }
    }
    Company.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            hooks: {
                beforeCreate: (data) => {
                    data.id = uuidv4();
                },
            },
            charset: 'utf8',
            collate: 'utf8_general_ci',
            sequelize,
            paranoid: true,
            modelName: 'Company',
        }
    );
    return Company;
};
