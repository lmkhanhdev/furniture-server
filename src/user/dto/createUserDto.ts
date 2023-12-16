import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// delete-user.dto.ts
export class DeleteUserDto {
  @IsNumberString()
  id: string;
}
