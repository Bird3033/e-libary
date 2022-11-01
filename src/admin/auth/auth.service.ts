import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, pass: string): Promise<any> {
    const admin = await this.adminService.findOne(username);
    if (admin && admin.password === pass) {
      delete admin.password;
      return admin;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    user.access_token = this.jwtService.sign(payload);
    return user;
  }
}
