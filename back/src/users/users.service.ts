import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { RegisterUserDTO } from './DTOs/register-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async findAll(): Promise<Omit<User, 'password'>[]> {
    return await this.usersRepository.findAll();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException(`No user found with an id of ${id}`);
    return user;
  }

  async registerUser(dto: RegisterUserDTO): Promise<Omit<User, 'password'>> {
    return await this.usersRepository.registerUser(dto);
  }
}
