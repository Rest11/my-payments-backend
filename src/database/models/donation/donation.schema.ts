import { DataTypes as SequelizeDataTypes } from 'sequelize';
import { DatabaseContract } from '../../../core/contracts/database.contract';

const DataTypes: SequelizeDataTypes = require('sequelize').DataTypes;

export const donationSchema = {
    [DatabaseContract.Donations.PROPERTY_ID]: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
        field: DatabaseContract.Donations.COLUMN_ID,
    },
    [DatabaseContract.Donations.PROPERTY_CREATED_AT]: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: DatabaseContract.Donations.COLUMN_CREATED_AT,
        validate: {
            isDate: true,
        },
    },
    [DatabaseContract.Donations.PROPERTY_UPDATED_AT]: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: DatabaseContract.Donations.COLUMN_UPDATED_AT,
        validate: {
            isDate: true,
        },
    },
    [DatabaseContract.Donations.PROPERTY_USER_EXTERNAL_ID]: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: DatabaseContract.Donations.COLUMN_FK_USER_EXTERNAL_ID,
        validate: {
            notEmpty: true,
        },
    },
    [DatabaseContract.Donations.PROPERTY_TRANSACTION_ID]: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: true,
        field: DatabaseContract.Donations.COLUMN_TRANSACTION_ID,
        validate: {
            notEmpty: false,
        },
    },
    [DatabaseContract.Donations.PROPERTY_CURRENCY]: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: DatabaseContract.Donations.COLUMN_CURRENCY,
        validate: {
            notEmpty: true,
        },
    },
    [DatabaseContract.Donations.PROPERTY_AMOUNT]: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: DatabaseContract.Donations.COLUMN_AMOUNT,
        validate: {
            notEmpty: true,
        },
    },
    [DatabaseContract.Donations.PROPERTY_DESCRIPTION]: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: DatabaseContract.Donations.COLUMN_DESCRIPTION,
        validate: {
            notEmpty: true,
        },
    },
    [DatabaseContract.Donations.PROPERTY_STATUS]: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: DatabaseContract.Donations.COLUMN_STATUS,
        validate: {
            notEmpty: true,
        },
    },
    [DatabaseContract.Donations.PROPERTY_ERROR_MESSAGE]: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: DatabaseContract.Donations.COLUMN_ERROR_MESSAGE,
        validate: {
            notEmpty: false,
        },
    },
};
