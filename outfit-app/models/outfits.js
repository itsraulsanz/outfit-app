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
            allowNull: true,
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
            allowNull: true,
        }, 
        occasion: {
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        colour: {
            type: DataTypes.STRING,
            allowNull: true,
        }, 
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        likes: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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