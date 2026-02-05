import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDTO } from 'src/users/DTOs/register-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDTO } from 'src/users/DTOs/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register(dto: RegisterUserDTO): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (existingUser) throw new ConflictException('Email is already in use');
    const hashedPass = await bcrypt.hash(dto.password, 10);

    const newUser = {
      ...dto,
      password: hashedPass,
    };

    return await this.usersService.registerUser(newUser);
  }

  async login(dto: LoginUserDTO): Promise<{ accessToken: string }> {
    const existingUser = await this.usersService.findByEmail(dto.email);
    if (!existingUser)
      throw new UnauthorizedException(
        'Email or password entered are incorrect',
      );
    const validPass = await bcrypt.compare(dto.password, existingUser.password);
    if (!validPass)
      throw new UnauthorizedException(
        'Email or password entered are incorrect',
      );

    const payload: Payload = {
      sub: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    return await this.usersService.findById(id);
  }
}
