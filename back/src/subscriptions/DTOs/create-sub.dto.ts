import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Category, SubLength } from '../entities/Subscription.entity';

export class CreateSub {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  price: number;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  @IsEnum(SubLength)
  @IsNotEmpty()
  subLength: SubLength;
}
