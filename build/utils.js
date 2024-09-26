"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfig_1 = require("./envConfig");
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, envConfig_1.JWT_SECRET || 'secretkeyforjwtinecommerce', {
        expiresIn: '30d',
    });
};
exports.generateToken = generateToken;
