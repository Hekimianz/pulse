import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  budget: string;
}
