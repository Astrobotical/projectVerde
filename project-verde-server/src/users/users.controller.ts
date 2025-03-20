import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.schema';
import { UpdateUserDto } from './users.dto';
import { Types } from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findUserById(new Types.ObjectId(id));
  }

  @Post()
  async createUser(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updatedUser: UpdateUserDto): Promise<User> {
    return this.usersService.updateUser(new Types.ObjectId(id), updatedUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
    await this.usersService.deleteUser(new Types.ObjectId(id));
    return { message: 'User deleted successfully' };
  }
}
