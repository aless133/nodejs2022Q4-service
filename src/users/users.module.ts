import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [DBModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
