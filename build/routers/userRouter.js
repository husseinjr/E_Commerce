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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = __importDefault(require("../Database/models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils_1 = require("../utils");
exports.userRouter = express_1.default.Router();
const maxAge = 30 * 24 * 60 * 60; // 30d
// POST /api/users/signin
exports.userRouter.post('/signin', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({
        where: {
            email: req.body.email,
        },
    });
    if (user) {
        if (bcrypt_1.default.compareSync(req.body.password, user.password)) {
            const token = (0, utils_1.generateToken)(user);
            res
                .cookie('jwt', token, {
                maxAge: maxAge * 1000,
                httpOnly: true,
            })
                .status(200)
                .json({ message: 'Logged in successfully' });
            return; // Add this return to prevent further execution
        }
        else {
            res.status(404).json({ message: 'Invalid Email or Password' });
        }
    }
    res.status(404).json({ message: 'Invalid Email or Password' });
})));
exports.userRouter.post('/signup', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const user = yield User_1.default.create({
            name,
            email,
            password,
            isAdmin: false,
        });
        if (!user) {
            res.status(401).json({ message: 'error in credintial' });
        }
        const token = (0, utils_1.generateToken)(user);
        res.cookie('jwt', token, {
            maxAge: maxAge * 1000,
            httpOnly: true,
        });
        res.status(200).json({ message: 'signup successfully' });
    }
    catch (error) {
        res.status(400).json(error);
    }
})));
