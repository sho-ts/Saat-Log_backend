import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Task } from '../tasks/task.model';
import { DayTask } from '../day-tasks/day-task.model';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  userId: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  photoUrl?: string;

  @OneToMany(type => Task, task => task.userId)
  tasks: Task[];

  @OneToMany(type => DayTask, dayTask => dayTask.userId)
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
