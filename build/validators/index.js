"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class UserValidator {
    checkCreateUser() {
        return [
            (0, express_validator_1.body)('name').notEmpty().withMessage('The name value should not be empty'),
            (0, express_validator_1.body)('email')
                .notEmpty()
                .withMessage('The email value should not be empty'),
            (0, express_validator_1.body)('password')
                .notEmpty()
                .withMessage('The password value should not be empty'),
        ];
    }
}
exports.default = new UserValidator();
