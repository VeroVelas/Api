import { UserRepository } from '../domain/interfaces';
import { User } from '../domain/user';

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async getUser(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async updateUser(id: string, user: User): Promise<User | null> {
        return this.userRepository.update(user);
    }

    async deleteUser(id: string): Promise<void> {
        return this.userRepository.deleteById(id);
    }
}
