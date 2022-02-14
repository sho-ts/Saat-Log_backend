import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AddTaskInput {
  @Field()
  taskId: string;

  @Field()
  userId: string;

  @Field()
  name: string;
}