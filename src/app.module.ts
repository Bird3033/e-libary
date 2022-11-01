import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule as UserAuthModule } from './client/auth/auth.module';
import { UsersModule } from './client/users/users.module';
import { AuthModule as AdminAuthModule } from './admin/auth/auth.module';
import { AdminModule } from './admin/admin/admin.module';
import { CategoryModule } from './admin/category/category.module';
import { SubCategoryModule } from './admin/sub-category/sub-category.module';
import { BookModule } from './admin/book/book.module';
import { StreamingFileModule } from './streaming-file/streaming-file.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
    }),
    UserAuthModule,
    UsersModule,
    AdminAuthModule,
    AdminModule,
    CategoryModule,
    SubCategoryModule,
    BookModule,
    StreamingFileModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
