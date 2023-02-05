import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { DBService } from '../common/db.service';
// import { Album, AlbumDto } from './albums.dto';
import { CrudService } from 'src/common/crud.service';
import { User, UserCreateDto } from 'src/users/users.dto';

@Injectable()
export class FavsService {
  constructor(readonly dbService: DBService) {}

  getAll() {
    const all = {
      artists: this.dbService.getList('artists', 'id', this.dbService.getFavs('artists')),
      albums: this.dbService.getList('albums', 'id', this.dbService.getFavs('albums')),
      tracks: this.dbService.getList('tracks', 'id', this.dbService.getFavs('tracks')),
    };
    return all;
  }

  add(table: string, id: string) {
    let obj;
    try {
      obj = this.dbService.get(table, id);
    } catch (err) {
      if (err instanceof NotFoundException) throw new UnprocessableEntityException();
      else throw err;
    }
    if (obj) {
      const favs = this.dbService.getFavs(table);
      if (!favs.includes(id)) this.dbService.addFavs(table, id);
    }
  }

  delete(table: string, id: string) {
    const obj = this.dbService.get(table, id);
    if (obj) {
      const favs = this.dbService.getFavs(table);
      if (favs.includes(id)) this.dbService.deleteFavs(table, id);
      else throw new NotFoundException();
    }
  }
}
