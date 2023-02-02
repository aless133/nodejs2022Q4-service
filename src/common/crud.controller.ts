import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  UseInterceptors, ClassSerializerInterceptor,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
// import { validate } from 'class-validator';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
// @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
export abstract class CrudController<T, CreateT, UpdateT> {
  dataService: any;

  @Get()
  getAll(): T[] {
    return this.dataService.getAll();
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string): T {
    return this.dataService.get(id);
  }

  @Post()
  create(@Body() data: CreateT): T {
    return this.dataService.create(data);
  }

  //это тоже работает
  // @Post()
  // async create(@Body() data: CreateT): Promise<T> {
  //   console.log(await validate(data, { whitelist: true, forbidNonWhitelisted: true }));
  //   return this.dataService.create(data);
  // }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: UpdateT): T {
    return this.dataService.update(id, data);    
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string): T {
    return this.dataService.delete(id);
  }
}
