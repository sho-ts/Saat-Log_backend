import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddDayTaskInput {
  @Field()
  dayTaskId: string;

  @Field()
  taskId: string;

  @Field()
  userId: string;

  @Field()
  day: Date;

  @Field({nullable: true})
  target?: number;
}