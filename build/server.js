"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = require("./data");
const envConfig_1 = require("./envConfig");
const app = (0, express_1.default)();
const port = envConfig_1.PORT || 3000;
app.get('/', (req, res) => {
    res.status(200).send('Home page');
});
app.get('/api/products', (req, res) => {
    res.status(200).send(data_1.sampleProducts);
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
