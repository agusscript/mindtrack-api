import { InjectRepository } from '@nestjs/typeorm';
import { Habit } from '../entity/habit.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class HabitRepository {
  constructor(
    @InjectRepository(Habit)
    private readonly repository: Repository<Habit>,
  ) {}

  async getAllByUserId(userId: number): Promise<Habit[]> {
    return await this.repository.find({
      where: { user: { id: userId } },
    });
  }

  async create(habit: Habit): Promise<Habit> {
    return await this.repository.save(habit);
  }

  async update(id: number, updateHabitDto: Partial<Habit>): Promise<Habit> {
    const habitToUpdate = await this.repository.preload({
      ...updateHabitDto,
      id,
    });

    if (!habitToUpdate) {
      throw new NotFoundException(`Habit with ID ${id} not found`);
    }

    return await this.repository.save(habitToUpdate);
  }

  async delete(id: number): Promise<void> {
    const habitToDelete = await this.repository.findOne({
      where: { id },
    });

    if (!habitToDelete) {
      throw new NotFoundException(`Habit with ID ${id} not found`);
    }

    await this.repository.softDelete(id);
  }
}
