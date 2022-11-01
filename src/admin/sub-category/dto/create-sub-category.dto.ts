import {
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidationArguments,
} from 'class-validator';
import { IsAlreadyExist } from 'src/custom-validate/is-already-exist.decorator';
import { IsInTable } from 'src/custom-validate/is-in-table.decorator';
import { ValidateMessage } from 'src/enum/validation-message';

export class CreateSubCategoryDto {
  @IsInTable(
    { table: 'category' },
    {
      message: (args: ValidationArguments) => {
        if (typeof args.value !== 'number') {
          return ValidateMessage.IsInt;
        } else {
          return ValidateMessage.IsInTable;
        }
      },
    },
  )
  categoryId: number;

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
    { table: 'subCategory', column: 'name' },
    { message: ValidateMessage.IsAlreadyExist },
  )
  subCategoryName: string;
}
