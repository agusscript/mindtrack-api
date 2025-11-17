import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Task } from '../entity/task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { User } from 'src/module/user/entity/user.entity';

@Injectable()
export class TaskMapper {
  fromCreateDtoToEntity(createTaskDto: CreateTaskDto, user: User): Task {
    const task = new Task();

    task.title = createTaskDto.title;
    task.isCompleted = createTaskDto.isCompleted;
    task.user = user;

    return task;
  }

  fromUpdateDtoToEntity(updateTaskDto: UpdateTaskDto): Task {
    const task = new Task();

    task.title = updateTaskDto.title ?? task.title;
    task.isCompleted = updateTaskDto.isCompleted ?? task.isCompleted;

    return task;
  }
}
