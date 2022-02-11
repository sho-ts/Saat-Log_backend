import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.model';
import { DayTask } from '../day-tasks/day-task.model';

@ObjectType()
@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  taskId: string;

  @Column()
  @Field()
  name: string;

  @ManyToOne(type => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @OneToMany(type => DayTask, dayTask => dayTask.taskId)
  dayTasks: DayTask[];

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