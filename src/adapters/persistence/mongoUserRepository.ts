import { UserRepository } from '../../domain/interfaces';
import { User } from '../../domain/user';
import mongoose, { Schema, Document, Model } from 'mongoose';

interface UserDocument extends Document {
    nombre: string;
    apellido: string;
    correo: string;
    password: string;
    _id: mongoose.Types.ObjectId;
}

const userSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true },
    password: { type: String, required: true },
});

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

export class MongoUserRepository implements UserRepository {
    private userModel: Model<UserDocument>;

    constructor() {
        this.userModel = UserModel;
    }

    async save(user: User): Promise<User> {
        const userModel = new this.userModel(user);
        const savedUser = await userModel.save();
        return new User(savedUser._id.toString(), savedUser.nombre, savedUser.apellido, savedUser.correo, savedUser.password);
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.userModel.findById(id);
        if (!user) return null;
        return new User(user._id.toString(), user.nombre, user.apellido, user.correo, user.password);
    }

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find();
        return users.map(user => new User(user._id.toString(), user.nombre, user.apellido, user.correo, user.password));
    }

    async update(user: User): Promise<User | null> {
        const updatedUser = await this.userModel.findByIdAndUpdate(user.id, user, { new: true });
        if (!updatedUser) return null;
        return new User(updatedUser._id.toString(), updatedUser.nombre, updatedUser.apellido, updatedUser.correo, updatedUser.password);
    }

    async deleteById(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id);
    }
}
