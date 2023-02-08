import { Controller, Post, Put, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { CrudController } from '../common/crud.controller';
import { User, UserCreateDto, UserUpdateDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('user')
// @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
export class UsersController extends CrudController<User, UserCreateDto, UserUpdateDto> {
  constructor(readonly dataService: UsersService) {
    super();
  }

  @Post()
  create(@Body() data: UserCreateDto): User {
    return super.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UserUpdateDto) {
    return this.dataService.updatePassword(id, data);
  }
}
