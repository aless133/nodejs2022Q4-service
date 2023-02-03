import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { DBService } from 'src/common/db.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, DBService],
})
export class AlbumsModule {}
