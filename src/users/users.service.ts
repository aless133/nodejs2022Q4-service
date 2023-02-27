import { Injectable, ForbiddenException } from '@nestjs/common';
import { DBService } from 'src/db/db.service';
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

  async create(userCreate: UserCreateDto) {
    const user = new User(userCreate);
    user.version = 1;
    user.createdAt = user.updatedAt = Date.now();
    return await this.dbService.create('users', user);
  }

  async updatePassword(id: string, userUpdate: UserUpdateDto) {
    const user = (await this.dbService.get('users', id)) as User;
    if (user.password == userUpdate.oldPassword) {
      return await this.dbService.update('users', id, {
        password: userUpdate.newPassword,
        version: user.version + 1,
        updatedAt: Date.now(),
      });
    } else {
      throw new ForbiddenException();
    }
  }
}
