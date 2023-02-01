import { Injectable } from '@nestjs/common';
import {
  version as uuidVersion,
  validate as uuidValidate,
  v4 as uuidv4,
} from 'uuid';
import { User } from 'src/users/users.dto';

interface Database {
  users: Record<string, User>;
}
const user1 = new User();
user1.login = '123';

@Injectable()
export class DBService {
  database: Database = {
    users: {
      qqq: user1,
    },
  };

  getAll(table: string) {
    return {
      data: Object.keys(this.database[table]).map(
        (key) => this.database[table][key],
      ),
    };
  }

  /*
  get({ params: { userId } }) {
    if (!userId) {
      return { err: { code: EDbErrors.INVALID_DATA, message: "No userId" } };
    } else if (!uuidValidateV4(userId)) {
      return { err: { code: EDbErrors.INVALID_DATA, message: "Invalid userId" } };
    } else if (!database[userId]) {
      return { err: { code: EDbErrors.NOT_FOUND, message: "User not found" } };
    } else {
      return { data: database[userId] };
    }
  }

  create({ data }) {
    if (!data || !isValidUserData(data)) {
      return { err: { code: EDbErrors.INVALID_DATA, message: "Invalid user data" } };
    } else {
      const userId = uuidv4();
      database[userId] = { ...data, id: userId };
      return { data: database[userId] };
    }
  }

  update({ params: { userId }, data }) {
    if (!userId) {
      return { err: { code: EDbErrors.INVALID_DATA, message: "No userId" } };
    } else if (!uuidValidateV4(userId)) {
      return { err: { code: EDbErrors.INVALID_DATA, message: "Invalid userId" } };
    } else if (!data || !isValidUserData(data)) {
      return { err: { code: EDbErrors.INVALID_DATA, message: "Invalid user data" } };
    } else if (!database[userId]) {
      return { err: { code: EDbErrors.NOT_FOUND, message: "User not found" } };
    } else {
      database[userId] = { ...data, id: userId };
      return { data: database[userId] };
    }
  }

  delete({ params: { userId } }) {
    if (!userId) {
      return { err: { code: EDbErrors.INVALID_DATA, message: "No userId" } };
    } else if (!uuidValidateV4(userId)) {
      return { err: { code: EDbErrors.INVALID_DATA, message: "Invalid userId" } };
    } else if (!database[userId]) {
      return { err: { code: EDbErrors.NOT_FOUND, message: "User not found" } };
    } else {
      delete database[userId];
      return {};
    }
  }
  */
}
