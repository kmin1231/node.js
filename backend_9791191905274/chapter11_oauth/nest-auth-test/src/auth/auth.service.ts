import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async register(userDto: CreateUserDto) {

        // for exception handling, use 'let' instead of 'const'
        let user;

        // ensure that if an error occurs, 'user' is set to 'null' with try-catch block
        try {
            user = await this.userService.getUser(userDto.email);
        } catch (error) {
            user = null;
        }

        // ensure that the password is checked before proceeding with user registration
        if (!userDto.password) {
            throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
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
            console.error('User registration error:', error); 
            throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.getUser(email);

        if (!user) { return null; }

        const { password: hashedPassword, ...userInfo } = user;

        if (bcrypt.compareSync(password, hashedPassword)) { return userInfo; }

        return null;
    }
}