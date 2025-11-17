import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entity/task.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async getAllByUserId(userId: number): Promise<Task[]> {
    return await this.repository.find({
      where: { user: { id: userId } },
    });
  }

  async getOneById(id: number): Promise<Task> {
    const task = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async create(task: Task): Promise<Task> {
    return await this.repository.save(task);
  }

  async update(id: number, updates: Partial<Task>): Promise<Task> {
    const taskToUpdate = await this.repository.preload({
      ...updates,
      id,
    });

    if (!taskToUpdate) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return await this.repository.save(taskToUpdate);
  }

  async delete(id: number): Promise<void> {
    const taskToDelete = await this.repository.findOne({
      where: { id },
    });

    if (!taskToDelete) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.repository.softDelete(id);
  }
}
