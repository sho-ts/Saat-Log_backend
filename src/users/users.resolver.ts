import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GuardResponse } from '../auth/guard-response';

@Resolver((of) => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @UseGuards(GraphqlAuthGuard)
  @Query((returns) => User)
  async getUser(@Args('userId') userId: string) {
    return await this.userService.read(userId);
  }

  @UseGuards(GraphqlAuthGuard)
  @Query((returns) => User)
  async getCurrentUser(@GuardResponse() user) {
    return await this.userService.readByAuth(user.sub);
  }

  @Mutation((returns) => User)
  async createUser(
    @Args('params') params: CreateUserInput
  ) {
    return this.userService.create(params);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation((returns) => User)
  async updateUser(@Args('params') params: UpdateUserInput) {
    return this.userService.update(params);
  }

  @UseGuards(GraphqlAuthGuard)
  @Mutation((returns) => Boolean)
  async deleteUser(@Args('userId') userId: string) {
    return this.userService.delete(userId);
  }
}
