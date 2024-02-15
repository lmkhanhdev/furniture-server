import { Module } from '@nestjs/common';
import { OrderProductController } from './order-product.controller';
import { OrderProductService } from './order-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProduct } from 'src/entities/order-product.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderProduct]), ProductModule],
  controllers: [OrderProductController],
  providers: [OrderProductService],
  exports: [OrderProductService],
})
export class OrderProductModule {}
