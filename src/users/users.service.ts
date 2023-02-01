import { Injectable } from '@nestjs/common';
import { DBService} from '../common/db.service'
import { User } from '../users/users.dto';

@Injectable()
export class UsersService {

    constructor(private readonly dbService: DBService) {}

    getAll(): User[] {
        return this.dbService.getAll('users').data;
    }

}
