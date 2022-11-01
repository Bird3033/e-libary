import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAdminAuthGuard } from '../auth/jwt-admin-auth.guard';
import { PDFNet } from '@pdftron/pdfnet-node';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('admin/book')
@UseGuards(JwtAdminAuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseInterceptors(FileInterceptor('thumbnail'))
  create(
    @UploadedFile() thumbnail: Express.Multer.File,
    @Body() createBookDto: CreateBookDto,
  ) {
    console.log(thumbnail);
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
