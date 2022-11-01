import {
  Controller,
  Get,
  Header,
  Headers,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

@Controller('streaming-file')
export class StreamingFileController {
  @Get('pdf')
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(
      join(process.cwd(), 'book\\thumbnail\\76c63ef3bf78b5ef1aa98a81dd77834a'),
    );
    console.log(res);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition':
        'attachment; filename="76c63ef3bf78b5ef1aa98a81dd77834a"',
    });
    return new StreamableFile(file);
  }

  @Get('video')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  getFileVideo(
    @Res({ passthrough: true }) res: Response,
    @Headers() headers,
  ): StreamableFile {
    const file1 = join(
      process.cwd(),
      'book\\thumbnail\\fa3609523e459dcb1e258a71c372fbc4',
    );
    const file = createReadStream(
      join(process.cwd(), 'book\\thumbnail\\fa3609523e459dcb1e258a71c372fbc4'),
    );
    console.log(headers);

    res.set({
      'Content-Disposition':
        'attachment; filename="fa3609523e459dcb1e258a71c372fbc4"',
    });
    return new StreamableFile(file);
  }
}
