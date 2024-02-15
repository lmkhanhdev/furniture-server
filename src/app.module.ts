import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BillboardModule } from './billboard/billboard.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import config from 'ormconfig';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(config), AuthModule, BillboardModule, ProductModule, CategoryModule, OrderModule, OrderProductModule],
})
export class AppModule {}
