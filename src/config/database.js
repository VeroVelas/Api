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
exports.connectToMySQL = exports.connectToMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const promise_1 = require("mysql2/promise");
const mongoUri = 'mongodb+srv://verito:12345@cluster0.8dph9uk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connectToMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
});
exports.connectToMongo = connectToMongo;
const connectToMySQL = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, promise_1.createConnection)({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'apivero',
        });
        console.log('Connected to MySQL');
        return connection;
    }
    catch (error) {
        console.error('Error connecting to MySQL', error);
        process.exit(1);
    }
});
exports.connectToMySQL = connectToMySQL;
