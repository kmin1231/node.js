import { Body, Controller, Get, Post, Request, Response, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { LoginGuard, AuthenticatedGuard, LocalAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() userDto: CreateUserDto) {
        return await this.authService.register(userDto);
    }

    @Post('login')
    async login(@Request() req, @Response() res) {
        const userInfo = await this.authService.validateUser(
            req.body.email,
            req.body.password,
        );

        if (userInfo) {
            res.cookie('login', JSON.stringify(userInfo), {
                httpOnly: false,
                maxAge: 1000 * 60 * 24 * 7,
            });
        }
        return res.send({ message: 'login success' });
    }

    @UseGuards(LoginGuard)
    @Post('login2')
    async login2(@Request() req, @Response() res) {
        if (!req.cookies['login'] && req.user) {
            res.cookie('login', JSON.stringify(req.user), {
                httpOnly: true,
                maxAge: 1000 * 10,
            });
        }
        return res.send({ message: 'login2 success' });
    }

    @UseGuards(LoginGuard)
    @Get('test-guard')
    testGuard() {
        return 'This post is only visible when you are logged in.';
    }

    @UseGuards(LocalAuthGuard)
    @Post('login3')
    login3(@Request() req) { return req.user; }

    @UseGuards(AuthenticatedGuard)
    @Get('test-guard2')
    testGuardWithSession(@Request() req) { return req.user; }
}
