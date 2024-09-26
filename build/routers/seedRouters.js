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
exports.seedRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const dbSync_1 = __importDefault(require("../Database/connection/dbSync"));
const data_1 = require("../data");
const data_2 = require("../data");
exports.seedRouter = express_1.default.Router();
exports.seedRouter.post('/products', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Product = dbSync_1.default.models.Product;
    yield Product.destroy({ where: {} });
    const createdProducts = yield Product.bulkCreate(data_1.products);
    res.json({ createdProducts });
})));
exports.seedRouter.post('/users', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UserModel = dbSync_1.default.models.User;
    yield UserModel.destroy({ where: {} });
    const createUsers = yield UserModel.bulkCreate(data_2.users);
    res.json({ createUsers });
})));
// console.log('Products created:');
// console.error('Error creating products:');
