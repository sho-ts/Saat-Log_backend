import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Task } from './task.model';
import { TasksService } from './tasks.service';
import { EditTaskInput } from './dto/edit-task.input';
import { GetTaskInput } from './dto/get-task.input';
import { GetAllTaskInput } from './dto/get-all-task.input';

@Resolver(of => Task)
export class TasksResolver {
  constructor(private tasksService: TasksService) { }

  @Query(returns => Task)
  async getTask(@Args('params') params: GetTaskInput) {
    return await this.tasksService.read(params);
  }

  @Query(returns => [Task])
  async getAllTasks(@Args('params') params: GetAllTaskInput) {
    return await this.tasksService.readAll(params);
  }

  @Mutation(returns => Task)
  async addTask(@Args('params') params: EditTaskInput) {
    return await this.tasksService.create(params);
  }

  @Mutation(returns => Task)
  async updateTask(@Args('params') params: EditTaskInput) {
    return await this.tasksService.update(params);
  }

  @Mutation(returns => Boolean)
  async deleteTask(@Args('params') params: GetTaskInput) {
    return await this.tasksService.delete(params);
  }
}
