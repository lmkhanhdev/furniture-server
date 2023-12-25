import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNumberString, IsString } from 'class-validator';
import { Role } from 'src/entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// delete-user.dto.ts
export class DeleteUserDto {
  @IsNumberString()
  id: string;
}
