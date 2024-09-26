"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbCon_1 = __importDefault(require("../connection/dbCon"));
class PaymentResult extends sequelize_1.Model {
}
PaymentResult.init({
    paymentId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    update_time: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    email_address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: dbCon_1.default,
    modelName: 'PaymentResult',
});
exports.default = PaymentResult;
