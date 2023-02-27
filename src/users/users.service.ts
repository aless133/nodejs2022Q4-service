import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DBService } from 'src/db/db.service';
import { User, UserCreateDto, UserUpdateDto } from './users.dto';
import { CrudService } from 'src/common/crud.service';
// import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService extends CrudService<User, UserCreateDto> {
  salt = 10;

  constructor(readonly dbService: DBService) {
    super(dbService);
    if (process.env.CRYPT_SALT) this.salt = parseInt(process.env.CRYPT_SALT);
  }

  getTable() {
    return 'users';
  }

  async create(userCreate: UserCreateDto) {
    const oldUser = await this.dbService.getBy('users', 'login', userCreate.login);
    if (oldUser && oldUser.length) throw new BadRequestException();
    const user = new User(userCreate);
    user.version = 1;
    user.createdAt = user.updatedAt = Date.now();
    user.password = await this.hash(user.password);
    return await this.dbService.create('users', user);
  }

  async updatePassword(id: string, userUpdate: UserUpdateDto) {
    const user = (await this.dbService.get('users', id)) as User;
    if (await bcrypt.compare(userUpdate.oldPassword, user.password)) {
      return await this.dbService.update('users', id, {
        password: await this.hash(userUpdate.newPassword),
        version: user.version + 1,
        updatedAt: Date.now(),
      });
    } else {
      throw new ForbiddenException();
    }
  }

  async hash(pass: string): Promise<string> {
    return await bcrypt.hash(pass, this.salt);
  }
}
