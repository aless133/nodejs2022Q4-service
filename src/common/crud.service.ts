import { Injectable } from '@nestjs/common';
import { DBService} from './db.service'

@Injectable()
export class CrudService {
  
  constructor(private readonly dbService: DBService) {}

}
