import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  ArrayUnique,
} from 'class-validator';
import { IsAlreadyExist } from 'src/custom-validate/is-already-exist.decorator';
import { ValidateMessage } from 'src/enum/validation-message';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
  })
  @MaxLength(50, {
    message: ValidateMessage.MaxLength,
  })
  @IsString({
    message: ValidateMessage.IsString,
  })
  @IsAlreadyExist(
    { table: 'category', column: 'name' },
    { message: ValidateMessage.IsAlreadyExist },
  )
  categoryName: string;

  @IsArray({ message: ValidateMessage.IsArray })
  @ArrayNotEmpty({ message: ValidateMessage.IsNotEmpty })
  @ArrayUnique({ message: ValidateMessage.ArrayUnique })
  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
    each: true,
  })
  @IsString({
    message: ValidateMessage.IsString,
    each: true,
  })
  @MaxLength(50, {
    message: ValidateMessage.MaxLength,
    each: true,
  })
  @IsAlreadyExist(
    { table: 'subCategory', column: 'name' },
    { message: ValidateMessage.IsAlreadyExist, each: true },
  )
  subCategoryName: string[];
}
