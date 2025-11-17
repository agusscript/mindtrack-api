import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { TaskService } from './service/task.service';
import { TaskRepository } from './repository/task.repository';
import { TaskMapper } from './mapper/task.mapper';
import { UserModule } from '../user/user.module';
import { TaskController } from './controller/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, TaskMapper],
  exports: [TaskService],
})
export class TaskModule {}
