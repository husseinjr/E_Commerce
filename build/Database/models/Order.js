"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbCon_1 = __importDefault(require("../connection/dbCon"));
class Order extends sequelize_1.Model {
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    paymentMethod: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    itemsPrice: sequelize_1.DataTypes.FLOAT,
    shippingPrice: sequelize_1.DataTypes.FLOAT,
    taxPrice: sequelize_1.DataTypes.FLOAT,
    totalPrice: sequelize_1.DataTypes.FLOAT,
    isPaid: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    paidAt: sequelize_1.DataTypes.DATE,
    isDelivered: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    deliveredAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: dbCon_1.default,
    modelName: 'Order',
});
exports.default = Order;
