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
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
// import { validate } from 'class-validator';
import { ApiOkResponse, ApiExtraModels } from '@nestjs/swagger';
import { User } from 'src/users/users.dto';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
// @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
export abstract class CrudController<T, CreateT, UpdateT> {
  dataService: any;
  abstract getAllApiResponse();

  getAllResponse = this.getAllApiResponse.bind(this);
  @ApiOkResponse(this.getAllResponse)    

  // @ApiOkResponse((()=>this.getAllApiResponse())())  
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


function MyDecorator(param: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('MyDecorator called with param:', param);
  };
}

class MyClass {
  static param = "something"
  @Decorator(MyClass.param)
  myMethod() {}
}