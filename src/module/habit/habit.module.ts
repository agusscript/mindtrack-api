import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habit } from './entity/habit.entity';
import { HabitController } from './controller/habit.controller';
import { HabitService } from './service/habit.service';
import { HabitRepository } from './repository/habit.repository';
import { HabitMapper } from './mapper/habit.mapper';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Habit]), UserModule],
  controllers: [HabitController],
  providers: [HabitService, HabitRepository, HabitMapper],
  exports: [HabitService],
})
export class HabitModule {}
