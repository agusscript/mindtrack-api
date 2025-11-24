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
import { TaskService } from '../service/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entity/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { AuthenticationGuard } from 'src/module/authentication/guard/authentication.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthenticationGuard)
  @Get('user/:userId')
  async getAllByUserId(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<Task[]> {
    return this.taskService.getAllByUserId(userId);
  }

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(AuthenticationGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, updateTaskDto);
  }

  @UseGuards(AuthenticationGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.delete(id);
  }
}
