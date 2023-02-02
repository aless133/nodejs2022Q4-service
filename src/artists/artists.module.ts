import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { DBService } from 'src/common/db.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, DBService],
})
export class ArtistsModule {}
