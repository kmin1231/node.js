import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from 'passport-google-oauth20';
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService,
        private configService: ConfigService
    ) {

        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
            callbackURL: 'http://localhost:3000/auth/google',
            scope: ['email', 'profile'],
            passReqToCallback: true, 
        });
    }

    async validate(req: Request, accessToken: string, refreshToken: string, profile: Profile) {

        console.log('Google profile: ', profile)
        
        const { id, name, emails } = profile;
        console.log('Access token: ', accessToken);
        console.log('Refresh token: ', refreshToken);

        console.log('Profile ID:', id);
        console.log('Emails:', emails);

        const email = emails?.[0]?.value;
        if (!email) {
            throw new Error('No email found in Google profile');
        }

        const fullName = (name?.givenName ?? '');

        const user: User = await this.userService.findByEmailOrSave(
            email.toLowerCase(),
            fullName,
            id,
        );

        return user;
    }
}