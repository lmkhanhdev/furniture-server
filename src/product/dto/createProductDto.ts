import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @Type(() => Number)
  price: number;

  @IsArray()
  images: string[];

  @IsBoolean()
  active: boolean = false;

  @IsBoolean()
  activenew: boolean = false;

  @IsString()
  categoryName: string;
}

export class UpdateProductDto extends CreateProductDto {}
