import { Test, TestingModule } from '@nestjs/testing';
import { StreamingFileController } from './streaming-file.controller';

describe('StreamingFileController', () => {
  let controller: StreamingFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StreamingFileController],
    }).compile();

    controller = module.get<StreamingFileController>(StreamingFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
