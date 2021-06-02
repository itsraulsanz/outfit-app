const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Outfits extends Model {}

Outfits.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        outfit_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        price: {
            type: DataTypes.FLOAT,
            allowNull: true,
        }, 
        brand: {
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        occasion: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        colour: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }, 
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false, 
        freezeTableName: true,
        underscored: true,
        modelName: 'outfits',
    }
);

module.exports = Outfits;