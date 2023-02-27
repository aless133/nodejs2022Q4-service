import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [DBModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
