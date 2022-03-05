import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { GetTaskInput } from './dto/get-task.input';
import { GetAllTaskInput } from './dto/get-all-task.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GuardResponse } from '../auth/guard-response';

@UseGuards(GraphqlAuthGuard)
@Resolver((of) => Task)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query((returns) => Task)
  async getTask(@Args('params') params: GetTaskInput) {
    return await this.tasksService.read(params);
  }

  @Query((returns) => Task)
  async getTaskByAuth(
    @Args('params') params: GetTaskInput,
    @GuardResponse() user,
  ) {
    return await this.tasksService.readByAuth(params, user.sub);
  }

  @Query((returns) => [Task])
  async getAllTasks(
    @Args('params') params: GetAllTaskInput,
    @GuardResponse() user,
  ) {
    return await this.tasksService.readAll(params, user.sub);
  }

  @Mutation((returns) => Task)
  async addTask(
    @Args('params') params: CreateTaskInput,
    @GuardResponse() user,
  ) {
    return await this.tasksService.create(params, user.sub);
  }

  @Mutation((returns) => Task)
  async updateTask(
    @Args('params') params: UpdateTaskInput,
    @GuardResponse() user,
  ) {
    return await this.tasksService.update(params, user.sub);
  }

  @Mutation((returns) => Boolean)
  async deleteTask(
    @Args('params') params: GetTaskInput,
    @GuardResponse() user,
  ) {
    return await this.tasksService.delete(params, user.sub);
  }
}
