import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/createProductDto';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRipo: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  S3_BUCKET_NAME = 'sondinh-furniture';
  s3 = new AWS.S3({
    accessKeyId: 'AKIA3OE2ITGJW3RP7R6Y',
    secretAccessKey: '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',
    region: 'ap-southeast-2',
  });

  async uploadFile(file) {
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.S3_BUCKET_NAME,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: process.env.S3_REGION,
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRipo.find({ relations: ['category'] });
  }

  async productFindOne(id: number): Promise<Product> {
    const product = await this.productRipo.findOne({
      where: { id: id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryName, ...productDto } = createProductDto;

    const category =
      await this.categoryService.categoryFindByName(categoryName);
    if (!category) {
      throw new NotFoundException(`Category with id ${category} not found`);
    }

    const product = this.productRipo.create(productDto);
    product.category = category; // Assign the category to the product

    return await this.productRipo.save(product);
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRipo.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (updateProductDto.name) {
      product.name = updateProductDto.name;
    }

    if (updateProductDto.description) {
      product.description = updateProductDto.description;
    }

    if (updateProductDto.price) {
      product.price = updateProductDto.price;
    }

    if (updateProductDto.images) {
      product.images = updateProductDto.images;
    }

    if (updateProductDto.categoryName) {
      const category = await this.categoryService.categoryFindByName(
        updateProductDto.categoryName,
      );
      if (!category) {
        throw new NotFoundException(
          `Category with id ${updateProductDto.categoryName} not found`,
        );
      }
      product.category = category; // Assign the new category to the product
    }

    await this.productRipo.save(product);

    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productFindOne(id);

    await this.productRipo.remove(product);
  }

  async toggleActive(id: number): Promise<Product> {
    const product = await this.productRipo.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // Đảo ngược trạng thái active
    product.active = !product.active;

    await this.productRipo.save(product);

    return product;
  }

  async activeNew(id: number): Promise<Product> {
    const productNew = await this.productRipo.findOne({ where: { id: id } });
    if (!productNew) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // Đảo ngược trạng thái active
    productNew.activenew = !productNew.activenew;

    await this.productRipo.save(productNew);

    return productNew;
  }
}
