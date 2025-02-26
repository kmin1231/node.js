import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    createUser(user): Promise<User> {
        console.log('Creating user:', user); 
        return this.userRepository.save(user);
    }

    async getUser(email: string): Promise<User> {
        const result = await this.userRepository.findOne({
            where: { email: email.toLowerCase() },
        });

        // exception handling to prevent null-related TypeError in 'updateUser'
        if (!result) {
            throw new Error(`User with email ${email} not found`);
        }

        return result;
    }

    async updateUser(email: string, _user): Promise<void> {
        let user: User = await this.getUser(email);
        console.log(_user);
        user.username = _user.username;
        user.password = _user.password;
        console.log(user);
        this.userRepository.save(user);
    }

    deleteUser(email: any) {
        return this.userRepository.delete({ email });
    }

    async findByEmailOrSave( email, username, providerId): Promise<User> {
        const foundUser = await this.getUser(email);

        if (foundUser) { return foundUser; }

        const newUser = await await this.createUser({
            email: email.toLowerCase(),
            username,
            providerId,
        });

        console.log("New user created:", newUser);
        return newUser;
    }
}
