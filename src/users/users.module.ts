import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DBService } from 'src/common/db.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, DBService],
})
export class UsersModule {}
