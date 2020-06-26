import { Test, TestingModule } from '@nestjs/testing';
import { BasicStrategyService } from './basic-strategy.service';

describe('BasicStrategyService', () => {
  let service: BasicStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicStrategyService],
    }).compile();

    service = module.get<BasicStrategyService>(BasicStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
