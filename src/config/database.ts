import mongoose from 'mongoose';
import { createConnection } from 'mysql2/promise';

const mongoUri = 'mongodb+srv://pedroportillor22:pedroportillo@cluster0.sqnnlpq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

export const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);

    }
};

export const connectToMySQL = async () => {
    try {
        const connection = await createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'apiexagonalmantenimiento',
        });
        console.log('Connected to MySQL');
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL', error);
        process.exit(1);
    }
};
