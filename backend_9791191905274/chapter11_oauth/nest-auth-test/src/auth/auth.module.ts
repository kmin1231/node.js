import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, UserModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer, GoogleStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
