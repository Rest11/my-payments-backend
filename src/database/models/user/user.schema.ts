import { DataTypes as SequelizeDataTypes } from 'sequelize';
import { DatabaseContract } from '../../../core/contracts/database.contract';

const DataTypes: SequelizeDataTypes = require('sequelize').DataTypes;

export const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: DatabaseContract.Users.COLUMN_ID,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: DatabaseContract.Users.COLUMN_CREATED_AT,
        validate: {
            isDate: true,
        },
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: DatabaseContract.Users.COLUMN_UPDATED_AT,
        validate: {
            isDate: true,
        },
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: DatabaseContract.Users.COLUMN_EMAIL,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: DatabaseContract.Users.COLUMN_NAME,
        validate: {
            notEmpty: true,
        },
    },
};
