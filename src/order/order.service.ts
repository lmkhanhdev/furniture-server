import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { ProductService } from 'src/product/product.service';
import { Repository } from 'typeorm';
import { CreateOrderDto, OrderDto } from './dto/createOrderDto';
import { User } from 'src/entities/user.entity';
import { OrderProduct } from 'src/entities/order-product.entity'; // Đảm bảo rằng đường dẫn này chính xác

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly productService: ProductService,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<OrderDto> {
    // Tính toán tổng số tiền cho đơn hàng
    let totalAmount = 0;
    const orderProducts: OrderProduct[] = [];

    for (const orderProductDto of createOrderDto.orderProducts) {
      const product = await this.productService.productFindOne(
        orderProductDto.productId,
      );

      totalAmount += product.price * orderProductDto.quantity;

      const orderProduct = new OrderProduct();
      orderProduct.product = product;
      orderProduct.quantity = orderProductDto.quantity;
      orderProducts.push(orderProduct);
    }

    // Tạo đơn hàng mới
    const order = new Order();
    order.user = user;
    order.totalAmount = totalAmount;
    order.orderProducts = orderProducts; // Sửa đổi này để sử dụng danh sách OrderProduct đã tạo

    await this.orderRepository.save(order);

    return this.convertToOrderDto(order);
  }

  private convertToOrderDto(order: Order): OrderDto {
    const orderDto = new OrderDto();
    orderDto.id = order.id;
    orderDto.userId = order.user.id;
    orderDto.totalAmount = order.totalAmount;
    orderDto.orderProducts = order.orderProducts.map((op) => ({
      productId: op.product.id,
      orderId: op.order.id,
      quantity: op.quantity,
    }));
    orderDto.createdAt = order.createdAt;
    orderDto.updatedAt = order.updatedAt;

    return orderDto;
  }

  async getOrderById(id: number): Promise<OrderDto> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderProducts', 'orderProducts.product', 'user'],
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.convertToOrderDto(order);
  }

  // Các phương thức khác như updateOrder, deleteOrder, getListOfOrders, v.v. có thể được thêm vào tùy thuộc vào yêu cầu của bạn.
}
