import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderProduct } from 'src/entities/order-product.entity';
import { Repository } from 'typeorm';
import { CreateOrderProductDto } from './dto/createOrderProductDto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderProductService {
  constructor(
    @InjectRepository(OrderProduct)
    private readonly orderProductRipo: Repository<OrderProduct>,
    private productService: ProductService,
  ) {}

  async create(
    createOrderProductDto: CreateOrderProductDto,
  ): Promise<OrderProduct> {
    const { productId } = createOrderProductDto;

    const product = await this.productService.productFindOne(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const newOrderProduct = this.orderProductRipo.create({
      ...createOrderProductDto,
      product: product,
    });

    return this.orderProductRipo.save(newOrderProduct);
  }

  async findAll(): Promise<OrderProduct[]> {
    return this.orderProductRipo.find({
      relations: ['product'],
    });
  }

  async findOne(id: number): Promise<OrderProduct> {
    const orderProduct = await this.orderProductRipo.findOne({
      where: { id: id },
    });
    if (!orderProduct) {
      throw new NotFoundException(`OrderProduct with ID ${id} not found`);
    }
    return orderProduct;
  }

  async update(
    id: number,
    createOrderProductDto: CreateOrderProductDto,
  ): Promise<OrderProduct> {
    const orderProduct = await this.findOne(id);
    this.orderProductRipo.merge(orderProduct, createOrderProductDto);
    return this.orderProductRipo.save(orderProduct);
  }

  // Xóa một OrderProduct theo ID
  async remove(id: number): Promise<void> {
    const orderProduct = await this.findOne(id);
    await this.orderProductRipo.remove(orderProduct);
  }
}
