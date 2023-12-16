import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findOneWithUserName(userName: string) {
    return await this.userRepo.findOne({ where: { email: userName } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.findOne(id); // Check if user exists

    // Use save to perform both update and return the updated user
    await this.userRepo.save({ id, ...updateUserDto } as User);

    return await this.findOne(id); // Return the updated user
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id); // Check if user exists

    await this.userRepo.remove(user);
  }
}
