"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbCon_1 = __importDefault(require("../connection/dbCon"));
const Product_1 = __importDefault(require("./Product"));
const Order_1 = __importDefault(require("./Order"));
class OrderItem extends sequelize_1.Model {
}
OrderItem.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
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
    productId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: Product_1.default, // Reference to the Product table
            key: 'id',
        },
        primaryKey: true, // Part of the composite primary key
    },
}, {
    sequelize: dbCon_1.default,
    modelName: 'OrderItem',
    timestamps: false,
});
exports.default = OrderItem;
