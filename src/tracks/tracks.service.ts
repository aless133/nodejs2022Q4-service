import { Injectable, ForbiddenException } from '@nestjs/common';
import { DBService } from '../common/db.service';
import { Track, TrackDto } from './tracks.dto';
import { CrudService } from 'src/common/crud.service';
import { User, UserCreateDto } from 'src/users/users.dto';

@Injectable()
export class TracksService extends CrudService<Track, UserCreateDto> {
  constructor(readonly dbService: DBService) {
    super(dbService);
  }

  getTable() {
    return 'tracks';
  }

}
