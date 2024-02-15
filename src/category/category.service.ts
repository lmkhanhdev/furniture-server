import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/createCategoryDto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRipo: Repository<Category>,
  ) {}
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRipo.find();
  }

  async categoryFindOne(id: number): Promise<Category> {
    const category = await this.categoryRipo.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async categoryFindByName(name: string): Promise<Category> {
    const category = await this.categoryRipo.findOne({ where: { name: name } });
    if (!category) {
      throw new NotFoundException(`Category with name ${name} not found`);
    }
    return category;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const category = this.categoryRipo.create(createCategoryDto);
    return await this.categoryRipo.save(category);
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRipo.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    if (updateCategoryDto.name) {
      category.name = updateCategoryDto.name;
    }

    await this.categoryRipo.save(category);

    return category;
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.categoryFindOne(id);

    await this.categoryRipo.remove(category);
  }
}
