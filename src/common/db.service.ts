import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User, UserCreateDto } from 'src/users/users.dto';

type Entity = User;
type CreateEntity = UserCreateDto;

const classes = {
  users: User,
};

interface Database {
  users: Record<string, User>;
}

const database: Database = {
  users: {},
};

@Injectable()
export class DBService {
  getAll(table: string) {
    return Object.keys(database[table]).map((key) => new classes[table](database[table][key]));
  }

  get(table: string, id: string) {
    if (!database[table][id]) {
      throw new NotFoundException();
    } else {
      return new classes[table](database[table][id]);
    }
  }

  create(table: string, data: Entity) {
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
