import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './book/thumbnail',
    }),
  ],
  controllers: [BookController],
  providers: [BookService, PrismaService],
})
export class BookModule {}
