import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { OrderProduct } from './order-product.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  description: string;

  @Column({ nullable: false, unique: true })
  price: number;

  @Column('simple-array', { nullable: false })
  images: string[];

  @Column('boolean', { default: false })
  active: boolean;

  @Column('boolean', { default: false })
  activenew: boolean;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' }) // Thêm định danh của cột category
  category: Category;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];
}
