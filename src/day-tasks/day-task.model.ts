import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.model';
import { Task } from '../tasks/task.model';

@ObjectType()
@Entity()
export class DayTask {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  dayTaskId: string;

  @ManyToOne(type => Task, task => task.dayTasks)
  @JoinColumn({ name: 'taskId' })
  taskId: Task;

  @ManyToOne(type => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @Column({ default: false })
  @Field()
  isActive: boolean;

  @Column()
  @Field()
  progress: number;

  @Column()
  @Field()
  target: number;

  @Column()
  @Field()
  day: Date;

  @Column()
  @Field()
  startedAt: Date;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @DeleteDateColumn()
  @Field()
  deletedAt: Date;
}