import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private userService: UserService) {
        super();
    }

    serializeUser(user: any, done: (err: Error | null, user: any) => void): any {
        done(null, user.email);
    }

    // needs to be `async` since fetching user data from the database is an asynchronous operation
    async deserializeUser(
        payload: any,
        done: (err: Error | null, payload: any) => void,
    ): Promise<any> {
        const user = await this.userService.getUser(payload);

        if (!user) {
            done(new Error('No User'), null);
            return;
        }
        const { password, ...userInfo } = user;

        done(null, userInfo);
    }
}