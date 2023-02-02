import { Injectable } from '@nestjs/common';
import { DBService } from './db.service';

@Injectable()
export abstract class CrudService<T> {
  constructor(readonly dbService: DBService) {}

  abstract getTable(): string;

  getAll(): T[] {
    return this.dbService.getAll(this.getTable());
  }

  get(id: string): T {
    return this.dbService.get(this.getTable(), id);    
  }

}
