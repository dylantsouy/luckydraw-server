'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Winning, {
                foreignKey: 'userId',
                onUpdate:"CASCADE"
            });
        }
    }
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            code: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
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
            modelName: 'User',
        }
    );
    return User;
};
