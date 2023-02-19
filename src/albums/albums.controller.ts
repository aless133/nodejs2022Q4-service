import { Controller, Post, Put, Param, Body, ParseUUIDPipe } from '@nestjs/common';
import { CrudController } from '../common/crud.controller';
import { Album, AlbumDto } from './albums.dto';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController extends CrudController<Album, AlbumDto, AlbumDto> {
  constructor(readonly dataService: AlbumsService) {
    super();
  }

  @Post()
  create(@Body() data: AlbumDto): Album {
    return super.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() data: AlbumDto): Album {
    return super.update(id, data);
  }
}
