import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetAllTaskInput {
  @Field(type => Int)
  paged: number;

  @Field()
  userId: string;
}