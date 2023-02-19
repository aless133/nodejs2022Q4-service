import { Injectable } from '@nestjs/common';
import { DBService } from '../common/db.service';
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

  delete(id: string) {
    const tracks = this.dbService.getList('tracks', 'albumId', id);
    tracks.forEach((track) => this.dbService.update('tracks', track.id, { albumId: null }));
    return this.dbService.delete('albums', id);
  }
}
