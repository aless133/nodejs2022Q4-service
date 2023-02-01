import { Controller, Get, Param, UsePipes, ValidationPipe  } from '@nestjs/common';

@Controller()
export abstract class CrudController<T> {
    
    abstract getTable():string;
    dataService: any;

    @Get()
    getAll(): T[] {
        console.log('CrudController.getall',this.getTable());
        const qqq = this.dataService.getAll(this.getTable());
        console.log(qqq);
        return qqq;
    }

    @Get()
    get(@Param('id') id: string): T {
        return this.dataService.get(this.getTable(),id).data;
    }
}
