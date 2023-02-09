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
    await Promise.all(tracks.map(async (track) => await this.dbService.update('tracks', track.id, { artistId: null })));
    const albums = await this.dbService.getList('albums', 'artistId', id);
    await Promise.all(albums.map(async (album) => await this.dbService.update('albums', album.id, { artistId: null })));
    return await this.dbService.delete('artists', id);
  }
}
