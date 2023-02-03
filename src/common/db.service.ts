import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User, UserCreateDto } from 'src/users/users.dto';
import { Track, TrackDto } from 'src/tracks/tracks.dto';
import { Artist, ArtistDto } from 'src/artists/artists.dto';
import { Album, AlbumDto } from 'src/albums/albums.dto';
import { Favs } from 'src/favs/favs.dto';
import { isArray } from 'class-validator';

type Entity = User | Track | Artist | Album;
type CreateEntity = Omit<Entity, 'id'>;
// type CreateEntity = UserCreateDto | TrackDto | ArtistDto;
// type Table = 'users' | 'tracks' | 'artists' | 'albums';
type Table = string;
type FavsTable = string; //'tracks' | 'artists' | 'albums';

const classes = {
  users: User,
  tracks: Track,
  artists: Artist,
  albums: Album,
};

interface Database {
  users: Record<string, User>;
  tracks: Record<string, Track>;
  artists: Record<string, Artist>;
  albums: Record<string, Album>;
  favs: {
    artists: string[],
    albums: string[],
    tracks: string[],
  }
;
}

const database: Database = {
  users: {},
  tracks: {},
  artists: {},
  albums: {},
  favs: {
    artists: [],
    albums: [],
    tracks: [],
  },
};

@Injectable()
export class DBService {
  getAll(table: Table) {
    return Object.keys(database[table]).map((key) => new classes[table](database[table][key]));
  }

  getList(table: Table, field: string, find: string | number | string[] | number[]) {
    if (isArray(find)) {
      const castedFind = find as (string | number)[];
      return Object.keys(database[table])
        .filter((key) => castedFind.includes(database[table][key][field]))
        .map((key) => new classes[table](database[table][key]));
    }
    else 
      return Object.keys(database[table])
        .filter((key) => database[table][key][field] === find)
        .map((key) => new classes[table](database[table][key]));
  }

  get(table: Table, id: string) {
    if (!database[table][id]) {
      throw new NotFoundException();
    } else {
      return new classes[table](database[table][id]);
    }
  }

  create(table: Table, data: CreateEntity) {
    const id = uuidv4();
    database[table][id] = { ...data, id };
    return new classes[table](database[table][id]);
  }

  update(table: Table, id: string, data: Partial<CreateEntity>) {
    if (!database[table][id]) {
      throw new NotFoundException();
    } else {
      database[table][id] = { ...database[table][id], ...data };
      return new classes[table](database[table][id]);
    }
  }

  delete(table: Table, id: string) {
    if (!database[table][id]) {
      throw new NotFoundException();
    } else {
      delete database[table][id];
      return {};
    }
  }

  //////// FAVS //////////

  getFavs(table: FavsTable): string[] {
    return database.favs[table];
  }

  setFavs(table: FavsTable, favs: string[]) {
    return (database.favs[table] = favs);
  }

  addFavs(table: FavsTable, fav: string) {
    database.favs[table].push(fav);
    return database.favs[table];
  }

  deleteFavs(table: FavsTable, fav: string) {
    const i = database.favs[table].indexOf(fav);
    if (i>-1)
      database.favs[table].splice(i,1);
    return database.favs[table];
  }

}
