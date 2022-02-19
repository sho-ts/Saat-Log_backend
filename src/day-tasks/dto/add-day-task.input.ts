import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddDayTaskInput {
  @Field()
  dayTaskId: string;

  @Field()
  taskId: string;

  @Field()
  userId: string;

  @Field(type => Int)
  year: number;

  @Field(type => Int)
  month: number;

  @Field(type => Int)
  day: number;

  @Field(type => Int, { nullable: true })
  target?: number;
}