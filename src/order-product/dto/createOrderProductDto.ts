// order-product.dto.ts

import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  productId: number; // ID của sản phẩm

  @IsNotEmpty()
  orderId: number; // ID của đơn hàng

  @IsInt()
  @Type(() => Number)
  quantity: number;

  // Bạn có thể thêm các trường khác nếu cần, ví dụ: thông tin chi tiết về sản phẩm, giá tiền, v.v.
}
