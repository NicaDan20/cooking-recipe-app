"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDbConnection = exports.connectToDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = 'mongodb://127.0.0.1:27017/recipe-app-db';
function connectToDb() {
    try {
        mongoose_1.default.connect(connectionString);
        console.log("Connected!");
    }
    catch (err) {
        console.log(err);
    }
}
exports.connectToDb = connectToDb;
function closeDbConnection() {
    try {
        mongoose_1.default.connection.close();
        console.log("Disconnected");
    }
    catch (err) {
        console.log(err);
    }
}
exports.closeDbConnection = closeDbConnection;
