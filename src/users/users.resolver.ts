import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';
import {UserInput } from './dto/user.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private userService: UsersService) { }

  @Query(returns => User)
  async getUser(@Args({ name: 'id', type: () => Int }) id: number) {
    const user = await this.userService.findOneById(id);
    return user;
  }

  @Mutation(returns => User)
  async createUser(@Args('params') params: UserInput) {
    return this.userService.create(params)
  }
}