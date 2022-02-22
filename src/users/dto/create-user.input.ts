import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  photoURL?: string;
}