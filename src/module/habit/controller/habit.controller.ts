import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { HabitService } from '../service/habit.service';
import { Habit } from '../entity/habit.entity';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { UpdateHabitDto } from '../dto/update-habit.dto';
import { AuthenticationGuard } from 'src/module/authentication/guard/authentication.guard';

@Controller('habit')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @UseGuards(AuthenticationGuard)
  @Get('user/:userId')
  async getAllByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Habit[]> {
    return this.habitService.getAllByUserId(userId);
  }

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createHabitDto: CreateHabitDto): Promise<Habit> {
    return this.habitService.create(createHabitDto);
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHabitDto: UpdateHabitDto,
  ): Promise<Habit> {
    return this.habitService.update(id, updateHabitDto);
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.habitService.delete(id);
  }
}
