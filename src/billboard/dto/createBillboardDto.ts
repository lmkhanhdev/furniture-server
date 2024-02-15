import { IsArray, IsBoolean, IsString } from 'class-validator';

export class CreateBillboardDto {
  @IsString()
  name: string;

  @IsArray()
  images: string[];

  @IsBoolean()
  active: boolean = false;
}

export class UpdateBillboardDto extends CreateBillboardDto {}
