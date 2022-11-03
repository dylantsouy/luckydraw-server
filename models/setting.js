'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
    class Setting extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Setting.belongsTo(models.Company, {
                foreignKey: 'companyId',
                onDelete: 'CASCADE',
            });
        }
    }
    Setting.init(
        {
            background: DataTypes.STRING,
            title: DataTypes.STRING,
            subTitle: DataTypes.STRING,
            bgColor: DataTypes.STRING,
            textColor: DataTypes.STRING,
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
            modelName: 'Setting',
        }
    );
    return Setting;
};
