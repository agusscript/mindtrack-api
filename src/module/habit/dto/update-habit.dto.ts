import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateHabitDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  notificationTime?: string;
}
