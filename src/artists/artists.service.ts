import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { Artist, ArtistDto } from './artists.dto';
import { CrudService } from 'src/common/crud.service';

@Injectable()
export class ArtistsService extends CrudService<Artist, ArtistDto> {
  constructor(readonly dbService: DBService) {
    super(dbService);
  }

  getTable() {
    return 'artists';
  }

  async delete(id: string) {
    const tracks = await this.dbService.getList('tracks', 'artistId', id);
    tracks.forEach((track) => this.dbService.update('tracks', track.id, { artistId: null }));
    const albums = await this.dbService.getList('albums', 'artistId', id);
    albums.forEach((album) => this.dbService.update('albums', album.id, { artistId: null }));
    return this.dbService.delete('artists', id);
  }
}
