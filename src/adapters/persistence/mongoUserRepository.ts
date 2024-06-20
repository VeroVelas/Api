import { UserRepository } from '../../domain/interfaces';
import { User } from '../../domain/user';
import mongoose, { Schema, Document, Model } from 'mongoose';

interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    _id: mongoose.Types.ObjectId;
}

const userSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
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
        return new User(savedUser._id.toString(), savedUser.name, savedUser.email, savedUser.password);
    }

    async findById(id: string): Promise<User | null> {
        const user = await this.userModel.findById(id);
        if (!user) return null;
        return new User(user._id.toString(), user.name, user.email, user.password);
    }

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find();
        return users.map(user => new User(user._id.toString(), user.name, user.email, user.password));
    }

    async update(user: User): Promise<User | null> {
        const updatedUser = await this.userModel.findByIdAndUpdate(user.id, user, { new: true });
        if (!updatedUser) return null;
        return new User(updatedUser._id.toString(), updatedUser.name, updatedUser.email, updatedUser.password);
    }

    async deleteById(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete(id);
    }
}
