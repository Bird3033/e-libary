import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
import { UsersModule } from 'src/client/users/users.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LocalUserStrategy } from './local-user.strategy';
import { JwtUserStrategy } from './jwt-user.strategy';
import { AuthController } from './auth.controller';
import { jwtConstants } from 'src/auth-global/constants';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.userSecret,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  providers: [AuthService, LocalUserStrategy, JwtUserStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
