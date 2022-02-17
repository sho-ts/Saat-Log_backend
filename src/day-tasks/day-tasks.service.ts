import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayTask } from './day-task.model';
import { AddDayTaskInput } from './dto/add-day-task.input';

@Injectable()
export class DayTasksService {
  constructor(
    @InjectRepository(DayTask)
    private dayTasksRepository: Repository<DayTask>,
  ) { }

  async readAll(userId: string) {
    return await this.dayTasksRepository
      .createQueryBuilder('dayTask')
      .innerJoinAndMapOne(
        'dayTask.task',
        'dayTask.taskId',
        'task'
      )
      .where('dayTask.userId = :userId', { userId })
      .getMany();
  }

  async create(params: AddDayTaskInput) {
    
    const dayTask = this.dayTasksRepository.create({
      dayTaskId: params.dayTaskId,
      userId: params.userId,
      taskId: params.taskId,
      day: params.day,
      target: params.target
    })

    await this.dayTasksRepository.save(dayTask);

    return dayTask;
  }
}
