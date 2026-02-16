import { Test, TestingModule } from '@nestjs/testing';
import { AnnoucementsController } from './annoucements.controller';

describe('AnnoucementsController', () => {
  let controller: AnnoucementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnoucementsController],
    }).compile();

    controller = module.get<AnnoucementsController>(AnnoucementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
