import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

type PasswordType = {
  value: string;
};

export class SignUpDto {
  @IsString()
  @MinLength(2)
  @MaxLength(128)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(128)
  @Transform(({ value }: PasswordType) => value.trim())
  password: string;
}
