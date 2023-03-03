import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { TaskStatus } from './enum/task-status.enum';

@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  @Column({ name: 'userId' })
  @Exclude()
  userId: string;

  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  // @JoinColumn({ name: 'userId' })
  @Exclude({ toPlainOnly: true })
  user: User;
}
