import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetAllTaskInput {
  @Field(type => Int, { nullable: true })
  paged?: number;

  @Field()
  userId: string;
}