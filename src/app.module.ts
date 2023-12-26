import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { BillboardModule } from './billboard/billboard.module';
import config from 'ormconfig';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(config), AuthModule, BillboardModule],
})
export class AppModule {}
