"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbCon_1 = __importDefault(require("../connection/dbCon"));
const Order_1 = __importDefault(require("./Order"));
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
    orderId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: Order_1.default, // Reference to the Order table
            key: 'id',
        },
        primaryKey: true, // Part of the composite primary key
    },
}, {
    sequelize: dbCon_1.default,
    modelName: 'PaymentResult',
});
exports.default = PaymentResult;
