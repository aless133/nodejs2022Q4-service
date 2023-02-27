import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';
import { DBModule } from 'src/db/db.module';

@Module({
  imports: [DBModule],
  controllers: [FavsController],
  providers: [FavsService],
})
export class FavsModule {}
