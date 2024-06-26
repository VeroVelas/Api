import { User } from './user';
import { Vendedor } from './vendedor';

export interface UserRepository {
    save(user: User): Promise<User>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(user: User): Promise<User | null>;
    deleteById(id: string): Promise<void>;
}

export interface VendedorRepository {
    save(vendedor: Vendedor): Promise<Vendedor>;
    findById(id: string): Promise<Vendedor | null>;
    findAll(): Promise<Vendedor[]>;
    update(vendedor: Vendedor): Promise<Vendedor | null>;
    deleteById(id: string): Promise<void>;
}
