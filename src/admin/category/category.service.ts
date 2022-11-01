import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';
import { GlobalQueryParam } from 'src/interface/query-param';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<any> {
    const subCategories: any = [];
    createCategoryDto.subCategoryName.forEach((e) => {
      subCategories.push({ name: e });
    });

    return await this.prismaService.category.create({
      data: {
        name: createCategoryDto.categoryName,
        subCategories: {
          create: subCategories,
        },
      },
    });
  }

  async findAll(globalQueryParam: GlobalQueryParam): Promise<any> {
    let sortOrder: string;
    if (globalQueryParam.sortOrder) {
      sortOrder = globalQueryParam.sortOrder == 1 ? 'asc' : 'desc';
    }
    const sortField: string = globalQueryParam.sortField
      ? globalQueryParam.sortField
      : null;

    const orderBy: any =
      sortOrder && sortField
        ? {
            orderBy: {
              [sortField]: sortOrder,
            },
          }
        : undefined;

    const search: any = globalQueryParam.searchName
      ? {
          where: {
            name: {
              contains: globalQueryParam.searchName,
            },
          },
        }
      : undefined;

    const data: Category[] = await this.prismaService.category.findMany({
      ...orderBy,
      skip: globalQueryParam.first,
      take: globalQueryParam.rows,
      ...search,
    });

    const totalRecords: any = await this.prismaService.category.count();

    return { data, totalRecords };
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.prismaService.category.update({
      where: { id: id },
      data: { name: updateCategoryDto.categoryName },
    });
  }

  async remove(id: number): Promise<Category> {
    return await this.prismaService.category.delete({ where: { id: id } });
  }

  async multiRemove(ids: number[]): Promise<any> {
    return await this.prismaService.category.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
