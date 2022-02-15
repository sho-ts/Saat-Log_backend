import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EditTaskInput {
  @Field()
  taskId: string;

  @Field()
  userId: string;

  @Field()
  name: string;
}