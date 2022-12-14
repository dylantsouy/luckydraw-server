'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    class Admin extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Admin.belongsTo(models.Company, {
                foreignKey: 'companyId',
                onDelete: 'CASCADE',
            });
        }
    }
    Admin.init(
        {
            username: {
                type: DataTypes.STRING,
                validate: {
                    is: /^[a-z0-9]{8,50}$/i,
                    notEmpty: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                    isEmail: true,
                },
            },
            role: {
                type: DataTypes.INTEGER,
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
            modelName: 'Admin',
        }
    );
    return Admin;
};
