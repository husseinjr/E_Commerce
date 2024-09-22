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
// import { sampleProducts } from './data'
// import UserValidator from './validators/index'
// import middleware from './middlewares/index'
const productRouter_1 = require("./routers/productRouter");
const dbSync_1 = __importDefault(require("./Database/connection/dbSync"));
dbSync_1.default;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: false }));
const port = envConfig_1.PORT || 3000;
app.get('/', (req, res) => {
    res.status(200).send('Home page');
});
app.get('/api/products', productRouter_1.productRouter);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
