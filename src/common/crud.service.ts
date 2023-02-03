import { Injectable } from '@nestjs/common';
import { DBService } from './db.service';

@Injectable()
export abstract class CrudService<T, CreateT> {
  constructor(readonly dbService: DBService) {}

  abstract getTable(): string;

  getAll(): T[] {
    return this.dbService.getAll(this.getTable());
  }

  get(id: string): T {
    return this.dbService.get(this.getTable(), id);    
  }

  create(data: CreateT): T {
    return this.dbService.create(this.getTable(), data);
  }

  update(id: string, data: Partial<T>): T {
    return this.dbService.update(this.getTable(), id, data); 
  }  

  delete(id: string) {
    return this.dbService.delete(this.getTable(), id);
  }  

}
