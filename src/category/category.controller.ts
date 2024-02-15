import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from 'src/entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/createCategoryDto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAllCategorys(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }

  @Get(':id')
  async categoryFindOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.categoryFindOne(id);
  }

  @Post('new-category')
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put(':id')
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  async deleteBillboard(@Param('id') id: number): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
