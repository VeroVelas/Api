import { User } from './user';

export interface UserRepository {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(user: User): Promise<User | null>;
    deleteById(id: string): Promise<void>;
}
