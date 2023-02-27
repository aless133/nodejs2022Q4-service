import { Module } from '@nestjs/common';
import { DBService } from './db.service';
import { DSProvider } from './ds.provider';

@Module({
  providers: [DBService, DSProvider],
  exports: [DBService],
})
export class DBModule {}
