import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayTask } from './day-task.model';
import { DayTasksResolver } from './day-tasks.resolver';
import { DayTasksService } from './day-tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([DayTask])],
  providers: [DayTasksResolver, DayTasksService]
})
export class DayTasksModule { }
