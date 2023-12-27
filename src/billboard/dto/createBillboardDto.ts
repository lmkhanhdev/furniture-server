import { IsArray, IsString } from 'class-validator';

export class CreateBillboardDto {
  @IsString()
  name: string;

  @IsArray()
  images: string[];
}

export class UpdateBillboardDto extends CreateBillboardDto {}
