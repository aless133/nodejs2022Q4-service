import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';
import { User } from 'src/users/users.dto';
import { Track } from 'src/tracks/tracks.dto';
import { Artist } from 'src/artists/artists.dto';
import { Album } from 'src/albums/albums.dto';
import { Fav, FavsTable, FavsEntity } from 'src/favs/favs.dto';
import { isArray } from 'class-validator';
import { DataSource, Repository } from 'typeorm';
// import { DSProvider } from './ds.provider';

export type Entity = User | Track | Artist | Album | Fav;
type CreateEntity = Omit<Entity, 'id'>;
// type CreateEntity = UserCreateDto | TrackDto | ArtistDto;
export type Table = 'users' | 'tracks' | 'artists' | 'albums';
// type Table = string;
// type FavsTable = 'tracks' | 'artists' | 'albums';
type Repos = {
  users: Repository<User>;
  artists: Repository<Artist>;
  tracks: Repository<Track>;
  albums: Repository<Album>;
  favs: Repository<Fav>;
};

@Injectable()
export class DBService {
  repos: Repos;
  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.repos = {
      users: this.dataSource.getRepository(User),
      tracks: this.dataSource.getRepository(Track),
      artists: this.dataSource.getRepository(Artist),
      albums: this.dataSource.getRepository(Album),
      favs: this.dataSource.getRepository(Fav),
    };
  }

  async getAll(table: string) {
    return await this.repos[table].find();
  }

  async getList(table: string, field: string, find: string | number | string[] | number[]) {
    if (isArray(find)) {
      const castedFind = find as (string | number)[];
      return await this.repos[table].find({ where: { [field]: In(castedFind) } });
    } else {
      return await this.repos[table].find({ where: { [field]: find } });
    }
  }

  async get(table: string, id: string): Promise<Entity> {
    const entity = await this.repos[table].findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    } else {
      return entity;
    }
  }

  async create(table: string, data: CreateEntity) {
    const entity = this.repos[table].create(data);
    await this.repos[table].save(entity);
    return entity;
  }

  async update(table: string, id: string, data: Partial<CreateEntity>) {
    const entity = await this.repos[table].findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    } else {
      this.repos[table].merge(entity, data);
      await this.repos[table].save(entity);
      return entity;
    }
  }

  async delete(table: string, id: string, before?: (e: Entity) => Promise<void>) {
    const entity = await this.repos[table].findOneBy({ id });
    if (!entity) {
      throw new NotFoundException();
    } else {
      if (before) {
        await before(entity);
      }
      if (['artists', 'tracks', 'albums'].includes(table)) {
        const fav = await (entity as FavsEntity).fav;
        if (fav) await this.repos.favs.remove(fav);
      }
      await this.repos[table].remove(entity);
      return {};
    }
  }

  //////// FAVS //////////

  async getFavs(table?: FavsTable) {
    if (table) return await this.repos.favs.find({ where: { table }, relations: ['artist', 'track', 'album'] });
    else return await this.repos.favs.find({ relations: ['artist', 'track', 'album'] });
  }

  async getFav(table: FavsTable, id: string) {
    return await this.repos.favs.findOneBy({ table, entityId: id });
  }

  async addFav(table: FavsTable, id: string) {
    return await this.repos.favs.insert({ table, entityId: id });
  }

  async deleteFav(fav: Fav) {
    return await this.repos.favs.remove(fav);
  }
}
