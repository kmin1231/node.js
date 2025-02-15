import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async register(userDto: CreateUserDto) {
        const user = await this.userService.getUser(userDto.email);
        if (user) {
            throw new HttpException (
                'The user already exists!',
                HttpStatus.BAD_REQUEST,
            );
        }

        const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

        try {
            const newUser = await this.userService.createUser({
                ...userDto,
                password: encryptedPassword,
            });

            // creates a new object 'newUser' instead of setting 'password' to 'undefined'
            // can be safely returned without 'password' field
            const { password, ...userWithoutPassword } = newUser; 
            return userWithoutPassword;
        } catch (error) {
            throw new HttpException('Server Error', 500);
        }
    }
}