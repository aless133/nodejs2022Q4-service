import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User, UserCreateDto } from 'src/users/users.dto';
import { Track, TrackDto } from 'src/tracks/tracks.dto';
import { Artist, ArtistDto } from 'src/artists/artists.dto';

type Entity = User | Track | Artist;
type CreateEntity = Partial<Omit<Entity, 'id'>>;
// type CreateEntity = UserCreateDto | TrackDto | ArtistDto;

const classes = {
  users: User,
  tracks: Track,
  artists: Artist,
};

interface Database {
  users: Record<string, User>;
  tracks: Record<string, Track>;
  artists: Record<string, Artist>;
}

const database: Database = {
  users: {},
  tracks: {},
  artists: {},
};

@Injectable()
export class DBService {
  getAll(table: string) {
    return Object.keys(database[table]).map((key) => new classes[table](database[table][key]));
  }

  getList(table: string, field: string, find: string | number) {
    return Object.keys(database[table])
      .filter((key) => database[table][key][field] === find)
      .map((key) => new classes[table](database[table][key]));
  }

  get(table: string, id: string) {
    if (!database[table][id]) {
      throw new NotFoundException();
    } else {
      return new classes[table](database[table][id]);
    }
  }

  create(table: string, data: CreateEntity) {
    const id = uuidv4();
    database[table][id] = { ...data, id };
    return new classes[table](database[table][id]);
  }

  update(table: string, id: string, data: Partial<Entity>) {
    if (!database[table][id]) {
      throw new NotFoundException();
    } else {
      database[table][id] = { ...database[table][id], ...data };
      return new classes[table](database[table][id]);
    }
  }

  delete(table: string, id: string) {
    if (!database[table][id]) {
      throw new NotFoundException();
    } else {
      delete database[table][id];
      return {};
    }
  }
}
