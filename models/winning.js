'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    class Winning extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Winning.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: 'NO ACTION',
            });
            Winning.belongsTo(models.Reward, {
                foreignKey: 'rewardId',
                onDelete: 'NO ACTION',
            });
            Winning.belongsTo(models.Company, {
                foreignKey: 'companyId',
                onDelete: 'CASCADE',
            });
        }
    }
    Winning.init(
        {
            rewardId: {
                type: DataTypes.UUID,
                validate: {
                    notEmpty: true,
                },
            },
            userId: {
                type: DataTypes.UUID,
                validate: {
                    notEmpty: true,
                },
            },
            companyId: {
                type: DataTypes.UUID,
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
            modelName: 'Winning',
        }
    );
    return Winning;
};
