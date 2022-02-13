import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';
import { UserInput } from './dto/user.input';

@Resolver(of => User)
export class UsersResolver {
  constructor(private userService: UsersService) { }

  @Query(returns => User)
  async getUser(@Args('userId') userId: string) {
    return await this.userService.read(userId);
  }

  @Mutation(returns => User)
  async createUser(@Args('params') params: UserInput) {
    return this.userService.create(params)
  }

  @Mutation(returns => User)
  async updateUser(@Args('params') params: UserInput) {
    return this.userService.update(params);
  }

  @Mutation(returns => Boolean)
  async deleteUser(@Args('userId') userId: string) {
    return this.userService.delete(userId);
  }
}