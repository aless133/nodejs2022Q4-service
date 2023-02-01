import { Controller } from '@nestjs/common';
import { CrudController } from '../common/crud.controller';
import { User } from './users.dto'
import { UsersService } from './users.service';

@Controller('users')
export class UsersController extends CrudController<User> {
    
    getTable() {
        return 'users';
    }

    constructor(readonly dataService: UsersService) {
        super();
    }
}
