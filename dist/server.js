"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const recipeSeed_1 = require("./seeders/recipeSeed");
//For env file
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
(0, recipeSeed_1.recipeSeedDatabase)();
app.get('/', (req, res) => {
    res.send('Home Page');
});
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
