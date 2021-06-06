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
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
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
        notes: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
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