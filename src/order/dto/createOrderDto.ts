import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderProductDto } from 'src/order-product/dto/createOrderProductDto';

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number; // ID của người dùng

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  orderProducts: CreateOrderProductDto[]; // Danh sách sản phẩm trong đơn hàng
}

export class OrderDto {
  id: number;

  @IsNotEmpty()
  userId: number; // ID của người dùng

  @IsNumber()
  totalAmount: number; // Tổng số tiền đơn hàng

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductDto)
  orderProducts: CreateOrderProductDto[]; // Danh sách sản phẩm trong đơn hàng

  createdAt: Date;
  updatedAt: Date;
}
