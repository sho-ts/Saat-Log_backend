import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTaskInput {
  @Field()
  userId: string;

  @Field()
  name: string;
}