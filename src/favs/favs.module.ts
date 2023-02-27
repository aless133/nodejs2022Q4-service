import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { DBModule } from 'src/db/db.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DBModule, AuthModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
