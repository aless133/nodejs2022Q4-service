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
    return await this.dbService.delete('artists', id, async (artist: Artist) => {
      const tracks = await artist.tracks;
      if (tracks)
        await Promise.all(
          tracks.map(async (track) => await this.dbService.update('tracks', track.id, { artistId: null })),
        );
      const albums = await artist.albums;
      if (albums)
        await Promise.all(
          albums.map(async (album) => await this.dbService.update('albums', album.id, { artistId: null })),
        );
    });
  }
}
