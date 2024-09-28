"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const utils_1 = require("../utils");
const Order_1 = __importDefault(require("../Database/models/Order"));
const ShippingAddress_1 = __importDefault(require("../Database/models/ShippingAddress"));
const PaymentResult_1 = __importDefault(require("../Database/models/PaymentResult"));
const Order_Item_1 = __importDefault(require("../Database/models/Order_Item"));
exports.orderRouter = express_1.default.Router();
exports.orderRouter.get('/mine', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = yield (0, utils_1.getUserId)(req, res);
    const orders = yield Order_1.default.findAll({ where: {
            userId: userID
        } });
    res.json(orders);
})));
exports.orderRouter.get(
// http://localhost:5000/api/orders/:id
'/:id', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findByPk(req.params.id);
    if (order) {
        res.json(order);
    }
    else {
        res.status(404).json({ message: 'Order Not Found' });
    }
})));
exports.orderRouter.post('/', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = (0, utils_1.getUserId)(req, res);
    const { orderItems, shippingAddress, paymentMethod, paymentResult, itemsPrice, shippingPrice, taxPrice, totalPrice, } = req.body;
    if (orderItems.length === 0) {
        res.status(400).json({ message: 'Cart is empty' });
        return;
    }
    try {
        const createdShippingAddress = yield ShippingAddress_1.default.create({
            fullName: shippingAddress.fullName,
            address: shippingAddress.address,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
            lat: shippingAddress.lat,
            lng: shippingAddress.lng,
        });
        const createdPaymentResult = yield PaymentResult_1.default.create({
            paymentId: paymentResult.paymentId,
            status: paymentResult.status,
            update_time: new Date(),
            email_address: paymentResult.email_address,
        });
        const createdOrder = yield Order_1.default.create({
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            userId: userID,
            shippingAddressId: createdShippingAddress.id,
            paymentResultId: createdPaymentResult.id,
        });
        const createdOrderItems = yield Promise.all(orderItems.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Order_Item_1.default.create({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                productId: item.productId,
                orderId: createdOrder.id,
            });
        })));
        res.status(201).json({
            order: createdOrder,
            orderItems: createdOrderItems,
            shippingAddress: createdShippingAddress,
            paymentResult: createdPaymentResult,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Order creation failed', error });
    }
})));
exports.orderRouter.put('/:id/pay', utils_1.isAuth, (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_1.default.findOne({
        where: {
            id: req.params.id,
        },
    });
    const orderPayment = yield PaymentResult_1.default.findOne({
        where: { orderId: req.params.id },
    });
    if (order && orderPayment) {
        order.isPaid = true;
        order.paidAt = new Date(Date.now());
        (orderPayment.paymentId = req.body.id),
            (orderPayment.status = req.body.status),
            (orderPayment.update_time = req.body.update_time),
            (orderPayment.email_address = req.body.email_address);
        try {
            orderPayment.save().then(() => {
                order.save;
            });
        }
        catch (error) {
            res.status(404).send({ message: 'Unable to save the order' });
        }
        res.send({ message: 'Order has been paid successfully' });
    }
    else {
        res.status(404).send({ message: 'Unable to find the order' });
    }
})));
