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

  delete(id: string) {
    const tracks = this.dbService.getList('tracks', 'artistId', id);
    tracks.forEach((track) => this.dbService.update('tracks', track.id, { artistId: null }));
    const albums = this.dbService.getList('albums', 'artistId', id);
    albums.forEach((album) => this.dbService.update('albums', album.id, { artistId: null }));
    return this.dbService.delete('artists', id);
  }
}
