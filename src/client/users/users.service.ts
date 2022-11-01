import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAccount } from '@prisma/client';
import { UserRegisterDTO } from '../auth/auth-dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(username: string): Promise<UserAccount | undefined> {
    return await this.prismaService.userAccount.findUnique({
      where: { userName: username },
    });
  }

  async getProfile(id: number): Promise<any> {
    return await this.prismaService.userAccount.findUnique({
      where: { id: id },
      select: {
        id: true,
        userName: true,
        email: true,
        isMember: true,
        isBan: true,
      },
    });
  }

  async registerUser(userRegisterDto: UserRegisterDTO): Promise<any> {
    const { userName, password, email, phoneNumber, registerType } =
      userRegisterDto;
    const hash = await bcrypt.hash(password, 10);

    const { firstName, lastName, gender, village, district, province } =
      userRegisterDto;

    const user = await this.prismaService.userAccount.create({
      data: {
        userName,
        password: hash,
        email,
        phoneNumber,
        registerType,
        userInfo: {
          create: {
            firstName,
            lastName,
            gender,
            village,
            district,
            province,
          },
        },
      },
    });

    ['memberTypeId', 'password'].forEach((prop) => delete user[prop]);

    return user;
  }
}
