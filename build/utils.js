"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserId = exports.isAuth = exports.generateToken = void 0;
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
const isAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        // Verify the token if needed
        const decoded = jsonwebtoken_1.default.verify(token, envConfig_1.JWT_SECRET || 'secretkeyforjwtinecommerce');
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
};
exports.isAuth = isAuth;
const getUserId = (req, res) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        // Verify the token if needed
        const decoded = jsonwebtoken_1.default.verify(token, envConfig_1.JWT_SECRET || 'secretkeyforjwtinecommerce');
        return decoded._id;
    }
    catch (err) {
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
};
exports.getUserId = getUserId;
