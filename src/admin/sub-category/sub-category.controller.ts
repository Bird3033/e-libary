import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  ParseArrayPipe,
} from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { JwtAdminAuthGuard } from '../auth/jwt-admin-auth.guard';
import { SubCategory } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('admin/sub-category')
@UseGuards(JwtAdminAuthGuard)
export class SubCategoryController {
  constructor(
    private readonly subCategoryService: SubCategoryService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  async create(
    @Body() createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    return await this.subCategoryService.create(createSubCategoryDto);
  }

  @Get(':categoryId')
  async findByCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Query('first', ParseIntPipe) first?: number,
    @Query('rows', ParseIntPipe) rows?: number,
    @Query('searchName') searchName?: string,
    @Query('sortField') sortField?: string,
    @Query('sortOrder') sortOrder?: number,
  ): Promise<any> {
    return await this.subCategoryService.findByCategory(
      {
        first,
        rows,
        searchName,
        sortOrder,
        sortField,
      },
      categoryId,
    );
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    const exist: SubCategory = await this.prismaService.subCategory.findUnique({
      where: {
        name: updateSubCategoryDto.subCategoryName,
      },
    });

    if (exist && exist.id !== id) {
      throw new HttpException(
        {
          state: HttpStatus.BAD_REQUEST,
          error: 'ປະເພດນີ້ມີຢູ່ແລ້ວ',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.subCategoryService.update(id, updateSubCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<SubCategory> {
    return this.subCategoryService.remove(id);
  }

  @Delete()
  async multiRemove(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return await this.subCategoryService.multiRemove(ids);
  }
}
