import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetAllDayTaskInput {
  @Field()
  userId: string

  @Field({ nullable: true })
  paged?: number;

  @Field(type => Int)
  year: number;

  @Field(type => Int)
  month: number;

  @Field(type => Int)
  day: number;
}