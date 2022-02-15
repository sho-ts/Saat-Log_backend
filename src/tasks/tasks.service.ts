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

  async readAll(params: GetAllTaskInput) {
    return await this.tasksRepository.find({
      where: { userId: params.userId, },
      take: 10,
      skip: params.paged ? params.paged - 1 : 0
    });
  }

  async create(params: AddTaskInput) {
    const task = this.tasksRepository.create({
      userId: params.userId,
      taskId: params.taskId,
      name: params.name
    });

    return await this.tasksRepository.save(task);
  }

  async delete(params: GetTaskInput) {
    const task = await this.tasksRepository.findOne({
      userId: params.userId,
      taskId: params.taskId,
      deletedAt: false,
    });

    if (!task) return false;

    task.deletedAt = new Date();
    await this.tasksRepository.save(task);

    return true;
  }
}
