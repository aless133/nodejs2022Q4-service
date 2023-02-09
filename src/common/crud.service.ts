import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db/db.service';

@Injectable()
export abstract class CrudService<T, CreateT> {
  constructor(readonly dbService: DBService) {}

  abstract getTable(): string;

  async getAll() {
    return await this.dbService.getAll(this.getTable());
  }

  async get(id: string) {
    return this.dbService.get(this.getTable(), id);
  }

  async create(data: CreateT) {
    return await this.dbService.create(this.getTable(), data);
  }

  async update(id: string, data: Partial<T>) {
    return await this.dbService.update(this.getTable(), id, data);
  }

  async delete(id: string) {
    return await this.dbService.delete(this.getTable(), id);
  }
}
