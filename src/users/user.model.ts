import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
 } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  userId: number;

  @Column()
  @Field()
  name: string;

  @CreateDateColumn()
  @Field()
  createdAt: Date;
}
