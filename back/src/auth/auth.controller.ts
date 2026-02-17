import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from 'src/users/DTOs/register-user.dto';
import { User } from 'src/users/entities/user.entity';
import { LoginUserDTO } from 'src/users/DTOs/login-user.dto';
import { JwtAuth } from './guards/jwt.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { Payload } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() dto: RegisterUserDTO,
  ): Promise<Omit<User, 'password'>> {
    return await this.authService.register(dto);
  }

  @Post('login')
  public async login(
    @Body() dto: LoginUserDTO,
  ): Promise<{ accessToken: string }> {
    return await this.authService.login(dto);
  }

  @UseGuards(JwtAuth)
  @Get('me')
  async getMe(@CurrentUser() user: Payload): Promise<Omit<User, 'password'>> {
    return await this.authService.findById(user.sub);
  }
}
