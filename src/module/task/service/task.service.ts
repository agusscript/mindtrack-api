import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { Task } from '../entity/task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskMapper } from '../mapper/task.mapper';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { UserService } from 'src/module/user/service/user.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskMapper: TaskMapper,
    private readonly userService: UserService,
  ) {}

  async getAllByUserId(userId: number): Promise<Task[]> {
    return await this.taskRepository.getAllByUserId(userId);
  }

  async getOneById(id: number): Promise<Task> {
    return await this.taskRepository.getOneById(id);
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userService.getOneById(createTaskDto.userId);

    const mappedTask = this.taskMapper.fromCreateDtoToEntity(
      createTaskDto,
      user,
    );

    return await this.taskRepository.create(mappedTask);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.taskRepository.update(id, updateTaskDto);
  }

  async delete(id: number): Promise<void> {
    return await this.taskRepository.delete(id);
  }
}
