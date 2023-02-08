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
    const tracks = await this.dbService.getList('tracks', 'albumId', id);
    tracks.forEach(async (track) => await this.dbService.update('tracks', track.id, { albumId: null }));
    return await this.dbService.delete('albums', id);
  }
}
