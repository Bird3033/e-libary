import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  ParseArrayPipe,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAdminAuthGuard } from '../auth/jwt-admin-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('admin/category')
@UseGuards(JwtAdminAuthGuard)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(
    @Query('first', ParseIntPipe) first?: number,
    @Query('rows', ParseIntPipe) rows?: number,
    @Query('searchName') searchName?: string,
    @Query('sortField') sortField?: string,
    @Query('sortOrder') sortOrder?: number,
  ): Promise<any> {
    return await this.categoryService.findAll({
      first,
      rows,
      searchName,
      sortOrder,
      sortField,
    });
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const exist: Category = await this.prismaService.category.findUnique({
      where: {
        name: updateCategoryDto.categoryName,
      },
    });

    if (exist && exist.id !== id) {
      throw new HttpException(
        {
          state: HttpStatus.BAD_REQUEST,
          error: 'ໝວດໝູ່ນີ້ມີຢູ່ແລ້ວ',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoryService.remove(id);
  }

  @Delete()
  async multiRemove(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return await this.categoryService.multiRemove(ids);
  }
}
