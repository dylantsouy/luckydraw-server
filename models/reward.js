'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
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
            type: {
                type: DataTypes.STRING,
            },
            path: {
                type: DataTypes.STRING,
            },
            data: {
                type: DataTypes.BLOB('long'),
            },
        },
        {
            hooks: {
                beforeCreate: (user) => {
                    user.id = uuidv4();
                },
            },
            charset: 'utf8',
            collate: 'utf8_general_ci',
            sequelize,
            paranoid: true,
            modelName: 'Reward',
        }
    );
    return Reward;
};
