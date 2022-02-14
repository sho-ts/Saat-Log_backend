import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.model';
import { AddTaskInput } from './dto/add-task.input';
import { GetTaskInput } from './dto/get-task.input';
import { GetAllTaskInput } from './dto/get-all-task.input';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }

  async read(params: GetTaskInput) {
    return await this.tasksRepository.findOne({
      userId: params.userId,
      taskId: params.taskId,
      deletedAt: null
    })
  }

  async readAll(userId: string) {

  }

  async create(params: AddTaskInput) {
    const task = this.tasksRepository.create({
      userId: params.userId,
      taskId: params.taskId,
      name: params.name
    });
    
    return await this.tasksRepository.save(task);
  }

  async update() {

  }

  async delete(userId: string, postId: string) {

  }
}
