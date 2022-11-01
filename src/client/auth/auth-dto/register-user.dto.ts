import {
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
  ValidationArguments,
} from 'class-validator';
import { IsAlreadyExist } from 'src/custom-validate/is-already-exist.decorator';
import { Match } from 'src/custom-validate/match.decorator';
import { Gender, RegisterType } from 'src/enum/auth';
import { ValidateMessage } from 'src/enum/validation-message';

export class UserRegisterDTO {
  @MaxLength(30, {
    message: ValidateMessage.MaxLength,
  })
  @IsAlreadyExist(
    { table: 'userAccount', column: 'userName' },
    {
      message: (args: ValidationArguments) => {
        if (args.value) {
          return ValidateMessage.IsAlreadyExist;
        } else {
          return ValidateMessage.IsNotEmpty;
        }
      },
    },
  )
  userName: string;

  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
  })
  @MaxLength(16, {
    message: ValidateMessage.MaxLength,
  })
  @MinLength(8, {
    message: ValidateMessage.MinLength,
  })
  password: string;

  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
  })
  @MaxLength(16, {
    message: ValidateMessage.MaxLength,
  })
  @MinLength(8, {
    message: ValidateMessage.MinLength,
  })
  @Match('password', {
    message: ValidateMessage.Match,
  })
  confirmPassword: string;

  @MaxLength(30, {
    message: ValidateMessage.MaxLength,
  })
  @IsAlreadyExist(
    { table: 'userAccount', column: 'email' },
    {
      message: (args: ValidationArguments) => {
        if (args.value) {
          return ValidateMessage.IsAlreadyExist;
        } else {
          return ValidateMessage.IsNotEmpty;
        }
      },
    },
  )
  email: string;

  @MaxLength(20, {
    message: ValidateMessage.MaxLength,
  })
  @IsAlreadyExist(
    { table: 'userAccount', column: 'phoneNumber' },
    {
      message: (args: ValidationArguments) => {
        if (args.value) {
          return ValidateMessage.IsAlreadyExist;
        } else {
          return ValidateMessage.IsNotEmpty;
        }
      },
    },
  )
  phoneNumber: string;

  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
  })
  @IsEnum(RegisterType, {
    message: ValidateMessage.IsEnum,
  })
  registerType: RegisterType;

  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
  })
  @MaxLength(30, {
    message: ValidateMessage.MaxLength,
  })
  firstName: string;

  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
  })
  @MaxLength(30, {
    message: ValidateMessage.MaxLength,
  })
  lastName: string;

  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
  })
  @IsEnum(Gender, {
    message: ValidateMessage.IsEnum,
  })
  gender: Gender;

  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
  })
  @MaxLength(30, {
    message: ValidateMessage.MaxLength,
  })
  village: string;

  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
  })
  @MaxLength(30, {
    message: ValidateMessage.MaxLength,
  })
  district: string;

  @IsNotEmpty({
    message: ValidateMessage.IsNotEmpty,
  })
  @MaxLength(30, {
    message: ValidateMessage.MaxLength,
  })
  province: string;
}
