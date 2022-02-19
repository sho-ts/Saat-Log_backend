import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetDayTaskInput {
  @Field()
  dayTaskId: string;

  @Field()
  userId: string;
}