import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DayTasksService } from './day-tasks.service';
import { DayTask } from './day-task.model';
import { CreateDayTaskInput } from './dto/create-day-task.input';
import { GetDayTaskInput } from './dto/get-day-task.input';
import { GetAllDayTaskInput } from './dto/get-all-day-task.input';

@Resolver()
export class DayTasksResolver {
  constructor(private dayTasksService: DayTasksService) { }

  @Query(returns => DayTask)
  async getDayTask(@Args('params') params: GetDayTaskInput) {
    return await this.dayTasksService.read(params);
  }

  @Query(returns => [DayTask])
  async getAllDayTasks(@Args('params') params: GetAllDayTaskInput) {
    return await this.dayTasksService.readAll(params);
  }

  @Mutation(returns => DayTask)
  async addDayTask(@Args('params') params: CreateDayTaskInput) {
    return await this.dayTasksService.create(params);
  }

  @Mutation(returns => Boolean)
  async deleteDayTask(@Args('params') params: GetDayTaskInput) {
    return await this.dayTasksService.delete(params);
  }
}
