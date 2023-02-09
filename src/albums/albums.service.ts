import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { Album, AlbumDto } from './albums.dto';
import { CrudService } from 'src/common/crud.service';

@Injectable()
export class AlbumsService extends CrudService<Album, AlbumDto> {
  constructor(readonly dbService: DBService) {
    super(dbService);
  }

  getTable() {
    return 'albums';
  }

  async delete(id: string) {
    return await this.dbService.delete('albums', id, async (album: Album) => {
      const tracks = await album.tracks;
      if (tracks)
        await Promise.all(
          tracks.map(async (track) => await this.dbService.update('tracks', track.id, { albumId: null })),
        );
    });
  }
}
