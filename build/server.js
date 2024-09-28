"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const envConfig_1 = require("./envConfig");
// import middleware from './middlewares/index'
const dbSync_1 = __importDefault(require("./Database/connection/dbSync"));
const productRouter_1 = require("./routers/productRouter");
const userRouter_1 = require("./routers/userRouter");
const seedRouters_1 = require("./routers/seedRouters");
const orderRouter_1 = require("./routers/orderRouter");
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const keyRouter_1 = require("./routers/keyRouter");
dbSync_1.default;
const app = (0, express_1.default)();
// view engine
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
const port = envConfig_1.PORT || 3000;
app.get('/', (req, res) => {
    res.status(200).send('Home page');
});
app.use('/api/products', productRouter_1.productRouter);
app.use('/api/users', userRouter_1.userRouter);
app.use('/api/orders', orderRouter_1.orderRouter);
app.use('/api/keys', keyRouter_1.keyRouter);
app.use('/test/data', seedRouters_1.seedRouter);
app.use((req, res, next) => {
    res.status(404).render('404');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
