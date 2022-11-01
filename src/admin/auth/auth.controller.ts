import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { AuthService } from './auth.service';
import { JwtAdminAuthGuard } from './jwt-admin-auth.guard';
import { LocalAdminAuthGuard } from './local-admin-auth.guard';

@Controller('admin/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly adminService: AdminService,
  ) {}

  @UseGuards(LocalAdminAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return this.adminService.getProfile(req.user.id);
  }
}
