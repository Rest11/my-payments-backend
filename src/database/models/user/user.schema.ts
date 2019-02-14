import { DataTypes as SequelizeDataTypes } from 'sequelize';
import { DatabaseContract } from '../../../core/contracts/database.contract';

const DataTypes: SequelizeDataTypes = require('sequelize').DataTypes;

export const userSchema = {
    [DatabaseContract.Users.PROPERTY_EXTERNAL_ID]: {
        type: DataTypes.STRING(255),
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: DatabaseContract.Users.COLUMN_EXTERNAL_ID,
        validate: {
            notEmpty: true,
        },
    },
    [DatabaseContract.Users.PROPERTY_CREATED_AT]: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: DatabaseContract.Users.COLUMN_CREATED_AT,
        validate: {
            isDate: true,
        },
    },
    [DatabaseContract.Users.PROPERTY_UPDATED_AT]: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: DatabaseContract.Users.COLUMN_UPDATED_AT,
        validate: {
            isDate: true,
        },
    },
    [DatabaseContract.Users.PROPERTY_EMAIL]: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: DatabaseContract.Users.COLUMN_EMAIL,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    [DatabaseContract.Users.PROPERTY_NAME]: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: DatabaseContract.Users.COLUMN_NAME,
        validate: {
            notEmpty: true,
        },
    },
    [DatabaseContract.Users.PROPERTY_AVATAR]: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: DatabaseContract.Users.COLUMN_AVATAR,
        validate: {
            notEmpty: false,
        },
    },
};
