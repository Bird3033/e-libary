import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminAccount } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(username: string): Promise<AdminAccount | undefined> {
    return await this.prismaService.adminAccount.findUnique({
      where: { userName: username },
    });
  }

  async getProfile(id: number): Promise<any> {
    return await this.prismaService.adminAccount.findUnique({
      where: { id: id },
      select: {
        id: true,
        userName: true,
        email: true,
      },
    });
  }
}
