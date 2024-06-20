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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./config/database");
const database_2 = require("./config/database");
const userController_1 = require("./adapters/http/userController");
const mongoUserRepository_1 = require("./adapters/persistence/mongoUserRepository");
const mysqlUserRepository_1 = require("./adapters/persistence/mysqlUserRepository");
const userService_1 = require("./application/userService");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // Conectar a MongoDB
        yield (0, database_1.connectToMongo)();
        const mongoRepository = new mongoUserRepository_1.MongoUserRepository();
        const mongoUserService = new userService_1.UserService(mongoRepository);
        const mongoUserController = new userController_1.UserController(mongoUserService);
        // Conectar a MySQL
        const mysqlConnection = yield (0, database_2.connectToMySQL)();
        const mysqlRepository = new mysqlUserRepository_1.MysqlUserRepository(mysqlConnection);
        const mysqlUserService = new userService_1.UserService(mysqlRepository);
        const mysqlUserController = new userController_1.UserController(mysqlUserService);
        // Rutas para MongoDB
        app.post('/users/mongo', (req, res) => mongoUserController.createUser(req, res));
        app.get('/users/mongo/:id', (req, res) => mongoUserController.getUser(req, res));
        app.put('/users/mongo/:id', (req, res) => mongoUserController.updateUser(req, res));
        app.delete('/users/mongo/:id', (req, res) => mongoUserController.deleteUser(req, res));
        // Rutas para MySQL
        app.post('/users/mysql', (req, res) => mysqlUserController.createUser(req, res));
        app.get('/users/mysql/:id', (req, res) => mysqlUserController.getUser(req, res));
        app.put('/users/mysql/:id', (req, res) => mysqlUserController.updateUser(req, res));
        app.delete('/users/mysql/:id', (req, res) => mysqlUserController.deleteUser(req, res));
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    });
}
startServer().catch(err => console.error(err));
