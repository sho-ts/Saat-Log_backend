import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(returns => User)
  async getUser(@Args({ name: 'id', type: () => Int }) id: number) {
    const user = await this.userService.findOneById(id);

    return user;
  }
}
