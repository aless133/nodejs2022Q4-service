import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { Track, TrackDto } from './tracks.dto';
import { CrudService } from 'src/common/crud.service';

@Injectable()
export class TracksService extends CrudService<Track, TrackDto> {
  constructor(readonly dbService: DBService) {
    super(dbService);
  }

  getTable() {
    return 'tracks';
  }
}
