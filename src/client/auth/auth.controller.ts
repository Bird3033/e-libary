import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRegisterDTO } from './auth-dto/register-user.dto';
import { AuthService } from './auth.service';
import { JwtUserAuthGuard } from './jwt-user-auth.guard';
import { LocalUserAuthGuard } from './local-user-auth.guard';

@Controller('user/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async(@Body() userRegisterDto: UserRegisterDTO) {
    return this.usersService.registerUser(userRegisterDto);
  }

  @UseGuards(LocalUserAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtUserAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.id);
  }
}
