import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ValidateMessage } from 'src/enum/validation-message';

export class UpdateSubCategoryDto {
  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
  })
  @MaxLength(50, {
    message: ValidateMessage.MaxLength,
  })
  @IsString({
    message: ValidateMessage.IsString,
  })
  subCategoryName: string;
}
