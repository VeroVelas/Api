import express from 'express';
import bodyParser from 'body-parser';
import { connectToMongo } from './config/database';
import { connectToMySQL } from './config/database';
import { UserController } from './adapters/http/userController';
import { MongoUserRepository } from './adapters/persistence/mongoUserRepository';
import { MysqlUserRepository } from './adapters/persistence/mysqlUserRepository';
import { UserService } from './application/userService';

const app = express();
app.use(bodyParser.json());

async function startServer() {
    // Conectar a MongoDB
    await connectToMongo();
    const mongoRepository = new MongoUserRepository();
    const mongoUserService = new UserService(mongoRepository);
    const mongoUserController = new UserController(mongoUserService);

    // Conectar a MySQL
    const mysqlConnection = await connectToMySQL();
    const mysqlRepository = new MysqlUserRepository(mysqlConnection);
    const mysqlUserService = new UserService(mysqlRepository);
    const mysqlUserController = new UserController(mysqlUserService);

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
}

startServer().catch(err => console.error(err));
