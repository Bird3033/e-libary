import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { SubCategory } from '@prisma/client';
import { GlobalQueryParam } from 'src/interface/query-param';

@Injectable()
export class SubCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createSubCategoryDto: CreateSubCategoryDto,
  ): Promise<SubCategory> {
    return await this.prismaService.subCategory.create({
      data: {
        categoryId: createSubCategoryDto.categoryId,
        name: createSubCategoryDto.subCategoryName,
      },
    });
  }

  async findByCategory(
    globalQueryParam: GlobalQueryParam,
    categoryId: number,
  ): Promise<any> {
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
          name: {
            contains: globalQueryParam.searchName,
          },
        }
      : undefined;

    const data: SubCategory[] = await this.prismaService.subCategory.findMany({
      ...orderBy,
      skip: globalQueryParam.first,
      take: globalQueryParam.rows,
      where: {
        AND: [{ categoryId: categoryId }, search],
      },
    });

    const totalRecords: any = await this.prismaService.subCategory.count({
      where: { categoryId: categoryId },
    });

    return { data, totalRecords };
  }

  async update(
    id: number,
    updateSubCategoryDto: UpdateSubCategoryDto,
  ): Promise<SubCategory> {
    return await this.prismaService.subCategory.update({
      where: { id: id },
      data: { name: updateSubCategoryDto.subCategoryName },
    });
  }

  async remove(id: number): Promise<SubCategory> {
    return await this.prismaService.subCategory.delete({
      where: {
        id: id,
      },
    });
  }

  async multiRemove(ids: number[]): Promise<any> {
    return await this.prismaService.subCategory.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
