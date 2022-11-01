import { Module } from '@nestjs/common';
import { StreamingFileController } from './streaming-file.controller';

@Module({
  controllers: [StreamingFileController],
})
export class StreamingFileModule {}
