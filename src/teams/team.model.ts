import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Team {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  teamId: string;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  photoUrl?: string;

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
