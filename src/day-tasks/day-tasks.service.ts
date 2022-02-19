import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayTask } from './day-task.model';
import { AddDayTaskInput } from './dto/add-day-task.input';
import { GetDayTaskInput } from './dto/get-day-task.input';
import { GetAllDayTaskInput } from './dto/get-all-day-task.input';

@Injectable()
export class DayTasksService {
  constructor(
    @InjectRepository(DayTask)
    private dayTasksRepository: Repository<DayTask>,
  ) { }

  async read(params: GetDayTaskInput) {
    return await this.dayTasksRepository
      .createQueryBuilder('dayTask')
      .innerJoinAndMapOne(
        'dayTask.task',
        'dayTask.taskId',
        'task'
      )
      .where('dayTask.dayTaskId = :dayTaskId', { dayTaskId: params.dayTaskId })
      .andWhere('dayTask.userId = :userId', { userId: params.userId })
      .getOne();
  }

  async readAll(params: GetAllDayTaskInput) {
    return await this.dayTasksRepository
      .createQueryBuilder('dayTask')
      .innerJoinAndMapOne(
        'dayTask.task',
        'dayTask.taskId',
        'task'
      )
      .where('dayTask.userId = :userId', { userId: params.userId })
      .andWhere('dayTask.date = :date', { date: new Date(params.year, params.month - 1, params.day) })
      .getMany();
  }

  async create(params: AddDayTaskInput) {
    const dayTask = this.dayTasksRepository.create({
      dayTaskId: params.dayTaskId,
      userId: params.userId,
      taskId: params.taskId,
      date: new Date(params.year, params.month - 1, params.day),
      target: params.target
    })

    await this.dayTasksRepository.save(dayTask);

    return dayTask;
  }

  async delete(params: GetDayTaskInput) {
    const dayTask = await this.dayTasksRepository.findOne({
      dayTaskId: params.dayTaskId,
      userId: params.userId,
    })

    if (!dayTask) return false;

    dayTask.deletedAt = new Date();
    this.dayTasksRepository.save(dayTask);

    return true;
  }
}
