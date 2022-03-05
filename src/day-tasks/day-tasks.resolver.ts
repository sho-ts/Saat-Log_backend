import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DayTasksService } from './day-tasks.service';
import { DayTask } from './day-task.model';
import { CreateDayTaskInput } from './dto/create-day-task.input';
import { GetDayTaskInput } from './dto/get-day-task.input';
import { GetAllDayTaskInput } from './dto/get-all-day-task.input';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { GuardResponse } from '../auth/guard-response';

@UseGuards(GraphqlAuthGuard)
@Resolver()
export class DayTasksResolver {
  constructor(private dayTasksService: DayTasksService) {}

  @Query((returns) => DayTask)
  async getDayTask(
    @Args('params') params: GetDayTaskInput,
    @GuardResponse() user,
  ) {
    return await this.dayTasksService.read(params, user.sub);
  }

  @Query((returns) => [DayTask])
  async getAllDayTasks(
    @Args('params') params: GetAllDayTaskInput,
    @GuardResponse() user,
  ) {
    return await this.dayTasksService.readAll(params, user.sub);
  }

  @Mutation((returns) => DayTask)
  async addDayTask(
    @Args('params', { nullable: true }) params: CreateDayTaskInput,
    @GuardResponse() user,
  ) {
    return await this.dayTasksService.create(params, user.sub);
  }

  @Mutation((returns) => Boolean)
  async deleteDayTask(
    @Args('params') params: GetDayTaskInput,
    @GuardResponse() user,
  ) {
    return await this.dayTasksService.delete(params, user.sub);
  }
}
