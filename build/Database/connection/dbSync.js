"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbCon_1 = __importDefault(require("./dbCon"));
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const User = User_1.default;
const Product = Product_1.default;
dbCon_1.default.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => console.log('Unable to connect to the database: ', err));
dbCon_1.default.sync()
    .then(() => {
    console.log('connected successfully');
})
    .catch((error) => {
    console.log('Somthig went worng ' + error);
});
exports.default = dbCon_1.default;
