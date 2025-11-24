import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from 'src/module/task/entity/task.entity';
import { Habit } from 'src/module/habit/entity/habit.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'text', nullable: true })
  refreshToken: string | null;

  @OneToMany(() => Task, (t) => t.user, {
    cascade: true,
  })
  tasks: Task[];

  @OneToMany(() => Habit, (h) => h.user, {
    cascade: true,
  })
  habits: Habit[];
}
