import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayTask } from './day-task.model';

@Module({
  imports: [TypeOrmModule.forFeature([DayTask])]
})
export class DayTasksModule { }
