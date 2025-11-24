import { Injectable } from '@nestjs/common';
import { CreateHabitDto } from '../dto/create-habit.dto';
import { Habit } from '../entity/habit.entity';
import { User } from 'src/module/user/entity/user.entity';

@Injectable()
export class HabitMapper {
  fromCreateDtoToEntity(createHabitDto: CreateHabitDto, user: User): Habit {
    const habit = new Habit();

    habit.title = createHabitDto.title;
    habit.isActive = createHabitDto.isActive;
    habit.notificationTime = createHabitDto.notificationTime;
    habit.user = user;

    return habit;
  }
}
