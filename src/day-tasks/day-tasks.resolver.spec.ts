import { Test, TestingModule } from '@nestjs/testing';
import { DayTasksResolver } from './day-tasks.resolver';

describe('DayTasksResolver', () => {
  let resolver: DayTasksResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DayTasksResolver],
    }).compile();

    resolver = module.get<DayTasksResolver>(DayTasksResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
