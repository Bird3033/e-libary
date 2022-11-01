import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PrismaClient } from '@prisma/client';

@ValidatorConstraint({ async: true })
export class IsInTableConstraint implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const prisma = new PrismaClient();

    if (value && typeof value === 'number') {
      const result: any = await prisma[relatedPropertyName.table].findUnique({
        where: {
          id: value,
        },
      });

      return result ? true : false;
    } else {
      return false;
    }
  }
}

export function IsInTable(
  property: { table: string },
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsInTableConstraint,
    });
  };
}
