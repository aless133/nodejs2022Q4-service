import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
import { Fav, FavsTable, FavsEntity } from 'src/favs/favs.dto';
import { Artist } from 'src/artists/artists.dto';
import { Album } from 'src/albums/albums.dto';
import { Track } from 'src/tracks/tracks.dto';

@Injectable()
export class FavsService {
  constructor(readonly dbService: DBService) {}

  async getAll() {
    const favs = await this.dbService.getFavs();
    const all = {
      artists: [],
      albums: [],
      tracks: [],
    };
    for (const fav of favs) {
      if (fav.table == 'artists') all.artists.push(await fav.artist);
      if (fav.table == 'albums') all.albums.push(await fav.album);
      if (fav.table == 'tracks') all.tracks.push(await fav.track);
    }
    return all;
  }

  async add(table: FavsTable, id: string) {
    let obj;
    try {
      obj = await this.dbService.get(table, id);
    } catch (err) {
      if (err instanceof NotFoundException) throw new UnprocessableEntityException();
      else throw err;
    }
    if (obj) {
      const fav = await this.dbService.getFav(table, id);
      if (!fav) return this.dbService.addFav(table, id);
    }
  }

  async delete(table: FavsTable, id: string) {
    const obj = await this.dbService.get(table, id);
    if (obj) {
      const fav = await ((obj as FavsEntity).fav);
      if (fav) return this.dbService.deleteFav(fav);
      else throw new NotFoundException();
    }
  }
}
