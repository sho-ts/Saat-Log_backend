import { Test, TestingModule } from '@nestjs/testing';
import { DayTasksService } from './day-tasks.service';

describe('DayTasksService', () => {
  let service: DayTasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayTasksService],
    }).compile();

    service = module.get<DayTasksService>(DayTasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
