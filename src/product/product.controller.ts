import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from 'src/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/createProductDto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.productService.uploadFile(file);
  }

  @Get()
  async getAllBillboards(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async billboardFindOne(@Param('id') id: number): Promise<Product> {
    return this.productService.productFindOne(id);
  }

  @Post('new-product')
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    return this.productService.deleteProduct(id);
  }

  @Patch(':id/toggle-active')
  async toggleActive(@Param('id') id: number): Promise<any> {
    const product = await this.productService.toggleActive(id);
    return {
      message: `product with ID ${id} is now ${
        product.active ? 'active' : 'inactive'
      }`,
    };
  }
  @Patch(':id/active-new')
  async activeNew(@Param('id') id: number): Promise<any> {
    const product = await this.productService.activeNew(id);
    return {
      message: `product with ID ${id} is now ${
        product.active ? 'active' : 'inactive'
      }`,
    };
  }
}
