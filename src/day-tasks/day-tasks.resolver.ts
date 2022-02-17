import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DayTasksService } from './day-tasks.service';
import { DayTask } from './day-task.model';
import { AddDayTaskInput } from './dto/add-day-task.input';

@Resolver()
export class DayTasksResolver {
  constructor(private dayTasksService: DayTasksService) { }

  @Query(returns => DayTask)
  async getDayTask() {

  }

  @Query(returns => [DayTask])
  async getAllDayTasks(@Args('userId') userId: string) {
    return await this.dayTasksService.readAll(userId);
  }

  @Mutation(returns => DayTask)
  async addDayTask(@Args('params') params: AddDayTaskInput) {
    return await this.dayTasksService.create(params);
  }
}
