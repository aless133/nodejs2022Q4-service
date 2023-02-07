import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/users.dto';
import { Track } from 'src/tracks/tracks.dto';
import { Artist } from 'src/artists/artists.dto';
import { Album } from 'src/albums/albums.dto';
import { isArray } from 'class-validator';
import { DataSource, Repository } from 'typeorm';
import { DSProvider } from './ds.provider';
import { Fav } from 'src/favs/favs.dto';

type Entity = User | Track | Artist | Album | Fav;
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
  favs: Fav,
};

@Injectable()
export class DBService {
  repos: Record<string, Repository<Entity>> = {};
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    const ur = new User({ login: 'u1', password: 'p1', version: 1, createdAt: 1, updatedAt: 1 });
    dataSource.manager.save(ur);
    Object.keys(classes).forEach((c) => {
      this.repos[c] = this.dataSource.getRepository(classes[c]);
    });
  }

  async getAll(table: Table) {
    return await this.repos[table].find();
  }

  async getList(table: Table, field: string, find: string | number | string[] | number[]) {
    return await this.repos[table].findBy({ [field]: find });
    // if (isArray(find)) {
    //   const castedFind = find as (string | number)[];
    //   return Object.keys(database[table])
    //     .filter((key) => castedFind.includes(database[table][key][field]))
    //     .map((key) => new classes[table](database[table][key]));
    // } else
    //   return Object.keys(database[table])
    //     .filter((key) => database[table][key][field] === find)
    //     .map((key) => new classes[table](database[table][key]));
  }

  async get(table: Table, id: string): Promise<Entity> {
    const entity = await this.repos[table].findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    } else {
      return entity;
    }
  }

  async create(table: Table, data: CreateEntity) {
    const entity = this.repos[table].create(data);
    await this.repos[table].save(entity);
    return entity;
  }

  async update(table: Table, id: string, data: Partial<CreateEntity>) {
    const entity = await this.repos[table].findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    } else {
      console.log(entity,data);
      this.repos[table].merge(entity, data);
      this.repos[table].save(entity);
      return entity;
    }
  }

  async delete(table: Table, id: string) {
    const entity = await this.repos[table].findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    } else {
      this.repos[table].delete(entity);
      return {};
    }
  }

  //////// FAVS //////////

  async getFavs(table: FavsTable) {
    return (await this.repos.favs.findBy({ table })).map((fav) => fav.id);
  }

  async getFav(table: FavsTable, id: string) {
    return await this.repos.favs.findOneBy({ table, id });
  }

  async addFav(table: FavsTable, id: string) {
    return await this.repos.favs.insert({ table, id });
  }

  async deleteFav(table: FavsTable, id: string) {
    return await this.repos.favs.delete({ table, id });
  }

  /*
  setFavs(table: FavsTable, favs: string[]) {
    return (database.favs[table] = favs);
  }

  addFavs(table: FavsTable, fav: string) {
    database.favs[table].push(fav);
    return database.favs[table];
  }

  deleteFavs(table: FavsTable, fav: string) {
    const i = database.favs[table].indexOf(fav);
    if (i > -1) database.favs[table].splice(i, 1);
    return database.favs[table];
  }
  */
}
