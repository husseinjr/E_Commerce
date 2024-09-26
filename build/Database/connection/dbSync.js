"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbCon_1 = __importDefault(require("./dbCon"));
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const Order_1 = __importDefault(require("../models/Order"));
const Order_Item_1 = __importDefault(require("../models/Order_Item"));
const ShippingAddress_1 = __importDefault(require("../models/ShippingAddress"));
const PaymentResult_1 = __importDefault(require("../models/PaymentResult"));
const User = User_1.default;
const Product = Product_1.default;
const Order = Order_1.default;
const OrderItem = Order_Item_1.default;
const ShippingAddress = ShippingAddress_1.default;
const PaymentResult = PaymentResult_1.default;
dbCon_1.default.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => console.log('Unable to connect to the database: ', err));
// Associations
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.belongsTo(PaymentResult, { foreignKey: 'paymentResultId', as: 'paymentResult' });
Order.hasOne(ShippingAddress, { foreignKey: 'orderId', as: 'shippingAddress' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });
ShippingAddress.belongsTo(Order, { foreignKey: 'orderId' });
PaymentResult.hasOne(Order, { foreignKey: 'paymentResultId' });
dbCon_1.default.sync()
    .then(() => {
    console.log('connected successfully');
})
    .catch((error) => {
    console.log('Somthig went worng ' + error);
});
exports.default = dbCon_1.default;
