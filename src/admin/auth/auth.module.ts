import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { AuthService } from './auth.service';
import { LocalAdminStrategy } from './local-admin.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth-global/constants';
import { JwtAdminStrategy } from './jwt-admin.strategy';

@Module({
  imports: [
    AdminModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.adminSecret,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  providers: [AuthService, LocalAdminStrategy, JwtAdminStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
