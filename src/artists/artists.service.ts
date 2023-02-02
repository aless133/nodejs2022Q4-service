import { Injectable, ForbiddenException } from '@nestjs/common';
import { DBService } from '../common/db.service';
import { Artist, ArtistDto } from './artists.dto';
import { CrudService } from 'src/common/crud.service';
import { User, UserCreateDto } from 'src/users/users.dto';

@Injectable()
export class ArtistsService extends CrudService<Artist, ArtistDto> {
  constructor(readonly dbService: DBService) {
    super(dbService);
  }

  getTable() {
    return 'artists';
  }

  // create(artistCreate: ArtistDto): Artist {
  //   const artist = new Artist(artistCreate);
  //   return this.dbService.create('artists', artist);
  // }

  // update(id: string, artistUpdate: ArtistDto): Artist {
  //   return this.dbService.update('artists', id, artistUpdate);
  // }

  delete(id: string) {
    const tracks = this.dbService.getList(this.getTable(), 'artistId', id);
    tracks.forEach((track) => this.dbService.delete('tracks', track.id));
    return this.dbService.delete(this.getTable(), id);
  }
}
