import { Test, TestingModule } from '@nestjs/testing';
import { AnnoucementsService } from './annoucements.service';

describe('AnnoucementsService', () => {
  let service: AnnoucementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnnoucementsService],
    }).compile();

    service = module.get<AnnoucementsService>(AnnoucementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
