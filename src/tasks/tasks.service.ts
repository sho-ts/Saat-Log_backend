import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.model';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { GetTaskInput } from './dto/get-task.input';
import { GetAllTaskInput } from './dto/get-all-task.input';
import { ulid } from 'ulid';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async read(params: GetTaskInput, authId: string) {
    return params.self
      ? await this.tasksRepository.findOne({
          taskId: params.taskId,
          authId,
          deletedAt: null,
        })
      : await this.tasksRepository.findOne({
          taskId: params.taskId,
          deletedAt: null,
        });
  }

  async readAll(params: GetAllTaskInput, authId: string) {
    return await this.tasksRepository.find({
      where: {
        userId: params.userId,
        authId,
      },
      take: 10,
      skip: params.paged ? params.paged - 1 : 0,
    });
  }

  async update(params: UpdateTaskInput, authId: string) {
    const task = await this.tasksRepository.findOne({
      userId: params.userId,
      authId,
      taskId: params.taskId,
      deletedAt: null,
    });

    task.name = params.name;

    return this.tasksRepository.save(task);
  }

  async create(params: CreateTaskInput, authId: string) {
    const task = this.tasksRepository.create({
      userId: params.userId,
      taskId: ulid(),
      name: params.name,
      authId,
    });

    return await this.tasksRepository.save(task);
  }

  async delete(params: GetTaskInput, authId: string) {
    const task = await this.tasksRepository.findOne({
      authId,
      taskId: params.taskId,
      deletedAt: false,
    });

    if (!task) return false;

    task.deletedAt = new Date();
    await this.tasksRepository.save(task);

    return true;
  }
}
