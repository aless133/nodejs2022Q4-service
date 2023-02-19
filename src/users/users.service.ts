import { Injectable, ForbiddenException } from '@nestjs/common';
import { DBService } from '../common/db.service';
import { User, UserCreateDto, UserUpdateDto } from './users.dto';
import { CrudService } from 'src/common/crud.service';

@Injectable()
export class UsersService extends CrudService<User, UserCreateDto> {
  constructor(readonly dbService: DBService) {
    super(dbService);
  }

  getTable() {
    return 'users';
  }

  create(userCreate: UserCreateDto): User {
    const user = new User(userCreate);
    user.version = 1;
    user.createdAt = user.updatedAt = Date.now();
    return this.dbService.create('users', user);
  }

  updatePassword(id: string, userUpdate: UserUpdateDto): User {
    const user = this.dbService.get('users', id);
    if (user.password == userUpdate.oldPassword)
      return this.dbService.update('users', id, {
        password: userUpdate.newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      });
    else {
      throw new ForbiddenException();
    }
  }

  // delete(id: string) {
  //   return this.dbService.delete('users', id);
  // }
}
