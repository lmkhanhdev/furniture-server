import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderProductService } from './order-product.service';
import { CreateOrderProductDto } from './dto/createOrderProductDto';

@Controller('order-product')
export class OrderProductController {
  constructor(private readonly orderProductService: OrderProductService) {}

  @Post()
  async create(@Body() createOrderProductDto: CreateOrderProductDto) {
    return this.orderProductService.create(createOrderProductDto);
  }

  @Get()
  async findAll() {
    return this.orderProductService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.orderProductService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() createOrderProductDto: CreateOrderProductDto,
  ) {
    return this.orderProductService.update(id, createOrderProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.orderProductService.remove(id);
  }
}
