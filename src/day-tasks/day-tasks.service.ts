import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayTask } from './day-task.model';
import { Task } from '../tasks/task.model';
import { CreateDayTaskInput } from './dto/create-day-task.input';
import { GetDayTaskInput } from './dto/get-day-task.input';
import { GetAllDayTaskInput } from './dto/get-all-day-task.input';
import { ulid } from 'ulid';

@Injectable()
export class DayTasksService {
  constructor(
    @InjectRepository(DayTask)
    private dayTasksRepository: Repository<DayTask>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async read(params: GetDayTaskInput, authId: string) {
    return await this.dayTasksRepository
      .createQueryBuilder('dayTask')
      .innerJoinAndMapOne('dayTask.task', 'dayTask.taskId', 'task')
      .where('dayTask.dayTaskId = :dayTaskId', { dayTaskId: params.dayTaskId })
      .andWhere('dayTask.userId = :userId', { userId: params.userId })
      .andWhere('dayTask.authId = :authId', { authId })
      .getOne();
  }

  async readAll(params: GetAllDayTaskInput, authId: string) {
    return await this.dayTasksRepository
      .createQueryBuilder('dayTask')
      .innerJoinAndMapOne('dayTask.task', 'dayTask.taskId', 'task')
      .where('dayTask.userId = :userId', { userId: params.userId })
      .andWhere('dayTask.date = :date', {
        date: new Date(params.year, params.month - 1, params.day),
      })
      .andWhere('dayTask.authId = :authId', { authId })
      .getMany();
  }

  async create(params: CreateDayTaskInput, authId: string) {
    const dayTask = this.dayTasksRepository.create({
      dayTaskId: ulid(),
      userId: params.userId,
      taskId: params.taskId,
      date: new Date(params.year, params.month - 1, params.day),
      target: params.target,
      authId,
    });

    await this.dayTasksRepository.save(dayTask);

    const task = await this.taskRepository.findOne({
      taskId: params.taskId,
      userId: params.userId,
      authId,
    });

    dayTask.task = task;

    return dayTask;
  }

  async delete(params: GetDayTaskInput, authId: string) {
    const dayTask = await this.dayTasksRepository.findOne({
      dayTaskId: params.dayTaskId,
      userId: params.userId,
      authId,
    });

    if (!dayTask) return false;

    dayTask.deletedAt = new Date();
    this.dayTasksRepository.save(dayTask);

    return true;
  }
}
