import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { DBService } from 'src/common/db.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, DBService],
})
export class TracksModule {}
