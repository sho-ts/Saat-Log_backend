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

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @DeleteDateColumn()
  @Field()
  deleteAt: Date;
}