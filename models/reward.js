'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Reward extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Reward.hasMany(models.Winning, {
                foreignKey: 'rewardId',
            });
            Reward.belongsTo(models.Company, {
                foreignKey: 'companyId',
                onDelete: 'CASCADE',
            });
        }
    }
    Reward.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            size: {
                type: DataTypes.INTEGER,
            },
            count: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true,
                },
            },
            order: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true,
                },
            },
            url: {
                type: DataTypes.STRING,
            },
            winning: {
                type: DataTypes.JSON,
            },
            companyId: {
                type: DataTypes.UUID,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            sequelize,
            paranoid: true,
            modelName: 'Reward',
        }
    );
    return Reward;
};
