import { IsAlpha, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  surname: string;

  @IsInt()
  @IsNotEmpty()
  height: number;

  @IsInt()
  @IsNotEmpty()
  weight: number;

  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  sex: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
