"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyRouter = void 0;
const express_1 = __importDefault(require("express"));
const envConfig_1 = require("../envConfig");
exports.keyRouter = express_1.default.Router();
exports.keyRouter.get('/paypal', (req, res) => {
    res.json({ clientId: envConfig_1.PAYPAL_CLINT_ID || 'sb' });
});
