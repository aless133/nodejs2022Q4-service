import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { Fav } from 'src/favs/favs.dto';

@Injectable()
export class FavsService {
  constructor(readonly dbService: DBService) {}

  async getAll() {
    const all = {
      artists: await this.dbService.getList('artists', 'id', await this.dbService.getFavs('artists')),
      albums: await this.dbService.getList('albums', 'id', await this.dbService.getFavs('albums')),
      tracks: await this.dbService.getList('tracks', 'id', await this.dbService.getFavs('tracks')),
    };
    return all;
  }

  async add(table: string, id: string) {
    let obj;
    try {
      obj = await this.dbService.get(table, id);
    } catch (err) {
      if (err instanceof NotFoundException) throw new UnprocessableEntityException();
      else throw err;
    }
    if (obj) {
      const fav = await this.dbService.getFav(table, id);
      if (!fav) this.dbService.addFav(table, id);
    }
  }

  async delete(table: string, id: string) {
    const obj = await this.dbService.get(table, id);
    if (obj) {
      const fav = await this.dbService.getFav(table, id);
      if (fav) this.dbService.deleteFav(table, id);
      else throw new NotFoundException();
    }
  }
}
