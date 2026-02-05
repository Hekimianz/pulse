import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuth } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/enums/user-role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuth, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  public async findAll(): Promise<Omit<User, 'password'>[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuth)
  @Get('email')
  public async findByEmail(email: string): Promise<User | null> {
    return await this.usersService.findByEmail(email);
  }

  @Get(':id')
  public async findById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<User, 'password'>> {
    return await this.usersService.findById(id);
  }
}
