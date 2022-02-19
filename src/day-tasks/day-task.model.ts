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
  @Field()
  taskId: string;

  @ManyToOne(type => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  userId: string;

  @Column({ default: false })
  @Field()
  isActive: boolean;

  @Column({ default: 0 })
  @Field()
  progress: number;

  @Column({ default: 0 })
  @Field()
  target: number;

  @Column()
  @Field()
  date: Date;

  @Column({ nullable: true })
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

  @Field(() => Task)
  task: Task;
}