import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  title: string;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean = false;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
