import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetTaskInput {
  @Field()
  taskId: string;

  @Field({ nullable: true })
  self?: boolean;
}
