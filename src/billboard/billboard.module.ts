import { Module } from '@nestjs/common';
import { BillboardService } from './billboard.service';
import { BillboardController } from './billboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billboard } from 'src/entities/billboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billboard])],
  providers: [BillboardService],
  controllers: [BillboardController],
})
export class BillboardModule {}
