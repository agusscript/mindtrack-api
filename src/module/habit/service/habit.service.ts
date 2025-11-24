import { Injectable } from '@nestjs/common';
import { HabitRepository } from '../repository/habit.repository';
import { Habit } from '../entity/habit.entity';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { HabitMapper } from '../mapper/habit.mapper';
import { UserService } from 'src/module/user/service/user.service';
import { UpdateHabitDto } from '../dto/update-habit.dto';

@Injectable()
export class HabitService {
  constructor(
    private readonly habitRepository: HabitRepository,
    private readonly habitMapper: HabitMapper,
    private readonly userService: UserService,
  ) {}

  async getAllByUserId(userId: number): Promise<Habit[]> {
    return await this.habitRepository.getAllByUserId(userId);
  }

  async create(createHabitDto: CreateHabitDto): Promise<Habit> {
    const user = await this.userService.getOneById(createHabitDto.userId);

    const mappedHabit = this.habitMapper.fromCreateDtoToEntity(
      createHabitDto,
      user,
    );

    return await this.habitRepository.create(mappedHabit);
  }

  async update(id: number, updateHabitDto: UpdateHabitDto): Promise<Habit> {
    return await this.habitRepository.update(id, updateHabitDto);
  }

  async delete(id: number): Promise<void> {
    return await this.habitRepository.delete(id);
  }
}
